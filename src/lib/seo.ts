import type { Metadata } from "next";
import { isPreview, site } from "@/config/site";
import type { Faq } from "@/content/faqs";

export const absoluteUrl = (path = "/") => (path === "/" ? site.url : `${site.url}${path}`);

/** Unique metadata per page, with canonical URL, Open Graph and X card. */
export function buildMetadata({
  title,
  description,
  path,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  return {
    // Titles that already name the pharmacy skip the "| Pittridge Pharmacy" suffix.
    title: title.includes(site.name) ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    robots: isPreview ? { index: false, follow: false } : noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      title,
      description,
      url,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/** Pharmacy (a LocalBusiness subtype). Only supplied facts are included. */
export function pharmacyJsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Pharmacy",
    "@id": `${site.url}/#pharmacy`,
    name: site.name,
    slogan: site.tagline,
    url: site.url,
    logo: `${site.url}/brand/pittridge-pharmacy-logo.svg`,
    image: `${site.url}/opengraph-image`,
    telephone: site.phone.e164,
    faxNumber: site.fax.e164,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    areaServed: [{ "@type": "City", name: "Pitt Meadows" }, { "@type": "AdministrativeArea", name: "British Columbia" }],
    employee: site.staff.map((s) => ({ "@type": "Person", name: s.name, jobTitle: s.role })),
  };
  if (site.hours) {
    data.openingHoursSpecification = site.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days.map((d) => `https://schema.org/${d}`),
      opens: h.opens,
      closes: h.closes,
    }));
  }
  if (site.geo) data.geo = { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng };
  return data;
}

export type Crumb = { name: string; path: string };

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

/** FAQPage schema. Only FAQs visible on the page AND fully confirmed are included. */
export function faqJsonLd(items: Faq[]) {
  const confirmed = items.filter((f) => !f.pending);
  if (confirmed.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: confirmed.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
