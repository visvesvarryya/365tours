import { destinations } from "@/lib/destinations";
import { indiaStates } from "@/lib/india-destinations";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const destinationLinks = destinations
    .map((d) => `- [${d.name}](${SITE_URL}/destination/${d.slug})`)
    .join("\n");

  const indiaLinks = indiaStates
    .map((s) => `- [${s.name}](${SITE_URL}/india/${s.slug})`)
    .join("\n");

  const body = `# 365 Tours

> Private & customised travel company based in Chennai, India. Plans bespoke tours across 7 continents, 100+ countries, and 1500+ destinations worldwide, plus custom domestic tours across every Indian state. "Explore. Experience. Evolve."

365 Tours designs private, fully customised itineraries rather than fixed group packages. The site is organised around international destination pages (one per country) and Indian state pages (one per state, with city-level highlights), alongside company and policy information.

## Company

- [About Us](${SITE_URL}/about-us): Who we are, our approach to private/customised travel, and why we differ from standard tour operators.
- [CSR](${SITE_URL}/csr): Corporate social responsibility initiatives.

## International Destinations

${destinationLinks}

## India

- [India Overview](${SITE_URL}/india): Domestic tours overview, linking to every state below.
${indiaLinks}

## Policies

- [Privacy Policy](${SITE_URL}/privacy-policy): How user data is collected and used.
- [Terms of Use](${SITE_URL}/terms-of-use): Terms governing use of the site and services.
- [Cookie Policy](${SITE_URL}/cookie-policy): Cookie usage disclosure.
- [Disclaimer](${SITE_URL}/disclaimer): Liability and content disclaimers.

## Optional

- [Sitemap](${SITE_URL}/sitemap.xml): Machine-readable, always-current list of every URL on the site.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
