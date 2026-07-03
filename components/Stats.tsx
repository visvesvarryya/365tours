import Icon from "@/components/Icon";

const stats = [
  { value: "1000+", label: "Hours of Research", sub: "per signature itinerary", icon: "search", color: "text-amber-600" },
  { value: "100", label: "Countries Covered", sub: "across 7 continents", icon: "globe", color: "text-brand-600" },
  { value: "1500+", label: "Destinations", sub: "handpicked & curated", icon: "pin", color: "text-orange-600" },
  { value: "4–30", label: "Day Itineraries", sub: "flexible duration", icon: "calendar", color: "text-rose-600" },
  { value: "24/7", label: "On-tour Support", sub: "always by your side", icon: "lifebuoy", color: "text-teal-600" },
];

export default function Stats() {
  return (
    <section className="bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50 py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group flex flex-col items-center rounded-3xl bg-white px-4 py-6 text-center shadow-sm ring-1 ring-orange-100 transition hover:-translate-y-1 hover:shadow-md"
            >
              <Icon
                name={stat.icon}
                className={`h-8 w-8 transition-transform duration-300 group-hover:scale-110 ${stat.color}`}
              />
              <p className="mt-1 font-serif text-4xl font-bold text-stone-900 sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-semibold text-stone-800">{stat.label}</p>
              <p className="mt-0.5 text-xs text-stone-400">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
