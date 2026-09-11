/**
 * SERVICES
 * ------------------------------------------------------------------
 * Each entry describes what the discipline covers — not what Daima has
 * already delivered. Before publishing, walk this list with the company
 * and DELETE any service they do not actually offer. Removing an entry
 * from this array removes it from the homepage, the services index, the
 * navigation, the sitemap and the enquiry form's project-type list.
 */

import type { ImageKey } from "./images";

export type Service = {
  slug: string;
  /** Full name, used as the page <h1>. */
  title: string;
  /** Shorter label for cards and menus. */
  navTitle: string;
  /** Two-digit index shown in the technical rail. */
  index: string;
  /** One line, used on the homepage block and in meta descriptions. */
  summary: string;
  /** Two or three sentences for the service page intro. */
  intro: string;
  image: ImageKey;
  detailImage: ImageKey;
  /** What the work typically covers. Confirm and trim per Daima. */
  scope: string[];
  /** What a client receives. Confirm and trim per Daima. */
  deliverables: string[];
  seo: { title: string; description: string };
  /** Flip to true once the company has confirmed this service. */
  confirmed: boolean;
};

export const services: Service[] = [
  {
    slug: "civil-engineering",
    title: "Civil Engineering",
    navTitle: "Civil Engineering",
    index: "01",
    summary:
      "Groundworks, drainage, roads and the buried infrastructure a site depends on before anything is built above it.",
    intro:
      "Civil engineering is the part of a project that is hardest to correct later. It sets the levels a building sits on, decides where water goes, and carries the loads everything above it will impose. The work is specified from survey data and drawings, then built and checked against them.",
    image: "svc-civil",
    detailImage: "prj-drainage",
    scope: [
      "Site survey, setting out and level control",
      "Excavation, cut and fill, and ground preparation",
      "Storm water drainage, channels and culverts",
      "Sewer lines, manholes and service connections",
      "Access roads, hardstanding and paving",
      "Retaining structures and slope stabilisation",
    ],
    deliverables: [
      "Setting-out records against the approved drawings",
      "Levels and as-built dimensions on completion",
      "Materials records for imported fill and hardcore",
      "Photographic record of work before it is covered",
    ],
    seo: {
      title: "Civil Engineering Services in Nairobi",
      description:
        "Civil engineering works in Nairobi and the surrounding counties — groundworks, drainage, sewer connections, access roads and retaining structures, set out and built to drawing.",
    },
    confirmed: false,
  },
  {
    slug: "building-construction",
    title: "Building Construction",
    navTitle: "Building Construction",
    index: "02",
    summary:
      "Residential, commercial and institutional buildings taken from a cleared site through to a finished, handed-over structure.",
    intro:
      "Building construction pulls every other trade into one programme. The sequence matters as much as the workmanship: substructure, frame, envelope, services, finishes — each one held to the drawings and checked before the next covers it up.",
    image: "svc-building",
    detailImage: "frame-timber-formwork",
    scope: [
      "Substructure, foundations and ground floor slabs",
      "Reinforced concrete frames, columns and beams",
      "Masonry, blockwork and partitioning",
      "Roof structure and covering",
      "Plaster, screed, tiling and internal finishes",
      "Coordination of mechanical and electrical first and second fix",
    ],
    deliverables: [
      "A construction programme with named stages and hold points",
      "Stage inspections recorded before cover-up",
      "Material approvals agreed with the client before ordering",
      "A snag list closed out in writing before handover",
    ],
    seo: {
      title: "Building Construction Services in Nairobi",
      description:
        "Building construction in Nairobi — residential, commercial and institutional projects taken from substructure through frame, envelope and finishes to handover.",
    },
    confirmed: false,
  },
  {
    slug: "structural-works",
    title: "Structural Works",
    navTitle: "Structural Works",
    index: "03",
    summary:
      "Reinforced concrete and load-bearing elements built strictly to the structural engineer's drawings and schedules.",
    intro:
      "Structural work is the part of a build with the least tolerance for improvisation. Bar sizes, spacing, cover, lap lengths and concrete grade are specified by the structural engineer, and the job on site is to reproduce them exactly and prove that it was done.",
    image: "svc-structural",
    detailImage: "det-rebar-cage",
    scope: [
      "Foundations — pad, strip, raft and pile caps",
      "Reinforced concrete columns, beams and suspended slabs",
      "Formwork, falsework and propping",
      "Steel fixing to bar bending schedules",
      "Concrete placement, compaction and curing",
      "Retaining walls and water-retaining structures",
    ],
    deliverables: [
      "Pre-pour inspection sign-off on reinforcement and cover",
      "Concrete delivery records and cube test results",
      "Formwork striking times recorded against the specification",
      "Dimensional check against the structural drawings",
    ],
    seo: {
      title: "Structural Works & Reinforced Concrete — Nairobi",
      description:
        "Reinforced concrete and structural works in Nairobi — foundations, columns, beams, suspended slabs and retaining walls built to the structural engineer's drawings and schedules.",
    },
    confirmed: false,
  },
  {
    slug: "renovation-and-maintenance",
    title: "Renovation & Maintenance",
    navTitle: "Renovation & Maintenance",
    index: "04",
    summary:
      "Refurbishment, structural repair and planned maintenance for buildings that are already standing — and often still occupied.",
    intro:
      "Work on an existing building is a different discipline from new build. What is behind the finish is rarely what the drawings say, occupants usually need to keep using the place, and the sequence has to be planned around that rather than around the concrete.",
    image: "svc-renovation",
    detailImage: "reno-scaffold",
    scope: [
      "Condition survey and defect identification",
      "Concrete repair, crack treatment and waterproofing",
      "Structural alterations, openings and strengthening",
      "Roof repair and rainwater goods",
      "Re-plastering, redecoration and floor renewal",
      "Planned and reactive building maintenance",
    ],
    deliverables: [
      "A defect schedule with photographs before work starts",
      "A phasing plan where the building stays in use",
      "Agreed containment, access and working-hours arrangements",
      "A record of what was found once finishes were opened up",
    ],
    seo: {
      title: "Building Renovation & Maintenance — Nairobi",
      description:
        "Renovation, structural repair and planned building maintenance in Nairobi — condition surveys, concrete repair, alterations and refurbishment, phased around buildings still in use.",
    },
    confirmed: false,
  },
  {
    slug: "site-works",
    title: "Site Works",
    navTitle: "Site Works",
    index: "05",
    summary:
      "Clearance, bulk earthworks, levelling and external works that turn raw ground into a site a project can start on.",
    intro:
      "Site works decide how straightforward the rest of the project will be. Getting levels, access, drainage falls and material movement right at the start removes a long series of problems that are expensive to solve once the structure is up.",
    image: "svc-siteworks",
    detailImage: "dozer-sky",
    scope: [
      "Site clearance and demolition of existing structures",
      "Bulk excavation, cut and fill and material haulage",
      "Levelling, compaction and formation preparation",
      "Temporary access, haul roads and site hoarding",
      "External works — paving, kerbs, parking and boundary walls",
      "Landscaping preparation and topsoil placement",
    ],
    deliverables: [
      "Pre- and post-earthworks levels for volume agreement",
      "Compaction test results where the specification requires them",
      "Haulage and disposal records",
      "A set-out site with confirmed boundaries and benchmarks",
    ],
    seo: {
      title: "Site Works & Earthworks Contractors — Nairobi",
      description:
        "Site clearance, bulk earthworks, levelling, access roads and external works in Nairobi and the surrounding counties.",
    },
    confirmed: false,
  },
  {
    slug: "project-management",
    title: "Project Management",
    navTitle: "Project Management",
    index: "06",
    summary:
      "Programme, cost control, trade coordination and reporting — so the client knows where the project stands without having to be on site.",
    intro:
      "Most project problems are not technical. They come from decisions that were never made, materials that were never ordered, or two trades arriving at the same place on the same day. Project management is the work of preventing those, and of telling the client the truth about progress early enough to do something about it.",
    image: "svc-management",
    detailImage: "crew-drawings",
    scope: [
      "Programme preparation and progress tracking",
      "Procurement schedules and material lead-time management",
      "Subcontractor selection and coordination",
      "Cost tracking against the agreed budget",
      "Quality inspections and hold points",
      "Client reporting and decision deadlines",
    ],
    deliverables: [
      "A baseline programme and regular progress updates",
      "A single point of contact for the whole project",
      "Written variation records before extra work proceeds",
      "A handover file with drawings, records and warranties",
    ],
    seo: {
      title: "Construction Project Management — Nairobi",
      description:
        "Construction project management in Nairobi — programme, procurement, trade coordination, cost tracking and client reporting from start on site to handover.",
    },
    confirmed: false,
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const serviceSlugs = services.map((s) => s.slug);
