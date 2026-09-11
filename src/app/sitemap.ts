import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { serviceSlugs } from "@/content/services";
import { projects } from "@/content/projects";
import { insights } from "@/content/insights";

/**
 * Placeholder projects and draft articles are omitted: a sitemap is a
 * statement that a page is ready to be indexed, and those are not.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
      { url: `${SITE_URL}/about`, changeFrequency: "yearly", priority: 0.8 },
      { url: `${SITE_URL}/services`, changeFrequency: "monthly", priority: 0.9 },
      { url: `${SITE_URL}/projects`, changeFrequency: "monthly", priority: 0.9 },
      { url: `${SITE_URL}/approach`, changeFrequency: "yearly", priority: 0.7 },
      { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.8 },
      { url: `${SITE_URL}/insights`, changeFrequency: "weekly", priority: 0.6 },
    ] satisfies MetadataRoute.Sitemap
  ).map((entry) => ({ ...entry, lastModified: now }));

  const serviceRoutes: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${SITE_URL}/services/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects
    .filter((project) => !project.placeholder)
    .map((project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    }));

  const insightRoutes: MetadataRoute.Sitemap = insights
    .filter((insight) => !insight.draft)
    .map((insight) => ({
      url: `${SITE_URL}/insights/${insight.slug}`,
      lastModified: new Date(insight.date),
      changeFrequency: "yearly",
      priority: 0.5,
    }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...insightRoutes];
}
