import Link from "next/link";
import Image from "next/image";

const company = [
  { label: "About Us", href: "/about-us" },
  { label: "Blog", href: "https://365tours.blogspot.com", external: true },
  { label: "Become a Partner", href: "#" },
  { label: "Careers", href: "#" },
  { label: "CSR", href: "/csr" },
];

const legal = [
  { label: "Terms of Use", href: "/terms-of-use" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  {
    label: "Office Address",
    href: "https://maps.google.com/?q=37+1st+Street,+Singaravelan+Nagar,+Maduravoyal,+Chennai+600095",
    external: true,
  },
  { label: "Sitemap", href: "/sitemap.xml" },
];

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-white">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr_1fr]">
          {/* Brand col */}
          <div>
            <span className="inline-flex rounded-lg bg-white p-2 shadow-sm">
              <Image
                src="/brand/365logo1.png"
                alt="365 Tours — Explore, Experience, Evolve"
                width={174}
                height={110}
                className="h-12 w-auto"
              />
            </span>

            <p className="mt-6 text-sm leading-relaxed text-stone-400">
              Designing unforgettable private journeys across 7 continents, 100 countries, and 1500+
              destinations since our founding in Chennai, India. Your world. Your way.
            </p>

            <div className="mt-8 space-y-2 text-sm text-stone-400">
              <p>37 1st Street, Singaravelan Nagar</p>
              <p>Maduravoyal, Chennai – 600 095, India</p>
              <a href="tel:+919840148869" className="block hover:text-brand-400 transition-colors">
                +91 98401 48869
              </a>
              <a href="mailto:tours@365tours.in" className="block hover:text-brand-400 transition-colors">
                tours@365tours.in
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-stone-300 mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    target={"external" in item && item.external ? "_blank" : undefined}
                    rel={"external" in item && item.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-stone-400 hover:text-brand-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-white/5 bg-white/5 p-5">
              <p className="text-xs font-semibold text-stone-300">Quick Contact</p>
              <a
                href="https://wa.me/919840148869"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp us
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-stone-300 mb-5">
              Legal
            </h4>
            <ul className="space-y-3">
              {legal.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    target={"external" in item && item.external ? "_blank" : undefined}
                    rel={"external" in item && item.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-stone-400 hover:text-brand-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-stone-500 sm:flex-row lg:px-10">
          <p>© {new Date().getFullYear()} 365 Tours. All rights reserved.</p>
          <p>
            Private &amp; Customised Tours · Chennai, India · Serving Travellers Worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
