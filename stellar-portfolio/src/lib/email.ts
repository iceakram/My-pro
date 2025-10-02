import nodemailer from "nodemailer";

export async function sendContactEmail(opts: {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
}) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error("SMTP configuration is missing.");
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS }
  });

  await transporter.verify(); // verify connection config
  return transporter.sendMail({
    from: `Portfolio Contact <${SMTP_USER}>`,
    to: opts.to,
    replyTo: opts.from,
    subject: opts.subject,
    text: opts.text,
    html: opts.html
  });
}
