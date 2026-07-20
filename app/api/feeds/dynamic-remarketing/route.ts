import { NextResponse } from "next/server";
import { destinations } from "@/lib/destinations";
import { indiaStateDetails } from "@/lib/india-states";
import { absoluteUrl } from "@/lib/site";

export const runtime = "nodejs";

// Google Ads dynamic remarketing (custom/generic vertical) business data feed.
// Column names match Google's expected attribute labels so they auto-map on
// upload — see Google Ads → Tools → Business data → Data feeds → Upload file.
const HEADERS = [
  "ID",
  "Item title",
  "Item subtitle",
  "Item description",
  "Item category",
  "Final URL",
  "Image URL",
  "Contextual keywords",
];

function csvField(value: string): string {
  const v = value.replace(/\r?\n/g, " ").trim();
  return /[",]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}

function row(fields: string[]): string {
  return fields.map(csvField).join(",");
}

export async function GET() {
  const lines = [row(HEADERS)];

  for (const dest of destinations) {
    if (!dest.heroImage) continue;
    lines.push(
      row([
        dest.slug,
        dest.name,
        dest.tagline,
        dest.description.slice(0, 150),
        dest.continent,
        absoluteUrl(`/destination/${dest.slug}`),
        absoluteUrl(dest.heroImage),
        dest.experiences.join(";"),
      ])
    );
  }

  for (const state of Object.values(indiaStateDetails)) {
    if (!state.heroImage) continue;
    lines.push(
      row([
        `india-${state.slug}`,
        state.name,
        state.tagline,
        `Private, customised ${state.name} tours — 365 Tours.`,
        "India",
        absoluteUrl(`/india/${state.slug}`),
        absoluteUrl(state.heroImage),
        "India",
      ])
    );
  }

  const csv = lines.join("\r\n") + "\r\n";

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="365tours-dynamic-remarketing-feed.csv"',
    },
  });
}
