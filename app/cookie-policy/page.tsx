import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Cookie Policy | 365 Tours",
  description:
    "How 365 Tours uses cookies and local storage — essential storage, enquiry-form memory, and optional analytics cookies (used only with your consent).",
  alternates: { canonical: "/cookie-policy" },
  robots: { index: true, follow: true },
};

const updated = "3 July 2026";

export default function CookiePolicyPage() {
  return (
    <>
      <main className="bg-white pt-28">
        <div className="mx-auto max-w-3xl px-6 pb-20 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-500">Legal</p>
          <h1 className="mt-3 font-serif text-4xl font-bold text-stone-900 sm:text-5xl">
            Cookie Policy
          </h1>
          <p className="mt-3 text-sm text-stone-400">Last updated: {updated}</p>

          <div className="mt-10 space-y-8 text-stone-600 leading-relaxed">
            <section>
              <p>
                This policy explains how 365 Tours (a division of VRJ World Wide Holidays) uses
                cookies and similar browser storage on 365tours.in. We keep it short, plain, and
                up to date. By selecting <strong>Accept</strong> on our cookie banner you consent to
                the optional cookies described below; you can withdraw consent at any time (see
                &ldquo;Managing your choices&rdquo;).
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                1. What are cookies &amp; local storage?
              </h2>
              <p className="mt-3">
                Cookies are small text files stored by your browser. &ldquo;Local storage&rdquo; is a
                similar browser feature that keeps small pieces of data on your device. Both let a
                website remember information between visits.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                2. How we use them
              </h2>
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl border border-stone-100 bg-stone-50 p-5">
                  <p className="font-semibold text-stone-900">Essential (always on)</p>
                  <p className="mt-1 text-sm">
                    Required for the site to function and to remember your cookie choice. These do
                    not track you and cannot be switched off.
                  </p>
                </div>
                <div className="rounded-2xl border border-stone-100 bg-stone-50 p-5">
                  <p className="font-semibold text-stone-900">Enquiry-form memory (local storage)</p>
                  <p className="mt-1 text-sm">
                    When you submit an enquiry, we save your <em>name, email and phone</em> in your
                    own browser&apos;s local storage so the form is pre-filled next time. This data
                    stays on your device — it is not a tracking cookie. Clear it any time by clearing
                    your browser data.
                  </p>
                </div>
                <div className="rounded-2xl border border-stone-100 bg-stone-50 p-5">
                  <p className="font-semibold text-stone-900">Analytics &amp; advertising (optional)</p>
                  <p className="mt-1 text-sm">
                    Only if you <strong>Accept</strong>, we may use Google Analytics and Google Ads
                    cookies to measure traffic, understand which pages are useful, and show relevant
                    ads (remarketing). These load <em>only after</em> you consent. If you Decline,
                    they are not loaded.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                3. Managing your choices
              </h2>
              <p className="mt-3">
                You can withdraw or change consent at any time by clearing this site&apos;s data in
                your browser settings — the cookie banner will then reappear on your next visit and
                you can choose again. You can also block or delete cookies directly in your browser.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-stone-900">4. Contact</h2>
              <p className="mt-3">
                Questions about this policy? Email{" "}
                <a href="mailto:tours@365tours.in" className="font-semibold text-brand-600 hover:underline">
                  tours@365tours.in
                </a>{" "}
                or call{" "}
                <a href="tel:+919840148869" className="font-semibold text-brand-600 hover:underline">
                  +91 98401 48869
                </a>
                . 37 1st Street, Singaravelan Nagar, Maduravoyal, Chennai – 600 095, India.
              </p>
            </section>

            <div className="pt-4">
              <Link href="/" className="text-sm font-semibold text-brand-600 hover:underline">
                ← Back to homepage
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
