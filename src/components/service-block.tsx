import Link from "next/link";
import type { Service } from "@/content/services";
import { Plate } from "./plate";
import { ActionLink } from "./primitives";
import { Reveal } from "./reveal";

export function ServiceBlock({
  service,
  ratio = "16 / 10",
  sizes = "(max-width: 900px) 100vw, 55vw",
  delay = 0,
  tone = "dark",
}: {
  service: Service;
  ratio?: string;
  sizes?: string;
  delay?: number;
  tone?: "dark" | "light";
}) {
  const rule = tone === "dark" ? "border-[var(--rule-dark)]" : "border-[var(--rule-light)]";

  return (
    <Reveal delay={delay} className="h-full">
      <Link href={`/services/${service.slug}`} className="group flex h-full flex-col">
        <div className="relative">
          <Plate image={service.image} ratio={ratio} sizes={sizes} zoom still />
          <span
            aria-hidden
            className="t-num absolute left-3.5 top-3.5 bg-graphite-950/72 px-2 py-1.5 text-[0.6875rem] tracking-[0.2em] text-copper-light backdrop-blur-[2px]"
          >
            {service.index}
          </span>
        </div>

        <div className={`mt-5 flex flex-1 flex-col border-t ${rule} pt-5`}>
          <h3 className="t-h3 transition-colors duration-400 group-hover:text-copper-light">
            {service.title}
          </h3>
          <p className={`t-body mt-4 max-w-md ${tone === "dark" ? "opacity-64" : "opacity-72"}`}>
            {service.summary}
          </p>
          <span className="mt-auto pt-7">
            <ActionLink>Explore Service</ActionLink>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
