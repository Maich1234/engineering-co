"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealKind = "up" | "plate" | "rule";

type RevealProps = {
  children: ReactNode;
  /** "plate" uncovers an image from its baseline, "rule" draws a line. */
  kind?: RevealKind;
  /** Stagger, in milliseconds. */
  delay?: number;
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * One IntersectionObserver per element, disconnected the moment it fires.
 * No scroll listener, no animation library, no layout reads — the whole
 * motion system is two CSS transitions and a class toggle.
 */
export function Reveal({
  children,
  kind = "up",
  delay = 0,
  as: Tag = "div",
  className,
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window === "undefined" ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.classList.add("is-in");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          observer.disconnect();
        }
      },
      /* threshold 0 with a modest bottom inset: any overlap with the top 92%
         of the viewport fires. A ratio-based threshold needs a percentage of
         the element on screen, which very tall sections and elements pinned
         near the page bottom can never satisfy. */
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Component = Tag as ElementType;

  return (
    <Component
      ref={ref}
      data-reveal={kind}
      className={className}
      style={{ ...style, ...(delay ? { ["--reveal-delay" as string]: `${delay}ms` } : {}) }}
    >
      {children}
    </Component>
  );
}
