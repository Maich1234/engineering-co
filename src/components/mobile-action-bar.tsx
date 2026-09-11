"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { company, fact } from "@/content/company";

const items = (phone: string, whatsapp: string, maps: string) => [
  {
    label: "Call",
    href: `tel:${phone}`,
    icon: (
      <path d="M4 3h3l1.6 4-2 1.4a11 11 0 0 0 5 5L13 11.4 17 13v3a1 1 0 0 1-1.1 1A14 14 0 0 1 3 4.1 1 1 0 0 1 4 3Z" />
    ),
  },
  {
    label: "WhatsApp",
    href: `https://wa.me/${whatsapp.replace(/[^\d]/g, "")}`,
    icon: (
      <path d="M10 2.5a7.5 7.5 0 0 0-6.4 11.4L2.5 17.5l3.7-1a7.5 7.5 0 1 0 3.8-14Zm0 1.6a5.9 5.9 0 1 1-3 11l-.3-.2-2.1.6.6-2-.2-.3A5.9 5.9 0 0 1 10 4.1Zm-2.5 3c-.2 0-.5.1-.6.4-.2.3-.6.7-.6 1.6s.6 1.8.7 2c.1.1 1.2 2 3 2.7 1.5.6 1.8.5 2.1.4.3 0 1-.4 1.2-.8.1-.4.1-.8.1-.9l-.5-.3-1-.5c-.2 0-.3-.1-.4.1l-.6.7c-.1.2-.2.2-.4.1a4.8 4.8 0 0 1-2.3-2c-.2-.3 0-.4.1-.5l.3-.4.2-.4v-.3l-.6-1.4c-.1-.4-.3-.4-.4-.4Z" />
    ),
  },
  {
    label: "Quote",
    href: "/contact#enquiry",
    icon: <path d="M3 3h10l4 4v10H3V3Zm10 0v4h4M6 10h8M6 13h8" />,
    accent: true,
  },
  {
    label: "Directions",
    href: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(maps)}`,
    icon: <path d="M10 2.5c-2.8 0-5 2.2-5 5 0 3.6 5 10 5 10s5-6.4 5-10c0-2.8-2.2-5-5-5Zm0 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />,
  },
];

/**
 * Always-reachable actions on small screens. It hides while the enquiry
 * form is on screen, because the form already carries the same action and
 * a floating bar over a keyboard is a nuisance.
 */
export function MobileActionBar() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target = document.getElementById("enquiry");
    if (!target || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.12 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [pathname]);

  const links = items(
    fact(company.contact.phoneHref),
    fact(company.contact.whatsapp),
    fact(company.contact.mapQuery),
  );

  return (
    <div
      aria-label="Quick actions"
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-[var(--rule-dark)] bg-graphite-950/94 backdrop-blur-md transition-transform duration-500 ease-[var(--ease-out-expo)] md:hidden ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid grid-cols-4">
        {links.map((item) => {
          const inner = (
            <>
              <svg
                viewBox="0 0 20 20"
                className="h-[18px] w-[18px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="square"
                aria-hidden
              >
                {item.icon}
              </svg>
              <span className="t-label-sm tracking-[0.12em]">{item.label}</span>
            </>
          );
          const cls = `flex h-[4.25rem] flex-col items-center justify-center gap-1.5 border-l border-[var(--rule-dark)] first:border-l-0 ${
            item.accent ? "bg-copper text-white" : "text-on-dark-2"
          }`;
          return (
            <li key={item.label}>
              {item.href.startsWith("/") ? (
                <Link href={item.href} className={cls}>
                  {inner}
                </Link>
              ) : (
                <a
                  href={item.href}
                  className={cls}
                  {...(item.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {inner}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
