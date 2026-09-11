import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { InsightCard } from "@/components/insight-card";
import { CtaBand } from "@/components/sections";
import { Section, Provisional } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { publishedInsights } from "@/content/insights";

export const metadata: Metadata = pageMetadata({
  title: "Insights",
  description:
    "Practical construction and engineering writing from Daima Civil Engineering Works in Nairobi — what to prepare before you build, drainage and foundations, and how to maintain a building once it is up.",
  path: "/insights",
  image: "/img/plans-flatlay.jpg",
});

export default function InsightsPage() {
  const posts = publishedInsights();
  const [lead, ...rest] = posts;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
        ])}
      />

      <PageHeader
        eyebrow="Insights"
        title="Notes from the work."
        lede="Construction advice, maintenance guidance, project updates and company news. Written for the people who commission work rather than the people who do it."
        image="plans-flatlay"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Insights" }]}
        meta={[{ label: "Articles", value: String(posts.length).padStart(2, "0") }]}
      />

      <Section tone="graphite" seam={false}>
        <Reveal className="flex flex-wrap items-start gap-4 border border-[var(--rule-dark)] bg-graphite-800/60 px-5 py-4">
          <Provisional>Draft articles</Provisional>
          <p className="t-label-sm max-w-3xl opacity-55">
            These three pieces are general construction guidance written to show
            what the section does and to seed its search presence. They make no
            claims about Daima&rsquo;s own work. Review them, put the
            company&rsquo;s view into them and set{" "}
            <span className="t-num">draft: false</span> to publish — or delete
            them and start with Daima&rsquo;s own writing. Drafts are hidden in
            production builds.
          </p>
        </Reveal>

        {posts.length === 0 ? (
          <div className="mt-16 border-t border-[var(--rule-dark)] pt-10">
            <p className="t-h3">Nothing published yet.</p>
            <p className="t-body mt-4 max-w-md opacity-62">
              Articles added to <span className="t-num">src/content/insights.ts</span>{" "}
              appear here, on the homepage and in the sitemap.
            </p>
          </div>
        ) : (
          <>
            {lead ? (
              <div className="mt-14">
                <InsightCard
                  insight={lead}
                  ratio="21 / 9"
                  sizes="100vw"
                />
              </div>
            ) : null}

            {rest.length > 0 ? (
              <div className="mt-16 grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((insight, i) => (
                  <InsightCard key={insight.slug} insight={insight} delay={i * 80} />
                ))}
              </div>
            ) : null}
          </>
        )}
      </Section>

      <CtaBand
        eyebrow="Questions"
        title="Something here relevant to your project?"
        body="If one of these raised a question about what you are planning, ask it directly — it is usually a shorter conversation than it looks."
        image="crew-drawings"
        primary={{ href: "/contact#enquiry", label: "Request a Consultation" }}
        secondary={{ href: "/services", label: "See services" }}
      />
    </>
  );
}
