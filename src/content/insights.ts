/**
 * INSIGHTS
 * ------------------------------------------------------------------
 * A place for Daima to publish practical construction and engineering
 * writing: guidance for clients, maintenance advice, project updates and
 * company news. This is the part of the site that earns search traffic
 * over time, because it answers questions people actually type.
 *
 * The three articles below are written as useful general construction
 * guidance, and they are marked `draft: true`. They contain no claims
 * about Daima's own work. Review them, put the company's own view into
 * them, and set `draft: false` to publish — or delete them and start
 * with Daima's own writing.
 */

import type { ImageKey } from "./images";

export type InsightSection = { heading: string; body: string[] };

export type Insight = {
  slug: string;
  title: string;
  category: "Construction advice" | "Maintenance" | "Project updates" | "Company news";
  /** ISO date. */
  date: string;
  readingMinutes: number;
  excerpt: string;
  image: ImageKey;
  intro: string;
  sections: InsightSection[];
  closing: string;
  seo: { title: string; description: string };
  /** Unreviewed. Drafts are visible in development and hidden in production. */
  draft: boolean;
};

export const insights: Insight[] = [
  {
    slug: "what-to-prepare-before-you-approach-a-contractor",
    title: "What to prepare before you approach a contractor",
    category: "Construction advice",
    date: "2026-07-14",
    readingMinutes: 6,
    excerpt:
      "The difference between a quotation you can rely on and a number that changes every month is usually decided before a contractor is ever contacted.",
    image: "plans-floor",
    intro:
      "Most disputes on small and medium construction projects are not about workmanship. They are about scope — what was included, what was assumed, and what nobody thought to mention. Almost all of it can be prevented by arriving with a few things already settled.",
    sections: [
      {
        heading: "Know what you own",
        body: [
          "A title document and a boundary survey sound like formalities until a wall ends up half a metre over a line. Before any design work, confirm the plot boundaries on the ground, not just on paper, and note anything crossing the site: power lines, water mains, drainage, rights of way.",
          "If a survey does not exist, commissioning one is among the cheapest risk reduction available on a construction project.",
        ],
      },
      {
        heading: "Bring drawings, or expect a range",
        body: [
          "A contractor pricing from a sketch is pricing an assumption. The quotation will either carry a large contingency or it will be low and rise later, and neither outcome is useful to you.",
          "Architectural drawings and, where there is any structure involved, a structural engineer's drawings and bar bending schedules, are what make a fixed price possible. If they do not exist yet, ask for a budget estimate and treat it as exactly that — a range, not a price.",
        ],
      },
      {
        heading: "Decide what 'finished' means",
        body: [
          "Finished is not a shared definition. Does it include external works, boundary walls, landscaping, a water tank, a gate, painting of the perimeter? Does it include fittings, or only the provision for them?",
          "Writing a one-page list of what must be complete for you to consider the job done will expose more disagreements than any other single document.",
        ],
      },
      {
        heading: "Be honest about the budget",
        body: [
          "Withholding a budget in the hope of a lower price usually produces the opposite result: a design that cannot be built for the money, and months lost to redesign.",
          "A contractor who knows the budget can tell you at the outset whether the scope fits inside it, and what would have to change if it does not.",
        ],
      },
    ],
    closing:
      "None of this requires professional knowledge. It requires deciding, in advance, what you actually want — which is the one thing no contractor can do on your behalf.",
    seo: {
      title: "What to prepare before approaching a construction contractor",
      description:
        "Practical guidance for property owners in Nairobi on what to have ready — boundaries, drawings, scope and budget — before asking a construction contractor to price a project.",
    },
    draft: true,
  },
  {
    slug: "why-drainage-decides-the-life-of-a-building",
    title: "Why drainage decides the life of a building",
    category: "Construction advice",
    date: "2026-06-02",
    readingMinutes: 5,
    excerpt:
      "Water is the most common cause of premature building failure, and almost always the cheapest one to have prevented.",
    image: "prj-drainage",
    intro:
      "Structural failures make the news. Water damage does the quiet work: it undermines foundations, corrodes reinforcement, lifts floor slabs and rots roof timbers, usually over years and usually out of sight. Most of it traces back to decisions made in the first weeks of a project.",
    sections: [
      {
        heading: "Water has to go somewhere specific",
        body: [
          "Every drainage system needs a confirmed discharge point, and the levels have to be worked backwards from it. A system designed forwards from the building, without checking where the last pipe ends up, produces flat runs that silt up and gullies that stand full.",
          "Identify and confirm the outfall before designing anything upstream of it. This is the single most common sequencing error in small-project drainage.",
        ],
      },
      {
        heading: "Ground falls away from the building, always",
        body: [
          "Finished ground levels should fall away from the structure in every direction. It sounds obvious, and it is routinely lost during landscaping when topsoil is brought in and spread against a wall, burying the damp proof course.",
          "Check external levels against the damp proof course before the site is handed over, not after the first wet season.",
        ],
      },
      {
        heading: "Roof water is a drainage problem too",
        body: [
          "Gutters and downpipes that discharge onto the ground beside a building saturate the soil supporting the foundation. Connect rainwater downpipes into the drainage system or to a soakaway placed a sensible distance from the structure.",
          "Where rainwater is harvested, the overflow needs the same treatment. A full tank discharges exactly where you did not want water.",
        ],
      },
      {
        heading: "The parts you cannot inspect matter most",
        body: [
          "Falls, bedding and joints on buried drainage are impossible to verify once backfilled. Ask for them to be inspected and photographed before cover, and keep the record.",
          "A drain laid to the wrong fall works acceptably for a year or two, then blocks permanently. By then, finding it means digging up whatever has been built over it.",
        ],
      },
    ],
    closing:
      "Drainage is not the part of the budget anyone is excited to spend on. It is, reliably, the part that determines how the rest of it ages.",
    seo: {
      title: "Why drainage decides the life of a building",
      description:
        "How storm water and foundation drainage affect the long-term life of a building, and the sequencing decisions that prevent water damage — practical guidance from Nairobi.",
    },
    draft: true,
  },
  {
    slug: "a-maintenance-schedule-for-commercial-buildings",
    title: "A maintenance schedule for commercial buildings",
    category: "Maintenance",
    date: "2026-04-21",
    readingMinutes: 7,
    excerpt:
      "Planned maintenance costs a fraction of reactive repair, and the schedule that achieves it fits on one page.",
    image: "svc-renovation",
    intro:
      "Building maintenance tends to be reactive: something fails, someone is called. It is the most expensive way to run a building, because failures rarely happen in isolation and almost never at a convenient time. A simple calendar removes most of it.",
    sections: [
      {
        heading: "Before and after the rains",
        body: [
          "Clear gutters, downpipes, roof outlets, channels and gullies before the rainy season, and inspect them again afterwards. Blocked rainwater goods cause more building damage than any other single maintenance failure.",
          "Check roof coverings, flashings and any penetration through the roof at the same time, while it is still dry enough to work up there.",
        ],
      },
      {
        heading: "Annually",
        body: [
          "Inspect external walls for cracking and record what you find with photographs and dates. A crack that has not moved in three years is a different problem from one that has opened over six months, and only a record tells you which you have.",
          "Check external paint and render, boundary walls, paving falls and drainage covers. Service water tanks, pumps and any standby generator.",
        ],
      },
      {
        heading: "Every three to five years",
        body: [
          "Redecorate externally, review the condition of the roof covering against its expected life, and inspect any exposed structural steel for corrosion at connections and bases.",
          "For reinforced concrete, look for rust staining and spalling, particularly on exposed edges, soffits and anything within reach of standing water.",
        ],
      },
      {
        heading: "Keep the record",
        body: [
          "A maintenance log with dates and photographs is worth more than the individual inspections. It shows what is changing and how fast, which is what turns maintenance from guesswork into planning.",
          "It is also what a buyer, an insurer or a lender will ask for, and it is very difficult to reconstruct afterwards.",
        ],
      },
    ],
    closing:
      "Nothing here needs specialist equipment. It needs a calendar entry, an hour, and somewhere to write down what was found.",
    seo: {
      title: "A planned maintenance schedule for commercial buildings",
      description:
        "A practical, seasonal building maintenance schedule for commercial property owners in Nairobi — what to inspect before and after the rains, annually, and every few years.",
    },
    draft: true,
  },
];

export function publishedInsights(includeDrafts = process.env.NODE_ENV !== "production"): Insight[] {
  return insights
    .filter((i) => includeDrafts || !i.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getInsight(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug);
}

export const insightSlugs = insights.map((i) => i.slug);
