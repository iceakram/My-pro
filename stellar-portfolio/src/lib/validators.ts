import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name").max(100),
  email: z.string().email("Please enter a valid email address").max(200),
  message: z.string().min(20, "Message should be at least 20 characters").max(5000),
  // Honeypot field — must be empty
  company: z.string().max(0, "Spam detected"),
  // Cloudflare Turnstile token from the client
  turnstileToken: z.string().min(1, "Turnstile token missing")
});

export type ContactInput = z.infer<typeof contactSchema>;
