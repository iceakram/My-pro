# Stellar Portfolio (Next.js + TypeScript)

A modern, accessible, SEO-friendly personal portfolio with a secure contact form.

## Highlights

- **Design**: Clean, modern, responsive layout with Tailwind CSS and good defaults (focus states, reduced motion).
- **Sections**: About, Projects, Skills, Testimonials, Contact.
- **Email**: Secure server-side email via **Nodemailer + SMTP**.
- **Spam protection**: Cloudflare **Turnstile** (server-verified) + **honeypot** + **rate limiting**.
- **Tech**: Next.js App Router, TypeScript, React Hook Form, Zod, Tailwind.
- **Accessibility**: WCAG-friendly color contrast, keyboard navigation, skip link, ARIA where appropriate.
- **SEO**: Structured data (JSON-LD), Open Graph/Twitter, canonical URLs, sitemap & robots.

## Quick start

```bash
# 1) Install dependencies
npm i

# 2) Copy env and fill in your values
cp .env.example .env.local
# Edit .env.local with your SMTP + Turnstile keys + SITE_URL

# 3) Run locally
npm run dev
```

Visit http://localhost:3000

## Environment

- **SMTP**: Works with any SMTP provider (Postmark, SendGrid, Mailgun, SES).
- **Turnstile**: Create a site key (public) and secret key (server). Optional but recommended.
- **SITE_URL**: For metadata + sitemap. Use your production URL in production.

## Deployment

- **Vercel**: Add the same env vars in the dashboard. Ensure the route uses `runtime = "nodejs"` for Nodemailer.
- **Docker/Node**: `npm run build && npm run start` (ensure `NODE_ENV=production`).

## File tour

- `src/app/api/contact/route.ts` — server route with validation, anti-spam, and email delivery.
- `src/components/ContactForm.tsx` — accessible form with react-hook-form + zod.
- `src/lib/*` — helpers (validation, rate limit, IP, email).
- `src/app/layout.tsx` — metadata, JSON-LD, Turnstile script.
- `src/app/page.tsx` — layout with all sections.
- `src/data/*` — your projects and testimonials.

## Hardening tips (optional)

- Replace the in-memory rate limiter with a persistent one (Upstash Redis, Cloudflare KV).
- DKIM/SPF/DMARC on your domain for better deliverability.
- Add logging & alerting (Sentry/Logtail) for API errors.
- Add content security policy (CSP) headers if you host third-party assets.
- Swap Turnstile with hCaptcha or reCAPTCHA if you prefer (server verification is similar).
- Integrate unit tests (Jest) & E2E (Playwright).

## License

MIT — customize and ship.
