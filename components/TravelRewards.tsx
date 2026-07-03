import Link from "next/link";
import Icon from "@/components/Icon";

// 365 Tours' "Exclusive Benefits & Rewards" (from their Benefits & Rewards brochure).
const groups = [
  {
    heading: "During Your Tour",
    note: "Complimentary",
    accent: "text-emerald-600",
    chip: "bg-emerald-100 text-emerald-700",
    items: [
      { icon: "shield", title: "Travel Protection Plan", desc: "US $50,000 cover — baggage, passport, missed flights, trip cancellation, cashless hospitalisation & more." },
      { icon: "sparkles", title: "Exclusive Discounts", desc: "10–30% off spa treatments and select shopping centres." },
      { icon: "globe", title: "Complimentary Wi-Fi", desc: "In your room and while you travel." },
      { icon: "heart", title: "Welcome Gifts", desc: "Travel-essentials kit plus a traditional welcome & departure gift." },
    ],
  },
  {
    heading: "After Your Tour",
    note: "Complimentary",
    accent: "text-brand-600",
    chip: "bg-brand-100 text-brand-700",
    items: [
      { icon: "star", title: "Privilege Card — 1 Year", desc: "Discounts on F&B, beauty, health, fitness & entertainment across India." },
      { icon: "book", title: "Magazine Subscription", desc: "Outlook Traveller print edition for a full year." },
      { icon: "map", title: "2 Free Travel Guides", desc: "Any two of 30+ Outlook Traveller Getaways titles." },
      { icon: "diamond", title: "Cash / Gift Voucher", desc: "Worth ₹2,000–6,000 depending on your package." },
    ],
  },
  {
    heading: "Optional Add-ons",
    note: "At additional cost",
    accent: "text-amber-600",
    chip: "bg-amber-100 text-amber-700",
    items: [
      { icon: "clipboard", title: "Personalised Merchandise", desc: "Your message & photo on tees, mugs, stationery, watches & more." },
      { icon: "columns", title: "Bespoke Coffee-Table Book", desc: "A one-of-a-kind album of your trip by master album makers." },
      { icon: "sparkles", title: "Framed Art Prints", desc: "Prints from famous artists in exclusive custom-made frames." },
      { icon: "compass", title: "Events & Workshops", desc: "Photography, cookery, calligraphy, origami, fitness & more." },
    ],
  },
];

export default function TravelRewards() {
  return (
    <section id="rewards" className="bg-gradient-to-b from-white via-amber-50 to-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-600">
            Travel Rewards &amp; Benefits
          </p>
          <h2 className="mt-3 font-serif text-4xl font-bold text-stone-900 sm:text-5xl">
            Every Journey Comes With Perks
          </h2>
          <p className="mt-4 leading-relaxed text-stone-500">
            More than a holiday — every 365 Tours package includes exclusive benefits and rewards,
            before, during and long after your trip.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {groups.map((g) => (
            <div key={g.heading} className="rounded-3xl border border-stone-100 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-baseline justify-between">
                <h3 className={`font-serif text-xl font-bold ${g.accent}`}>{g.heading}</h3>
                <span className="text-[11px] font-semibold uppercase tracking-wide text-stone-400">
                  {g.note}
                </span>
              </div>
              <ul className="space-y-4">
                {g.items.map((it) => (
                  <li key={it.title} className="flex gap-3">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${g.chip}`}>
                      <Icon name={it.icon} className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-stone-900">{it.title}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-stone-500">{it.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-xs text-stone-400">
          A part of every tour&apos;s proceeds supports girl-child education, tree planting and
          vocational training. Benefits are per family/group/person as applicable; some apply to
          Indian passport holders residing in India and are subject to change.
        </p>

        <div className="mt-8 text-center">
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-8 py-3.5 text-sm font-bold text-stone-900 shadow-md transition hover:from-amber-300 hover:to-orange-400"
          >
            Ask us for the full rewards list →
          </Link>
        </div>
      </div>
    </section>
  );
}
