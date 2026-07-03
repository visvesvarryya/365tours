/**
 * Google Ads / Analytics configuration and helpers.
 *
 * IDs are read from public env vars so they can be set per-environment without a
 * code change. Put these in `.env.local` (see `.env.local.example`):
 *
 *   NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX          ← Google Ads tag (also powers remarketing)
 *   NEXT_PUBLIC_GADS_LEAD_LABEL=AbCdEfGhIj            ← conversion label for a submitted lead
 *   NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX                   ← (optional) GA4 measurement id
 *
 * The Google Ads global site tag doubles as the **remarketing / retargeting tag** —
 * once it is live and firing, Google automatically builds remarketing audiences you
 * can target with the creatives in /public/retargeting-creatives.
 */

export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "";
export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || "";
export const GADS_LEAD_LABEL = process.env.NEXT_PUBLIC_GADS_LEAD_LABEL || "";

export const analyticsEnabled = Boolean(GOOGLE_ADS_ID || GA4_ID);

type GtagArgs = [string, ...unknown[]];
declare global {
  interface Window {
    gtag?: (...args: GtagArgs) => void;
    dataLayer?: unknown[];
  }
}

/** Fire a generic gtag event (no-op if the tag isn't loaded). */
export function gtagEvent(action: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", action, params);
}

/**
 * Record a lead-form submission as a Google Ads conversion + a GA4 `generate_lead`
 * event. Safe to call even if analytics IDs aren't configured yet.
 */
export function trackLeadConversion(details: {
  destination?: string;
  source?: string;
  value?: number;
} = {}): void {
  // GA4 lead event
  gtagEvent("generate_lead", {
    currency: "INR",
    value: details.value ?? 0,
    destination: details.destination,
    source: details.source,
  });

  // Google Ads conversion
  if (GOOGLE_ADS_ID && GADS_LEAD_LABEL) {
    gtagEvent("conversion", {
      send_to: `${GOOGLE_ADS_ID}/${GADS_LEAD_LABEL}`,
      value: details.value ?? 0,
      currency: "INR",
    });
  }
}
