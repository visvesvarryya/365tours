import Icon from "@/components/Icon";

const reasons = [
  { title: "1000+ Hours of Research", body: "Pre-tested routes, seamless & hassle-free.", icon: "search", tint: "bg-sky-400/20 text-sky-300" },
  { title: "Signature Itineraries", body: "Tailored 4–30 day journeys for you.", icon: "clipboard", tint: "bg-amber-400/20 text-amber-300" },
  { title: "More Regions", body: "9–50+ regions across every interest.", icon: "map", tint: "bg-emerald-400/20 text-emerald-300" },
  { title: "Choice of Accommodation", body: "9 categories — 3-star to Luxury.", icon: "building", tint: "bg-violet-400/20 text-violet-300" },
  { title: "Top Rated Hotels & Dining", body: "Vetted by TripAdvisor & Saveur.", icon: "star", tint: "bg-yellow-400/20 text-yellow-300" },
  { title: "Quality Vehicles", body: "Exclusive, fully-equipped private cars.", icon: "car", tint: "bg-rose-400/20 text-rose-300" },
  { title: "Gourmet Cuisine", body: "Veg & non-veg, local to international.", icon: "cake", tint: "bg-orange-400/20 text-orange-300" },
  { title: "Menu Design & Planning", body: "Dining planned to your preferences.", icon: "book", tint: "bg-teal-400/20 text-teal-300" },
  { title: "Unique Dining Experiences", body: "Vintage venues & award-winning chefs.", icon: "sparkles", tint: "bg-pink-400/20 text-pink-300" },
  { title: "Expert Guides", body: "Knowledgeable local guides, all yours.", icon: "compass", tint: "bg-cyan-400/20 text-cyan-300" },
  { title: "Reviews & Orientation", body: "Travel kit, orientation & 24/7 support.", icon: "shield", tint: "bg-lime-400/20 text-lime-300" },
  { title: "And Lots More…", body: "Transparent pricing & flexible plans.", icon: "plus", tint: "bg-fuchsia-400/20 text-fuchsia-300" },
];

export default function TwelveReasons() {
  return (
    <section id="twelve-reasons" className="bg-gradient-to-br from-orange-950 via-stone-900 to-teal-950 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
            Why Choose Us
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-white sm:text-4xl">
            12 Reasons to Travel with 365 Tours
          </h2>
        </div>

        {/* Compact reasons grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-white/25 hover:bg-white/10"
            >
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${r.tint}`}>
                <Icon name={r.icon} className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold leading-snug text-white">
                  <span className="mr-1 text-white/30">{String(i + 1).padStart(2, "0")}</span>
                  {r.title}
                </h3>
                <p className="mt-0.5 text-xs leading-snug text-stone-400">{r.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
