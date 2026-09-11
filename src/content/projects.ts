/**
 * PROJECTS
 * ------------------------------------------------------------------
 * !! EVERY RECORD BELOW IS A PLACEHOLDER. !!
 *
 * None of these are Daima projects. They exist so the portfolio grid,
 * the project pages and the filters can be seen working, and so that the
 * shape of a real record is obvious to whoever fills them in.
 *
 * Project titles are deliberately written as project *types* rather than
 * invented job names, locations are real places in the Nairobi area used
 * only to show how the grid reads, and every numeric fact is left as an
 * empty slot (`null`) instead of being made up.
 *
 * TO PUBLISH A REAL PROJECT:
 *   1. Replace the title, location, sector and dates with the real ones.
 *   2. Fill the `specs` values. A `null` renders as an empty slot on the
 *      page, so an unfinished record is visible rather than misleading.
 *   3. Swap the image keys for Daima's own photographs.
 *   4. Set `placeholder: false`. The "placeholder record" marker on the
 *      card and the page disappears, and it drops off /content-notes.
 */

import type { ImageKey } from "./images";

export type ProjectCategory =
  | "Residential"
  | "Commercial"
  | "Industrial"
  | "Institutional"
  | "Infrastructure";

export type ProjectStatus = "Completed" | "In progress" | "On hold";

