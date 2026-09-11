import { company, fact } from "@/content/company";
import { services } from "@/content/services";
import type { Project } from "@/content/projects";
import type { Insight } from "@/content/insights";
import { absoluteUrl, SITE_URL } from "./site";

/**
 * Structured data is built only from facts the site actually holds.
 * Provisional fields (phone, address, hours) are emitted because they are
 * needed for the shape to validate, but they carry the same placeholder
 * values shown on the page — so fixing the page fixes the markup.
 * No aggregateRating, no award, no foundingDate: none of it is verified.
 */
export function organizationJsonLd() {
  const hours = fact(company.contact.hours);
  return {
    "@context": "https://schema.org",
    "@type": ["GeneralContractor", "ProfessionalService"],
    "@id": `${SITE_URL}/#organization`,
    name: company.name,
    legalName: fact(company.legalName),
    description: company.oneLiner,
    url: SITE_URL,
    telephone: fact(company.contact.phone),
    email: fact(company.contact.email),
    image: absoluteUrl("/img/prj-aerial-frame.jpg"),
    address: {
      "@type": "PostalAddress",
      streetAddress: fact(company.contact.addressLines)[0],
      addressLocality: "Nairobi",
      addressCountry: "KE",
    },
    areaServed: fact(company.serviceArea.areas).map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    knowsAbout: services.map((s) => s.title),
    openingHoursSpecification: hours
      .filter((h) => h.time !== "Closed")
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        description: `${h.days}: ${h.time}`,
      })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Civil engineering and construction services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.summary,
          url: absoluteUrl(`/services/${s.slug}`),
        },
      })),
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: company.name,
    inLanguage: "en-KE",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceJsonLd(service: (typeof services)[number]) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    serviceType: service.title,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: fact(company.serviceArea.areas).map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
  };
}

/**
 * Placeholder projects are NOT published as CreativeWork structured data —
 * marking up invented records would put fiction into search results. Once a
 * record is real (`placeholder: false`) this returns markup for it.
 */
export function projectJsonLd(project: Project) {
  if (project.placeholder) return null;
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.scopeSummary,
    url: absoluteUrl(`/projects/${project.slug}`),
    creator: { "@id": `${SITE_URL}/#organization` },
    locationCreated: { "@type": "Place", name: project.location },
    image: absoluteUrl(`/img/${project.heroImage}.jpg`),
  };
}

export function insightJsonLd(insight: Insight) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title,
    description: insight.excerpt,
    datePublished: insight.date,
    dateModified: insight.date,
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: absoluteUrl(`/insights/${insight.slug}`),
    image: absoluteUrl(`/img/${insight.image}.jpg`),
  };
}

export function JsonLd({ data }: { data: object | null }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
