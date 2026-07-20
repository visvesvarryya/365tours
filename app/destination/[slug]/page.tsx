import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import ItineraryCarousel from "@/components/ItineraryCarousel";
import QuickEnquiryCTA from "@/components/QuickEnquiryCTA";
import DestinationsOffered from "@/components/DestinationsOffered";
import TwelveReasons from "@/components/TwelveReasons";
import TrustBar from "@/components/TrustBar";
import Footer from "@/components/Footer";
import SocialLinks from "@/components/SocialLinks";
import DestinationViewTracker from "@/components/DestinationViewTracker";
import { SITE_URL, absoluteUrl } from "@/lib/site";
import { getDestinationBySlug, getAllSlugs } from "@/lib/destinations";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const dest = getDestinationBySlug(params.slug);
  if (!dest) return {};
  const title = `${dest.name} Tours | 365 Tours — Private & Customised`;
  const description = dest.description.slice(0, 160);
  const path = `/destination/${dest.slug}`;
  const images = dest.heroImage
    ? [{ url: dest.heroImage, alt: `${dest.name} — 365 Tours` }]
    : undefined;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "article", title, description, url: path, images },
    twitter: { card: "summary_large_image", title, description, images: dest.heroImage ? [dest.heroImage] : undefined },
  };
}

export default function DestinationPage({ params }: { params: { slug: string } }) {
  const dest = getDestinationBySlug(params.slug);
  if (!dest) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: `${dest.name} — 365 Tours`,
    description: dest.description,
    url: `${SITE_URL}/destination/${dest.slug}`,
    image: (dest.gallery ?? []).map((g) => absoluteUrl(g)),
    touristType: dest.experiences,
    ...(dest.regions && dest.regions.length
      ? { containsPlace: dest.regions.map((r) => ({ "@type": "Place", name: r })) }
      : {}),
    provider: {
      "@type": "TravelAgency",
      name: "365 Tours",
      url: SITE_URL,
      telephone: "+91-98401-48869",
      address: {
        "@type": "PostalAddress",
        streetAddress: "37 1st Street, Singaravelan Nagar, Maduravoyal",
        addressLocality: "Chennai",
        postalCode: "600095",
        addressCountry: "IN",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DestinationViewTracker id={dest.slug} name={dest.name} category={dest.continent} />
      <main>
        {/* ── HERO ── */}
        <section className="relative h-[560px] overflow-hidden bg-stone-950 sm:h-[580px] lg:h-[650px]">
          {dest.heroImage && (
            <Image
              src={dest.heroImage}
              alt=""
              fill
              priority
              quality={90}
              sizes="100vw"
              className="object-cover object-center"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/30 from-0% via-transparent via-35% to-transparent" />

          <div className="relative flex h-[560px] flex-col justify-end pb-10 pt-28 sm:h-[580px] sm:pb-14 sm:pt-32 lg:h-[650px]">
            <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
              {/* Breadcrumb */}
              <nav className="mb-6 flex items-center gap-2 text-xs text-white/50">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <Link href="/#all-destinations" className="hover:text-white transition-colors">Destinations</Link>
                <span>/</span>
                <span className="text-white/80">{dest.name}</span>
              </nav>

              {/* Continent badge */}
              <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/70">
                {dest.continent}
              </span>

              <div className="mt-4 flex items-center gap-4">
                {dest.flag && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={dest.flag}
                    alt={`${dest.name} flag`}
                    width={56}
                    height={56}
                    decoding="async"
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-white/70 shadow-lg sm:h-14 sm:w-14"
                  />
                )}
                <h1 className="font-serif text-5xl font-bold text-white sm:text-6xl lg:text-7xl">
                  {dest.name}
                </h1>
              </div>
              <p className="mt-3 text-xl text-white/70 font-light italic">{dest.tagline}</p>

              <SocialLinks className="mt-8" />
            </div>
          </div>
        </section>

        {/* ── BRIEF DESCRIPTION (itineraries come right after this) ── */}
        <section className="bg-white pb-6 pt-12">
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <p className="font-merri text-xl italic leading-relaxed text-stone-700 sm:text-2xl">
              {dest.description}
            </p>
          </div>
        </section>

        {/* ── SIGNATURE ITINERARIES (come first, right after the intro) ── */}
        {dest.itineraries && dest.itineraries.length > 0 && (
          <section className="bg-stone-50 py-10">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              {/* Same brush treatment as the landing page's "100 Countries" */}
              <h2 className="font-brush leading-none text-stone-900">
                <span className="text-6xl sm:text-8xl">{dest.itineraries.length}</span>{" "}
                <span className="text-3xl sm:text-5xl">Signature Itineraries</span>
              </h2>
              <p className="mt-2 font-merri text-lg italic text-stone-600 sm:text-xl">
                Well crafted based on your interest, time &amp; budget
              </p>
              <div className="mt-8">
                <ItineraryCarousel items={dest.itineraries} name={dest.name} />
              </div>
              <QuickEnquiryCTA name={dest.name} source="itinerary-enquiry" />
            </div>
          </section>
        )}

        {/* ── DESTINATIONS OFFERED ── */}
        <DestinationsOffered name={dest.name} items={dest.regions ?? []} />

        {/* ── 12 REASONS (carried over to every destination page, as on the original site) ── */}
        <TwelveReasons />

        {/* ── INDUSTRY PROVENANCE (As Seen / Top Rated / Heritage partners) ── */}
        <TrustBar />
      </main>

      <Footer />
    </>
  );
}
