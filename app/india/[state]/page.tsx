import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ItineraryCarousel from "@/components/ItineraryCarousel";
import LeadForm from "@/components/LeadForm";
import TwelveReasons from "@/components/TwelveReasons";
import TrustBar from "@/components/TrustBar";
import Footer from "@/components/Footer";
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
            </div>
          </div>
        </section>

        {/* ── SIGNATURE ITINERARIES ── */}
        {state.itineraries.length > 0 && (
          <section className="bg-stone-50 py-16">
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
              <div id="enquire" className="mt-12 scroll-mt-24 rounded-3xl bg-stone-950 p-8 shadow-xl sm:p-10">
                <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-brand-400">
                      Quick Enquiry
                    </p>
                    <h3 className="mt-3 font-serif text-2xl font-bold text-white sm:text-3xl">
                      Get the full {state.name} itinerary
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-stone-400">
                      For a detailed day-wise itinerary, price, inclusions &amp; exclusions, send us
                      an enquiry — response within 24 hours. Every tour is fully private and
                      customisable to your dates, pace and budget.
                    </p>
                  </div>
                  <LeadForm variant="full" destination={state.name} source="india-itinerary-enquiry" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── DESTINATIONS OFFERED ── */}
        {cities.length > 0 && (
          <section className="bg-white py-16">
            <div className="mx-auto max-w-6xl px-6 lg:px-10">
              <h2 className="font-serif text-3xl font-bold text-stone-900">
                Destinations Offered
              </h2>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {cities.map((city) => (
                  <span
                    key={city}
                    className="rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── 12 REASONS ── */}
        <TwelveReasons />

        {/* ── INDUSTRY PROVENANCE (As Seen / Top Rated / Heritage partners) ── */}
        <TrustBar />

        {/* ── BACK TO FULL DIRECTORY ── */}
        <div className="bg-white pb-16 text-center">
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
