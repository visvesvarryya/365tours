import LeadForm from "@/components/LeadForm";

export default function QuickEnquiryCTA({ name, source }: { name: string; source: string }) {
  return (
    <div id="enquire" className="mt-12 scroll-mt-24 rounded-3xl bg-stone-950 p-8 shadow-xl sm:p-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-400">
            Quick Enquiry
          </p>
          <h3 className="mt-3 font-serif text-2xl font-bold text-white sm:text-3xl">
            Get the full {name} itinerary
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-stone-400">
            For a detailed day-wise itinerary, price, inclusions &amp; exclusions, please send us
            an enquiry. Every tour is fully private and customisable to your dates, pace and
            style.
          </p>
        </div>
        <LeadForm variant="full" destination={name} source={source} />
      </div>
    </div>
  );
}
