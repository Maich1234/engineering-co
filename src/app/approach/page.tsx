import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Plate } from "@/components/plate";
import { CtaBand, ProcessSection, PrinciplesSection } from "@/components/sections";
import { Section, SectionHead, Eyebrow } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { processSteps } from "@/content/approach";

export const metadata: Metadata = pageMetadata({
  title: "How We Work",
  description:
    "The five stages of a Daima project — consultation, site assessment, planning and engineering, construction and execution, handover — and what a client receives at the end of each.",
  path: "/approach",
  image: "/img/blueprint-section.jpg",
});

export default function ApproachPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Approach", path: "/approach" },
        ])}
      />

      <PageHeader
        eyebrow="How we work"
        title="Five stages, and what you get at the end of each one."
        lede="Construction goes wrong in predictable places. This sequence exists to catch each of them while they are still cheap to fix — and to make sure you can see where the project stands without having to stand on the site."
        image="srv-total-station"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Approach" }]}
        meta={[
          { label: "Stages", value: String(processSteps.length).padStart(2, "0") },
          { label: "Ref", value: "DCW-M-01" },
        ]}
      />

      {/* Why a method matters */}
      <Section tone="graphite" seam={false}>
        <div className="grid gap-x-12 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow index="01" label="Why this matters" />
            </Reveal>
            <Reveal delay={60}>
              <h2 className="t-h2 mt-8">Most problems are decided before anyone lifts a tool.</h2>
            </Reveal>
          </div>
          <div className="space-y-5 lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="t-lede opacity-82">
                The expensive failures on a construction project are rarely
                failures of craft. They are decisions that were never made,
                materials that were never ordered, a level that was never
                checked, or two trades arriving at the same place on the same
                morning.
              </p>
            </Reveal>
            <Reveal delay={70}>
              <p className="t-body opacity-62">
                All of those are preventable, and all of them are prevented in
                the same way: by doing the thinking before the work, writing it
                down, and checking against it as you go. That is what a method
                is for. It is not paperwork for its own sake — it is the reason a
                project finishes when it said it would.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <p className="t-body opacity-62">
                The five stages below are how that works in practice, and what
                you should expect to receive at the end of each of them.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <ProcessSection />

      {/* Hold points */}
      <Section tone="paper">
        <SectionHead
          index="05"
          label="Hold points"
          title="The moments work stops to be checked."
          lede="A hold point is a stage where the next operation cannot start until the previous one has been inspected. They exist because these are the things that become impossible to verify once they are covered."
          align="stack"
        />
        <div className="mt-12 grid gap-x-10 gap-y-0 md:grid-cols-2">
          {[
            {
              stage: "Before blinding",
              check: "Excavation depth and bearing material inspected at formation level.",
            },
            {
              stage: "Before every pour",
              check: "Reinforcement against the bar bending schedule; cover blocks; formwork alignment and props.",
            },
            {
              stage: "Before backfill",
              check: "Buried services, drainage falls and bedding photographed and levelled.",
            },
            {
              stage: "Before a slab closes",
              check: "Conduits, sleeves and penetrations set out and fixed against the coordinated drawings.",
            },
            {
              stage: "Before finishes",
              check: "Structure dimensionally checked; the building weathertight above the work.",
            },
            {
              stage: "Before handover",
              check: "Snag list agreed in writing and closed out; records, test results and warranties compiled.",
            },
          ].map((item, i) => (
            <Reveal
              key={item.stage}
              delay={(i % 2) * 60}
              className="grid grid-cols-[auto_1fr] gap-x-4 border-t border-[var(--rule-light)] py-6"
            >
              <span aria-hidden className="mt-[0.55rem] inline-block h-1.5 w-1.5 shrink-0 bg-copper" />
              <span>
                <span className="t-label-sm block text-copper-ink">{item.stage}</span>
                <span className="t-body mt-2.5 block text-ink-2">{item.check}</span>
              </span>
            </Reveal>
          ))}
        </div>
        <div className="border-t border-[var(--rule-light)]" />
      </Section>

      {/* Records */}
      <Section tone="graphite-800">
        <div className="grid gap-x-12 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Plate
              image="plans-flatlay"
              ratio="4 / 3"
              sizes="(max-width: 1024px) 100vw, 48vw"
              plateNo="PLATE 01"
              caption="Placeholder — replace with Daima's own handover documentation"
            />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal>
              <Eyebrow index="06" label="The handover file" />
            </Reveal>
            <Reveal delay={60}>
              <h2 className="t-h2 mt-8">What you keep, after we leave.</h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="t-lede mt-6 opacity-72">
                A building without its records is a building nobody can maintain,
                alter, insure or sell without starting the investigation again.
              </p>
            </Reveal>
            <ul className="mt-9">
              {[
                "As-built drawings, marked where the build differed from the design",
                "Stage inspection records and photographs taken before cover-up",
                "Concrete delivery tickets and cube test results",
                "Material approvals and product data sheets",
                "Written variations, with the agreement that preceded each",
                "Warranties and guarantees from suppliers and specialists",
                "A closed snag list, signed off",
              ].map((item, i) => (
                <Reveal
                  key={item}
                  delay={i * 45}
                  as="li"
                  className="grid grid-cols-[2.25rem_1fr] items-baseline gap-x-3 border-t border-[var(--rule-dark)] py-3.5"
                >
                  <span className="t-num text-[0.6875rem] tracking-[0.16em] text-copper-light">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="t-body opacity-78">{item}</span>
                </Reveal>
              ))}
              <li className="border-t border-[var(--rule-dark)]" />
            </ul>
          </div>
        </div>
      </Section>

      <PrinciplesSection />

      <CtaBand
        eyebrow="Stage 01"
        title="Start with a consultation."
        body="The first stage costs you a conversation. It usually settles whether the project is ready for a contractor, and what it would take to price it properly."
        image="crew-inspection"
        secondary={{ href: "/services", label: "See services" }}
      />
    </>
  );
}
