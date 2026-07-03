import Link from "next/link";
import Icon from "@/components/Icon";

// Ordered premium-first (reversed): our curated pick and top tiers lead the list.
const categories = [
  { label: "365 Pick", desc: "Our personally curated favourites — outstanding experience, exceptional value.", icon: "heart", grad: "from-red-500 to-rose-600" },
  { label: "Unusual", desc: "Treehouses, cave hotels, floating villas, desert camps — stays that are destinations themselves.", icon: "sparkles", grad: "from-teal-500 to-cyan-600" },
  { label: "Eco", desc: "Sustainable lodges & nature camps that tread lightly on the environment.", icon: "leaf", grad: "from-emerald-500 to-green-600" },
  { label: "Boutique", desc: "Intimate, design-forward properties with unique character and local flavour.", icon: "home", grad: "from-pink-500 to-fuchsia-600" },
  { label: "Heritage", desc: "Palaces, forts, havelis & colonial bungalows turned living history.", icon: "columns", grad: "from-orange-500 to-amber-600" },
  { label: "Luxury", desc: "Ultra-premium stays — private pools, butler service, pure indulgence.", icon: "diamond", grad: "from-violet-500 to-purple-600" },
  { label: "5 Star", desc: "Premium hotels with world-class facilities, fine dining and spa.", icon: "star", grad: "from-indigo-500 to-blue-600" },
  { label: "4 Star", desc: "Superior hotels with enhanced facilities and prime locations.", icon: "building", grad: "from-sky-500 to-cyan-600" },
  { label: "3 Star", desc: "Comfortable, well-located hotels with great value for money.", icon: "building", grad: "from-slate-500 to-stone-600" },
];

export default function AccommodationTypes() {
  return (
    <section id="accommodation" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-500">
            Accommodation
          </p>
          <h2 className="mt-3 font-serif text-4xl font-bold text-stone-900 sm:text-5xl">
            9 Categories to Suit Every Traveller
          </h2>
          <p className="mt-4 leading-relaxed text-stone-500">
            From our curated 365 Pick and heritage palaces to eco-lodges and unusual retreats —
            we select the finest option in every category.
          </p>
        </div>

        {/* Vibrant category grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <div
              key={cat.label}
              className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${cat.grad} p-6 text-white shadow-md transition hover:-translate-y-1 hover:shadow-xl`}
            >
              <Icon
                name={cat.icon}
                className="absolute -right-4 -top-4 h-28 w-28 text-white opacity-15 transition-transform duration-500 group-hover:scale-110"
              />
              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/25">
                  <Icon name={cat.icon} className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-4 font-serif text-2xl font-bold">{cat.label}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/90">{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-8 py-3.5 text-sm font-bold text-stone-900 shadow-md transition hover:from-amber-300 hover:to-orange-400"
          >
            Tell us your accommodation preference →
          </Link>
        </div>
      </div>
    </section>
  );
}
