import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { Plate } from "@/components/plate";
import { ProjectCard } from "@/components/project-card";
import { CtaBand } from "@/components/sections";
import {
  ButtonLink,
  Section,
  SectionHead,
  Provisional,
  Eyebrow,
} from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { EnquiryForm } from "@/components/enquiry-form";
import { JsonLd, breadcrumbJsonLd, serviceJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { services, getService, serviceSlugs } from "@/content/services";
import { projects } from "@/content/projects";
import { company, fact } from "@/content/company";

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: `/services/${service.slug}`,
    image: `/img/${service.image}.jpg`,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);
  const related = projects.filter((p) => p.servicesUsed.includes(service.slug)).slice(0, 3);
  const areas = fact(company.serviceArea.areas);

  return (
    <>
      <JsonLd data={serviceJsonLd(service)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ])}
      />

      <PageHeader
        eyebrow={`Service ${service.index}`}
        title={service.title}
        lede={service.summary}
        image={service.image}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.navTitle },
        ]}
        meta={[
          { label: "Ref", value: `DCW-S-${service.index}` },
          { label: "Base", value: fact(company.serviceArea.base) },
        ]}
      />

      {/* Intro + scope */}
      <Section tone="graphite" seam={false}>
        <div className="grid gap-x-12 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow label="Overview" />
            </Reveal>
            <Reveal delay={60}>
              <p className="t-lede mt-8 opacity-82">{service.intro}</p>
            </Reveal>
            <Reveal delay={120} className="mt-9">
              <ButtonLink href="/contact#enquiry" variant="primary" small>
                Request a Quote
              </ButtonLink>
            </Reveal>
            <Reveal delay={180} className="mt-10 border-t border-[var(--rule-dark)] pt-6">
              <div className="flex flex-wrap items-start gap-x-4 gap-y-3">
                <Provisional>Confirm scope</Provisional>
                <p className="t-label-sm max-w-xs opacity-45">
                  The lists opposite describe the discipline. Trim them to what
                  Daima actually offers before publishing.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <h2 className="t-label text-on-dark-3">What the work covers</h2>
            </Reveal>
            <ul className="mt-6">
              {service.scope.map((item, i) => (
                <Reveal
                  key={item}
                  delay={i * 45}
                  as="li"
                  className="grid grid-cols-[2.25rem_1fr] items-baseline gap-x-3 border-t border-[var(--rule-dark)] py-4"
                >
                  <span className="t-num text-[0.6875rem] tracking-[0.16em] text-copper-light">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="t-body">{item}</span>
                </Reveal>
              ))}
              <li className="border-t border-[var(--rule-dark)]" />
            </ul>

            <Reveal className="mt-12">
              <h2 className="t-label text-on-dark-3">What you receive</h2>
            </Reveal>
            <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
              {service.deliverables.map((item, i) => (
                <Reveal
                  key={item}
                  delay={i * 45}
                  as="li"
                  className="grid grid-cols-[auto_1fr] gap-x-3.5 border-t border-[var(--rule-dark)] py-4"
                >
                  <span aria-hidden className="mt-[0.6rem] inline-block h-1 w-1 shrink-0 bg-copper" />
                  <span className="t-body opacity-72">{item}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Detail plate */}
      <Section tone="graphite-800" tight>
        <Plate
          image={service.detailImage}
          ratio="21 / 9"
          sizes="100vw"
          plateNo={`PLATE S-${service.index}`}
          caption="Placeholder photography — to be replaced with Daima's own record of this work"
        />
      </Section>

      {/* Where we do it — local SEO surface that is also useful */}
      <Section tone="paper">
        <SectionHead
          label="Where we work"
          title={`${service.title} in Nairobi and the surrounding counties.`}
          lede={
            <>
              {service.navTitle} is carried out across {areas.slice(0, -1).join(", ")} and{" "}
              {areas[areas.length - 1]}. Travel beyond that is possible depending on
              the size of the package — ask.
            </>
          }
          align="stack"
        />
        <Reveal className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-[var(--rule-light)] pt-7">
          {fact(company.serviceArea.localities).map((area) => (
            <span key={area} className="t-label-sm text-ink-3">
              {area}
            </span>
          ))}
        </Reveal>
      </Section>

      {/* Related projects */}
      {related.length > 0 ? (
        <Section tone="graphite">
          <SectionHead
            label="Related work"
            title="Projects that drew on this."
            action={
              <ButtonLink href="/projects" variant="ghost-dark" small>
                All projects
              </ButtonLink>
            }
            lede="Sample records for now — replace them with real Daima projects and the links follow automatically."
          />
          <div className="mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((project, i) => (
              <ProjectCard key={project.slug} project={project} delay={i * 80} />
            ))}
          </div>
        </Section>
      ) : null}

      {/* Other services */}
      <Section tone="graphite-800" tight>
        <Reveal>
          <h2 className="t-label text-on-dark-3">Other services</h2>
        </Reveal>
        <div className="mt-6 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-5">
          {others.map((other, i) => (
            <Reveal key={other.slug} delay={i * 45}>
              <Link
                href={`/services/${other.slug}`}
                className="group flex items-baseline gap-3 border-t border-[var(--rule-dark)] py-5"
              >
                <span className="t-num text-[0.6875rem] tracking-[0.16em] text-copper-light">
                  {other.index}
                </span>
                <span className="t-h4 transition-colors group-hover:text-copper-light">
                  {other.navTitle}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Enquiry */}
      <Section id="enquiry" tone="graphite">
        <div className="grid gap-x-14 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow label="Start a project" />
            </Reveal>
            <Reveal delay={60}>
              <h2 className="t-h2 mt-7">Have a project in mind?</h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="t-lede mt-6 opacity-72">
                Tell us what you are planning and our team can help you determine
                the next step.
              </p>
            </Reveal>
          </div>
          <Reveal delay={100} className="lg:col-span-7 lg:col-start-6">
            <EnquiryForm />
          </Reveal>
        </div>
      </Section>

      <CtaBand
        eyebrow="Next step"
        title="Start a project with Daima."
        image="frame-timber-formwork"
        secondary={{ href: "/services", label: "All services" }}
      />
    </>
  );
}
