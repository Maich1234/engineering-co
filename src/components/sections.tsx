import Link from "next/link";
import type { ImageKey } from "@/content/images";
import { company, fact } from "@/content/company";
import { services } from "@/content/services";
import { projects, featuredProjects } from "@/content/projects";
import { processSteps, principles, industries } from "@/content/approach";
import { publishedInsights } from "@/content/insights";
import { InsightCard } from "./insight-card";
import { Plate, Backdrop } from "./plate";
import { ProjectCard } from "./project-card";
import { ServiceBlock } from "./service-block";
import { EnquiryForm } from "./enquiry-form";
import {
  ButtonLink,
  Eyebrow,
  Section,
  SectionHead,
  Provisional,
  Tick,
} from "./primitives";
import { Reveal } from "./reveal";

/* ====================================================== SERVICES ======= */

export function ServicesSection({
  index = "02",
  heading = "What we do",
}: {
  index?: string;
  heading?: string;
}) {
  /* Spans alternate 7/5 and 5/7 so the grid reads as a composed elevation
     rather than six identical tiles. */
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
    <Section id="services" tone="graphite-800">
      <SectionHead
        index={index}
        label={heading}
        title={
          <>Six disciplines, one chain of responsibility.</>
        }
        lede="From the survey that sets the levels to the handover file that records what was built. Where a project needs only one of these, that is what we do; where it needs all six, they stay under one programme."
      />

      <div className="mt-14 grid gap-x-10 gap-y-16 md:mt-20 lg:grid-cols-12">
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
        <ButtonLink href="/services" variant="ghost-dark" small>
          All services
        </ButtonLink>
        <p className="t-label-sm max-w-md opacity-45">
          Service scope is editable content — remove anything Daima does not
          offer and the section, navigation and sitemap follow.
        </p>
      </Reveal>
    </Section>
  );
}

/* ====================================================== PROJECTS ======= */

export function ProjectsSection() {
  const [lead, ...rest] = featuredProjects();
  const secondary = rest.slice(0, 4);

  return (
    <Section id="projects" tone="graphite">
      <SectionHead
        index="03"
        label="Our projects"
        title={
          <>Work, recorded the way it was built.</>
        }
        lede="Each project is documented with its location, scope, engineering approach and outcome — so a prospective client can judge the work rather than the adjectives."
      />

      <Reveal className="mt-10 flex flex-wrap items-center gap-4 border border-[var(--rule-dark)] bg-graphite-800/60 px-5 py-4">
        <Provisional>Placeholder portfolio</Provisional>
        <p className="t-label-sm max-w-2xl opacity-55">
          These are sample records showing the structure of a project entry.
          They are not Daima projects. Replace them with real work — the grid,
          filters and project pages are already built for it.
        </p>
      </Reveal>

      {lead ? (
        <div className="mt-14 md:mt-20">
          <Link href={`/projects/${lead.slug}`} className="group block">
            <Plate
              image={lead.heroImage}
              ratio="21 / 9"
              sizes="100vw"
              zoom
              className="w-full"
            />
            <div className="mt-6 grid gap-x-10 gap-y-6 border-t border-[var(--rule-dark)] pt-6 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="t-label-sm text-copper-light">Featured</span>
                  <span className="t-label-sm opacity-45">{lead.category}</span>
                  {lead.placeholder ? <Provisional>Placeholder record</Provisional> : null}
                </div>
                <h3 className="t-h2 mt-4 transition-colors duration-400 group-hover:text-copper-light">
                  {lead.title}
                </h3>
              </div>
              <div className="lg:col-span-4 lg:pt-1">
                <p className="t-body opacity-64">{lead.scopeSummary}</p>
              </div>
              <div className="lg:col-span-2">
                <dl className="t-label-sm space-y-2.5 opacity-55">
                  <div className="flex justify-between gap-3">
                    <dt>Location</dt>
                    <dd className="text-right">{lead.county}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt>Status</dt>
                    <dd className="text-right">{lead.status}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </Link>
        </div>
      ) : null}

      <div className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {secondary.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            ratio="3 / 4"
            sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 24vw"
            index={`P-${String(i + 2).padStart(2, "0")}`}
            delay={i * 70}
          />
        ))}
      </div>

      <Reveal className="mt-16 border-t border-[var(--rule-dark)] pt-8">
        <ButtonLink href="/projects" variant="ghost-dark" small>
          View all {projects.length} projects
        </ButtonLink>
      </Reveal>
    </Section>
  );
}

/* ======================================================= PROCESS ======= */

