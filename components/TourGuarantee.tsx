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
    <section id="tour-guarantee" className="bg-white pb-10 pt-20">
      <div className="mx-auto max-w-6xl px-6 text-center lg:px-10">
        <h2 className="font-serif text-3xl font-bold text-stone-900 sm:text-4xl">
          Our Tour Guarantee &amp; Enhancement
        </h2>

        {/* 7 numbered guarantees — engraved-plaque cards */}
        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-stone-200 bg-stone-200 sm:grid-cols-4 lg:grid-cols-7">
          {guarantees.map((g, i) => (
            <div
              key={g.n}
              className={`flex flex-col items-center bg-white px-4 py-8 ${
                i === guarantees.length - 1
                  ? "col-span-2 justify-self-center sm:col-span-1 sm:justify-self-auto"
                  : ""
              }`}
            >
              <span className="font-engravers text-[44px] leading-none text-black">
                {g.n}
              </span>
              <span className="mt-4 h-[2px] w-10 bg-[linear-gradient(to_right,#0054A5_0%,#0054A5_15%,#f79618_15%,#f79618_60%,#8BC53F_60%,#8BC53F_100%)]" />
              <p className="mt-4 text-sm font-bold text-stone-900">{g.title}</p>
              <p className="mt-1.5 text-xs leading-snug text-stone-500">{g.detail}</p>
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
