import "./../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import clsx from "clsx";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const siteName = "Your Name — Portfolio";
const description = "Senior developer portfolio showcasing projects, skills, and testimonials with a secure contact form.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"),
  title: {
    default: siteName,
    template: "%s | " + siteName,
  },
  description,
  applicationName: siteName,
  generator: "Next.js",
  keywords: ["portfolio", "software engineer", "web developer", "projects", "contact"],
  authors: [{ name: "Your Name", url: process.env.SITE_URL }],
  openGraph: {
    type: "website",
    url: "/",
    title: siteName,
    description,
    siteName,
    images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description,
    images: ["/og-image.svg"],
  },
  icons: { icon: "/favicon.ico" },
  alternates: { canonical: "/" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Your Name",
    url: process.env.SITE_URL || "http://localhost:3000",
    sameAs: [
      "https://github.com/your-handle",
      "https://www.linkedin.com/in/your-handle/"
    ],
    jobTitle: "Senior Software Engineer"
  };

  return (
    <html lang="en" className={clsx(inter.variable)}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-white text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
        {/* Cloudflare Turnstile script for the contact form */}
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
          async
          defer
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 rounded bg-sky-600 px-3 py-2 text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
