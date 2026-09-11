import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/page-header";
import { ProjectCard } from "@/components/project-card";
import { ProjectFilter } from "@/components/project-filter";
import { CtaBand } from "@/components/sections";
import { Section, Provisional, ButtonLink } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { projects, projectCategories, type ProjectCategory } from "@/content/projects";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "Construction and civil engineering projects in Nairobi and the surrounding counties — residential, commercial, industrial, institutional and infrastructure work, documented with scope, approach and outcome.",
  path: "/projects",
  image: "/img/prj-aerial-frame.jpg",
});

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const isValid = projectCategories.includes(category as ProjectCategory);
  const filtered = isValid ? projects.filter((p) => p.category === category) : projects;

  const counts = Object.fromEntries(
    projectCategories.map((c) => [c, projects.filter((p) => p.category === c).length]),
  ) as Record<string, number>;

  /* Varied spans keep the grid from reading as a product catalogue. */
  const layout = [
    { span: "lg:col-span-7", ratio: "16 / 11" },
    { span: "lg:col-span-5", ratio: "4 / 5" },
    { span: "lg:col-span-4", ratio: "3 / 4" },
    { span: "lg:col-span-8", ratio: "16 / 9" },
    { span: "lg:col-span-6", ratio: "4 / 3" },
    { span: "lg:col-span-6", ratio: "4 / 3" },
    { span: "lg:col-span-5", ratio: "4 / 5" },
    { span: "lg:col-span-7", ratio: "16 / 11" },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ])}
      />

      <PageHeader
        eyebrow="Projects"
        title="Work, recorded the way it was built."
        lede="Each record sets out the location, scope, engineering approach, the problems the site presented and what was done about them — the things that actually tell you whether a contractor can handle your project."
        image="prj-aerial-site"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
        meta={[
          { label: "Records", value: String(projects.length).padStart(2, "0") },
          { label: "Sectors", value: String(projectCategories.length).padStart(2, "0") },
          { label: "Status", value: "Placeholder set" },
        ]}
      />

      <Section tone="graphite" seam={false}>
        <Reveal className="flex flex-wrap items-start gap-4 border border-[var(--rule-dark)] bg-graphite-800/60 px-5 py-4">
          <Provisional>Placeholder portfolio</Provisional>
          <p className="t-label-sm max-w-3xl opacity-55">
            Every record below is a sample showing the structure of a project
            entry — the titles are project types, not Daima jobs, and every
            figure is left as an empty slot rather than invented. Replace them
            in <span className="t-num">src/content/projects.ts</span> and the
            grid, filters, related links and sitemap follow.
          </p>
        </Reveal>

        <div className="mt-12">
          <Suspense fallback={<div className="h-11" />}>
            <ProjectFilter counts={counts} />
          </Suspense>
        </div>

        <p className="t-label-sm mt-6 opacity-45" aria-live="polite">
          Showing {String(filtered.length).padStart(2, "0")} of{" "}
          {String(projects.length).padStart(2, "0")} records
          {isValid ? ` — ${category}` : ""}
        </p>

        {filtered.length === 0 ? (
          <div className="mt-14 border-t border-[var(--rule-dark)] pt-10">
            <p className="t-h3">No records in this category yet.</p>
            <p className="t-body mt-4 max-w-md opacity-62">
              Once Daima&rsquo;s own projects are loaded this view fills in.
            </p>
            <div className="mt-7">
              <ButtonLink href="/projects" variant="ghost-dark" small>
                Show all projects
              </ButtonLink>
            </div>
          </div>
        ) : (
          <div className="mt-14 grid gap-x-10 gap-y-16 lg:grid-cols-12">
            {filtered.map((project, i) => {
              const cell = layout[i % layout.length];
              return (
                <div key={project.slug} className={cell.span}>
                  <ProjectCard
                    project={project}
                    ratio={cell.ratio}
                    sizes="(max-width: 900px) 100vw, (max-width: 1400px) 50vw, 46vw"
                    index={`P-${String(i + 1).padStart(2, "0")}`}
                    delay={(i % 2) * 80}
                    large
                  />
                </div>
              );
            })}
          </div>
        )}
      </Section>

      <CtaBand
        eyebrow="Your project"
        title="The next record could be yours."
        body="Tell us what you are planning. If it is something we can build well, we will say so — and if it is not, we will say that too."
        image="prj-aerial-frame"
        secondary={{ href: "/approach", label: "How we work" }}
      />
    </>
  );
}
