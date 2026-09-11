import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { Plate } from "@/components/plate";
import { ProjectCard } from "@/components/project-card";
import { CtaBand } from "@/components/sections";
import {
  ButtonLink,
  Eyebrow,
  Section,
  SectionHead,
  SpecList,
  Provisional,
} from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { JsonLd, breadcrumbJsonLd, projectJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { getProject, projectSlugs, relatedProjects } from "@/content/projects";
import { getService } from "@/content/services";

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.title} — ${project.location}`,
    description: `${project.scopeSummary} ${project.category} project in ${project.location}. Scope, engineering approach, challenges and outcome.`,
    path: `/projects/${project.slug}`,
    image: `/img/${project.heroImage}.jpg`,
    // Placeholder records must never be indexed as if they were real work.
    noIndex: project.placeholder,
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = relatedProjects(project);
  const usedServices = project.servicesUsed
    .map((s) => getService(s))
    .filter((s): s is NonNullable<ReturnType<typeof getService>> => Boolean(s));

  return (
    <>
      <JsonLd data={projectJsonLd(project)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ])}
      />

      <PageHeader
        tall
        eyebrow={project.category}
        title={project.title}
        lede={project.scopeSummary}
        image={project.heroImage}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: project.title },
        ]}
        meta={[
          { label: "Location", value: project.location },
          { label: "Sector", value: project.sector },
          { label: "Status", value: project.status },
          {
            label: "Completed",
            value: project.completion ?? <span className="slot" style={{ minWidth: "3rem" }} />,
          },
        ]}
      >
        {project.placeholder ? (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <Provisional>Placeholder record</Provisional>
            <p className="t-label-sm max-w-lg opacity-55">
              A sample entry showing the structure of a project page. Not a
              Daima project — and excluded from search indexing until it is real.
            </p>
          </div>
        ) : null}
      </PageHeader>

      {/* Overview + specs */}
      <Section tone="graphite" seam={false}>
        <div className="grid gap-x-12 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow index="01" label="Project overview" />
            </Reveal>
            <div className="mt-8 space-y-5">
              {project.overview.map((para, i) => (
                <Reveal key={i} delay={i * 70}>
                  <p className={i === 0 ? "t-lede opacity-82" : "t-body opacity-62"}>{para}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={160} className="mt-10">
              <h2 className="t-label text-on-dark-3">Services drawn on</h2>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {usedServices.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="t-label-sm border border-[var(--rule-dark)] px-3.5 py-2.5 text-on-dark-2 transition-colors duration-300 hover:border-copper hover:text-copper-light"
                  >
                    {service.navTitle}
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal>
              <h2 className="t-label text-on-dark-3">Project data</h2>
            </Reveal>
            <Reveal delay={70} className="mt-6">
              <SpecList items={project.specs} />
              <div className="border-t border-[var(--rule-dark)]" />
            </Reveal>
            {project.placeholder ? (
              <Reveal delay={140} className="mt-6">
                <p className="t-label-sm opacity-42">
                  Dashed slots are figures deliberately left unfilled. Nothing
                  here is estimated or invented.
                </p>
              </Reveal>
            ) : null}
          </div>
        </div>
      </Section>

      {/* Scope of work */}
      <Section tone="graphite-800">
        <div className="grid gap-x-12 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow index="02" label="Scope of work" />
            </Reveal>
            <Reveal delay={60}>
              <h2 className="t-h2 mt-8">What was built.</h2>
            </Reveal>
          </div>
          <ul className="lg:col-span-7 lg:col-start-6">
            {project.scopeOfWork.map((item, i) => (
              <Reveal
                key={item}
                delay={i * 45}
                as="li"
                className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 border-t border-[var(--rule-dark)] py-4"
              >
                <span className="t-num text-[0.6875rem] tracking-[0.16em] text-copper-light">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="t-body">{item}</span>
              </Reveal>
            ))}
            <li className="border-t border-[var(--rule-dark)]" />
          </ul>
        </div>
      </Section>

      {/* Approach */}
      <Section tone="graphite">
        <div className="grid gap-x-12 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow index="03" label="Approach" />
            </Reveal>
            <Reveal delay={60}>
              <h2 className="t-h2 mt-8">How it was built.</h2>
            </Reveal>
            <Reveal delay={120} className="mt-9">
              <Plate
                image={project.gallery[0]}
                ratio="4 / 3"
                sizes="(max-width: 1024px) 100vw, 30vw"
                plateNo="PLATE 01"
              />
            </Reveal>
          </div>
          <div className="space-y-6 lg:col-span-7 lg:col-start-6">
            {project.approach.map((para, i) => (
              <Reveal key={i} delay={i * 70}>
                <p className={i === 0 ? "t-lede opacity-82" : "t-body opacity-64"}>{para}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Gallery */}
      <Section tone="graphite-800">
        <SectionHead
          index="04"
          label="Project gallery"
          title="On site."
          lede="Placeholder photography. Replace with Daima's own progress and completion record — site photographs are the single highest-value asset a contractor's website can carry."
        />
        <div className="mt-14 grid gap-x-8 gap-y-8 md:mt-18 md:grid-cols-12">
          {project.gallery.map((key, i) => {
            /* A repeating 7/5, 5/7 rhythm keeps the gallery from gridding up. */
            const spans = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7", "md:col-span-6", "md:col-span-6"];
            const ratios = ["16 / 10", "4 / 3", "4 / 3", "16 / 10", "3 / 2", "3 / 2"];
            return (
              <div key={`${key}-${i}`} className={spans[i % spans.length]}>
                <Plate
                  image={key}
                  ratio={ratios[i % ratios.length]}
                  sizes="(max-width: 768px) 100vw, 46vw"
                  plateNo={`PLATE ${String(i + 2).padStart(2, "0")}`}
                  zoom
                />
              </div>
            );
          })}
        </div>
      </Section>

      {/* Challenges & solutions */}
      <Section tone="paper">
        <SectionHead
          index="05"
          label="Challenges & solutions"
          title="What the site presented, and what was done about it."
          lede="Every project has two or three decisions that determined how it went. These are the ones worth writing down."
        />
        <div className="mt-14 md:mt-18">
          {project.challenges.map((item, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="grid gap-x-10 gap-y-6 border-t border-[var(--rule-light)] py-9 md:grid-cols-12">
                <span className="t-num text-[0.75rem] tracking-[0.18em] text-copper-ink md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="md:col-span-5">
                  <h3 className="t-label-sm text-ink-3">Challenge</h3>
                  <p className="t-body mt-3 text-ink">{item.challenge}</p>
                </div>
                <div className="md:col-span-5 md:col-start-8">
                  <h3 className="t-label-sm text-copper-ink">Solution</h3>
                  <p className="t-body mt-3 text-ink-2">{item.solution}</p>
                </div>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-[var(--rule-light)]" />
        </div>

        <Reveal className="mt-12 grid gap-x-10 gap-y-6 md:grid-cols-12">
          <h2 className="t-label text-ink-3 md:col-span-4">Outcome</h2>
          <p className="t-lede text-ink md:col-span-7 md:col-start-6">{project.outcome}</p>
        </Reveal>
      </Section>

      {/* Related */}
      <Section tone="graphite">
        <SectionHead
          index="06"
          label="Related projects"
          title="Nearby in type or method."
          action={
            <ButtonLink href="/projects" variant="ghost-dark" small>
              All projects
            </ButtonLink>
          }
        />
        <div className="mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((item, i) => (
            <ProjectCard key={item.slug} project={item} delay={i * 80} />
          ))}
        </div>
      </Section>

      <CtaBand
        eyebrow="Start a project"
        title="Have a project like this?"
        body="Send us the drawings if you have them, or just describe the site and what you want built. We will tell you what it needs."
        image={project.gallery[1] ?? project.heroImage}
        primary={{ href: "/contact#enquiry", label: "Start a Project" }}
        secondary={{ href: "/projects", label: "Explore Our Work" }}
      />
    </>
  );
}
