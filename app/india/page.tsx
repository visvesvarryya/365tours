import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import IndianHolidays from "@/components/IndianHolidays";
import IndiaCarousel from "@/components/IndiaCarousel";
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
    images: [{ url: "/india/rajasthan.jpg", alt: "Incredible India — 365 Tours" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/india/rajasthan.jpg"] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  name: "India — 365 Tours",
  description,
  url: `${SITE_URL}/india`,
  image: `${SITE_URL}/india/rajasthan.jpg`,
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
        <section className="relative min-h-[72vh] overflow-hidden bg-stone-950">
          <Image
            src="/india/rajasthan.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-stone-950/85 via-stone-900/50 to-orange-900/30" />

          <div className="relative flex min-h-[72vh] flex-col justify-end pb-16 pt-32">
            <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
              {/* Breadcrumb */}
              <nav className="mb-6 flex items-center gap-2 text-xs text-white/60">
                <Link href="/" className="transition-colors hover:text-white">Home</Link>
                <span>/</span>
                <span className="text-white/85">India</span>
              </nav>

              <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-amber-300/40 bg-amber-400/15 px-5 py-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
                <span className="text-sm font-bold uppercase tracking-[0.22em] text-amber-200">
                  Indian Holidays
                </span>
              </div>

              <h1 className="font-serif text-5xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
                Incredible{" "}
                <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                  India
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
                One country, a thousand journeys — from Himalayan snowscapes to tropical backwaters,
                royal desert forts to ancient temple cities. Private, expertly guided itineraries
                across 9–50+ regions, crafted around you.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="#contact"
                  className="rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-8 py-4 text-base font-bold text-stone-900 shadow-lg shadow-orange-900/40 transition hover:from-amber-300 hover:to-orange-400 active:scale-95"
                >
                  ☀ Plan Your India Tour
                </Link>
                <Link
                  href="#indian-holidays"
                  className="rounded-full border border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white transition hover:bg-white/20"
                >
                  Explore Regions
                </Link>
              </div>
            </div>
          </div>
        </section>

        <IndiaCarousel />
        <IndianHolidays />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
