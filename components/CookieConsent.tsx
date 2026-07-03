"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { analyticsEnabled } from "@/lib/analytics";

export const COOKIE_CONSENT_KEY = "365tours_cookie_consent";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only ask for consent when we actually set marketing/analytics cookies
    // (i.e. a Google Ads / Analytics ID is configured). No marketing cookies → no banner.
    if (!analyticsEnabled) return;
    try {
      if (!localStorage.getItem(COOKIE_CONSENT_KEY)) setShow(true);
    } catch {
      /* ignore */
    }
  }, []);

  const decide = (value: "granted" | "denied") => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, value);
    } catch {
      /* ignore */
    }
    setShow(false);
    window.dispatchEvent(new CustomEvent("cookie-consent", { detail: value }));
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[60] mx-auto max-w-md rounded-2xl border border-stone-200 bg-white p-5 shadow-2xl sm:left-6 sm:right-auto">
      <p className="text-sm font-semibold text-stone-900">We value your privacy 🍪</p>
      <p className="mt-1.5 text-xs leading-relaxed text-stone-500">
        We use your browser&apos;s local storage to remember your enquiry details, and — only with
        your consent — analytics cookies to understand traffic and improve your experience. See our{" "}
        <Link href="/cookie-policy" className="font-semibold text-brand-600 hover:underline">
          Cookie Policy
        </Link>
        .
      </p>
      <div className="mt-4 flex gap-3">
        <button
          onClick={() => decide("granted")}
          className="flex-1 rounded-full bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600"
        >
          Accept
        </button>
        <button
          onClick={() => decide("denied")}
          className="flex-1 rounded-full border border-stone-200 px-4 py-2.5 text-sm font-semibold text-stone-600 transition hover:bg-stone-50"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
