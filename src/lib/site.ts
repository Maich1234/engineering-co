export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://daimacivil.co.ke";

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/approach", label: "Approach" },
  { href: "/contact", label: "Contact" },
] as const;

export const secondaryNav = [
  { href: "/insights", label: "Insights" },
  { href: "/content-notes", label: "Content notes" },
] as const;

export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
