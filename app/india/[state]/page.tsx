import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ItineraryCarousel from "@/components/ItineraryCarousel";
import QuickEnquiryCTA from "@/components/QuickEnquiryCTA";
import DestinationsOffered from "@/components/DestinationsOffered";
import TwelveReasons from "@/components/TwelveReasons";
import TrustBar from "@/components/TrustBar";
import Footer from "@/components/Footer";
import SocialLinks from "@/components/SocialLinks";
import DestinationViewTracker from "@/components/DestinationViewTracker";
import { indiaStateDetails } from "@/lib/india-states";
import { indiaDestinationsOffered } from "@/lib/india-destinations-offered";
import { SITE_URL } from "@/lib/site";

export async function generateStaticParams() {
  return Object.keys(indiaStateDetails).map((state) => ({ state }));
}

export async function generateMetadata({
  params,
}: {
  params: { state: string };
}): Promise<Metadata> {
  const state = indiaStateDetails[params.state];
  if (!state) return {};
  const title = `${state.name} Tours | 365 Tours — Private & Customised India Holidays`;
  const description = `Private, expertly guided ${state.name} tours — ${state.itineraries.length} signature itineraries covering ${state.itineraries
    .flatMap((i) => i.places)
    .slice(0, 6)
    .join(", ")} and more. Custom-built to your dates, pace and budget.`;
  const path = `/india/${state.slug}`;
  const images = state.heroImage ? [{ url: state.heroImage, alt: `${state.name} — 365 Tours` }] : undefined;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", title, description, url: path, images },
    twitter: { card: "summary_large_image", title, description, images: state.heroImage ? [state.heroImage] : undefined },
  };
}

export default function IndiaStatePage({ params }: { params: { state: string } }) {
  const state = indiaStateDetails[params.state];
  if (!state) notFound();

  const cities = indiaDestinationsOffered[state.slug] ?? [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: `${state.name} — 365 Tours`,
    description: state.tagline,
    url: `${SITE_URL}/india/${state.slug}`,
    image: state.heroImage ? [`${SITE_URL}${state.heroImage}`] : undefined,
    ...(cities.length ? { containsPlace: cities.map((c) => ({ "@type": "Place", name: c })) } : {}),
    provider: {
      "@type": "TravelAgency",
      name: "365 Tours",
      url: SITE_URL,
      telephone: "+91-98401-48869",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DestinationViewTracker id={`india-${state.slug}`} name={state.name} category="India" />
      <main>
        {/* ── HERO ── */}
        <section className="relative h-[350px] overflow-hidden bg-stone-950 sm:h-[450px] lg:h-[600px]">
          {state.heroImage && (
            <Image
              src={state.heroImage}
              alt=""
              fill
              priority
              quality={90}
              sizes="100vw"
              className="object-cover object-center"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 from-0% via-transparent via-30% to-transparent" />

          <div className="relative flex h-[350px] flex-col justify-end pb-10 pt-28 sm:h-[450px] sm:pb-14 sm:pt-32 lg:h-[600px]">
            <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
              <nav className="mb-6 flex items-center gap-2 text-xs text-white/50">
                <Link href="/" className="transition-colors hover:text-white">Home</Link>
                <span>/</span>
                <Link href="/india" className="transition-colors hover:text-white">India</Link>
                <span>/</span>
                <span className="text-white/80">{state.name}</span>
              </nav>

              <h1 className="font-serif text-5xl font-bold text-white sm:text-6xl lg:text-7xl">
                {state.name}
              </h1>
              {state.tagline && (
                <p className="mt-3 text-xl font-light italic text-white/70">{state.tagline}</p>
              )}

              <SocialLinks className="mt-8" />
            </div>
          </div>
        </section>

        {/* ── SIGNATURE ITINERARIES ── */}
        {state.itineraries.length > 0 && (
          <section className="bg-stone-50 pb-10 pt-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              <h2 className="font-brush leading-none text-stone-900">
                <span className="text-6xl sm:text-8xl">{state.itineraries.length}</span>{" "}
                <span className="text-3xl sm:text-5xl">Popular Tours</span>
              </h2>
              <p className="mt-2 font-merri text-lg italic text-stone-600 sm:text-xl">
                Well designed to suit your interest, time &amp; budget
              </p>
              <div className="mt-8">
                <ItineraryCarousel items={state.itineraries} name={state.name} />
              </div>
              <QuickEnquiryCTA name={state.name} source="india-itinerary-enquiry" />
            </div>
          </section>
        )}

        {/* ── DESTINATIONS OFFERED ── */}
        <DestinationsOffered name={state.name} items={cities} />

        {/* ── 12 REASONS ── */}
        <TwelveReasons />

        {/* ── INDUSTRY PROVENANCE (As Seen / Top Rated / Heritage partners) ── */}
        <TrustBar />

        {/* ── BACK TO FULL DIRECTORY ── */}
        <div className="bg-white py-10 text-center">
          <Link
            href="/india#india-directory"
            className="inline-flex items-center gap-2 rounded-full border-2 border-brand-500 px-8 py-3.5 text-sm font-semibold text-brand-500 transition hover:bg-brand-500 hover:text-white"
          >
            ← View all India destinations
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
