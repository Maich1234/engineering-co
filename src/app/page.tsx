import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { Plate } from "@/components/plate";
import {
  ButtonLink,
  Eyebrow,
  Provisional,
  Section,
} from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import {
  ServicesSection,
  ProjectsSection,
  ProcessSection,
  PrinciplesSection,
  IndustriesSection,
  InsightsSection,
  EnquirySection,
} from "@/components/sections";
import { company, fact } from "@/content/company";
import { credibilityPoints } from "@/content/approach";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Civil Engineering & Construction in Nairobi",
  description:
    "Daima Civil Engineering Works is a civil engineering and construction company in Nairobi. Civil works, building construction, structural works, renovation, site works and project management for developers, businesses, institutions and private clients.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <CredibilitySection />
      <ServicesSection />
      <ProjectsSection />
      <ProcessSection />
      <PrinciplesSection />
      <IndustriesSection />
      <InsightsSection />
      <EnquirySection index="09" />
    </>
  );
}

/* ----------------------------------------------------------------------- */

function CredibilitySection() {
  return (
    <Section id="about" tone="graphite" seam={false}>
      <div className="grid gap-x-12 gap-y-12 lg:grid-cols-12">
        {/* Editorial plate pair — a tall primary and an offset secondary,
            so the column reads as a composed sheet rather than one photo. */}
        <div className="lg:col-span-6">
          <div className="relative">
            <Plate
              image="frame-timber-formwork"
              ratio="4 / 5"
              sizes="(max-width: 1024px) 100vw, 45vw"
              plateNo="PLATE 01"
              caption="Placeholder — to be replaced with Daima's own site photography"
            />
            <div className="absolute -bottom-10 -right-6 hidden w-[38%] lg:block xl:-right-12">
              <Plate
                image="crew-inspection"
                ratio="4 / 3"
                sizes="18vw"
                plateNo="PLATE 02"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal>
            <Eyebrow index="01" label="Who we are" />
          </Reveal>

          <Reveal delay={60}>
            <h2 className="t-h2 mt-8">
              A Nairobi civil engineering and construction company.
            </h2>
          </Reveal>

          <Reveal delay={120} className="mt-7 space-y-5">
            <p className="t-lede opacity-78">
              Daima Civil Engineering Works provides civil engineering and
              construction services in Nairobi and the areas around it, working
              with property developers, businesses, institutions, contractors
              and private clients.
            </p>
            <p className="t-body opacity-60">
              The work covers what happens below ground and above it — site
              preparation, drainage and foundations through to structure,
              envelope and finishes. Some clients need one package. Others need
              the whole project managed from the first survey to the handover
              file.
            </p>
            <p className="t-body opacity-60">
              What does not change is the method: build to the drawing, check it
              before it is covered, and write down what was done.
            </p>
          </Reveal>

          <Reveal delay={180} className="mt-10">
            <ul className="border-t border-[var(--rule-dark)]">
              {credibilityPoints.map((point) => (
                <li
                  key={point.label}
                  className="grid grid-cols-[auto_1fr] gap-x-4 border-b border-[var(--rule-dark)] py-5"
                >
                  <span
                    aria-hidden
                    className="mt-[0.55rem] inline-block h-1.5 w-1.5 shrink-0 bg-copper"
                  />
                  <span>
                    <span className="t-label-sm block text-on-dark">{point.label}</span>
                    <span className="t-body mt-2 block opacity-58">{point.body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={240} className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <ButtonLink href="/about" variant="ghost-dark" small>
              More about Daima
            </ButtonLink>
            <span className="t-label-sm opacity-45">
              Serving {fact(company.serviceArea.base)} &amp; surrounding counties
            </span>
          </Reveal>

          <Reveal delay={300} className="mt-10 border-t border-[var(--rule-dark)] pt-6">
            <div className="flex flex-wrap items-start gap-x-4 gap-y-3">
              <Provisional>Awaiting verified detail</Provisional>
              <p className="t-label-sm max-w-sm opacity-45">
                Founding year, team size, registrations and project counts are
                deliberately absent until Daima confirms them. The layout holds
                space for each.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
