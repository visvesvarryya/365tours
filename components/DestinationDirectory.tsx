import Link from "next/link";
import { destinations as allDestinations } from "@/lib/destinations";

const grouped: Record<string, { name: string; slug: string; flag?: string }[]> = {};
for (const dest of allDestinations) {
  const letter = dest.name[0].toUpperCase();
  if (!grouped[letter]) grouped[letter] = [];
  grouped[letter].push({ name: dest.name, slug: dest.slug, flag: dest.flag });
}

const letters = Object.keys(grouped).sort();

export default function DestinationDirectory() {
  return (
    <section id="all-destinations" className="bg-gradient-to-b from-white via-amber-50 to-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-500">
            100 Countries · 1500+ Destinations
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-stone-900 sm:text-4xl">
            A–Z Destination Directory
          </h2>
          <p className="mt-3 leading-relaxed text-stone-500">
            From Antarctica to Zimbabwe — don&apos;t see your dream destination? We likely cover it.
          </p>
        </div>

        {/* Quick-jump letter nav */}
        <div className="mb-8 flex flex-wrap justify-center gap-1.5">
          {letters.map((letter) => (
            <a
              key={letter}
              href={`#dest-${letter}`}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-stone-200 bg-white text-xs font-semibold text-stone-600 transition hover:border-brand-400 hover:bg-brand-50 hover:text-brand-600"
            >
              {letter}
            </a>
          ))}
        </div>

        {/* Compact columnar A-Z listing */}
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4">
          {letters.map((letter) => (
            <div key={letter} id={`dest-${letter}`} className="mb-5 break-inside-avoid">
              <div className="mb-1.5 flex items-center gap-2">
                <span className="font-serif text-lg font-bold text-brand-500">{letter}</span>
                <span className="h-px flex-1 bg-stone-200" />
              </div>
              <ul>
                {grouped[letter].map(({ name, slug, flag }) => (
                  <li key={slug}>
                    <Link
                      href={`/destination/${slug}`}
                      className="flex items-center gap-2 rounded-lg px-1.5 py-1 text-sm text-stone-700 transition hover:bg-brand-50 hover:text-brand-600"
                    >
                      {flag ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={flag}
                          alt=""
                          width={20}
                          height={20}
                          loading="lazy"
                          decoding="async"
                          className="h-5 w-5 rounded-full object-cover ring-1 ring-stone-200"
                        />
                      ) : (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-[9px] font-bold text-brand-600">
                          {name[0]}
                        </span>
                      )}
                      <span className="truncate">{name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-gradient-to-r from-brand-600 to-teal-600 p-8 text-center text-white sm:p-10">
          <h3 className="font-serif text-2xl font-bold sm:text-3xl">Don&apos;t see your destination?</h3>
          <p className="mx-auto mt-2 max-w-xl text-brand-50">
            We cover virtually every country on earth — reach out and we&apos;ll design a custom
            itinerary for wherever your heart is set on.
          </p>
          <Link
            href="#contact"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-brand-600 transition hover:bg-brand-50"
          >
            Request any destination →
          </Link>
        </div>
      </div>
    </section>
  );
}
