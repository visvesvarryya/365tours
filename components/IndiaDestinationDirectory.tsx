import Link from "next/link";
import { indiaStates } from "@/lib/india-destinations";

const sortedStates = [...indiaStates].sort((a, b) => a.name.localeCompare(b.name));

export default function IndiaDestinationDirectory() {
  return (
    <section id="india-directory" className="scroll-mt-40 bg-gradient-to-b from-white via-amber-50 to-white py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="-mt-3 font-brush leading-none text-stone-900 sm:-mt-5">
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
          {sortedStates.map((state) => (
            <div key={state.name} className="mb-7">
              <Link
                href={`/india/${state.slug}`}
                className="mb-1.5 inline-block border-b-2 border-stone-800 font-serif text-base font-bold text-stone-900 transition hover:text-brand-600 break-after-avoid"
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
