import Link from "next/link";
import { Backdrop } from "@/components/plate";
import { ButtonLink } from "@/components/primitives";
import { nav } from "@/lib/site";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section
      className="relative isolate flex min-h-[88svh] flex-col justify-end overflow-hidden bg-graphite-950"
      style={{ paddingTop: "var(--header-h)" }}
    >
      <Backdrop image="det-concrete-wall" priority sizes="100vw" />
      <div aria-hidden className="absolute inset-0 bg-graphite-950/82" />
      <div className="field" aria-hidden />

      <div className="shell relative pb-16 pt-20">
        <p className="t-num text-[0.75rem] tracking-[0.2em] text-copper-light">ERROR 404</p>
        <h1 className="t-h1 mt-6 max-w-2xl">This page is not on the drawing.</h1>
        <p className="t-lede mt-6 max-w-lg opacity-72">
          The address you followed does not exist, or the page has moved. The
          sections below cover everything on the site.
        </p>

        <nav aria-label="Site" className="mt-10 border-t border-[var(--rule-dark)]">
          {nav.slice(1).map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-baseline gap-5 border-b border-[var(--rule-dark)] py-4"
            >
              <span className="t-num w-8 shrink-0 text-[0.6875rem] tracking-[0.16em] text-copper-light">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="t-h4 transition-colors group-hover:text-copper-light">
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href="/" variant="primary">
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact#enquiry" variant="ghost-dark">
            Request a Consultation
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
