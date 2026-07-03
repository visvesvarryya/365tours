const stats = [
  { value: "1000+", label: "Hours of Research", sub: "per signature itinerary" },
  { value: "100", label: "Countries Covered", sub: "across 7 continents" },
  { value: "1500+", label: "Destinations", sub: "handpicked & curated" },
  { value: "4–30", label: "Day Itineraries", sub: "flexible duration" },
  { value: "24/7", label: "On-tour Support", sub: "dedicated operations" },
];

export default function Stats() {
  return (
    <section className="bg-gradient-to-r from-teal-700 via-brand-600 to-orange-600 py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-0 divide-x-0 lg:divide-x lg:divide-white/20">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center px-6 ${
                i !== stats.length - 1
                  ? "border-b border-white/20 pb-10 lg:border-b-0 lg:pb-0"
                  : ""
              }`}
            >
              <p className="font-serif text-4xl font-bold text-white">{stat.value}</p>
              <p className="mt-2 text-sm font-semibold text-white/90">{stat.label}</p>
              <p className="mt-1 text-xs text-white/80">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
