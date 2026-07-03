import Link from "next/link";

export default function MakeNewMemories() {
  return (
    <section
      id="new-memories"
      className="relative overflow-hidden bg-stone-950 py-24"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(35,104,111,0.25),_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(35,104,111,0.15),_transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-400">
              A New Era of Travel
            </p>
            <h2 className="mt-4 font-serif text-4xl font-bold text-white sm:text-5xl leading-tight">
              Let's Make
              <br />
              <span className="text-brand-300">New Memories</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-stone-300">
              The world is waiting. Whether it's your first journey abroad or your fiftieth, 365
              Tours crafts every experience with the same care, passion, and attention to detail.
            </p>
            <p className="mt-4 leading-relaxed text-stone-400">
              We believe travel should feel personal, effortless, and transformative. That's why
              we build each itinerary from scratch — not from a template — with your unique story
              in mind.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="#contact"
                className="rounded-full bg-brand-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-brand-900/40 transition hover:bg-brand-400 active:scale-95"
              >
                Start Planning Today
              </Link>
              <a
                href="https://wa.me/919840148869"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-green-400">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Right: feature cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Flexible Booking",
                body: "Our itineraries adapt to your schedule. Change dates, swap stops, extend your stay — we make it work.",
                icon: "📅",
              },
              {
                title: "Transparent Pricing",
                body: "No hidden fees. You get a detailed cost breakdown before committing to anything.",
                icon: "💰",
              },
              {
                title: "Custom Travel Kit",
                body: "Before departure, we give you a personalised travel kit and pre-trip orientation briefing.",
                icon: "🎒",
              },
              {
                title: "Off-the-Beaten-Path",
                body: "We take you beyond the guidebook — secret viewpoints, local markets, and experiences money can't easily buy.",
                icon: "🗺️",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-3xl border border-white/5 bg-white/5 p-6"
              >
                <span className="text-2xl">{card.icon}</span>
                <h3 className="mt-3 font-semibold text-white">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-400">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
