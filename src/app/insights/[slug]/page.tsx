import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { InsightCard } from "@/components/insight-card";
import { CtaBand } from "@/components/sections";
import { Section, Provisional, Eyebrow } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { JsonLd, breadcrumbJsonLd, insightJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { getInsight, insightSlugs, publishedInsights } from "@/content/insights";

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function generateStaticParams() {
  return insightSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return {};
  return pageMetadata({
    title: insight.seo.title,
    description: insight.seo.description,
    path: `/insights/${insight.slug}`,
    image: `/img/${insight.image}.jpg`,
    type: "article",
    publishedTime: insight.date,
    noIndex: insight.draft,
  });
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();

  const more = publishedInsights()
    .filter((i) => i.slug !== insight.slug)
    .slice(0, 2);

  return (
    <>
      <JsonLd data={insightJsonLd(insight)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
          { name: insight.title, path: `/insights/${insight.slug}` },
        ])}
      />

      <PageHeader
        eyebrow={insight.category}
        title={insight.title}
        lede={insight.excerpt}
        image={insight.image}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Insights", href: "/insights" },
          { label: insight.title },
        ]}
        meta={[
          {
            label: "Published",
            value: (
              <time dateTime={insight.date}>{dateFormat.format(new Date(insight.date))}</time>
            ),
          },
          { label: "Reading", value: `${insight.readingMinutes} min` },
        ]}
      >
        {insight.draft ? (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <Provisional>Unreviewed draft</Provisional>
            <p className="t-label-sm max-w-lg opacity-55">
              General construction guidance, not yet reviewed by Daima. Hidden
              from production builds and excluded from search indexing.
            </p>
          </div>
        ) : null}
      </PageHeader>

      <Section tone="graphite" seam={false}>
        <article className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
          {/* Contents rail */}
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
              <Reveal>
                <h2 className="t-label-sm text-on-dark-3">Contents</h2>
                <ol className="mt-5">
                  {insight.sections.map((section, i) => (
                    <li key={section.heading} className="border-t border-[var(--rule-dark)] py-3">
                      <a
                        href={`#s-${i + 1}`}
                        className="t-body grid grid-cols-[2rem_1fr] gap-x-2 opacity-60 transition-opacity hover:opacity-100"
                      >
                        <span className="t-num text-[0.6875rem] tracking-[0.16em] text-copper-light">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{section.heading}</span>
                      </a>
                    </li>
                  ))}
                  <li className="border-t border-[var(--rule-dark)]" />
                </ol>
              </Reveal>
            </div>
          </aside>

          <div className="lg:col-span-8 lg:col-start-5">
            <Reveal>
              <p className="t-lede opacity-84">{insight.intro}</p>
            </Reveal>

            {insight.sections.map((section, i) => (
              <section key={section.heading} id={`s-${i + 1}`} className="mt-12 scroll-mt-32">
                <Reveal>
                  <h2 className="t-h3 border-t border-[var(--rule-dark)] pt-7">
                    <span className="t-num mr-3 text-[0.75rem] tracking-[0.18em] text-copper-light align-middle">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {section.heading}
                  </h2>
                </Reveal>
                <div className="mt-5 space-y-4">
                  {section.body.map((para, j) => (
                    <Reveal key={j} delay={j * 60}>
                      <p className="t-body opacity-72">{para}</p>
                    </Reveal>
                  ))}
                </div>
              </section>
            ))}

            <Reveal className="mt-12 border-t border-[var(--rule-dark)] pt-7">
              <p className="t-lede opacity-84">{insight.closing}</p>
            </Reveal>

            <Reveal className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-[var(--rule-dark)] pt-7">
              <Link href="/contact#enquiry" className="btn btn--primary btn--sm">
                <span>Request a Consultation</span>
                <span className="btn__arrow" aria-hidden>
                  &#8594;
                </span>
              </Link>
              <Link href="/insights" className="action opacity-72">
                <span>All insights</span>
                <span className="action__arrow" aria-hidden>
                  &#8594;
                </span>
              </Link>
            </Reveal>
          </div>
        </article>
      </Section>

      {more.length > 0 ? (
        <Section tone="graphite-800">
          <Reveal>
            <Eyebrow label="More insights" />
          </Reveal>
          <div className="mt-10 grid gap-x-10 gap-y-14 md:grid-cols-2">
            {more.map((item, i) => (
              <InsightCard
                key={item.slug}
                insight={item}
                delay={i * 80}
                sizes="(max-width: 768px) 100vw, 46vw"
              />
            ))}
          </div>
        </Section>
      ) : null}

      <CtaBand
        eyebrow="Next step"
        title="Start a project with Daima."
        image="frame-timber-formwork"
        secondary={{ href: "/insights", label: "All insights" }}
      />
    </>
  );
}
