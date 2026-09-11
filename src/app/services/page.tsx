import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ServiceBlock } from "@/components/service-block";
import { CtaBand, ProcessSection } from "@/components/sections";
import { Section, SectionHead, ButtonLink } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { services } from "@/content/services";
import { industries } from "@/content/approach";
import { company, fact } from "@/content/company";

export const metadata: Metadata = pageMetadata({
  title: "Civil Engineering & Construction Services",
  description:
    "Civil engineering, building construction, structural works, renovation and maintenance, site works and construction project management in Nairobi and the surrounding counties.",
  path: "/services",
  image: "/img/svc-structural.jpg",
});

export default function ServicesPage() {
  const spans = [
    "lg:col-span-7",
    "lg:col-span-5",
    "lg:col-span-5",
    "lg:col-span-7",
    "lg:col-span-7",
    "lg:col-span-5",
  ];
  const ratios = ["16 / 10", "4 / 3", "4 / 3", "16 / 10", "16 / 10", "4 / 3"];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />

      <PageHeader
        eyebrow="Services"
        title="What we build, and what we take responsibility for."
        lede="Six packages of work that can be taken on individually or run together under one programme. Each page sets out what the work covers and what you receive at the end of it."
        image="svc-structural"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        meta={[
          { label: "Disciplines", value: String(services.length).padStart(2, "0") },
          { label: "Sectors", value: String(industries.length).padStart(2, "0") },
          { label: "Base", value: fact(company.serviceArea.base) },
        ]}
      />

      <Section tone="graphite" seam={false}>
        <div className="grid gap-x-10 gap-y-16 lg:grid-cols-12">
          {services.map((service, i) => (
            <div key={service.slug} className={spans[i % spans.length]}>
              <ServiceBlock
                service={service}
                ratio={ratios[i % ratios.length]}
                sizes="(max-width: 900px) 100vw, (max-width: 1400px) 50vw, 46vw"
                delay={(i % 2) * 90}
              />
            </div>
          ))}
        </div>

        <Reveal className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-[var(--rule-dark)] pt-8">
          <ButtonLink href="/contact#enquiry" variant="primary" small>
            Discuss a project
          </ButtonLink>
          <p className="t-label-sm max-w-lg opacity-45">
            Not sure which of these your project needs? Describe it and we will
            tell you — including if the answer is that you need a designer
            before you need a contractor.
          </p>
        </Reveal>
      </Section>

      <Section tone="paper">
        <SectionHead
          label="Scope"
          title="One contractor, or one package."
          lede="Some clients hand over the whole project. Others have a main contractor already and need a single package built properly. Both work — what matters is that the boundary of responsibility is written down before anyone starts."
          align="stack"
        />
        <div className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-3">
          {[
            {
              title: "Single package",
              body: "One defined element — a substructure, a drainage system, a slab — priced, built and handed over with its records.",
            },
            {
              title: "Full construction",
              body: "The whole build under one contract, from setting out through structure and finishes to a closed snag list.",
            },
            {
              title: "Managed delivery",
              body: "We run the programme, procurement and trades while specialist packages sit with the firms best placed to do them.",
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 70} className="border-t border-[var(--rule-light)] pt-6">
              <h3 className="t-h4">{item.title}</h3>
              <p className="t-body mt-3.5 text-ink-2">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <ProcessSection compact />
      <CtaBand
        title="Tell us what the project needs."
        image="crew-drawings"
        secondary={{ href: "/projects", label: "See project records" }}
      />
    </>
  );
}
