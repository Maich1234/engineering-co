import Link from "next/link";
import type { Project } from "@/content/projects";
import { Plate } from "./plate";
import { ActionLink, Provisional } from "./primitives";
import { Reveal } from "./reveal";

type Tone = "dark" | "light";

export function ProjectCard({
  project,
  ratio = "4 / 3",
  sizes = "(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 40vw",
  tone = "dark",
  index,
  delay = 0,
  large = false,
}: {
  project: Project;
  ratio?: string;
  sizes?: string;
  tone?: Tone;
  index?: string;
  delay?: number;
  large?: boolean;
}) {
  const rule = tone === "dark" ? "border-[var(--rule-dark)]" : "border-[var(--rule-light)]";
  const muted = tone === "dark" ? "text-on-dark-2" : "text-ink-3";

  return (
    <Reveal delay={delay} className="h-full">
      <Link href={`/projects/${project.slug}`} className="group flex h-full flex-col">
        <div className="relative">
          <Plate
            image={project.cardImage}
            ratio={ratio}
            sizes={sizes}
            zoom
            still
            className="w-full"
          />
          <span className="t-label-sm pointer-events-none absolute left-3.5 top-3.5 bg-graphite-950/72 px-2 py-1.5 text-on-dark backdrop-blur-[2px]">
            {project.category}
          </span>
          {index ? (
            <span className="t-num pointer-events-none absolute bottom-3.5 left-3.5 text-[0.6875rem] tracking-[0.2em] text-on-dark/60">
              {index}
            </span>
          ) : null}
        </div>

        <div className={`mt-5 flex flex-1 flex-col border-t ${rule} pt-5`}>
          <h3
            className={`${large ? "t-h3" : "t-h4"} transition-colors duration-400 group-hover:text-copper-light`}
          >
            {project.title}
          </h3>
          <p className={`t-label-sm mt-3 flex flex-wrap items-center gap-x-2 gap-y-2 ${muted}`}>
            <span>{project.location}</span>
            <span aria-hidden className="opacity-40">/</span>
            <span>{project.status}</span>
            {project.placeholder ? <Provisional>Placeholder record</Provisional> : null}
          </p>
          <p className={`t-body mt-4 ${tone === "dark" ? "opacity-64" : "opacity-72"}`}>
            {project.scopeSummary}
          </p>
          <span className="mt-auto pt-6">
            <ActionLink>Open Project</ActionLink>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
