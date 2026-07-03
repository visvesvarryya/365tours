"use client";

import { useState, type FormEvent } from "react";
import { trackLeadConversion } from "@/lib/analytics";

const DEFAULT_INTERESTS = [
  "India",
  "Europe",
  "South East Asia",
  "Japan",
  "Africa Safari",
  "Americas",
  "Middle East",
  "Other",
];

type Status = "idle" | "submitting" | "success" | "error";

export default function LeadForm({
  variant = "full",
  destination,
  source = "website",
}: {
  variant?: "full" | "compact";
  destination?: string;
  source?: string;
}) {
  const [selected, setSelected] = useState<string[]>(destination ? [destination] : []);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const toggle = (item: string) =>
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      groupSize: String(data.get("groupSize") || ""),
      message: String(data.get("message") || "").trim(),
      interests: destination ? [destination] : selected,
      destination,
      source,
    };

    if (payload.name.length < 2) {
      setError("Please enter your name.");
      return;
    }
    if (!payload.email && !payload.phone) {
      setError("Add an email or phone so we can reach you.");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }
      trackLeadConversion({ destination, source });
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl bg-brand-500 p-10 text-center text-white">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="mt-6 font-serif text-2xl font-bold">Thank you! 🎉</h3>
        <p className="mt-2 max-w-sm text-brand-50">
          Your enquiry{destination ? ` about ${destination}` : ""} is in. One of our travel
          designers will craft your itinerary and reply within 24 hours.
        </p>
        <a
          href="https://wa.me/919840148869"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-600 transition hover:bg-brand-50"
        >
          Chat with us now on WhatsApp
        </a>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-stone-500 outline-none transition focus:border-brand-400 focus:ring-1 focus:ring-brand-400";
  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className={variant === "full" ? "grid gap-5 sm:grid-cols-2" : "space-y-5"}>
        <label className="block">
          <span className="text-xs font-medium uppercase tracking-widest text-stone-400">
            Your Name *
          </span>
          <input name="name" type="text" required placeholder="Ravi Kumar" className={`mt-2 ${inputClass}`} />
        </label>
        <label className="block">
          <span className="text-xs font-medium uppercase tracking-widest text-stone-400">Email</span>
          <input name="email" type="email" placeholder="you@example.com" className={`mt-2 ${inputClass}`} />
        </label>
      </div>

      <div className={variant === "full" ? "grid gap-5 sm:grid-cols-2" : "space-y-5"}>
        <label className="block">
          <span className="text-xs font-medium uppercase tracking-widest text-stone-400">
            Phone / WhatsApp
          </span>
          <input name="phone" type="tel" placeholder="+91 98000 00000" className={`mt-2 ${inputClass}`} />
        </label>
        <label className="block">
          <span className="text-xs font-medium uppercase tracking-widest text-stone-400">
            Group Size
          </span>
          <select
            name="groupSize"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-stone-900 px-4 py-3 text-sm text-white outline-none transition focus:border-brand-400"
          >
            <option value="">Select…</option>
            <option>Solo</option>
            <option>Couple (2)</option>
            <option>Small group (3–5)</option>
            <option>Family / Group (6+)</option>
          </select>
        </label>
      </div>

      {/* Destination chips (home form only) */}
      {!destination && (
        <div>
          <span className="text-xs font-medium uppercase tracking-widest text-stone-400">
            Destinations of Interest
          </span>
          <div className="mt-3 flex flex-wrap gap-2">
            {DEFAULT_INTERESTS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => toggle(item)}
                className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${
                  selected.includes(item)
                    ? "border-brand-400 bg-brand-500 text-white"
                    : "border-white/10 bg-white/5 text-stone-300 hover:border-white/30"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      <label className="block">
        <span className="text-xs font-medium uppercase tracking-widest text-stone-400">
          Tell us more (optional)
        </span>
        <textarea
          name="message"
          rows={3}
          placeholder={
            destination
              ? `Your ${destination} trip — dates, interests, budget…`
              : "Travel dates, special occasions, preferences, budget range…"
          }
          className={`mt-2 resize-none ${inputClass}`}
        />
      </label>

      {error && (
        <p className="rounded-xl bg-red-500/10 px-4 py-2.5 text-sm text-red-300">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-brand-500 py-4 text-sm font-semibold text-white shadow-lg shadow-brand-900/40 transition hover:bg-brand-400 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Sending…" : destination ? `Send My ${destination} Enquiry →` : "Send My Enquiry →"}
      </button>

      <p className="text-center text-xs text-stone-500">
        Free consultation · No commitment · We respect your privacy — no spam, ever.
      </p>
    </form>
  );
}
