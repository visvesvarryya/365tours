import Link from "next/link";
import Image from "next/image";
import credits from "@/public/india/credits.json";

type Credit = {
  slug: string;
  name: string;
  desc: string;
  author: string;
  license: string;
  source: string;
};

const regions = credits as Credit[];

export default function IndianHolidays() {
  return (
    <section id="indian-holidays" className="bg-amber-50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
            Indian Holidays
          </p>
          <h2 className="mt-4 font-serif text-4xl font-bold text-stone-900 sm:text-5xl">
            Discover the Soul of India
          </h2>
          <p className="mt-4 leading-relaxed text-stone-600">
            India is not one destination — it&apos;s a thousand. From Himalayan snowscapes to tropical
            backwaters, from ancient temple cities to royal desert forts, 365 Tours covers every
            corner with private, expertly guided itineraries.
          </p>
        </div>

        {/* Region grid — authentic photography */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {regions.map((r) => (
            <Link
              href="#contact"
              key={r.slug}
              className="group relative block h-56 overflow-hidden rounded-2xl shadow-md transition hover:-translate-y-1 hover:shadow-xl"
            >
              <Image
                src={`/india/${r.slug}.jpg`}
                alt={`${r.name}, India — photo by ${r.author}`}
                title={`${r.name} — © ${r.author} (${r.license}), via Wikimedia Commons`}
                fill
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/85 via-stone-900/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-serif text-lg font-bold text-white drop-shadow">{r.name}</h3>
                <p className="mt-1 text-xs text-white/85">{r.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Photo attribution (CC BY / CC BY-SA compliance) */}
        <p className="mt-6 text-center text-[11px] text-stone-400">
          India photography courtesy of Wikimedia Commons contributors —{" "}
          {regions.map((r, i) => (
            <span key={r.slug}>
              <a
                href={r.source}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-stone-600 hover:underline"
              >
                {r.author}
              </a>
              {i < regions.length - 1 ? ", " : " "}
            </span>
          ))}
          (CC&nbsp;BY / CC&nbsp;BY-SA).
        </p>

        {/* 50+ regions note */}
        <div className="mt-10 rounded-3xl border border-amber-200 bg-white p-8 text-center shadow-sm">
          <p className="font-serif text-2xl font-bold text-stone-900">
            9–50+ Regions Across India
          </p>
          <p className="mt-3 text-stone-500">
            Wildlife · Culture · History · Nature · Geography · Adventure — all covered with
            curated private itineraries of 4 to 30 days.
          </p>
          <Link
            href="#contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-700 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-amber-800"
          >
            Plan Your India Tour →
          </Link>
        </div>
      </div>
    </section>
  );
}
