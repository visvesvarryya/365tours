import LeadForm from "@/components/LeadForm";

export default function Contact() {
  return (
    <section id="contact" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left: info */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-500">
              Let's Plan Together
            </p>
            <h2 className="mt-4 font-serif text-4xl font-bold text-stone-900 sm:text-5xl text-balance">
              Your perfect journey starts with a conversation.
            </h2>
            <p className="mt-6 text-stone-500 leading-relaxed">
              Share your travel dates, group size, and dream destinations. Our travel designers will
              craft a custom itinerary and send it to you within 24–48 hours — no commitment
              required.
            </p>

            {/* Contact cards */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <a
                href="tel:+919840148869"
                className="group flex items-center gap-4 rounded-2xl border border-stone-200 bg-stone-50 p-5 transition hover:border-brand-300 hover:bg-brand-50"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-stone-400">Call us</p>
                  <p className="font-semibold text-stone-900 group-hover:text-brand-600 transition-colors">
                    +91 98401 48869
                  </p>
                </div>
              </a>

              <a
                href="mailto:tours@365tours.in"
                className="group flex items-center gap-4 rounded-2xl border border-stone-200 bg-stone-50 p-5 transition hover:border-brand-300 hover:bg-brand-50"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-stone-400">Email us</p>
                  <p className="font-semibold text-stone-900 group-hover:text-brand-600 transition-colors">
                    tours@365tours.in
                  </p>
                </div>
              </a>

              <a
                href="https://wa.me/919840148869"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-stone-200 bg-stone-50 p-5 transition hover:border-green-300 hover:bg-green-50 sm:col-span-2"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-stone-400">WhatsApp</p>
                  <p className="font-semibold text-stone-900 group-hover:text-green-600 transition-colors">
                    Chat with us on WhatsApp
                  </p>
                </div>
              </a>
            </div>

            {/* Office */}
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-stone-400">Office</p>
                <p className="text-sm font-medium text-stone-800">
                  37 1st Street, Singaravelan Nagar,
                  <br />
                  Maduravoyal, Chennai – 600 095, India
                </p>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="rounded-3xl bg-stone-950 p-8 shadow-2xl shadow-stone-950/20 sm:p-10">
            <h3 className="font-serif text-2xl font-bold text-white">Request a Custom Itinerary</h3>
            <p className="mt-2 text-sm text-stone-400">
              Free consultation · No commitment · Reply within 24 hrs
            </p>

            <div className="mt-8">
              <LeadForm variant="full" source="homepage-contact" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
