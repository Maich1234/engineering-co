import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "./reveal";

/* ---------------------------------------------------------------- Section */

type SectionProps = {
  id?: string;
  /** Two-digit index printed in the rail, drawing-sheet style. */
  index?: string;
  label?: string;
  tone?: "graphite" | "graphite-800" | "steel" | "paper" | "paper-100";
  seam?: boolean;
  field?: boolean;
  tight?: boolean;
  className?: string;
  children: ReactNode;
};

const toneClass: Record<NonNullable<SectionProps["tone"]>, string> = {
  graphite: "on-graphite",
  "graphite-800": "on-graphite-800",
  steel: "on-steel",
  paper: "on-paper",
  "paper-100": "on-paper-100",
};

export function Section({
  id,
  tone = "graphite",
  seam = true,
  field = true,
  tight = false,
  className = "",
  children,
}: SectionProps) {
  const light = tone === "paper" || tone === "paper-100";
  return (
    <section
      id={id}
      className={`band ${tight ? "band--tight" : ""} ${toneClass[tone]} ${
        seam ? (light ? "band-seam--light" : "band-seam") : ""
      } ${className}`}
    >
      {field ? (
        <div className={`field ${light ? "field--light" : ""}`} aria-hidden />
      ) : null}
      <div className="shell relative">{children}</div>
    </section>
  );
}

/* ------------------------------------------------------------- Eyebrow */

export function Eyebrow({
  index,
  label,
  className = "",
  rule = true,
}: {
  index?: string;
  label: string;
  className?: string;
  rule?: boolean;
}) {
  return (
    <div className={`eyebrow t-label ${className}`}>
      {index ? (
        <span className="text-copper-light" aria-hidden>
          {index}
        </span>
      ) : null}
      <span className="opacity-80">{label}</span>
      {rule ? (
        <Reveal kind="rule" className="eyebrow-rule" as="span">
          <span />
        </Reveal>
      ) : null}
    </div>
  );
}

/* --------------------------------------------------------- Section head */

export function SectionHead({
  index,
  label,
  title,
  lede,
  action,
  className = "",
  align = "split",
}: {
  index?: string;
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  action?: ReactNode;
  className?: string;
  align?: "split" | "stack";
}) {
  return (
    <header className={className}>
      <Reveal>
        <Eyebrow index={index} label={label} />
      </Reveal>
      <div
        className={
          align === "split"
            ? "mt-8 grid gap-x-12 gap-y-7 md:mt-11 lg:grid-cols-12"
            : "mt-8 md:mt-11"
        }
      >
        <Reveal delay={60} className={align === "split" ? "lg:col-span-7" : "max-w-4xl"}>
          <h2 className="t-h2">{title}</h2>
        </Reveal>
        {lede ? (
          <Reveal
            delay={120}
            className={
              align === "split"
                ? "lg:col-span-5 lg:pt-2"
                : "mt-6 max-w-2xl"
            }
          >
            <div className="t-lede opacity-72">{lede}</div>
            {action ? <div className="mt-8">{action}</div> : null}
          </Reveal>
        ) : action ? (
          <div className="mt-8">{action}</div>
        ) : null}
      </div>
    </header>
  );
}

/* ------------------------------------------------------------- Buttons */

type ButtonVariant = "primary" | "ghost-dark" | "ghost-light";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  small = false,
  arrow = true,
  className = "",
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  small?: boolean;
  arrow?: boolean;
  className?: string;
} & Omit<React.ComponentProps<typeof Link>, "href" | "children" | "className">) {
  const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
  const cls = `btn btn--${variant} ${small ? "btn--sm" : ""} ${className}`;
  const body = (
    <>
      <span>{children}</span>
      {arrow ? (
        <span className="btn__arrow" aria-hidden>
          &#8594;
        </span>
      ) : null}
    </>
  );

  if (external) {
    return (
      <a href={href} className={cls}>
        {body}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {body}
    </Link>
  );
}

export function ActionLink({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`action ${className}`}>
      <span>{children}</span>
      <span className="action__arrow" aria-hidden>
        &#8594;
      </span>
    </span>
  );
}

/* ---------------------------------------------------- Placeholder marker */

/**
 * Every unverified fact on the site wears one of these. It is deliberately
 * legible rather than subtle: the point of the showcase is that a reader
 * can tell, at a glance, which content is real and which is scaffolding.
 */
export function Provisional({
  children = "Placeholder",
  tone = "dark",
  className = "",
  title,
}: {
  children?: ReactNode;
  tone?: "dark" | "light";
  className?: string;
  title?: string;
}) {
  return (
    <span
      title={title ?? "Placeholder content — to be replaced with verified Daima information"}
      className={`t-label-sm inline-flex items-center gap-1.5 border px-1.5 py-1 align-middle ${
        tone === "dark"
          ? "border-copper-light/35 text-copper-light"
          : "border-copper-ink/35 text-copper-ink"
      } ${className}`}
    >
      <span aria-hidden className="inline-block h-1 w-1 bg-current" />
      {children}
    </span>
  );
}

/** An unfilled figure. Renders as a drawing slot, never as a number. */
export function Slot({ width = "4rem", label }: { width?: string; label?: string }) {
  return (
    <span className="slot" style={{ minWidth: width }} title={label ?? "To be supplied"}>
      <span className="sr-only">To be supplied</span>
    </span>
  );
}

/* ------------------------------------------------------------ Spec list */

export function SpecList({
  items,
  tone = "dark",
  className = "",
}: {
  items: { label: string; value: string | null }[];
  tone?: "dark" | "light";
  className?: string;
}) {
  const line = tone === "dark" ? "border-[var(--rule-dark)]" : "border-[var(--rule-light)]";
  const muted = tone === "dark" ? "text-on-dark-2" : "text-ink-3";
  return (
    <dl className={`grid grid-cols-1 ${className}`}>
      {items.map((item) => (
        <div
          key={item.label}
          className={`flex items-baseline justify-between gap-6 border-t ${line} py-3.5`}
        >
          <dt className={`t-label-sm ${muted}`}>{item.label}</dt>
          <dd className="t-num text-right text-[0.9375rem]">
            {item.value ?? <Slot label={`${item.label} — to be supplied`} />}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ------------------------------------------------------------ Crosshair */

/** A hairline that draws itself left to right when it scrolls into view. */
export function RuleLine({ className = "" }: { className?: string }) {
  return (
    <Reveal kind="rule" as="div" className={`h-px w-full opacity-[0.16] ${className}`}>
      <span />
    </Reveal>
  );
}

export function Tick({ className = "" }: { className?: string }) {
  return <span aria-hidden className={`tick ${className}`} />;
}
