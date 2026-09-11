"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/lib/site";
import { company, fact } from "@/content/company";
import { Wordmark } from "./logo";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  /* Nav changes appearance once the hero is behind it. rAF-throttled, and
     the state only ever flips at the boundary, so React does almost nothing. */
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setScrolled(window.scrollY > 24);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* Close the menu when the route changes. Adjusting state during render
     is the supported way to react to a changed prop without an effect —
     an effect here would render the open menu once before closing it. */
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <a
        href="#main"
        className="t-label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-copper focus:px-4 focus:py-3 focus:text-white"
      >
        Skip to content
      </a>

      <header
        data-scrolled={scrolled || undefined}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled || open
            ? "border-b border-[var(--rule-dark)] bg-graphite-950/88 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div
          className="shell flex items-center justify-between transition-[height] duration-500"
          style={{ height: "var(--header-h)" }}
        >
          <Link
            href="/"
            className="-ml-1 py-2 pl-1 pr-3 text-on-dark"
            aria-label={`${company.name} — home`}
          >
            <Wordmark />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="t-label group relative py-2 text-on-dark-2 transition-colors duration-300 hover:text-on-dark aria-[current=page]:text-on-dark"
              >
                {item.label}
                <span
                  aria-hidden
                  className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-copper transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                    isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/contact#enquiry" className="btn btn--primary btn--sm hidden sm:inline-flex">
              <span>Request a Quote</span>
              <span className="btn__arrow" aria-hidden>
                &#8594;
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="nav-panel"
              className="group -mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span className="relative block h-3 w-6">
                <span
                  className={`absolute left-0 block h-px w-6 bg-current transition-transform duration-400 ease-[var(--ease-out-expo)] ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-6 bg-current transition-transform duration-400 ease-[var(--ease-out-expo)] ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / tablet panel */}
      <div
        id="nav-panel"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-0 z-40 bg-graphite-950 lg:hidden"
      >
        <div className="blueprint" aria-hidden />
        <div
          /* Clears the fixed quick-action bar, which stays reachable over the panel. */
          className="shell relative flex h-full flex-col overflow-y-auto pb-28"
          style={{ paddingTop: "calc(var(--header-h) + 2rem)" }}
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-baseline gap-5 border-t border-[var(--rule-dark)] py-5"
              >
                <span className="t-label-sm w-6 shrink-0 text-copper-light">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="text-[2rem] font-medium leading-none tracking-[-0.03em] transition-colors group-hover:text-copper-light"
                  style={{ fontStretch: "94%" }}
                >
                  {item.label}
                </span>
              </Link>
            ))}
            <Link
              href="/insights"
              className="group flex items-baseline gap-5 border-y border-[var(--rule-dark)] py-5"
            >
              <span className="t-label-sm w-6 shrink-0 text-copper-light">07</span>
              <span
                className="text-[2rem] font-medium leading-none tracking-[-0.03em] transition-colors group-hover:text-copper-light"
                style={{ fontStretch: "94%" }}
              >
                Insights
              </span>
            </Link>
          </nav>

          <div className="mt-9 grid gap-3">
            <Link href="/contact#enquiry" className="btn btn--primary justify-center">
              <span>Request a Quote</span>
            </Link>
            <a
              href={`tel:${fact(company.contact.phoneHref)}`}
              className="btn btn--ghost-dark justify-center"
            >
              <span>Call {fact(company.contact.phone)}</span>
            </a>
          </div>

          <p className="t-label-sm mt-8 opacity-45">
            {fact(company.serviceArea.base)} &middot; {fact(company.contact.email)}
          </p>
        </div>
      </div>
    </>
  );
}
