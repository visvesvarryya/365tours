"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/Logo";

// Root-relative hrefs so the links work from every page (home *and* destination pages).
const navLinks = [
  { label: "Blogs", href: "https://365tours.blogspot.com", external: true },
  { label: "Reviews", href: "/#reviews" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled
          ? "bg-white/95 shadow-sm border-b border-stone-100"
          : "bg-transparent"
      }`}
    >
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
        </nav>

        {/* CTA */}
        <div className="hidden items-center gap-4 lg:flex">
          <div className={`mr-3 flex flex-col items-end leading-tight ${scrolled ? "text-stone-600" : "text-white/85"}`}>
            <a
              href="tel:+919840148869"
              className={`text-base font-medium transition-colors ${scrolled ? "hover:text-brand-500" : "hover:text-white"}`}
            >
              +91 98401 48869
            </a>
            <a
              href="mailto:tours@365tours.in"
              className={`text-sm transition-colors ${scrolled ? "text-stone-500 hover:text-brand-500" : "text-white/70 hover:text-white"}`}
            >
              tours@365tours.in
            </a>
          </div>
          <Link href="/india" className="flex shrink-0 flex-col items-center gap-1">
            <Image
              src="/brand/india_logo.jpg"
              alt="28 States · 8 UT · 500+ Destinations across India"
              width={179}
              height={114}
              className="h-[65px] w-auto rounded object-contain shadow-sm"
            />
            <span className={`text-[11px] font-semibold ${scrolled ? "text-stone-600" : "text-white/85"}`}>
              Indian Holidays
            </span>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden transition-colors ${
            scrolled ? "text-stone-800" : "text-white"
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

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-stone-100 bg-white px-6 py-6 shadow-xl lg:hidden">
          <nav className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-base font-medium text-stone-700 hover:text-brand-500 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center gap-4 border-t border-stone-100 pt-4">
              <a href="tel:+919840148869" className="text-sm font-medium text-stone-700">
                +91 98401 48869
              </a>
              <a href="mailto:tours@365tours.in" className="text-sm text-stone-500">
                tours@365tours.in
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
