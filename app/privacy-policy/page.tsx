import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | 365 Tours",
  description: "How VRJ World Wide Holidays / 365 Tours collects, uses and protects the personal information you share with us.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

const updated = "13 July 2026";

export default function PrivacyPolicyPage() {
  return (
    <>
      <main className="bg-white pt-28">
        <div className="mx-auto max-w-3xl px-6 pb-20 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-500">Legal</p>
          <h1 className="mt-3 font-serif text-4xl font-bold text-stone-900 sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-stone-400">Effective: {updated}</p>

          <div className="mt-10 space-y-8 text-stone-600 leading-relaxed">
            <section>
              <p>
                This Privacy Policy (&quot;Policy&quot;) applies to the securing and processing of
                personal data by VRJ World Wide Holidays / 365 Tours (India) Ltd (&quot;VRJ World
                Wide Holidays / 365 Tours&quot;, &quot;we&quot;, &quot;us&quot; or &quot;our&quot;)
                in connection with personal data provided by any person (&quot;User&quot;,
                &quot;you&quot; or &quot;your&quot;) who has purchased, intends to purchase, or
                enquires about any product(s) or service(s) offered by us through any of our
                interface channels — website, mobile site and mobile app (collectively, &quot;Sales
                Channels&quot;).
              </p>
              <p className="mt-3">
                References to &quot;website&quot; mean our website(s), mobile site(s) and mobile
                app(s), including when you take part in surveys or provide us with feedback.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-stone-900">Purpose of This Policy</h2>
              <p className="mt-3">
                We respect your need to understand how and why information is being collected, used,
                disclosed, transferred and stored. This Policy sets out the way in which we process
                your information when you use our website or other digital platforms, in accordance
                with applicable data protection laws. Please read it together with any other notices
                we may provide on specific occasions when collecting or processing your personal
                data — this Policy supplements those notices and is not intended to override them.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-stone-900">Defining Controller of Personal Data</h2>
              <p className="mt-3">
                A &quot;Controller&quot; is a person or organisation who alone or jointly determines
                the purposes for which, and the manner in which, personal data is processed. This
                notice is issued on behalf of VRJ World Wide Holidays / 365 Tours as controller. A
                &quot;Processor&quot; is a natural or legal person, public authority, agency or other
                body which processes personal data on behalf of the Controller. As circumstances
                warrant, we may be Controller or Processor of your personal data.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-stone-900">Type of Personal Data We Collect</h2>
              <p className="mt-3">
                Personal data includes any information from which a person can be identified; it
                does not include anonymised data. You may be asked for personal data whenever you
                contact us directly or indirectly through a third party. We may also collect, use
                and share aggregated statistical or demographic data that does not, on its own,
                identify you — though if combined with personal data such that it could identify
                you, we treat the combined data as personal data under this Policy. We do not collect
                any special categories of personal data (race or ethnicity, religious or
                philosophical beliefs, sex life, sexual orientation, political opinions, trade union
                membership, health, genetic or biometric data), nor information about criminal
                convictions or offences.
              </p>
              <p className="mt-3">We group the personal data we handle as follows:</p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li><span className="font-semibold text-stone-800">Contact Data</span> — residential address, work address, email address and telephone numbers.</li>
                <li><span className="font-semibold text-stone-800">Identity Data</span> — first name, last name, username or similar identifier, title.</li>
                <li><span className="font-semibold text-stone-800">Website User Data</span> — usernames, passwords and other security-related information used in relation to our services.</li>
                <li><span className="font-semibold text-stone-800">Transaction Data</span> — transactional history, buying behaviour, and information about other traveller(s) for whom you made a booking through your account. You must confirm that each such traveller has agreed to have their information shared by you disclosed to us and to the relevant service provider(s).</li>
                <li><span className="font-semibold text-stone-800">Marketing and Communications Data</span> — your marketing and communication preferences, including when you receive and read marketing communications from us.</li>
                <li><span className="font-semibold text-stone-800">Public Domain or Third Party Data</span> — data available publicly or received from a third party, including linked social media channels (name, email, friend list, profile picture, or similar, as permitted by your account settings).</li>
                <li><span className="font-semibold text-stone-800">Profile Data</span> — information collected as you visit our site, including referral website, pages visited, actions taken, visit patterns, and form submissions.</li>
                <li><span className="font-semibold text-stone-800">Technical Data</span> — IP address, login data, browser type and version, time zone, location, plug-ins, operating system and platform, and other device technology.</li>
                <li><span className="font-semibold text-stone-800">Usage Data</span> — information about how you use our website.</li>
                <li><span className="font-semibold text-stone-800">Any Other Personal Data</span> — for visa-related services: passport copies, bank statements, application forms, photographs and any information required by the relevant embassy. For forex-related services: passport copies, A2 form, air tickets or travel authentication documents, and any other documents required to process the transaction.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-stone-900">Modes of Collecting Personal Data</h2>
              <p className="mt-3">
                The only way we obtain personal data is if you choose to give it to us, through:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li><span className="font-semibold text-stone-800">Direct interaction</span> — enquiries, quotation requests, reservations or purchases via our website or customer service team (email, letter, fax, phone or in person); registration, newsletter subscription, contests/surveys/feedback; engagement in online or offline events, promotions or third-party-hosted pages; and cookies on our website.</li>
                <li><span className="font-semibold text-stone-800">Cookies and other technologies</span> — technical data about your equipment, browsing actions and patterns, collected via cookies, server logs and similar technologies (see our <Link href="/cookie-policy" className="font-semibold text-brand-600 hover:underline">Cookie Policy</Link>).</li>
                <li><span className="font-semibold text-stone-800">Third parties or publicly available sources</span> — technical data from analytics providers such as Google.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-stone-900">Grounds for Processing of Data</h2>
              <p className="mt-3">We use your personal data in the following circumstances:</p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li><span className="font-semibold text-stone-800">Performance of a contract</span> — to perform, or take steps toward entering into, a contract with you.</li>
                <li><span className="font-semibold text-stone-800">Legal or regulatory obligation</span> — to comply with a legal or regulatory obligation.</li>
                <li><span className="font-semibold text-stone-800">Legitimate interests</span> — where necessary for our interests (e.g. monitoring website/system security), provided your fundamental rights do not override such interests.</li>
                <li><span className="font-semibold text-stone-800">Consent</span> — as the legal basis for sending direct marketing communications by email or text message.</li>
              </ul>
              <p className="mt-3">
                We do not process your personal data for activities where our interests are
                overridden by the impact on you, unless we have your consent or are otherwise
                required or permitted by law.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-stone-900">Use of Personal Data</h2>
              <p className="mt-3">
                We only process your personal data when the law allows us to. While you make a
                booking, we may use your contact data and any linked traveller list to help complete
                your booking. We may also use your personal information to: keep you informed of
                transaction status; send booking confirmations (SMS, WhatsApp or other messaging
                service); send updates or changes to your booking(s); allow customer service to
                contact you if necessary; confirm reservations with service providers; customise the
                content of our website, mobile site and app; request reviews of products or services;
                send verification messages; validate/authenticate your account and prevent misuse;
                contact you on your birthday/anniversary with a special offer; send important notices
                about our products, services or policy changes; send information about products and
                services from us and our affiliates; send payment reminders and travel vouchers; and
                send newsletters (you may unsubscribe at any time via the email you receive).
              </p>
              <p className="mt-3">
                We may share your personal data with third parties where necessary to process your
                booking or enquiry, to fulfil the service offering, or with companies that provide
                information processing, credit, order fulfilment, customer data management, customer
                service, or research/satisfaction surveys — all bound to protect your information. We
                may also use your data for marketing, research and reward/referral programs (which you
                may opt out of), and, from time to time, for promotions and contests.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-stone-900">Collection and Use of Non-Personal Data</h2>
              <p className="mt-3">
                Non-personal data can never be used to identify an individual. We may collect
                aggregated information about customer activity across our portals for research,
                analysis, and to improve and monitor our products and promotions — and may share it,
                in aggregated, non-personal form, with third parties to enhance customer experience or
                offerings.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-stone-900">Cookies and Other Technologies</h2>
              <p className="mt-3">
                We use cookies and other technologies to enhance your experience on our website. See
                our <Link href="/cookie-policy" className="font-semibold text-brand-600 hover:underline">Cookie Policy</Link> for details of our practices.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-stone-900">Links</h2>
              <p className="mt-3">
                Our website provides links to other sites for your convenience. When you click one of
                these links you leave our website; we are not responsible for third-party sites and
                recommend you review their privacy statements before providing any information.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-stone-900">With Whom Your Personal Data Is Shared</h2>
              <p className="mt-3">
                <span className="font-semibold text-stone-800">Group companies</span> — to improve
                personalisation and service efficiency, we may share your personal information with
                our affiliate or associate entities under controlled and secure circumstances. If our
                assets are acquired, or as part of a business restructuring, sale or transfer, customer
                information may be transferred accordingly.
              </p>
              <p className="mt-3">
                <span className="font-semibold text-stone-800">Service providers and suppliers</span> —
                your information is shared with end service providers (airlines, hotels, bus and cab
                operators, railways, and other suppliers) responsible for fulfilling your booking. By
                booking with us, you consent to this sharing. We do not authorise these providers to
                use your data beyond fulfilling their part of the service, and we do not sell or rent
                individual customer information to third parties except to business/alliance partners
                or vendors engaged to provide services or promotional benefits based on your booking
                history.
              </p>
              <p className="mt-3">
                <span className="font-semibold text-stone-800">Third-party vendors and business partners</span> —
                we may share filtered personal information with corporate affiliates or business
                partners offering products or services that enhance your travel experience (e.g.
                savings/EMI on travel, co-branded credit cards, travel insurance). Services availed
                through such partners are governed by the respective partner&apos;s privacy policy. We
                may also engage third parties for payment processing, data hosting and processing, or
                market research — bound by confidentiality agreements and applicable regulations.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-stone-900">Disclosure of Information</h2>
              <p className="mt-3">
                Subject to our professional obligations, we will disclose your personal data where
                required by a court of competent jurisdiction or governmental, taxation, regulatory or
                law enforcement authority; to our professional advisers (lawyers, bankers, auditors,
                accountants, insurers); and to service providers who provide IT and system
                administration services to us.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-stone-900">International Transfer</h2>
              <p className="mt-3">
                Given our multinational character, some affiliated companies and recipients may be
                located in countries (including the United States) that do not provide an equivalent
                level of data protection to your home country. We take steps to ensure such recipients
                act in accordance with applicable law and provide adequate protection for your personal
                data, including appropriate technical, organisational and contractual measures.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-stone-900">User Generated Content</h2>
              <p className="mt-3">
                We allow users to post reviews, blog articles, ratings, Q&amp;A and poll responses,
                optionally with images or video. These may be visible on our website and other travel
                platforms. Content must not be derogatory or contrary to law, public policy, morality,
                religion, caste, creed, colour, sex, race, culture, customs, decency, or third-party
                intellectual property. By uploading content, you consent to our use, reproduction and
                display of it in any manner we deem fit, without compensation, and you release us from
                related disputes, liabilities or claims.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-stone-900">Permissions Required for Using Our Mobile Applications</h2>
              <p className="mt-3">
                Where our mobile app requests device permissions, these are used solely to support app
                functionality — for example, location (to show the nearest branch), SMS (for OTPs and
                package details), phone (to call our contact centre directly), contacts (to enable
                sharing features), photo/media/files (to cache images and documents for faster use),
                and, on iOS, notifications (for deals, offers and travel updates), where you have opted
                in.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-stone-900">Information Protection and Security</h2>
              <p className="mt-3">
                We implement technical and organisational measures appropriate to the risk of
                processing, including pseudonymisation and encryption where relevant, safeguards for
                the ongoing confidentiality, integrity, availability and resilience of our systems,
                the ability to restore data access after an incident, and regular testing of our
                security measures. Staff with access to personal data are trained on their
                responsibilities. Our site uses SSL to protect information in transit. While no system
                is fool-proof, we continue to apply current security practices, and require any third
                parties processing your data on our behalf to implement equivalent protections.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-stone-900">Data Retention</h2>
              <p className="mt-3">
                We retain your personal data only as long as necessary for the purposes it was
                collected — including legal, regulatory, accounting or reporting requirements, or to
                establish or defend legal claims — in accordance with our document retention policy and
                applicable law. In some cases we may anonymise your data for research or statistical
                purposes, after which it may be used indefinitely without further notice to you.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-stone-900">Changes to the Policy</h2>
              <p className="mt-3">
                This notice is effective as of Monday, 13 July 2026. We reserve the right to update or
                change this Policy at any time; substantial updates will be communicated by email or a
                prominent notice on our website. Please check this page periodically — continued use of
                our website after changes are posted constitutes your acknowledgment and consent to the
                revised Policy.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-stone-900">Your Rights</h2>
              <p className="mt-3">
                Under applicable data protection laws (including, where relevant, the GDPR), you have
                the right to:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>be informed about how your personal data is used, in clear and plain language;</li>
                <li>access confirmation of, and information about, our processing of your personal data;</li>
                <li>have inaccurate or incomplete personal data rectified;</li>
                <li>request erasure of your personal data in certain circumstances (&quot;right to be forgotten&quot;);</li>
                <li>restrict processing of your personal data in certain circumstances;</li>
                <li>receive a copy of personal data you provided to us in a commonly used electronic format (data portability);</li>
                <li>object to processing based on legitimate interests, direct marketing, or research/statistical purposes; and</li>
                <li>not be subject to a decision based solely on automated processing that produces a legal or similarly significant effect.</li>
              </ul>
              <p className="mt-3">
                You may exercise any of these rights, or raise a question or concern about this Policy,
                by emailing{" "}
                <a href="mailto:tours@365tours.in" className="font-semibold text-brand-600 hover:underline">
                  tours@365tours.in
                </a>
                . There is no fee to access your personal data or exercise your other rights, unless
                your request is clearly unfounded, repetitive or excessive. We may ask you for
                information to confirm your identity before actioning a request, and we aim to respond
                within one calendar month — longer for particularly complex or numerous requests, in
                which case we will keep you updated.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-stone-900">Contact</h2>
              <p className="mt-3">
                Email{" "}
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
