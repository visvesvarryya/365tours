"use client";

import { useState, useEffect, type FormEvent } from "react";
import {
  AsYouType,
  isValidPhoneNumber,
  parsePhoneNumberFromString,
  validatePhoneNumberLength,
  type CountryCode,
} from "libphonenumber-js/min";
import { trackLeadConversion } from "@/lib/analytics";
import { destinations } from "@/lib/destinations";
import { indiaStateDetails } from "@/lib/india-states";
import { COUNTRY_OPTIONS, countryName, isKnownCountry } from "@/lib/phone-countries";

const STORAGE_KEY = "365tours_contact";
const DEFAULT_COUNTRY: CountryCode = "IN";

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

function formatPhoneDigits(digits: string, iso2: CountryCode): string {
  return digits ? new AsYouType(iso2).input(digits) : "";
}

const PHONE_PLACEHOLDER = formatPhoneDigits("9840148869", DEFAULT_COUNTRY);

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
  const [countryIso2, setCountryIso2] = useState<CountryCode>(DEFAULT_COUNTRY);
  const [destinationInput, setDestinationInput] = useState(destination || "");
  const [phoneTouched, setPhoneTouched] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const c = JSON.parse(raw);
        const iso2 = isKnownCountry(c.countryIso2) ? c.countryIso2 : DEFAULT_COUNTRY;
        setCountryIso2(iso2);
        setContact({
          name: c.name || "",
          email: c.email || "",
          phone: formatPhoneDigits(c.phoneDigits || "", iso2),
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

  const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");
    const prevDigits = contact.phone.replace(/\D/g, "");
    // Once the number is already valid (e.g. a full 10-digit Indian mobile
    // number), stop accepting further digits instead of only catching it on
    // submit. validatePhoneNumberLength alone isn't strict enough here — it
    // allows for every number type a country has (mobile/landline/toll-free/
    // etc.), so e.g. India isn't flagged TOO_LONG until 14 digits.
    const isGrowing = digits.length > prevDigits.length;
    if (isGrowing && (isValidPhoneNumber(prevDigits, countryIso2) || validatePhoneNumberLength(digits, countryIso2) === "TOO_LONG")) {
      return;
    }
    setContact((c) => ({ ...c, phone: formatPhoneDigits(digits, countryIso2) }));
  };

  const onCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const iso2 = e.target.value as CountryCode;
    setCountryIso2(iso2);
    setContact((c) => ({ ...c, phone: formatPhoneDigits(c.phone.replace(/\D/g, ""), iso2) }));
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setPhoneTouched(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const destinationValue = destination || destinationInput.trim();
    const phoneDigits = contact.phone.replace(/\D/g, "");

    if (contact.name.trim().length < 2) {
      setError("Please enter your name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!phoneDigits || !isValidPhoneNumber(phoneDigits, countryIso2)) {
      setError(`Please enter a valid phone number for ${countryName(countryIso2)}.`);
      return;
    }
    if (!destinationValue) {
      setError("Please tell us which destination you're interested in.");
      return;
    }
    const groupSize = String(data.get("groupSize") || "");
    if (!groupSize) {
      setError("Please enter the number of people travelling.");
      return;
    }
    if (!contact.departureCity.trim()) {
      setError("Please enter your country / city of departure.");
      return;
    }
    const travelMonth = String(data.get("travelMonth") || "");
    if (!travelMonth) {
      setError("Please select your likely month of travel.");
      return;
    }

    const parsed = parsePhoneNumberFromString(phoneDigits, countryIso2);
    const payload = {
      name: contact.name.trim(),
      email: contact.email.trim(),
      phone: parsed?.number || `+${phoneDigits}`,
      groupSize,
      departureCity: contact.departureCity.trim(),
      travelMonth,
      interests: destinationValue ? [destinationValue] : [],
      destination: destinationValue,
      source,
    };

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
            phoneDigits,
            countryIso2,
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
      setPhoneTouched(false);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Please try again.");
    }
  }

  if (status === "success") {
    return (
      // Teal -> purple gradient, both lifted straight from the 365 Tours logo
      // (public/brand/365logo1.png), for the one moment on the form worth a
      // bit of the logo's colour.
      <div className="flex flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-[#00b4b4] to-[#603090] p-10 text-center text-white">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="mt-6 font-serif text-2xl font-bold">Thank you! 🎉</h3>
        <p className="mt-2 max-w-sm text-white/85">
          Your enquiry{destination ? ` about ${destination}` : ""} is in. We will craft your
          itinerary and reply within 4–24 hours.
        </p>
        <a
          href="https://wa.me/919840148869"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#007a7a] transition hover:bg-[#e0f7f7]"
        >
          Chat with us now on WhatsApp
        </a>
      </div>
    );
  }

  // Focus/interaction accent uses the logo's actual teal (#00b4b4); the
  // "response time" eyebrow uses its orange (#fc9018) — both lifted from
  // public/brand/365logo1.png, not the site-wide (more muted) brand-* teal.
  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-stone-500 outline-none transition focus:border-[#00b4b4] focus:ring-1 focus:ring-[#00b4b4]";
  const selectClass =
    "mt-1.5 w-full rounded-xl border border-white/10 bg-stone-900 px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-[#00b4b4]";
  const submitting = status === "submitting";
  const grid = variant === "full" ? "grid gap-3 sm:grid-cols-2" : "space-y-3";
  const phoneDigits = contact.phone.replace(/\D/g, "");
  const phoneInvalid = phoneTouched && phoneDigits.length > 0 && !isValidPhoneNumber(phoneDigits, countryIso2);

  return (
    <form onSubmit={handleSubmit} className="space-y-3" noValidate>
      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#fc9018]">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#fc9018]" />
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
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            <select
              aria-label="Country code"
              autoComplete="tel-country-code"
              value={countryIso2}
              onChange={onCountryChange}
              className={`${inputClass} w-auto shrink-0 whitespace-nowrap bg-stone-900 !mt-0`}
            >
              {COUNTRY_OPTIONS.map((c) => (
                <option key={c.iso2} value={c.iso2} className="text-stone-900">
                  {c.name} (+{c.dialCode})
                </option>
              ))}
            </select>
            <input
              name="phone"
              type="tel"
              required
              autoComplete="tel-national"
              inputMode="tel"
              placeholder={PHONE_PLACEHOLDER}
              value={contact.phone}
              onChange={onPhoneChange}
              onBlur={() => setPhoneTouched(true)}
              aria-invalid={phoneInvalid}
              className={`${inputClass} !mt-0 min-w-[10rem] flex-1 ${
                phoneInvalid ? "border-red-500/60 focus:border-red-500 focus:ring-red-500" : ""
              }`}
            />
          </div>
          {phoneInvalid && (
            <p className="mt-1 text-xs text-red-300">
              That doesn&apos;t look like a valid {countryName(countryIso2)} number.
            </p>
          )}
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
        className="w-full rounded-full bg-[#007a7a] py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-[#003d3d]/40 transition hover:bg-[#00b4b4] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Send My Enquiry"}
      </button>

      <p className="text-center text-xs text-stone-500">
        We respect your privacy — no spam, unnecessary follow up. Ever.
      </p>
    </form>
  );
}
