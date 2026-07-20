import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Disclaimer | 365 Tours",
  description: "Disclaimer covering website accuracy, professional advice, liability and booking information for VRJ World Wide Holidays / 365 Tours.",
  alternates: { canonical: "/disclaimer" },
  robots: { index: true, follow: true },
};

export default function DisclaimerPage() {
  return (
    <>
      <main>
        <div className="mx-auto max-w-3xl px-6 pb-20 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-500">Legal</p>
          <h1 className="mt-3 font-serif text-4xl font-bold text-stone-900 sm:text-5xl">
            Disclaimer
          </h1>

          <div className="mt-10 space-y-6 text-stone-600 leading-relaxed">
            <p>
              The information, software, products, and services included on this website may include
              inaccuracies or typographical errors, and VRJ World Wide Holidays / 365 Tours is
              entitled to rectify such inaccuracies or errors. We are not liable or responsible for
              any decision you may take based on such inaccurate information. Changes are
              periodically added to the information herein, and we may make improvements and/or
              changes to this website at any time.
            </p>
            <p>
              Advice received via this website should not be relied upon for personal, medical, legal
              or financial decisions — you should consult an appropriate professional for advice
              tailored to your situation. VRJ World Wide Holidays / 365 Tours and/or its respective
              suppliers make no representations about the suitability, reliability, timeliness or
              accuracy of the information, software, products, services or related graphics on this
              website for any purpose. All such material is provided &quot;as is&quot; without
              warranty of any kind, and we disclaim all warranties and conditions with regard to it,
              including implied warranties of merchantability, fitness for a particular purpose,
              title and non-infringement.
            </p>
            <p>
              In no event shall VRJ World Wide Holidays / 365 Tours or its parents, subsidiaries,
              affiliates, officers, directors, employees, agents or suppliers be liable for any
              direct, indirect, punitive, incidental, special or consequential damages whatsoever —
              including, without limitation, damages for loss of use, data or profits — arising out
              of or in any way connected with the use or performance of this website, the delay or
              inability to use it, the provision of or failure to provide services, or any
              information, software, products, services or related graphics obtained through it,
              whether based on contract, tort, strict liability or otherwise, even if advised of the
              possibility of such damages, including liability associated with any viruses that may
              infect a user&apos;s computer equipment. If you are dissatisfied with any portion of
              this website, or with these terms, your sole and exclusive remedy is to discontinue
              using it.
            </p>
            <p>
              Please ensure that all information you provide while booking is correct. For security
              reasons, and so we can advise you of any developments affecting your travel, we need to
              be able to contact you by telephone and email and to have your correct address on
              record. If any of these contact details are not correctly given, we reserve the right
              to cancel the transaction at your risk and cost.
            </p>
            <p>
              The right to access and transact on this website is reserved, as is the right to use
              any particular credit card on the site for payment purposes.
            </p>

            <section className="pt-4">
              <h2 className="font-serif text-2xl font-bold text-stone-900">Contact</h2>
              <p className="mt-3">
                Questions about this disclaimer? Email{" "}
                <a href="mailto:tours@365tours.in" className="font-semibold text-brand-600 hover:underline">
                  tours@365tours.in
                </a>{" "}
                or call{" "}
                <a href="tel:+919840148869" className="font-semibold text-brand-600 hover:underline">
                  +91 98401 48869
                </a>
                .
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
