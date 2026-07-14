import Icon from "@/components/Icon";

const pillars = [
  { icon: "search", title: "1000+ Hours of Research", tint: "bg-sky-100 text-sky-700" },
  { icon: "users", title: "100% Private Tours", tint: "bg-violet-100 text-violet-700" },
  { icon: "compass", title: "Expert Local Guides", tint: "bg-emerald-100 text-emerald-700" },
  { icon: "building", title: "Top-Rated Stays & Dining", tint: "bg-rose-100 text-rose-700" },
  { icon: "car", title: "Premium Private Vehicles", tint: "bg-amber-100 text-amber-700" },
  { icon: "phone", title: "24/7 Dedicated Support", tint: "bg-teal-100 text-teal-700" },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="bg-gradient-to-br from-brand-50 via-white to-amber-50 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-500">
            Why 365 Tours
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-stone-900 sm:text-4xl text-balance">
            Travel should feel effortless. We make it so.
          </h2>
          <p className="mt-4 text-stone-600">
            End-to-end private journeys built on thousands of hours of on-ground research — every
            detail handled, so you simply arrive and enjoy.
          </p>
        </div>

        {/* Compact pillar strip */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="flex flex-col items-center gap-2 rounded-2xl border border-white bg-white/70 p-4 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${p.tint}`}>
                <Icon name={p.icon} className="h-6 w-6" />
              </span>
              <p className="text-sm font-semibold leading-snug text-stone-800">{p.title}</p>
            </div>
          ))}
        </div>

        {/* Real trust signal */}
        <div className="mt-10 flex justify-center">
          <a
            href="#reviews"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 shadow-sm ring-1 ring-stone-100 transition hover:shadow-md"
          >
            <span className="text-lg font-bold text-stone-900">4.9</span>
            <span className="text-amber-500">★★★★★</span>
            <span className="text-sm text-stone-500">· 250 Google reviews</span>
          </a>
        </div>
      </div>
    </section>
  );
}
