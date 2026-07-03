"use client";

import Script from "next/script";
import { useState, useEffect } from "react";
import { GOOGLE_ADS_ID, GA4_ID } from "@/lib/analytics";
import { COOKIE_CONSENT_KEY } from "@/components/CookieConsent";

/**
 * Loads the Google tag (gtag.js) for Google Ads conversion tracking + remarketing
 * and, optionally, GA4 — but ONLY after the visitor accepts cookies, and only if an
 * ID is configured. Nothing loads on decline or before a choice is made.
 */
export default function Analytics() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const read = () => {
      try {
        setConsented(localStorage.getItem(COOKIE_CONSENT_KEY) === "granted");
      } catch {
        setConsented(false);
      }
    };
    read();
    window.addEventListener("cookie-consent", read);
    return () => window.removeEventListener("cookie-consent", read);
  }, []);

  const primaryId = GOOGLE_ADS_ID || GA4_ID;
  if (!consented || !primaryId) return null;

  return (
    <>
      <Script
        id="gtag-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${primaryId}`}
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${GOOGLE_ADS_ID ? `gtag('config', '${GOOGLE_ADS_ID}');` : ""}
          ${GA4_ID ? `gtag('config', '${GA4_ID}');` : ""}
        `}
      </Script>
    </>
  );
}