export function ProcessSection({ compact = false }: { compact?: boolean }) {
  return (
    <Section id="approach" tone="graphite-800">
      <div className="blueprint" aria-hidden />

      <div className="relative grid gap-x-12 gap-y-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
            <Reveal>
              <Eyebrow index="04" label="How we work" />
            </Reveal>
            <Reveal delay={60}>
              <h2 className="t-h2 mt-8">
                A method, not a quotation.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="t-lede mt-6 max-w-sm opacity-68">
                Construction goes wrong in predictable places. This sequence
                exists to catch each of them while they are still cheap to fix.
              </p>
            </Reveal>

            {!compact ? (
              <Reveal delay={180} className="mt-10 hidden lg:block">
                <Plate
                  image="blueprint-section"
                  ratio="4 / 3"
                  sizes="30vw"
                  still
                  caption="Placeholder — replace with a Daima drawing extract"
                />
              </Reveal>
            ) : null}
          </div>
        </div>

        <ol className="lg:col-span-8 lg:col-start-5">
          {processSteps.map((step, i) => (
            <Reveal key={step.index} delay={i * 60} as="li" className="block">
              <div className="relative grid grid-cols-[3.5rem_1fr] gap-x-5 border-t border-[var(--rule-dark)] py-8 md:grid-cols-[5rem_1fr] md:gap-x-8 md:py-10">
                <Tick className="-left-1 -top-1 text-copper" />
                <span className="t-num text-[1.75rem] leading-none text-copper-light md:text-[2.25rem]">
                  {step.index}
                </span>
                <div>
                  <h3 className="t-h3">{step.title}</h3>
                  <p className="t-lede mt-4 max-w-xl opacity-72">{step.summary}</p>
                  <p className="t-body mt-4 max-w-xl opacity-52">{step.detail}</p>
                  <p className="t-label-sm mt-6 flex items-start gap-2.5 text-copper-light">
                    <span aria-hidden className="mt-[5px] inline-block h-px w-5 bg-current" />
                    <span className="max-w-md tracking-[0.12em]">{step.output}</span>
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
          <li className="border-t border-[var(--rule-dark)]" />
        </ol>
      </div>
    </Section>
  );
}

/* ==================================================== PRINCIPLES ======= */

export function PrinciplesSection() {
  return (
    <Section id="quality" tone="paper">
      <SectionHead
        index="05"
        label="Built around quality"
        title={
          <>What we hold ourselves to, in the absence of anyone watching.</>
        }
        lede="These are commitments about conduct and method. They are not standards, certifications or accreditations — where Daima holds those, they belong on this site with the paperwork behind them."
      />

      <div className="mt-14 grid gap-x-10 gap-y-0 md:mt-18 md:grid-cols-2 lg:grid-cols-3">
        {principles.map((principle, i) => (
          <Reveal
            key={principle.index}
            delay={(i % 3) * 70}
            className="border-t border-[var(--rule-light)] py-8 md:py-10"
          >
            <div className="flex items-baseline gap-4">
              <span className="t-num text-[0.8125rem] tracking-[0.18em] text-copper-ink">
                {principle.index}
              </span>
              <h3 className="t-h4">{principle.title}</h3>
            </div>
            <p className="t-body mt-4 max-w-sm text-ink-2">{principle.body}</p>
          </Reveal>
        ))}
      </div>
      <div className="border-t border-[var(--rule-light)]" />
    </Section>
  );
}

/* ==================================================== INDUSTRIES ======= */

export function IndustriesSection() {
  return (
    <Section id="industries" tone="paper-100">
      <SectionHead
        index="06"
        label="Industries"
        title="Where the work applies."
        lede="The discipline is the same across sectors; the constraints are not. What changes is the programme, the access, and who is still using the building while you work."
      />

      <div className="mt-12 md:mt-16">
        {industries.map((industry, i) => (
          <Reveal key={industry.name} delay={i * 50}>
            <Link
              href={`/projects?category=${encodeURIComponent(industry.category)}`}
              className="group grid grid-cols-[2.5rem_1fr] items-baseline gap-x-5 border-t border-[var(--rule-light)] py-7 transition-colors duration-400 hover:bg-paper-50 md:grid-cols-[4rem_1fr_auto] md:gap-x-10"
            >
              <span className="t-num text-[0.75rem] tracking-[0.18em] text-copper-ink">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="md:grid md:grid-cols-12 md:items-baseline md:gap-10">
                <span className="t-h3 block md:col-span-4">{industry.name}</span>
                <span className="t-body mt-3 block max-w-xl text-ink-2 md:col-span-8 md:mt-0">
                  {industry.description}
                </span>
              </span>
              <span
                aria-hidden
                className="hidden text-copper-ink opacity-0 transition-all duration-400 group-hover:translate-x-1 group-hover:opacity-100 md:block"
              >
                &#8594;
              </span>
            </Link>
          </Reveal>
        ))}
        <div className="border-t border-[var(--rule-light)]" />
      </div>
    </Section>
  );
}

/* ====================================================== ENQUIRY ======== */

export function EnquirySection({
  index = "07",
  tone = "graphite",
}: {
  index?: string;
  tone?: "graphite" | "graphite-800";
}) {
  const hours = fact(company.contact.hours);

  return (
    <Section id="enquiry" tone={tone}>
      <div className="grid gap-x-14 gap-y-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow index={index} label="Start a project" />
          </Reveal>
          <Reveal delay={60}>
            <h2 className="t-h1 mt-8">Have a project in mind?</h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="t-lede mt-6 max-w-md opacity-72">
              Tell us what you are planning and our team can help you determine
              the next step.
            </p>
          </Reveal>

          <Reveal delay={180} className="mt-11 space-y-7">
            <div className="border-t border-[var(--rule-dark)] pt-5">
              <span className="t-label-sm text-on-dark-3">Call</span>
              <a
                href={`tel:${fact(company.contact.phoneHref)}`}
                className="t-num mt-2 block text-[1.25rem] transition-colors hover:text-copper-light"
              >
                {fact(company.contact.phone)}
              </a>
              <Provisional className="mt-2.5">Placeholder number</Provisional>
            </div>

            <div className="border-t border-[var(--rule-dark)] pt-5">
              <span className="t-label-sm text-on-dark-3">Email</span>
              <a
                href={`mailto:${fact(company.contact.email)}`}
                className="mt-2 block break-all text-[1.0625rem] transition-colors hover:text-copper-light"
              >
                {fact(company.contact.email)}
              </a>
            </div>

            <div className="border-t border-[var(--rule-dark)] pt-5">
              <span className="t-label-sm text-on-dark-3">Office hours</span>
              <ul className="mt-3 space-y-2">
                {hours.map((h) => (
                  <li key={h.days} className="flex justify-between gap-4 text-[0.9375rem]">
                    <span className="opacity-64">{h.days}</span>
                    <span className="t-num opacity-80">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={100} className="lg:col-span-7">
          <EnquiryForm />
        </Reveal>
      </div>
    </Section>
  );
}

/* ====================================================== CTA BAND ======= */

export function CtaBand({
  eyebrow = "Next step",
  title = "Start a project with Daima.",
  body = "Send the drawings if you have them, or just describe what you are planning. We will tell you what it needs and whether we are the right people to build it.",
  image = "crane-overcast" as ImageKey,
  primary = { href: "/contact#enquiry", label: "Request a Consultation" },
  secondary = { href: "/projects", label: "Explore Our Work" },
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  image?: ImageKey;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="relative isolate overflow-hidden border-t border-[var(--rule-dark)] bg-graphite-950">
      <div className="absolute inset-0 -z-10">
        <Backdrop image={image} sizes="100vw" />
        <div className="absolute inset-0 bg-graphite-950/78" />
        <div className="absolute inset-0 bg-gradient-to-r from-graphite-950 via-graphite-950/72 to-transparent" />
      </div>
      <div className="field" aria-hidden />

      <div className="shell relative py-20 md:py-28">
        <Reveal>
          <Eyebrow label={eyebrow} rule={false} />
        </Reveal>
        <Reveal delay={60}>
          <h2 className="t-h1 mt-7 max-w-3xl">{title}</h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="t-lede mt-6 max-w-xl opacity-72">{body}</p>
        </Reveal>
        <Reveal delay={180} className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href={primary.href} variant="primary">
            {primary.label}
          </ButtonLink>
          <ButtonLink href={secondary.href} variant="ghost-dark">
            {secondary.label}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

/* ====================================================== INSIGHTS ======= */

export function InsightsSection({ index = "08" }: { index?: string }) {
  const posts = publishedInsights().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <Section id="insights" tone="graphite-800">
      <SectionHead
        index={index}
        label="Insights"
        title="Notes from the work."
        lede="Practical writing on construction and engineering — what to prepare before you build, how to look after a building once it is up, and what we are working on."
        action={
          <ButtonLink href="/insights" variant="ghost-dark" small>
            All insights
          </ButtonLink>
        }
      />

      <div className="mt-14 grid gap-x-10 gap-y-14 md:mt-18 md:grid-cols-3">
        {posts.map((insight, i) => (
          <InsightCard key={insight.slug} insight={insight} delay={i * 80} />
        ))}
      </div>
    </Section>
  );
}
