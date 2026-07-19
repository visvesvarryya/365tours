import type { Metadata } from "next";
import IndiaHeroBackground from "@/components/IndiaHeroBackground";
import IndiaDestinationDirectory from "@/components/IndiaDestinationDirectory";
import TwelveReasons from "@/components/TwelveReasons";
import TrustBar from "@/components/TrustBar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/site";

const title = "India Tours | 365 Tours — Private & Customised Indian Holidays";
const description =
  "Private, expertly guided India holidays across 9–50+ regions — Rajasthan's forts, Kerala's backwaters, the Himalayas, Tamil Nadu's temples, wildlife safaris and more. Custom itineraries of 4–30 days.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/india" },
  openGraph: {
    type: "website",
    title,
    description,
    url: "/india",
    images: [{ url: "/india/hero/taj-mahal.jpg", alt: "Incredible India — 365 Tours" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/india/hero/taj-mahal.jpg"] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  name: "India — 365 Tours",
  description,
  url: `${SITE_URL}/india`,
  image: `${SITE_URL}/india/hero/taj-mahal.jpg`,
  provider: {
    "@type": "TravelAgency",
    name: "365 Tours",
    url: SITE_URL,
    telephone: "+91-98401-48869",
  },
};

export default function IndiaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        {/* ── HERO ── */}
        <section className="relative h-[460px] overflow-hidden bg-stone-950 md:h-[650px]">
          <IndiaHeroBackground />
        </section>

        <IndiaDestinationDirectory />
        <TwelveReasons />
        <TrustBar />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
