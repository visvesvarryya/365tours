import Link from "next/link";
import { indiaStates } from "@/lib/india-destinations";

export default function IndiaDestinationDirectory() {
  return (
    <section id="india-directory" className="scroll-mt-40 bg-gradient-to-b from-white via-amber-50 to-white pb-10 pt-28 sm:pt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="font-brush leading-none text-stone-900">
            <span className="text-7xl sm:text-8xl">500</span>{" "}
            <span className="text-5xl sm:text-7xl">Destinations</span>
          </h2>
          <p className="mt-2 font-merri text-lg italic text-stone-600 sm:text-xl">
            Across 28 States &amp; 8 Union Territories
          </p>
        </div>

        {/* State-by-state directory — one city per line, matching the original site's listing.
            Every state and city links to the same /india/[state] page, mirroring the source. */}
        <div className="columns-1 gap-8 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5">
          {indiaStates.map((state) => (
            <div key={state.name} className="mb-7 break-inside-avoid">
              <Link
                href={`/india/${state.slug}`}
                className="mb-1.5 inline-block border-b-2 border-stone-800 font-serif text-base font-bold text-stone-900 transition hover:text-brand-600"
              >
                {state.name}
              </Link>
              {state.cities.length > 0 && (
                <ul className="space-y-0.5">
                  {state.cities.map((city) => (
                    <li key={city}>
                      <Link
                        href={`/india/${state.slug}`}
                        className="text-sm text-stone-600 transition hover:text-brand-600 hover:underline"
                      >
                        {city}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
