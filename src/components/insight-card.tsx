import Link from "next/link";
import type { Insight } from "@/content/insights";
import { Plate } from "./plate";
import { ActionLink, Provisional } from "./primitives";
import { Reveal } from "./reveal";

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export function InsightCard({
  insight,
  delay = 0,
  tone = "dark",
  ratio = "16 / 10",
  sizes = "(max-width: 760px) 100vw, 32vw",
}: {
  insight: Insight;
  delay?: number;
  tone?: "dark" | "light";
  ratio?: string;
  sizes?: string;
}) {
  const rule = tone === "dark" ? "border-[var(--rule-dark)]" : "border-[var(--rule-light)]";

  return (
    <Reveal delay={delay} className="h-full">
      <Link href={`/insights/${insight.slug}`} className="group flex h-full flex-col">
        <Plate image={insight.image} ratio={ratio} sizes={sizes} zoom still />
        <div className={`mt-5 flex flex-1 flex-col border-t ${rule} pt-5`}>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="t-label-sm text-copper-light">{insight.category}</span>
            <span className="t-label-sm opacity-42">
              <time dateTime={insight.date}>{dateFormat.format(new Date(insight.date))}</time>
              {" · "}
              {insight.readingMinutes} min
            </span>
            {insight.draft ? <Provisional>Draft</Provisional> : null}
          </div>
          <h3 className="t-h4 mt-4 transition-colors duration-400 group-hover:text-copper-light">
            {insight.title}
          </h3>
          <p className={`t-body mt-3.5 ${tone === "dark" ? "opacity-62" : "opacity-72"}`}>
            {insight.excerpt}
          </p>
          <span className="mt-auto pt-6">
            <ActionLink>Read</ActionLink>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
