const guarantees = [
  { n: 1, title: "Transparent Pricing", detail: "And right price guarantee" },
  { n: 2, title: "Price Protection", detail: "On fuel surcharge, taxes, currency fluctuations, tickets, visa…" },
  { n: 3, title: "Menu Design", detail: "Prior table reservation" },
  { n: 4, title: "Off the Beaten Path", detail: "Other than must-see places" },
  { n: 5, title: "Exclusive Discounts", detail: "On shopping, spa…" },
  { n: 6, title: "Room Upgrade", detail: "At select countries" },
  { n: 7, title: "Early Check-in", detail: "With breakfast, at select countries" },
];

export default function TourGuarantee() {
  return (
    <section id="tour-guarantee" className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-6 text-center lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-500">
          Our Tour Guarantee &amp; Enhancement
        </p>

        {/* 7 numbered guarantees — engraved-plaque style numerals */}
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-7 lg:gap-x-4">
          {guarantees.map((g) => (
            <div key={g.n} className="flex flex-col items-center">
              <span className="font-engravers text-5xl font-bold text-brand-500">{g.n}</span>
              <span className="mt-3 h-px w-8 bg-brand-200" />
              <p className="mt-3 text-sm font-bold text-stone-900">{g.title}</p>
              <p className="mt-1 text-xs leading-snug text-stone-500">{g.detail}</p>
            </div>
          ))}
        </div>

        {/* Transparent pricing guarantee, front and centre */}
        <div className="mx-auto mt-14 max-w-2xl rounded-3xl bg-gradient-to-br from-brand-50 to-amber-50 p-8 sm:p-10">
          <h3 className="font-serif text-2xl font-bold text-stone-900 sm:text-3xl">
            Our Transparent Pricing Guarantee
          </h3>
          <ul className="mt-6 space-y-4 text-left">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">
                ✓
              </span>
              <p className="text-stone-700">
                Find a <span className="font-semibold">lower price after you book</span> — exactly
                as per the package inclusions? We refund the difference.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">
                ✓
              </span>
              <p className="text-stone-700">
                Find a <span className="font-semibold">lower price before you book</span> — exactly
                as per the package inclusions? We charge you 5% less.
              </p>
            </li>
          </ul>
          <p className="mt-5 text-xs text-stone-500">
            Validation &amp; assessment will be done by us.
          </p>
        </div>
      </div>
    </section>
  );
}
