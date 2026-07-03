import Script from "next/script";
import { GOOGLE_ADS_ID, GA4_ID } from "@/lib/analytics";

/**
 * Loads the Google tag (gtag.js) for Google Ads conversion tracking + remarketing
 * and, optionally, GA4. Renders nothing unless at least one ID is configured, so
 * local/dev without env vars stays clean.
 */
export default function Analytics() {
  const primaryId = GOOGLE_ADS_ID || GA4_ID;
  if (!primaryId) return null;

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
