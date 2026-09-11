/**
 * HOW WE WORK / BUILT AROUND QUALITY / INDUSTRIES
 * ------------------------------------------------------------------
 * The process below describes a sensible way to run a construction
 * project. Confirm with Daima that it matches how they actually work,
 * and change the wording where it does not. A process page that does not
 * describe the real process is worse than no process page.
 *
 * The principles are written as commitments about conduct, not as
 * certifications. No standard, accreditation or code is cited anywhere,
 * because none has been verified. If Daima holds registrations, add them
 * to company.credentials — not here.
 */

import type { ImageKey } from "./images";

export type ProcessStep = {
  index: string;
  title: string;
  summary: string;
  detail: string;
  /** What the client actually receives at the end of this step. */
  output: string;
};

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Consultation",
    summary:
      "We start with what you are trying to achieve, the site, the budget you have in mind and when you need it finished.",
    detail:
      "This is a conversation, not a sales call. Some enquiries turn out to need an architect or a structural engineer before a contractor is any use at all, and it is better to say so at this point than three months later.",
    output: "A clear view of whether and how we can help, and what happens next.",
  },
  {
    index: "02",
    title: "Site Assessment",
    summary:
      "We visit the site, take levels and dimensions, and look at access, ground conditions, services and boundaries.",
    detail:
      "What a site looks like on a plan and what it is like to build on are different things. Access for plant and deliveries, where water goes, what is already buried and how the ground behaves all change the cost and the programme, and all of them are cheaper to discover now.",
    output: "A site assessment covering constraints that affect cost and programme.",
  },
  {
    index: "03",
    title: "Planning & Engineering",
    summary:
      "Drawings, quantities, method and programme are worked out before anyone breaks ground.",
    detail:
      "Scope is written down, quantities are measured from the drawings, the build sequence is set and long-lead materials are identified. This is the stage where problems are cheap to solve — an hour of planning here removes days of standing time later.",
    output: "A priced scope, a programme with dated stages, and an agreed method.",
  },
  {
    index: "04",
    title: "Construction & Execution",
    summary:
      "The work is built to the drawings, inspected at each stage, and reported on as it goes.",
    detail:
      "Work proceeds against the programme with defined hold points — reinforcement before a pour, levels before backfill, services before a slab closes over them. Nothing is covered up before it has been checked, and anything that changes is recorded in writing before it is built.",
    output: "Regular progress reporting, stage inspection records and written variations.",
  },
  {
    index: "05",
    title: "Handover",
    summary:
      "Snags are closed out, records are handed over, and you get a building with its paperwork.",
    detail:
      "A project is not finished when the work stops. The snag list is closed in writing, the site is cleared, and the records — as-built drawings, test results, material approvals and warranties — are handed over as a set. That file is what makes the building maintainable for the next twenty years.",
    output: "A closed snag list and a complete handover file.",
  },
];

export type Principle = {
  index: string;
  title: string;
  body: string;
};

export const principles: Principle[] = [
  {
    index: "01",
    title: "Workmanship",
    body: "The quality of a building is decided by details that are covered up within days — cover to reinforcement, compaction under a slab, a properly formed joint. We build those the same way whether or not anyone is looking, because they are the parts that cannot be put right later.",
  },
  {
    index: "02",
    title: "Engineering precision",
    body: "Dimensions, levels and specifications come from the drawings and are checked against them on site. Where a drawing cannot be built as issued, we raise it with the designer rather than adjusting it ourselves.",
  },
  {
    index: "03",
    title: "Safety",
    body: "Site safety is a planning decision before it is a site one. Access, edge protection, excavation support and plant movement are worked out before the work starts, and the site is set up so the safe way of doing a job is also the practical one.",
  },
  {
    index: "04",
    title: "Reliability",
    body: "A programme is only useful if it is honest. We would rather give a date we can meet than one you want to hear, and tell you early when something has moved, while there is still time to react.",
  },
  {
    index: "05",
    title: "Communication",
    body: "You get one point of contact who knows the project, regular progress updates, and a direct answer when you ask a direct question. Decisions that need a client response come with a deadline attached, so nothing stalls quietly.",
  },
  {
    index: "06",
    title: "Accountability",
    body: "Work is inspected at defined stages and recorded before it is covered. Variations are agreed in writing before they are built. At the end you receive a handover file, so what was done is documented rather than remembered.",
  },
];

export type Industry = {
  name: string;
  description: string;
  /** Project categories that map to this industry, for cross-linking. */
  category: string;
};

export const industries: Industry[] = [
  {
    name: "Residential",
    description:
      "Private homes, apartment blocks and residential developments — from substructure through to finishes and external works.",
    category: "Residential",
  },
  {
    name: "Commercial",
    description:
      "Offices, retail and mixed-use buildings, including shell-and-core delivery and refurbishment of occupied premises.",
    category: "Commercial",
  },
  {
    name: "Institutional",
    description:
      "Schools, clinics and places of worship, where the works usually have to be phased around a building that stays in use.",
    category: "Institutional",
  },
  {
    name: "Industrial",
    description:
      "Warehouses, workshops and light industrial facilities, where floor slabs, yard works and vehicle access govern the design.",
    category: "Industrial",
  },
  {
    name: "Infrastructure",
    description:
      "Access roads, drainage, culverts and external works, whether standalone or as the enabling package for a larger development.",
    category: "Infrastructure",
  },
];

export type CredibilityPoint = { label: string; body: string; image?: ImageKey };

/**
 * The "why trust us" block. Every claim here is about method, not about
 * scale or history, and so is defensible without documentation.
 */
export const credibilityPoints: CredibilityPoint[] = [
  {
    label: "Built to the drawing",
    body: "Work is set out from the approved drawings and checked against them at each stage, not adjusted to suit what is convenient on the day.",
  },
  {
    label: "Checked before it is covered",
    body: "Reinforcement, levels and buried services are inspected and photographed before anything closes over them.",
  },
  {
    label: "Written before it is built",
    body: "Variations are agreed in writing before the work proceeds, so the final account holds no surprises.",
  },
];
