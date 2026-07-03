import Link from "next/link";
import Image from "next/image";
import { getDestinationBySlug, type Experience } from "@/lib/destinations";
import { featuredDestinationSlugs } from "@/lib/featured";

// Which destinations show here is controlled from lib/featured.ts — edit that list.
const featured = featuredDestinationSlugs
  .map((slug) => getDestinationBySlug(slug))
  .filter(Boolean)
  .map((d) => d!);

const tagColors: Record<Experience, string> = {
  Culture: "bg-violet-100 text-violet-800",
  Nature: "bg-emerald-100 text-emerald-800",
  Adventure: "bg-sky-100 text-sky-800",
  Wildlife: "bg-orange-100 text-orange-800",
  Food: "bg-rose-100 text-rose-800",
  Romance: "bg-pink-100 text-pink-800",
  History: "bg-amber-100 text-amber-800",
  Beach: "bg-cyan-100 text-cyan-800",
  Luxury: "bg-stone-100 text-stone-800",
};

export default function Destinations() {
  return (
    <section id="destinations" className="bg-gradient-to-b from-sky-50 via-white to-amber-50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-500">
            Curated Journeys
          </p>
          <h2 className="mt-4 font-serif text-4xl font-bold text-stone-900 sm:text-5xl">
            Popular Destinations
          </h2>
          <p className="mt-4 text-stone-500 leading-relaxed">
            From India's timeless heritage to Africa's wild heart — every itinerary is designed by
            specialists who&apos;ve walked the path.
          </p>
        </div>

        {/* Destination grid */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {featured.map((dest) => {
            const tag = dest.experiences[0];
            return (
              <Link
                key={dest.slug}
                href={`/destination/${dest.slug}`}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={dest.image}
                    alt={`${dest.name} — private tours with 365 Tours`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/10 to-transparent" />
                  {/* Tag badge */}
                  <span
                    className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${tagColors[tag]}`}
                  >
                    {tag}
                  </span>
                  {/* Flag + name on image */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2.5">
                    {dest.flag && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={dest.flag}
                        alt=""
                        width={28}
                        height={28}
                        decoding="async"
                        className="h-7 w-7 rounded-full object-cover ring-2 ring-white/80 shadow"
                      />
                    )}
                    <h3 className="font-serif text-2xl font-bold text-white drop-shadow">
                      {dest.name}
                    </h3>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm text-stone-500">{dest.tagline}</p>
                    <span className="shrink-0 rounded-full border border-stone-200 px-3 py-1 text-xs text-stone-500">
                      {dest.duration}
                    </span>
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-500 transition group-hover:gap-3">
                    Explore {dest.name}
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="mb-5 text-stone-500">
            These are just a sample — we cover{" "}
            <span className="font-semibold text-stone-800">100 countries worldwide</span>
          </p>
          <Link
            href="#all-destinations"
            className="inline-flex items-center gap-2 rounded-full border-2 border-brand-500 px-8 py-3.5 text-sm font-semibold text-brand-500 transition hover:bg-brand-500 hover:text-white"
          >
            Browse all destinations →
          </Link>
        </div>
      </div>
    </section>
  );
}
