import Link from "next/link";
import type { ReactNode } from "react";
import type { ImageKey } from "@/content/images";
import { Backdrop } from "./plate";
import { Eyebrow } from "./primitives";
import { Reveal } from "./reveal";

/**
 * Interior pages open on a shorter version of the hero: a banded photograph,
 * a breadcrumb rail and the page title. It keeps every page recognisably part
 * of the same drawing set without repeating the homepage's full-bleed gesture.
 */
export function PageHeader({
  eyebrow,
  title,
  lede,
  image,
  breadcrumbs,
  meta,
  children,
  tall = false,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  image: ImageKey;
  breadcrumbs: { label: string; href?: string }[];
  meta?: { label: string; value: ReactNode }[];
  children?: ReactNode;
  tall?: boolean;
}) {
  return (
    <section
      className={`relative isolate flex flex-col justify-end overflow-hidden bg-graphite-950 ${
        tall ? "min-h-[82svh]" : "min-h-[62svh]"
      }`}
      style={{ paddingTop: "var(--header-h)" }}
    >
      <Backdrop image={image} priority sizes="100vw" quality={74} />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-graphite-950 via-graphite-950/72 to-graphite-950/45"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-graphite-950/85 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-graphite-950/85 to-transparent"
      />
      <div className="field" aria-hidden />

      <div className="shell relative pb-12 pt-20 md:pb-16">
        <Reveal>
          <nav aria-label="Breadcrumb">
            <ol className="t-label-sm flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-on-dark-2">
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-2.5">
                  {i > 0 ? (
                    <span aria-hidden className="opacity-35">
                      /
                    </span>
                  ) : null}
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition-colors hover:text-copper-light">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-on-dark">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </Reveal>

        <Reveal delay={70} className="mt-7">
          <Eyebrow label={eyebrow} rule={false} />
        </Reveal>

        <Reveal delay={120}>
          <h1 className="t-h1 mt-5 max-w-4xl">{title}</h1>
        </Reveal>

        {lede ? (
          <Reveal delay={180}>
            <p className="t-lede mt-7 max-w-2xl text-on-dark/78">{lede}</p>
          </Reveal>
        ) : null}

        {children ? <Reveal delay={240} className="mt-9">{children}</Reveal> : null}
      </div>

      {meta && meta.length > 0 ? (
        <Reveal delay={280} className="relative border-t border-[var(--rule-dark)]">
          <dl className="shell flex flex-wrap gap-x-10 gap-y-4 py-5 md:py-6">
            {meta.map((item) => (
              <div key={item.label} className="flex items-baseline gap-2.5">
                <dt className="t-label-sm text-on-dark-3">{item.label}</dt>
                <dd className="t-num text-[0.9375rem] text-on-dark">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      ) : null}
    </section>
  );
}
