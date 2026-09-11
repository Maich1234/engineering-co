import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Section, SectionHead, Provisional, Eyebrow } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { pageMetadata } from "@/lib/seo";
import { company, provisionalCompanyFields } from "@/content/company";
import { services } from "@/content/services";
import { projects } from "@/content/projects";
import { insights } from "@/content/insights";
import { placeholderImages, imageCredits } from "@/content/images";

export const metadata: Metadata = pageMetadata({
  title: "Content notes",
  description:
    "An inventory of every placeholder on this concept build — company details, project records, imagery and draft articles — and what has to be verified before it goes live.",
  path: "/content-notes",
  noIndex: true,
});

/**
 * This page is generated from the content files themselves, so it cannot
 * drift out of date: anything still flagged as provisional appears here
 * automatically, and disappears the moment it is filled in and verified.
 */
export default function ContentNotesPage() {
  const companyFields = provisionalCompanyFields();
  const placeholderProjects = projects.filter((p) => p.placeholder);
  const unconfirmedServices = services.filter((s) => !s.confirmed);
  const draftInsights = insights.filter((i) => i.draft);
  const stockImages = placeholderImages();
  const credits = imageCredits();

  const emptySpecs = placeholderProjects.reduce(
    (total, p) => total + p.specs.filter((s) => s.value === null).length,
    0,
  );

  const summary = [
    { label: "Company fields", value: companyFields.length, file: "src/content/company.ts" },
    { label: "Service records", value: unconfirmedServices.length, file: "src/content/services.ts" },
    { label: "Project records", value: placeholderProjects.length, file: "src/content/projects.ts" },
    { label: "Empty data slots", value: emptySpecs, file: "src/content/projects.ts" },
    { label: "Draft articles", value: draftInsights.length, file: "src/content/insights.ts" },
    { label: "Stock photographs", value: stockImages.length, file: "src/content/images.ts" },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Handover"
        title="What on this site is real, and what is scaffolding."
        lede="This is a concept build for Wabunifu Labs. The design, structure, copy method and code are finished work. The facts are not — and rather than hide that, every unverified item is listed here, generated straight from the content files."
        image="plans-flatlay"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Content notes" }]}
        meta={[
          {
            label: "Open items",
            value: String(summary.reduce((a, b) => a + b.value, 0)).padStart(3, "0"),
          },
          { label: "Indexed", value: "No" },
        ]}
      />

      {/* Summary */}
      <Section tone="graphite" seam={false}>
        <Reveal>
          <Eyebrow index="01" label="Inventory" />
        </Reveal>
        <div className="mt-10 grid gap-x-10 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
          {summary.map((item, i) => (
            <Reveal
              key={item.label}
              delay={(i % 3) * 60}
              className="border-t border-[var(--rule-dark)] py-6"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="t-label-sm text-on-dark-3">{item.label}</span>
                <span className="t-num text-[1.5rem] text-copper-light">
                  {String(item.value).padStart(2, "0")}
                </span>
              </div>
              <span className="t-label-sm mt-2.5 block opacity-40">{item.file}</span>
            </Reveal>
          ))}
        </div>
        <div className="border-t border-[var(--rule-dark)]" />

        <Reveal className="mt-10 border border-[var(--rule-dark)] bg-graphite-800/60 p-6 md:p-8">
          <h2 className="t-h4">What is deliberately absent</h2>
          <ul className="t-body mt-5 grid max-w-4xl gap-x-10 gap-y-3 opacity-64 sm:grid-cols-2">
            {[
              "Years in business, projects completed, team size or any other statistic",
              "NCA class, EBK/IEK membership, ISO or any other certification",
              "Client names, logos or testimonials",
              "Awards, accreditations or memberships",
              "Photographs of Daima's staff, plant or completed work",
              "Specific past project values, areas or durations",
            ].map((item) => (
              <li key={item} className="grid grid-cols-[auto_1fr] gap-x-3">
                <span aria-hidden className="mt-[0.6rem] inline-block h-1 w-1 shrink-0 bg-copper" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="t-body mt-6 max-w-2xl opacity-52">
            None of these were invented to make the company look larger. Each has
            a place in the design that fills in cleanly once the real
            information exists.
          </p>
        </Reveal>
      </Section>

      {/* Company fields */}
      <Section tone="graphite-800">
        <SectionHead
          index="02"
          label="Company details"
          title="Fields awaiting verification."
          lede={`Every one of these is held in ${"src/content/company.ts"} with a note explaining what it needs. Changing a field's status to "verified" removes its marker across the site and drops it from this list.`}
        />
        <div className="mt-12">
          {companyFields.map((field, i) => (
            <Reveal
              key={field.path}
              delay={i * 35}
              className="grid gap-x-10 gap-y-2 border-t border-[var(--rule-dark)] py-5 md:grid-cols-12"
            >
              <span className="t-num text-[0.8125rem] text-copper-light md:col-span-4">
                {field.path}
              </span>
              <span className="t-body opacity-62 md:col-span-8">{field.note}</span>
            </Reveal>
          ))}
          <div className="border-t border-[var(--rule-dark)]" />
        </div>
      </Section>

      {/* Projects */}
      <Section tone="paper">
        <SectionHead
          index="03"
          label="Project records"
          title="Placeholder portfolio."
          lede="Sample records showing the shape of a project entry. Titles are project types rather than invented job names; locations are real places used only to show how the grid reads; every figure is an empty slot."
        />
        <div className="mt-12">
          {placeholderProjects.map((project, i) => (
            <Reveal
              key={project.slug}
              delay={i * 35}
              className="grid gap-x-8 gap-y-2 border-t border-[var(--rule-light)] py-5 md:grid-cols-12"
            >
              <Link
                href={`/projects/${project.slug}`}
                className="t-h4 transition-colors hover:text-copper-ink md:col-span-5"
              >
                {project.title}
              </Link>
              <span className="t-label-sm text-ink-3 md:col-span-3">{project.location}</span>
              <span className="t-label-sm text-ink-3 md:col-span-2">{project.category}</span>
              <span className="t-label-sm text-copper-ink md:col-span-2 md:text-right">
                {project.specs.filter((s) => s.value === null).length} empty slots
              </span>
            </Reveal>
          ))}
          <div className="border-t border-[var(--rule-light)]" />
        </div>
        <Reveal className="mt-8">
          <Provisional tone="light">Excluded from search indexing</Provisional>
          <p className="t-body mt-4 max-w-2xl text-ink-2">
            Placeholder project pages carry a <span className="t-num">noindex</span>{" "}
            directive and are left out of structured data, so nothing fictional
            can reach a search result. Setting{" "}
            <span className="t-num">placeholder: false</span> on a record turns
            both back on.
          </p>
        </Reveal>
      </Section>

      {/* Services + insights */}
      <Section tone="graphite">
        <div className="grid gap-x-12 gap-y-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <Eyebrow index="04" label="Services" />
            </Reveal>
            <Reveal delay={60}>
              <p className="t-body mt-7 opacity-64">
                Each service describes what the discipline covers, not what Daima
                has already delivered. Walk the list with the company and delete
                anything they do not offer — removing an entry removes it from
                the homepage, the services index, the footer, the enquiry form
                and the sitemap.
              </p>
            </Reveal>
            <div className="mt-8">
              {unconfirmedServices.map((service, i) => (
                <Reveal
                  key={service.slug}
                  delay={i * 35}
                  className="flex items-baseline justify-between gap-4 border-t border-[var(--rule-dark)] py-3.5"
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className="t-body transition-colors hover:text-copper-light"
                  >
                    {service.title}
                  </Link>
                  <span className="t-label-sm text-on-dark-3">
                    {service.scope.length} scope items
                  </span>
                </Reveal>
              ))}
              <div className="border-t border-[var(--rule-dark)]" />
            </div>
          </div>

          <div>
            <Reveal>
              <Eyebrow index="05" label="Insights" />
            </Reveal>
            <Reveal delay={60}>
              <p className="t-body mt-7 opacity-64">
                Draft articles are general construction guidance containing no
                claims about Daima. They are hidden from production builds and
                excluded from indexing until reviewed.
              </p>
            </Reveal>
            <div className="mt-8">
              {draftInsights.map((insight, i) => (
                <Reveal
                  key={insight.slug}
                  delay={i * 35}
                  className="flex items-baseline justify-between gap-4 border-t border-[var(--rule-dark)] py-3.5"
                >
                  <Link
                    href={`/insights/${insight.slug}`}
                    className="t-body transition-colors hover:text-copper-light"
                  >
                    {insight.title}
                  </Link>
                  <span className="t-label-sm text-on-dark-3">{insight.category}</span>
                </Reveal>
              ))}
              <div className="border-t border-[var(--rule-dark)]" />
            </div>
          </div>
        </div>
      </Section>

      {/* Imagery */}
      <Section tone="graphite-800">
        <SectionHead
          index="06"
          label="Photography"
          title={`${stockImages.length} stock photographs standing in.`}
          lede="None of it shows Daima. Replacing a photograph is a matter of dropping a file into /public/img under the same key — every layout, aspect ratio and loading colour follows automatically."
        />

        <Reveal className="mt-12 border border-[var(--rule-dark)] p-6 md:p-8">
          <h3 className="t-label text-on-dark-3">Replacement priority</h3>
          <ol className="mt-6 grid gap-x-10 gap-y-4 md:grid-cols-3">
            {[
              {
                n: "01",
                t: "Project photography",
                d: "Progress and completion photographs of real Daima work. This is the single highest-value asset the site can carry — it is the evidence everything else only describes.",
              },
              {
                n: "02",
                t: "Team and site",
                d: "The people a client would deal with, photographed on site. Stock portraits are recognisable as stock and cost more credibility than they add.",
              },
              {
                n: "03",
                t: "Hero and service imagery",
                d: "The large banded photographs. Lower priority — these read as atmosphere rather than evidence, so stock does less harm here.",
              },
            ].map((item) => (
              <li key={item.n}>
                <span className="t-num text-[0.75rem] tracking-[0.18em] text-copper-light">
                  {item.n}
                </span>
                <h4 className="t-h4 mt-2.5">{item.t}</h4>
                <p className="t-body mt-2.5 opacity-58">{item.d}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal className="mt-12">
          <h3 className="t-label text-on-dark-3">Photograph credits</h3>
          <p className="t-body mt-4 max-w-2xl opacity-55">
            Placeholder photography is licensed under the Unsplash licence.
            Credits are listed here for the duration of the concept build and can
            be removed once Daima&rsquo;s own photography replaces it.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2.5">
            {credits.map((credit) => (
              <li key={credit.name} className="t-label-sm opacity-42">
                <a
                  href={credit.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="transition-opacity hover:opacity-100"
                >
                  {credit.name}
                </a>
                <span className="t-num ml-1.5 opacity-60">({credit.count})</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* Before launch */}
      <Section tone="paper">
        <SectionHead
          index="07"
          label="Before launch"
          title="Technical items still to wire up."
          align="stack"
        />
        <div className="mt-10 grid gap-x-10 gap-y-0 md:grid-cols-2">
          {[
            {
              t: "Enquiry delivery",
              d: "The form at /api/enquiry validates and returns a reference but sends nothing. Connect it to an inbox or CRM, store the uploaded drawing somewhere durable, and add spam protection and a rate limit.",
            },
            {
              t: "Domain and canonicals",
              d: `Canonical URLs, Open Graph tags and the sitemap all read from NEXT_PUBLIC_SITE_URL. Set it to the live domain — it currently falls back to a placeholder.`,
            },
            {
              t: "Google Business Profile",
              d: "The strongest local ranking factor for a Nairobi contractor is a verified Business Profile with the same name, address and phone number as this site. Set it up before worrying about anything else in search.",
            },
            {
              t: "Map pin",
              d: "The contact map is centred on Nairobi generally. Set company.contact.mapQuery to the exact address or a Google place ID.",
            },
            {
              t: "Analytics and Search Console",
              d: "Neither is installed. Add whichever analytics the company will actually look at, and verify the domain in Google Search Console to see what people search before they arrive.",
            },
            {
              t: "Legal pages",
              d: "A privacy notice is required once the enquiry form collects and stores personal data. There is no template for it here because it has to describe what Daima actually does with the data.",
            },
          ].map((item, i) => (
            <Reveal
              key={item.t}
              delay={(i % 2) * 60}
              className="border-t border-[var(--rule-light)] py-6"
            >
              <h3 className="t-h4">{item.t}</h3>
              <p className="t-body mt-3 max-w-lg text-ink-2">{item.d}</p>
            </Reveal>
          ))}
        </div>
        <div className="border-t border-[var(--rule-light)]" />

        <Reveal className="mt-10">
          <p className="t-body max-w-2xl text-ink-2">
            Concept and build by Wabunifu Labs for {company.name}.{" "}
            <Link href="/" className="underline underline-offset-4 hover:text-copper-ink">
              Back to the site
            </Link>
            .
          </p>
        </Reveal>
      </Section>
    </>
  );
}
