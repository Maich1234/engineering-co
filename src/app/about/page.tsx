import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Plate } from "@/components/plate";
import { CtaBand, PrinciplesSection, IndustriesSection } from "@/components/sections";
import {
  ButtonLink,
  Eyebrow,
  Section,
  SectionHead,
  Provisional,
} from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { company, fact } from "@/content/company";
import { services } from "@/content/services";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Daima Civil Engineering Works is a civil engineering and construction company based in Nairobi, working with developers, businesses, institutions and private clients across Nairobi and the surrounding counties.",
  path: "/about",
  image: "/img/crew-inspection.jpg",
});

export default function AboutPage() {
  const areas = fact(company.serviceArea.areas);
  const registrations = fact(company.credentials.registrations);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <PageHeader
        eyebrow="About"
        title="A Nairobi civil engineering and construction company."
        lede={company.oneLiner}
        image="crew-inspection"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        meta={[
          { label: "Base", value: fact(company.serviceArea.base) },
          { label: "Disciplines", value: String(services.length).padStart(2, "0") },
        ]}
      />

      <Section tone="graphite" seam={false}>
        <div className="grid gap-x-12 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow index="01" label="The company" />
            </Reveal>
            <Reveal delay={60}>
              <h2 className="t-h2 mt-8">What Daima does.</h2>
            </Reveal>
            <Reveal delay={120} className="mt-9">
              <Plate
                image="crew-formwork"
                ratio="4 / 5"
                sizes="(max-width: 1024px) 100vw, 38vw"
                plateNo="PLATE 01"
                caption="Placeholder — to be replaced with Daima's own photography"
              />
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal className="space-y-5">
              <p className="t-lede opacity-82">
                Daima Civil Engineering Works provides civil engineering and
                construction services in Nairobi and the areas around it. The
                clients are property developers, businesses, institutions, main
                contractors and private individuals building for themselves.
              </p>
              <p className="t-body opacity-62">
                The work spans what happens below ground and above it: site
                clearance, earthworks, drainage and foundations, then structure,
                envelope, finishes and external works. Some projects come as a
                single package — a substructure, a slab, a drainage system.
                Others come as a whole building to be delivered and handed over.
              </p>
              <p className="t-body opacity-62">
                Construction is an industry where the most important work becomes
                invisible within days of being done. Reinforcement cover, the
                compaction under a slab, the fall on a drain — all of it is
                buried before anyone paying for it gets to look at it. That fact
                shapes how we work more than anything else.
              </p>
            </Reveal>

            <Reveal delay={120} className="mt-10 border-t border-[var(--rule-dark)] pt-7">
              <h3 className="t-label text-on-dark-3">Our mission</h3>
              <p className="t-lede mt-4 opacity-82">
                To build work that holds up when nobody is looking at it, and to
                leave clients with the records to prove it.
              </p>
            </Reveal>

            <Reveal delay={180} className="mt-9 flex flex-wrap items-start gap-x-4 gap-y-3 border-t border-[var(--rule-dark)] pt-7">
              <Provisional>Company history pending</Provisional>
              <p className="t-label-sm max-w-md opacity-45">
                Founding year, how the company started and who started it are the
                strongest part of a page like this — and the part that cannot be
                written without Daima. This section is built to take two or three
                more paragraphs.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="graphite-800">
        <SectionHead
          index="02"
          label="Approach"
          title="Method before price."
          lede="A quotation is easy to produce and easy to be wrong about. How a contractor sequences the work, what they check and when, and what they tell you before you find out yourself — those decide how a project actually goes."
          action={
            <ButtonLink href="/approach" variant="ghost-dark" small>
              How we work
            </ButtonLink>
          }
        />
        <div className="mt-14 grid gap-x-8 gap-y-10 md:mt-18 md:grid-cols-3">
          {[
            {
              index: "01",
              title: "Set out from the drawing",
              body: "Levels and dimensions come from the approved drawings and are checked against them on site. Where a drawing cannot be built as issued, we raise it with the designer instead of resolving it quietly on site.",
            },
            {
              index: "02",
              title: "Inspect before cover",
              body: "Reinforcement, buried services, compaction and levels are checked and photographed before anything closes over them. The record is handed over at the end.",
            },
            {
              index: "03",
              title: "Say it early",
              body: "If a date has moved or a cost has changed, you hear it while there is still time to decide what to do about it — not at the final account.",
            },
          ].map((item, i) => (
            <Reveal key={item.index} delay={i * 70} className="border-t border-[var(--rule-dark)] pt-6">
              <span className="t-num text-[0.75rem] tracking-[0.18em] text-copper-light">
                {item.index}
              </span>
              <h3 className="t-h4 mt-3">{item.title}</h3>
              <p className="t-body mt-3.5 opacity-62">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <PrinciplesSection />

      <Section tone="graphite">
        <SectionHead
          index="03"
          label="Team"
          title="The people on your project."
          lede="Who runs the site, who you call, and who signs off the work — the section prospective clients read most closely. It stays empty until Daima supplies real names, roles and photographs."
        />

        <Reveal className="mt-12 border border-dashed border-[var(--rule-dark-strong)] p-8 md:p-12">
          <Provisional>Awaiting real team information</Provisional>
          <p className="t-lede mt-6 max-w-2xl opacity-72">
            Rather than fill this with stock portraits and invented job titles,
            the layout is left as a marked slot.
          </p>
          <ul className="t-body mt-7 grid max-w-3xl gap-x-10 gap-y-3 opacity-55 sm:grid-cols-2">
            {[
              "Name and role of each person a client would deal with",
              "A short line on what each person is responsible for",
              "Photographs taken on site, not in a studio",
              "Professional registrations, where held and documented",
            ].map((item) => (
              <li key={item} className="grid grid-cols-[auto_1fr] gap-x-3">
                <span aria-hidden className="mt-[0.6rem] inline-block h-1 w-1 shrink-0 bg-copper" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section tone="graphite-800" tight>
        <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow index="04" label="Registrations" />
            <h2 className="t-h3 mt-6">Credentials</h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            {registrations.length > 0 ? (
              <ul>
                {registrations.map((item) => (
                  <li key={item.body} className="border-t border-[var(--rule-dark)] py-4">
                    <span className="t-label-sm text-on-dark-3">{item.body}</span>
                    <span className="t-body mt-2 block">{item.detail}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <p className="t-lede opacity-72">
                  No registrations, certifications or standards are claimed on
                  this site.
                </p>
                <p className="t-body mt-4 opacity-55">
                  Contractor registration, professional body membership and
                  insurance cover are exactly what a serious client checks — and
                  exactly what must never be stated without the certificate to
                  hand. Once Daima provides them they belong here, with the
                  registration number and expiry.
                </p>
                <div className="mt-6">
                  <Provisional>Nothing claimed until verified</Provisional>
                </div>
              </>
            )}
          </div>
        </div>
      </Section>

      <Section tone="paper">
        <SectionHead
          index="05"
          label="Service area"
          title="Where we work."
          lede={`Based in ${fact(company.serviceArea.base)}, working across ${areas.slice(0, -1).join(", ")} and ${areas[areas.length - 1]}.`}
          align="stack"
        />
        <div className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Plate
              image="nairobi-skyline"
              ratio="16 / 10"
              sizes="(max-width: 768px) 100vw, 55vw"
              plateNo="PLATE 02"
              caption="Nairobi — placeholder photography"
            />
          </div>
          <div className="md:col-span-5">
            <h3 className="t-label text-ink-3">Areas covered</h3>
            <ul className="mt-5">
              {fact(company.serviceArea.localities).map((area) => (
                <li key={area} className="t-body border-t border-[var(--rule-light)] py-3 text-ink-2">
                  {area}
                </li>
              ))}
              <li className="border-t border-[var(--rule-light)]" />
            </ul>
            <div className="mt-6">
              <Provisional tone="light">Confirm coverage</Provisional>
            </div>
          </div>
        </div>
      </Section>

      <IndustriesSection />

      <CtaBand
        eyebrow="Work with us"
        title="Start a conversation."
        body="Tell us what you are planning. A first call usually settles whether the project needs a contractor yet, and what it would take to price it properly."
        image="crew-drawings"
        secondary={{ href: "/projects", label: "Explore Our Work" }}
      />
    </>
  );
}
