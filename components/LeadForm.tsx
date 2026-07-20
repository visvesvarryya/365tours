"use client";

import { useState, useEffect, type FormEvent } from "react";
import { trackLeadConversion } from "@/lib/analytics";
import { destinations } from "@/lib/destinations";
import { indiaStateDetails } from "@/lib/india-states";

const STORAGE_KEY = "365tours_contact";

// Every country + India state name, for the destination field's suggestion list —
// lets visitors pick from the real catalog instead of typing it out blind.
const DESTINATION_OPTIONS = [
  ...destinations.map((d) => d.name),
  ...Object.values(indiaStateDetails).map((s) => s.name),
].sort((a, b) => a.localeCompare(b));

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
  "Flexible / Not sure yet",
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
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  // Prefilled from the visitor's last enquiry, so returning visitors don't retype it.
  const [contact, setContact] = useState({ name: "", email: "", phone: "", departureCity: "" });
  const [destinationInput, setDestinationInput] = useState(destination || "");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const c = JSON.parse(raw);
        setContact({
          name: c.name || "",
          email: c.email || "",
          phone: c.phone || "",
          departureCity: c.departureCity || "",
        });
      }
    } catch {
      /* ignore */
    }
  }, []);

  const setField = (field: keyof typeof contact) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setContact((c) => ({ ...c, [field]: e.target.value }));

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);
    const destinationValue = destination || destinationInput.trim();
    const payload = {
      name: contact.name.trim(),
      email: contact.email.trim(),
      phone: contact.phone.trim(),
      groupSize: String(data.get("groupSize") || ""),
      departureCity: contact.departureCity.trim(),
      travelMonth: String(data.get("travelMonth") || ""),
      interests: destinationValue ? [destinationValue] : [],
      destination: destinationValue,
      source,
    };

    if (payload.name.length < 2) {
      setError("Please enter your name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (payload.phone.replace(/\D/g, "").length < 7) {
      setError("Please enter a valid phone / WhatsApp number.");
      return;
    }
    if (!destinationValue) {
      setError("Please tell us which destination you're interested in.");
      return;
    }
    if (!payload.groupSize) {
      setError("Please enter the number of people travelling.");
      return;
    }
    if (!payload.departureCity) {
      setError("Please enter your country / city of departure.");
      return;
    }
    if (!payload.travelMonth) {
      setError("Please select your likely month of travel.");
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
      // Remember contact details so the form is prefilled on the visitor's next visit.
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
            departureCity: payload.departureCity,
          })
        );
      } catch {
        /* ignore */
      }
      trackLeadConversion({ destination: destinationValue, source });
      setStatus("success");
      form.reset();
      setDestinationInput(destination || "");
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
          Your enquiry{destination ? ` about ${destination}` : ""} is in. We will craft your
          itinerary and reply within 4–24 hours.
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
    "w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-stone-500 outline-none transition focus:border-brand-400 focus:ring-1 focus:ring-brand-400";
  const selectClass =
    "mt-1.5 w-full rounded-xl border border-white/10 bg-stone-900 px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-brand-400";
  const submitting = status === "submitting";
  const grid = variant === "full" ? "grid gap-3 sm:grid-cols-2" : "space-y-3";

  return (
    <form onSubmit={handleSubmit} className="space-y-3" noValidate>
      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-brand-400">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-400" />
        Response time 4–24 hours
      </p>

      <div className={grid}>
        <label className="block">
          <span className="text-xs font-medium uppercase tracking-widest text-stone-400">
            Your Name *
          </span>
          <input
            name="name"
            type="text"
            required
            minLength={2}
            autoComplete="name"
            placeholder="Ravi Kumar"
            value={contact.name}
            onChange={setField("name")}
            className={`mt-1.5 ${inputClass}`}
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium uppercase tracking-widest text-stone-400">
            Email *
          </span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={contact.email}
            onChange={setField("email")}
            className={`mt-1.5 ${inputClass}`}
          />
        </label>
      </div>

      <div className={grid}>
        <label className="block">
          <span className="text-xs font-medium uppercase tracking-widest text-stone-400">
            Phone / WhatsApp *
          </span>
          <input
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            pattern="[0-9+\-\s()]{7,20}"
            placeholder="+91 98000 00000"
            value={contact.phone}
            onChange={setField("phone")}
            className={`mt-1.5 ${inputClass}`}
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium uppercase tracking-widest text-stone-400">
            Destination *
          </span>
          {destination ? (
            <input
              type="text"
              value={destination}
              disabled
              className={`mt-2 ${inputClass} cursor-not-allowed opacity-70`}
            />
          ) : (
            <>
              <input
                name="destination"
                type="text"
                required
                list="destination-options"
                autoComplete="off"
                placeholder="e.g. Egypt"
                value={destinationInput}
                onChange={(e) => setDestinationInput(e.target.value)}
                className={`mt-1.5 ${inputClass}`}
              />
              <datalist id="destination-options">
                {DESTINATION_OPTIONS.map((name) => (
                  <option key={name} value={name} />
                ))}
              </datalist>
            </>
          )}
        </label>
      </div>

      <div className={grid}>
        <label className="block">
          <span className="text-xs font-medium uppercase tracking-widest text-stone-400">
            No. of People Travelling *
          </span>
          <input
            name="groupSize"
            type="number"
            required
            min={1}
            step={1}
            inputMode="numeric"
            placeholder="2"
            className={`mt-1.5 ${inputClass}`}
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium uppercase tracking-widest text-stone-400">
            Country / City of Departure *
          </span>
          <input
            name="departureCity"
            type="text"
            required
            autoComplete="address-level2"
            placeholder="Chennai, India"
            value={contact.departureCity}
            onChange={setField("departureCity")}
            className={`mt-1.5 ${inputClass}`}
          />
        </label>
      </div>

      <label className="block">
        <span className="text-xs font-medium uppercase tracking-widest text-stone-400">
          Likely Month of Travel *
        </span>
        <select name="travelMonth" required defaultValue="" className={selectClass}>
          <option value="" disabled>
            Select…
          </option>
          {MONTHS.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </label>

      {error && (
        <p className="rounded-xl bg-red-500/10 px-4 py-2 text-xs text-red-300">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-brand-500 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-brand-900/40 transition hover:bg-brand-400 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Send My Enquiry"}
      </button>

      <p className="text-center text-xs text-stone-500">
        We respect your privacy — no spam, unnecessary follow up. Ever.
      </p>
    </form>
  );
}
