"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import { GoogleG, Stars } from "@/components/ReviewsGrid";

// Root-relative hrefs so the links work from every page (home *and* destination pages).
const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=365+tours+chennai#lrd=0x3a526645a176a84d:0xa79d678833fd18ff,1";
const RATING = "4.9";

const navLinks = [
  { label: "Blogs", href: "https://365tours.blogspot.com", external: true },
];

// Simple legal/info pages carry no hero, so the transparent-over-hero navbar
// treatment doesn't apply to them — they render with no header at all.
const NO_NAVBAR_PATHS = [
  "/about-us",
  "/terms-of-use",
  "/disclaimer",
  "/privacy-policy",
  "/cookie-policy",
  "/csr",
];

export default function Navbar() {
  const pathname = usePathname();
  const hideNavbar = pathname ? NO_NAVBAR_PATHS.includes(pathname) : false;
  // The India badge (links to /india) is the default everywhere; the reciprocal
  // "7 Continents" badge (links home) shows instead on the India hub itself and
  // on international destination pages, since those are already international
  // content — pointing back to /india there would be the wrong direction.
  const onIndiaPage = pathname === "/india" || pathname?.startsWith("/destination/");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      // Fold the header away when scrolling down; reveal it on the way up.
      setHidden(y > 140 && y > lastY);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on any click/tap outside it (or the hamburger itself).
  useEffect(() => {
    if (!menuOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, [menuOpen]);

  if (hideNavbar) return null;

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled
          ? "bg-white/95 shadow-sm border-b border-stone-100"
          : "bg-transparent"
      }`}
    >
      {/* Brand accent strip — the exact blue/orange/green split from 365tours.in's
          own .theme-line (#0054A5 0-15%, #f79618 15-60%, #8BC53F 60-100%). Sits at
          the very top of the viewport, above the nav content. */}
      <div className="h-1 bg-[linear-gradient(to_right,#0054A5_0%,#0054A5_15%,#f79618_15%,#f79618_60%,#8BC53F_60%,#8BC53F_100%)]" />

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        {/* Logo — eager but not preloaded, so it doesn't compete with the hero LCP.
            Matches the original 365tours.in header size (200px wide). */}
        <Logo height={126} />

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className={`text-lg font-semibold transition-colors hover:text-brand-400 ${
                scrolled ? "text-stone-700" : "text-white/90"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="5-star Google Reviews"
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 backdrop-blur-sm transition ${
              scrolled
                ? "border-stone-200 bg-white text-stone-900 hover:shadow-sm"
                : "border-white/30 bg-white/15 text-white hover:bg-white/25"
            }`}
          >
            <GoogleG size={15} />
            <span className="text-sm font-bold">{RATING}</span>
            <Stars count={5} />
          </a>
        </nav>

        {/* CTA */}
        <div className="hidden items-center gap-4 lg:flex">
          <div
            className={`mr-1 flex flex-col gap-1 rounded-2xl border px-4 py-2 leading-tight backdrop-blur-sm transition ${
              scrolled
                ? "border-stone-200 bg-white text-stone-900"
                : "border-white/30 bg-white/15 text-white"
            }`}
          >
            <a
              href="tel:+919840148869"
              className="flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-brand-400"
            >
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              +91 98401 48869
            </a>
            <a
              href="mailto:tours@365tours.in"
              className={`flex items-center gap-1.5 text-xs transition-colors hover:text-brand-400 ${
                scrolled ? "text-stone-500" : "text-white/75"
              }`}
            >
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              tours@365tours.in
            </a>
          </div>
          {onIndiaPage ? (
            <Link href="/" className="flex shrink-0 flex-col items-center gap-1">
              <span className="rounded-xl bg-white p-1.5 shadow-md ring-1 ring-black/5">
                <Image
                  src="/brand/7_countries.png"
                  alt="7 Continents · 100 Countries · 1500+ Destinations"
                  width={192}
                  height={133}
                  className="h-auto w-[150px] rounded-sm object-contain"
                />
              </span>
              <span className="text-[11px] font-semibold text-stone-900">
                International Holidays
              </span>
            </Link>
          ) : (
            <Link href="/india" className="flex shrink-0 flex-col items-center gap-1">
              <span className="rounded-xl bg-white p-1.5 shadow-md ring-1 ring-black/5">
                <Image
                  src="/brand/india_logo.jpg"
                  alt="28 States · 8 UT · 500+ Destinations across India"
                  width={180}
                  height={131}
                  className="h-auto w-[150px] rounded-sm object-contain"
                />
              </span>
              <span className="text-[11px] font-semibold text-stone-900">
                Indian Holidays
              </span>
            </Link>
          )}
        </div>

        {/* Mobile: always-visible reviews badge + call/email icons + hamburger —
            these used to be hidden inside the collapsed menu, so a visitor
            never saw them without tapping first. */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="5-star Google Reviews"
            className={`flex h-9 items-center gap-1 rounded-full px-2.5 backdrop-blur-sm transition ${
              scrolled ? "bg-stone-100 text-stone-900" : "bg-white/15 text-white"
            }`}
          >
            <GoogleG size={13} />
            <Stars count={5} size={10} />
          </a>
          <a
            href="tel:+919840148869"
            aria-label="Call +91 98401 48869"
            className={`flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-sm transition ${
              scrolled ? "bg-stone-100 text-stone-700" : "bg-white/15 text-white"
            }`}
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
          </a>
          <a
            href="mailto:tours@365tours.in"
            aria-label="Email tours@365tours.in"
            className={`flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-sm transition ${
              scrolled ? "bg-stone-100 text-stone-700" : "bg-white/15 text-white"
            }`}
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-full backdrop-blur-sm transition-colors ${
              scrolled ? "bg-stone-100 text-stone-800" : "bg-white/15 text-white"
            }`}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-6 bg-current transition-all duration-200 ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-current transition-all duration-200 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-current transition-all duration-200 ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-stone-100 bg-white px-6 py-6 shadow-xl lg:hidden">
          <nav className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                onClick={() => setMenuOpen(false)}
                className="text-base font-medium text-stone-700 hover:text-brand-500 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              aria-label="5-star Google Reviews"
              className="flex w-fit items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-stone-900"
            >
              <GoogleG size={15} />
              <span className="text-sm font-bold">{RATING}</span>
              <Stars count={5} />
            </a>
            <div className="mt-2 flex items-center gap-4 border-t border-stone-100 pt-4">
              <a href="tel:+919840148869" className="text-sm font-medium text-stone-700">
                +91 98401 48869
              </a>
              <a href="mailto:tours@365tours.in" className="text-sm text-stone-500">
                tours@365tours.in
              </a>
            </div>

            {/* International/India badge — only ever rendered in the desktop
                CTA before, so it never appeared anywhere on mobile. */}
            {onIndiaPage ? (
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="flex w-fit items-center gap-3 border-t border-stone-100 pt-4"
              >
                <Image
                  src="/brand/7_countries.png"
                  alt="7 Continents · 100 Countries · 1500+ Destinations"
                  width={192}
                  height={133}
                  className="h-auto w-[120px] object-contain"
                />
                <span className="text-sm font-semibold text-stone-700">International Holidays</span>
              </Link>
            ) : (
              <Link
                href="/india"
                onClick={() => setMenuOpen(false)}
                className="flex w-fit items-center gap-3 border-t border-stone-100 pt-4"
              >
                <Image
                  src="/brand/india_logo.jpg"
                  alt="28 States · 8 UT · 500+ Destinations across India"
                  width={180}
                  height={131}
                  className="h-auto w-[120px] object-contain"
                />
                <span className="text-sm font-semibold text-stone-700">Indian Holidays</span>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
