"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { projectCategories } from "@/content/projects";

/**
 * Filtering is done with real links and a query string, not client state:
 * every filtered view is shareable, linkable and works without JavaScript.
 */
export function ProjectFilter({ counts }: { counts: Record<string, number> }) {
  const pathname = usePathname();
  const params = useSearchParams();
  const active = params.get("category");

  const item = (label: string, href: string, isActive: boolean, count: number) => (
    <Link
      key={label}
      href={href}
      scroll={false}
      aria-current={isActive ? "true" : undefined}
      className={`t-label-sm group flex items-center gap-2 border px-3.5 py-2.5 transition-colors duration-300 ${
        isActive
          ? "border-copper bg-copper text-white"
          : "border-[var(--rule-dark)] text-on-dark-2 hover:border-[var(--rule-dark-strong)] hover:text-on-dark"
      }`}
    >
      {label}
      <span className={`t-num text-[0.625rem] ${isActive ? "opacity-80" : "opacity-45"}`}>
        {String(count).padStart(2, "0")}
      </span>
    </Link>
  );

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-wrap gap-2.5" role="group" aria-label="Filter projects by category">
      {item("All", pathname, !active, total)}
      {projectCategories.map((category) =>
        item(
          category,
          `${pathname}?category=${encodeURIComponent(category)}`,
          active === category,
          counts[category] ?? 0,
        ),
      )}
    </div>
  );
}