export type Project = {
  slug: string;
  title: string;
  /** Shown under the title on cards. Real geography, placeholder association. */
  location: string;
  county: string;
  category: ProjectCategory;
  /** Sector only — never a client name without written permission. */
  sector: string;
  status: ProjectStatus;
  /** Year or range. `null` renders as an empty slot. */
  completion: string | null;
  /** One line on the card. */
  scopeSummary: string;
  /** Long-form page content. */
  overview: string[];
  scopeOfWork: string[];
  approach: string[];
  challenges: { challenge: string; solution: string }[];
  outcome: string;
  /** Key/value rows for the technical spec table. `null` = unfilled slot. */
  specs: { label: string; value: string | null }[];
  heroImage: ImageKey;
  cardImage: ImageKey;
  gallery: ImageKey[];
  /** Slugs of related projects. */
  related: string[];
  /** Service slugs this project drew on. */
  servicesUsed: string[];
  /** Leave true until the record holds real, checked information. */
  placeholder: boolean;
  /** Pin to the homepage selection. */
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "four-storey-residential-apartment-block",
    title: "Four-Storey Residential Apartment Block",
    location: "Kiambu Road, Nairobi",
    county: "Nairobi County",
    category: "Residential",
    sector: "Private developer",
    status: "Completed",
    completion: null,
    scopeSummary:
      "Substructure, reinforced concrete frame, masonry envelope and internal finishes.",
    overview: [
      "A four-storey residential block on a sloping plot, built from a reinforced concrete frame with masonry infill. The fall across the site meant the substructure had to be stepped, and the retaining edge on the high side was built before any frame work started.",
      "The building was delivered floor by floor, with each slab signed off before the next lift of columns went up, so that reinforcement and cover could be checked while they were still visible.",
    ],
    scopeOfWork: [
      "Site clearance, setting out and bulk excavation",
      "Stepped strip foundations and ground beams",
      "Reinforced concrete frame — columns, beams and suspended slabs",
      "Masonry walling and internal blockwork partitions",
      "Roof structure and covering",
      "Plaster, screed, tiling and painting",
      "External drainage, paving and boundary wall",
    ],
    approach: [
      "Levels were established from a single benchmark and carried up the building on every lift, rather than re-measuring from the floor below each time. Small setting-out errors compound over four storeys, and this is the cheapest way to stop them.",
      "Reinforcement was inspected against the bar bending schedule before every pour, with cover blocks checked at the same time. Concrete was ordered by grade with delivery tickets kept, and cubes taken for each pour.",
      "Finishes did not start on a floor until the slab above it was cast and the floor was watertight, which kept plaster and screed out of the weather.",
    ],
    challenges: [
      {
        challenge:
          "A cross-fall of roughly two metres across the plot made a single foundation level impossible without a large volume of fill.",
        solution:
          "The substructure was stepped along the contour and a retaining edge was built on the high side, which removed most of the imported fill and the settlement risk that comes with it.",
      },
      {
        challenge:
          "Neighbouring plots were occupied, so excavation and material deliveries could not spill past the boundary.",
        solution:
          "Deliveries were scheduled into fixed windows and spoil was removed the same day it was dug, which kept the working area inside the hoarding line throughout.",
      },
    ],
    outcome:
      "A completed and occupied residential block, handed over with a closed snag list and a record set of drawings and test results.",
    specs: [
      { label: "Storeys", value: "4" },
      { label: "Gross floor area", value: null },
      { label: "Units", value: null },
      { label: "Structure", value: "Reinforced concrete frame" },
      { label: "Contract duration", value: null },
      { label: "Contract type", value: null },
    ],
    heroImage: "prj-aerial-frame",
    cardImage: "prj-residential",
    gallery: ["crew-rebar-wall", "det-beams-rebar", "crew-slab-pour", "frame-timber-formwork", "det-concrete-wall", "prj-residential"],
    related: ["reinforced-concrete-foundations-and-substructure", "school-classroom-block"],
    servicesUsed: ["building-construction", "structural-works", "civil-engineering"],
    placeholder: true,
    featured: true,
  },
  {
    slug: "commercial-office-shell-and-core",
    title: "Commercial Office Shell & Core",
    location: "Westlands, Nairobi",
    county: "Nairobi County",
    category: "Commercial",
    sector: "Commercial property owner",
    status: "Completed",
    completion: null,
    scopeSummary:
      "Frame, envelope, core and base build handed over ready for tenant fit-out.",
    overview: [
      "A commercial office building taken to shell-and-core: structure, envelope, cores, risers and base services complete, with the floor plates left open for incoming tenants to fit out.",
      "Shell-and-core has a particular discipline to it. Anything built in the wrong place has to be cut out again by the fit-out contractor, so the coordination of risers, floor boxes and penetrations matters more than the visible finish.",
    ],
    scopeOfWork: [
      "Reinforced concrete frame and core walls",
      "Suspended floor slabs and power-floated finish",
      "External envelope and glazing interface",
      "Stair cores, lift shaft and riser construction",
      "Base build drainage, service entries and builder's work",
      "External hardstanding, parking and drainage",
    ],
    approach: [
      "Riser and penetration positions were fixed from the coordinated services drawings before the slabs were cast, not cut afterwards. Every penetration was set out, boxed and recorded.",
      "Floor slabs were power-floated to a flatness the fit-out could build off directly, which removed a screed layer from the follow-on programme.",
      "The core was kept ahead of the frame so that vertical access and service routes were available to the trades working below.",
    ],
    challenges: [
      {
        challenge:
          "A constrained urban plot with no room for material laydown or a fixed crane base clear of the building footprint.",
        solution:
          "Materials were called off against a delivery schedule rather than stockpiled, and the site layout was re-planned at each stage so the working area moved with the structure.",
      },
      {
        challenge:
          "Tenant requirements were still being agreed while the frame was going up.",
        solution:
          "Provision was built in where it was cheap to do so — spare riser capacity and generous penetrations — and decisions with real cost consequences were given written deadlines.",
      },
    ],
    outcome:
      "A shell-and-core building handed over with coordinated service entries and a record set of drawings that the fit-out contractors could work from directly.",
    specs: [
      { label: "Storeys", value: null },
      { label: "Gross floor area", value: null },
      { label: "Structure", value: "Reinforced concrete frame and core" },
      { label: "Floor finish", value: "Power-floated slab" },
      { label: "Contract duration", value: null },
      { label: "Contract type", value: null },
    ],
    heroImage: "prj-office-interior",
    cardImage: "shell-interior",
    gallery: ["soffit-tower", "det-steel-frame", "prj-office-interior", "scaffold-grid", "det-concrete-curve", "shell-interior"],
    related: ["office-block-refurbishment", "warehouse-and-logistics-facility"],
    servicesUsed: ["building-construction", "structural-works", "project-management"],
    placeholder: true,
    featured: true,
  },
  {
    slug: "warehouse-and-logistics-facility",
    title: "Warehouse & Logistics Facility",
    location: "Athi River, Machakos County",
    county: "Machakos County",
    category: "Industrial",
    sector: "Industrial / logistics operator",
    status: "Completed",
    completion: null,
    scopeSummary:
      "Bulk earthworks, heavy-duty floor slab, portal frame envelope and yard works.",
    overview: [
      "A single-span warehouse with an attached office block, built on a flat industrial plot. The defining element of a building like this is the floor: it takes racking loads and forklift traffic for decades, and it is the one thing that cannot be repaired without stopping the operation.",
      "The yard was designed and built alongside the building, because articulated vehicle movements dictate the geometry of everything outside the wall line.",
    ],
    scopeOfWork: [
      "Bulk earthworks, formation preparation and compaction",
      "Heavy-duty ground-bearing floor slab",
      "Pad foundations and holding-down bolt setting",
      "Portal frame erection and cladding interface",
      "Attached office block and amenity areas",
      "Yard hardstanding, drainage and vehicle circulation",
    ],
    approach: [
      "The formation was compacted and tested before any slab work, because a floor slab reproduces whatever is underneath it.",
      "Holding-down bolts were set from a steel template surveyed into position rather than measured off the shuttering, which is the difference between a frame that lands and a frame that has to be packed.",
      "The floor was poured in bays sized around the joint layout, then cured under cover to control early shrinkage cracking.",
    ],
    challenges: [
      {
        challenge:
          "Floor flatness and joint positions had to suit racking and forklift routes that were not finalised at the start.",
        solution:
          "Joint layout was agreed with the operator before the pour sequence was fixed, and the slab was specified to the more demanding of the two possible racking layouts.",
      },
      {
        challenge:
          "Surface water across a large impermeable yard area.",
        solution:
          "Falls and gully positions were set out from the survey and checked with a level before the sub-base was sealed, rather than corrected afterwards with patching.",
      },
    ],
    outcome:
      "A warehouse handed over with a tested floor slab, a yard that drains, and a frame erected without packing or remedial work.",
    specs: [
      { label: "Floor area", value: null },
      { label: "Clear height", value: null },
      { label: "Structure", value: "Steel portal frame on pad foundations" },
      { label: "Floor slab", value: "Ground-bearing, power-floated" },
      { label: "Contract duration", value: null },
      { label: "Contract type", value: null },
    ],
    heroImage: "prj-industrial",
    cardImage: "prj-industrial",
    gallery: ["prj-warehouse-interior", "det-steel-frame", "mat-aggregate", "bldg-minimal", "prj-warehouse-interior", "dozer-sky"],
    related: ["site-clearance-and-bulk-earthworks", "commercial-office-shell-and-core"],
    servicesUsed: ["site-works", "building-construction", "civil-engineering"],
    placeholder: true,
    featured: true,
  },
  {
    slug: "school-classroom-block",
    title: "School Classroom Block",
    location: "Ruiru, Kiambu County",
    county: "Kiambu County",
    category: "Institutional",
    sector: "Educational institution",
    status: "Completed",
    completion: null,
    scopeSummary:
      "Two-storey classroom block delivered in phases around an operating school.",
    overview: [
      "A two-storey classroom block built on the grounds of a school that stayed open throughout. Institutional work carries a constraint that private sites do not: children are on the other side of the hoarding, every day, and the programme has to be built around that fact rather than the other way round.",
      "The heavier and noisier operations were planned into school holidays, and the working area was fully separated from circulation routes for the rest of the year.",
    ],
    scopeOfWork: [
      "Setting out within an operating school compound",
      "Strip foundations and ground floor slab",
      "Reinforced concrete frame and suspended first floor",
      "Masonry walling, windows and doors",
      "Roof structure and covering",
      "Internal finishes, external plaster and painting",
      "Walkways, drainage and site reinstatement",
    ],
    approach: [
      "Site separation was designed first: a single gated access away from the school entrance, solid hoarding, and no plant movement during arrival and departure times.",
      "Concrete pours and demolition were scheduled into holiday periods. Work that could be done quietly continued through term time.",
      "The block was finished and cleaned room by room so that completed classrooms could be brought into use before the whole contract closed out.",
    ],
    challenges: [
      {
        challenge:
          "An occupied school compound with pedestrian routes crossing the natural site access.",
        solution:
          "A separate gated entrance was formed and all deliveries were timetabled outside arrival and departure windows, with a banksman on every vehicle movement.",
      },
      {
        challenge:
          "A fixed academic calendar left no room for the programme to slip.",
        solution:
          "Long-lead items were ordered before work started and float was held at the end of each phase rather than at the end of the contract, where it would have been no use.",
      },
    ],
    outcome:
      "Classrooms handed over in time for the academic term, with the school having operated without interruption throughout the works.",
    specs: [
      { label: "Storeys", value: "2" },
      { label: "Classrooms", value: null },
      { label: "Gross floor area", value: null },
      { label: "Structure", value: "Reinforced concrete frame with masonry infill" },
      { label: "Contract duration", value: null },
      { label: "Contract type", value: null },
    ],
    heroImage: "prj-institutional",
    cardImage: "bldg-minimal",
    gallery: ["crew-formwork", "crew-frame-slabs", "det-concrete-wall", "prj-institutional", "crew-scaffold", "bldg-minimal"],
    related: ["four-storey-residential-apartment-block", "office-block-refurbishment"],
    servicesUsed: ["building-construction", "project-management", "structural-works"],
    placeholder: true,
    featured: true,
  },
  {
    slug: "estate-access-road-and-drainage",
    title: "Estate Access Road & Drainage",
    location: "Ruaka, Kiambu County",
    county: "Kiambu County",
    category: "Infrastructure",
    sector: "Residential estate management",
    status: "Completed",
    completion: null,
    scopeSummary:
      "Access road, storm water drainage, culverts and surface reinstatement.",
    overview: [
      "An estate access road rebuilt with a proper drainage system. The road surface was the visible problem; standing water with nowhere to go was the actual one. Resurfacing without fixing the drainage would have bought a season or two at most.",
      "Levels were surveyed across the whole estate before any design decisions were made, so that falls could be set to somewhere water could actually discharge.",
    ],
    scopeOfWork: [
      "Topographic survey and drainage level design",
      "Excavation and removal of failed pavement",
      "Sub-base preparation and compaction",
      "Storm water channels, culverts and outfall connection",
      "Base course and surfacing",
      "Kerbs, edge restraint and reinstatement",
    ],
    approach: [
      "The outfall was identified and confirmed first. Every gully and channel level was then worked backwards from it, which is the only order that produces a drainage system that actually runs.",
      "The failed pavement was dug out rather than overlaid, because a new surface over a failed base fails in the same places.",
      "Compaction was tested at formation and sub-base before surfacing, so that the road was signed off on the layers nobody can see afterwards.",
    ],
    challenges: [
      {
        challenge:
          "Residents needed vehicle access to their homes for the whole of the works.",
        solution:
          "The road was rebuilt in half-widths with a signed running lane maintained throughout, and each section was reopened before the next was closed.",
      },
      {
        challenge:
          "The available outfall was shallower than the required falls first suggested.",
        solution:
          "Channel gradients were re-set across the full length from the outfall backwards, and one culvert crossing was lowered, rather than accepting a flat run that would silt up.",
      },
    ],
    outcome:
      "An access road that drains to a confirmed outfall, with compaction and levels recorded at each layer.",
    specs: [
      { label: "Road length", value: null },
      { label: "Carriageway width", value: null },
      { label: "Surfacing", value: null },
      { label: "Drainage", value: "Lined channels, culverts and piped outfall" },
      { label: "Contract duration", value: null },
      { label: "Contract type", value: null },
    ],
    heroImage: "prj-road",
    cardImage: "prj-road",
    gallery: ["road-paver", "prj-drainage", "svc-civil", "svc-siteworks", "mat-aggregate", "prj-road"],
    related: ["site-clearance-and-bulk-earthworks", "warehouse-and-logistics-facility"],
    servicesUsed: ["civil-engineering", "site-works"],
    placeholder: true,
    featured: true,
  },
  {
    slug: "reinforced-concrete-foundations-and-substructure",
    title: "Reinforced Concrete Foundations & Substructure",
    location: "Syokimau, Machakos County",
    county: "Machakos County",
    category: "Residential",
    sector: "Private client",
    status: "Completed",
    completion: null,
    scopeSummary:
      "Excavation, blinding, reinforcement, foundation pours and ground beams.",
    overview: [
      "A substructure package taken from excavation through to a completed ground floor slab, ready for a following contractor to build off. The whole value of this kind of package is in what can be proved afterwards, because none of it is visible once it is backfilled.",
      "Every stage was inspected and photographed before it was covered, and the records were handed over with the works.",
    ],
    scopeOfWork: [
      "Setting out from the boundary survey",
      "Excavation to formation and inspection of bearing strata",
      "Blinding, reinforcement fixing and cover control",
      "Foundation and ground beam concrete",
      "Backfilling, hardcore and blinding to slab",
      "Damp proof membrane and ground floor slab",
    ],
    approach: [
      "Formation level was inspected before blinding, and the excavation was left open for the engineer's approval rather than being covered on the contractor's own judgement.",
      "Reinforcement was fixed to the bar bending schedule with cover blocks at the specified spacing, and checked against the drawing before each pour.",
      "Concrete was placed by grade with delivery tickets retained and cubes taken, then cured rather than left to dry.",
    ],
    challenges: [
      {
        challenge:
          "Variable ground conditions across the footprint, with softer material in one corner.",
        solution:
          "The excavation was extended in that area to reach consistent bearing material and the depth change was recorded on the as-built drawing, rather than being made up with fill.",
      },
      {
        challenge:
          "A following contractor needed to start immediately on completion.",
        solution:
          "Setting-out marks, levels and the record set were handed over as a package on the day of completion so the next trade could build straight off them.",
      },
    ],
    outcome:
      "A completed substructure handed over with inspection records, concrete test results and an as-built set covering everything now buried.",
    specs: [
      { label: "Foundation type", value: null },
      { label: "Footprint area", value: null },
      { label: "Concrete grade", value: null },
      { label: "Records issued", value: "Pre-pour inspections, cube results, as-built levels" },
      { label: "Contract duration", value: null },
      { label: "Contract type", value: null },
    ],
    heroImage: "hero-foundation-mat",
    cardImage: "crew-slab-pour",
    gallery: ["det-rebar-cage", "crew-rebar-wall", "hero-foundation-mat", "det-beams-rebar", "crew-slab-pour", "mat-aggregate"],
    related: ["four-storey-residential-apartment-block", "site-clearance-and-bulk-earthworks"],
    servicesUsed: ["structural-works", "civil-engineering"],
    placeholder: true,
    featured: false,
  },
  {
    slug: "office-block-refurbishment",
    title: "Office Block Refurbishment",
    location: "Nairobi Central Business District",
    county: "Nairobi County",
    category: "Commercial",
    sector: "Commercial property owner",
    status: "Completed",
    completion: null,
    scopeSummary:
      "Phased refurbishment of an occupied office building, floor by floor.",
    overview: [
      "A refurbishment of an office building that stayed in use throughout. Tenants remained on the floors above and below the work, which set the terms for noise, dust, access and working hours before anything else was decided.",
      "Opening up an existing building always finds something the drawings did not show. The programme was built with that expectation rather than against it.",
    ],
    scopeOfWork: [
      "Condition survey and asbestos-aware strip-out planning",
      "Soft strip and removal of existing finishes",
      "Concrete repair and localised structural works",
      "New partitions, ceilings and floor finishes",
      "Services alterations and builder's work in connection",
      "Redecoration and common area upgrade",
    ],
    approach: [
      "Work ran floor by floor with full separation from occupied areas: dust screens, negative pressure where needed, and protected routes for material movement.",
      "Noisy operations were confined to agreed windows outside core business hours and communicated to tenants in advance.",
      "Each floor was surveyed and photographed before strip-out, and again once opened up, so that variations could be agreed against evidence rather than argued about.",
    ],
    challenges: [
      {
        challenge:
          "Existing services did not match the record drawings once ceilings were opened.",
        solution:
          "The floor was re-surveyed as found and the layout was adjusted before installation started, which was cheaper than discovering the clash at second fix.",
      },
      {
        challenge:
          "Tenants remained in occupation directly above and below the works.",
        solution:
          "Noise and dust-generating work was scheduled outside business hours under a published programme, and a named contact handled tenant issues within the same day.",
      },
    ],
    outcome:
      "A refurbished building returned to full use floor by floor, with tenants remaining in occupation for the duration of the works.",
    specs: [
      { label: "Floors refurbished", value: null },
      { label: "Gross floor area", value: null },
      { label: "Building occupied", value: "Yes — phased handover" },
      { label: "Works type", value: "Strip-out, repair, refit and redecoration" },
      { label: "Contract duration", value: null },
      { label: "Contract type", value: null },
    ],
    heroImage: "reno-scaffold",
    cardImage: "svc-renovation",
    gallery: ["shell-interior", "scaffold-grid", "svc-renovation", "prj-office-interior", "crew-scaffold", "det-concrete-wall"],
    related: ["commercial-office-shell-and-core", "school-classroom-block"],
    servicesUsed: ["renovation-and-maintenance", "project-management"],
    placeholder: true,
    featured: false,
  },
  {
    slug: "site-clearance-and-bulk-earthworks",
    title: "Site Clearance & Bulk Earthworks",
    location: "Kitengela, Kajiado County",
    county: "Kajiado County",
    category: "Infrastructure",
    sector: "Private developer",
    status: "In progress",
    completion: null,
    scopeSummary:
      "Clearance, cut and fill, haul roads and formation preparation for a phased development.",
    overview: [
      "An enabling-works package preparing a sloping plot for a phased development. The objective was to move as little material off site as possible, which meant balancing cut and fill across the plot rather than digging to a single level and carting the difference away.",
      "Haul roads, drainage and the site entrance were built first, so that everything after them had somewhere to run on and somewhere for water to go.",
    ],
    scopeOfWork: [
      "Topographic survey and earthworks volume balance",
      "Clearance of vegetation and existing structures",
      "Bulk cut and fill, with material re-use on site",
      "Temporary haul roads and site entrance",
      "Formation compaction and testing",
      "Temporary drainage and silt control",
    ],
    approach: [
      "Volumes were calculated from the survey before plant arrived, so that the cut and fill balanced across the site and haulage off site was minimised.",
      "Fill was placed in layers and compacted to specification, with test results recorded at each layer rather than assumed from the machine passes.",
      "Temporary drainage and silt traps were installed before bulk excavation, not after the first heavy rain.",
    ],
    challenges: [
      {
        challenge:
          "A significant level difference across the plot with limited budget for material haulage.",
        solution:
          "Cut and fill volumes were balanced from the survey so that excavated material was re-used on site, which removed most of the haulage and the tipping cost with it.",
      },
      {
        challenge:
          "Heavy seasonal rain risked washing loose material onto the neighbouring road.",
        solution:
          "Cut-off drains and silt traps were installed ahead of bulk excavation, and exposed faces were left no larger than could be dealt with in a single wet spell.",
      },
    ],
    outcome:
      "A prepared and tested formation ready for the first construction phase, with earthworks balanced on site.",
    specs: [
      { label: "Site area", value: null },
      { label: "Earthworks volume", value: null },
      { label: "Material re-used on site", value: null },
      { label: "Formation testing", value: "Layer compaction tests" },
      { label: "Contract duration", value: null },
      { label: "Contract type", value: null },
    ],
    heroImage: "prj-aerial-site",
    cardImage: "dozer-sky",
    gallery: ["svc-siteworks", "mat-aggregate", "prj-aerial-site", "srv-total-station", "dozer-sky", "prj-drainage"],
    related: ["estate-access-road-and-drainage", "warehouse-and-logistics-facility"],
    servicesUsed: ["site-works", "civil-engineering"],
    placeholder: true,
    featured: false,
  },
];

export const projectCategories: ProjectCategory[] = [
  "Residential",
  "Commercial",
  "Industrial",
  "Institutional",
  "Infrastructure",
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function featuredProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function relatedProjects(project: Project): Project[] {
  const picked = project.related
    .map((s) => getProject(s))
    .filter((p): p is Project => Boolean(p));
  if (picked.length >= 2) return picked.slice(0, 3);
  const filler = projects.filter(
    (p) => p.slug !== project.slug && !picked.includes(p),
  );
  return [...picked, ...filler].slice(0, 3);
}

export const projectSlugs = projects.map((p) => p.slug);
