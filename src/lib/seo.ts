import type { Metadata } from "next";
import { company, fact } from "@/content/company";
import { SITE_URL, absoluteUrl } from "./site";

const DEFAULT_OG = "/img/prj-aerial-frame.jpg";

type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  /** Keep a page out of the index — used for drafts and utility pages. */
  noIndex?: boolean;
};

/**
 * One place that builds every page's metadata, so titles, canonicals and
 * Open Graph tags cannot drift apart as pages are added.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG,
  type = "website",
  publishedTime,
  noIndex,
}: PageSeoInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image.startsWith("http") ? image : absoluteUrl(image);

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: `${title} — ${company.name}`,
      description,
      url,
      siteName: company.name,
      locale: "en_KE",
      type,
      ...(publishedTime ? { publishedTime } : {}),
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${company.name}`,
      description,
      images: [ogImage],
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${company.name} — Civil Engineering & Construction, Nairobi`,
    template: `%s — ${company.name}`,
  },
  description: company.oneLiner,
  applicationName: company.name,
  authors: [{ name: company.name }],
  keywords: [
    "civil engineering Nairobi",
    "construction company Nairobi",
    "building contractor Nairobi",
    "structural works Kenya",
    "site works and earthworks Nairobi",
    "renovation contractor Nairobi",
    "construction project management Kenya",
    ...fact(company.serviceArea.areas).map((a) => `construction ${a}`),
  ],
  formatDetection: { telephone: true, address: true, email: true },
  openGraph: {
    type: "website",
    locale: "en_KE",
    siteName: company.name,
    url: SITE_URL,
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg" }],
  },
};
