"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/validators";
import { useState } from "react";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", company: "", turnstileToken: "" },
  });

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState<string>("");

  async function onSubmit(data: ContactInput) {
    try {
      // Read the hidden Turnstile input injected by the widget
      const tokenInput = document.querySelector('input[name="cf-turnstile-response"]') as HTMLInputElement | null;
      const token = tokenInput?.value || "";
      data.turnstileToken = token;

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) {
        setStatus("error");
        setServerMessage(json.error || "Something went wrong. Please try again.");
        // Reset Turnstile (if available)
        // @ts-expect-error turnstile may exist globally
        if (window.turnstile?.reset) window.turnstile.reset();
        return;
      }

      setStatus("success");
      setServerMessage("Thanks! Your message has been sent.");
      reset();
      // Reset Turnstile after success
      // @ts-expect-error turnstile may exist globally
      if (window.turnstile?.reset) window.turnstile.reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
      setServerMessage("Network error. Please try again.");
      // @ts-expect-error turnstile may exist globally
      if (window.turnstile?.reset) window.turnstile.reset();
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-4" noValidate>
      <div>
        <label htmlFor="name" className="block text-sm font-medium">Name</label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-900"
          {...register("name")}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && <p id="name-error" className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-900"
          {...register("email")}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && <p id="email-error" className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium">Message</label>
        <textarea
          id="message"
          rows={6}
          className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-900"
          {...register("message")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && <p id="message-error" className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
      </div>

      {/* Honeypot field - hidden from users, visible to bots */}
      <div className="hidden">
        <label htmlFor="company" className="block text-sm font-medium">Company</label>
        <input id="company" type="text" {...register("company")} />
      </div>

      {/* Cloudflare Turnstile widget */}
      {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? (
        <div className="cf-turnstile" data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} data-theme="auto" />
      ) : (
        <p className="text-sm text-slate-500">
          (Turnstile disabled — set NEXT_PUBLIC_TURNSTILE_SITE_KEY to enable anti‑spam.)
        </p>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center rounded-md bg-sky-600 px-4 py-2 text-white hover:bg-sky-700 disabled:opacity-70"
        >
          {isSubmitting ? "Sending…" : "Send message"}
        </button>
      </div>

      <div role="status" aria-live="polite" className="min-h-[1.5rem]">
        {status === "error" && <p className="text-sm text-red-600">{serverMessage}</p>}
        {status === "success" && <p className="text-sm text-green-700">{serverMessage}</p>}
      </div>
    </form>
  );
}
