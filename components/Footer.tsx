import Link from "next/link";
import Image from "next/image";
import SocialLinks from "@/components/SocialLinks";

const links = [
  { label: "About us", href: "/about-us" },
  { label: "Terms of use", href: "/terms-of-use" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  {
    label: "Office Location",
    href: "https://maps.google.com/?q=37+1st+Street,+Singaravelan+Nagar,+Maduravoyal,+Chennai+600095",
    external: true,
  },
];

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-white">
      {/* Brand accent strip — the exact blue/orange/green split from 365tours.in's
          own .theme-line (#0054A5 0-15%, #f79618 15-60%, #8BC53F 60-100%). */}
      <div className="h-1 bg-[linear-gradient(to_right,#0054A5_0%,#0054A5_15%,#f79618_15%,#f79618_60%,#8BC53F_60%,#8BC53F_100%)]" />

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
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
              destinations.
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

            <SocialLinks className="mt-8" />
          </div>

          {/* Links */}
          <div className="lg:self-center">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-stone-300 mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {links.map((item) => (
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
