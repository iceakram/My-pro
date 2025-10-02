import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validators";
import { getClientIp } from "@/lib/ip";
import { rateLimitAllow } from "@/lib/rate-limit";
import { sendContactEmail } from "@/lib/email";

export const runtime = "nodejs"; // required for nodemailer

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req.headers);
    const { allowed, remaining } = rateLimitAllow(`contact:${ip}`);
    if (!allowed) {
      return NextResponse.json({ error: "Too many requests. Please try later." }, { status: 429 });
    }

    const json = await req.json();
    const parsed = contactSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues.map((i) => i.message).join(", ") },
        { status: 400 }
      );
    }

    const { name, email, message, company, turnstileToken } = parsed.data;

    // Anti-spam: honeypot must be empty
    if (company && company.trim() !== "") {
      return NextResponse.json({ error: "Spam detected." }, { status: 400 });
    }

    // Verify Cloudflare Turnstile
    const secret = process.env.TURNSTILE_SECRET_KEY;
    if (secret) {
      const formData = new URLSearchParams();
      formData.append("secret", secret);
      formData.append("response", turnstileToken);
      formData.append("remoteip", ip);

      const resp = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        body: formData,
      }).then((r) => r.json());

      if (!resp.success) {
        return NextResponse.json({ error: "Failed human verification." }, { status: 400 });
      }
    }

    const to = process.env.CONTACT_RECIPIENT || process.env.SMTP_USER;
    if (!to) {
      return NextResponse.json({ error: "Contact recipient not configured." }, { status: 500 });
    }

    const subject = `Portfolio contact — ${name}`;
    const text = `Name: ${name}
Email: ${email}
IP: ${ip}

Message:
${message}`;

    const html = `
      <h2>New portfolio message</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>IP:</strong> ${escapeHtml(ip)}</p>
      <p><strong>Message:</strong></p>
      <pre style="white-space:pre-wrap;border:1px solid #e5e7eb;padding:12px;border-radius:8px;">${escapeHtml(
        message
      )}</pre>
    `;

    await sendContactEmail({
      to,
      from: `${name} <${email}>`,
      subject,
      text,
      html,
    });

    return NextResponse.json({ ok: true, remaining });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
