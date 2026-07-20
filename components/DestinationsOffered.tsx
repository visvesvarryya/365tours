import Icon from "@/components/Icon";

export default function DestinationsOffered({ name, items }: { name: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-500">
          Where You&apos;ll Go
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold text-stone-900">
          Destinations Offered in {name}
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item}
              className="flex items-center gap-2.5 rounded-2xl border border-brand-100 bg-brand-50/60 px-4 py-3 text-sm font-medium text-brand-800"
            >
              <Icon name="pin" className="h-4 w-4 shrink-0 text-brand-500" />
              <span className="truncate">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
