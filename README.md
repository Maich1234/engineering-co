# Daima Civil Engineering Works — website concept

A premium corporate website concept for **Daima Civil Engineering Works**, a
Nairobi-based civil engineering and construction company. Built as a
**Wabunifu Labs showcase**.

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4.

---

## The one thing to understand first

**Nothing on this site claims anything about Daima that has not been verified.**

No years trading, no project counts, no team size, no NCA class, no
certifications, no client names, no testimonials, and not one photograph of
Daima's own work. Those are the things a construction company's website is
usually padded with, and they are exactly the things that cannot be invented on
the company's behalf.

Instead, every unverified item is *visibly marked* and *listed automatically*:

- `<Provisional>` chips mark placeholder facts wherever they appear.
- Dashed `<Slot>` marks sit where a figure belongs, in place of a made-up number.
- **`/content-notes`** is generated from the content files and inventories every
  open item, what it needs, and what is deliberately absent.
- Placeholder project pages and draft articles carry `noindex`, are left out of
  the sitemap, and emit no structured data — fiction cannot reach a search result.

The moment a record is filled in and its flag flipped, all of that disappears on
its own. See `/content-notes` first; it is the handover document.

---

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run typecheck  # tsc --noEmit
npm run lint
```

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the live
origin. Canonicals, Open Graph tags, the sitemap and structured data all read
from it.

---

## Where the content lives

All editable content is plain, typed TypeScript in `src/content/`. There is no
CMS, but the shapes are CMS-ready: each file is a flat array of records that maps
one-to-one onto a collection in Sanity, Payload, Contentful or a database.

| File | Holds | Notes |
|---|---|---|
| `company.ts` | Every factual statement about the company | Each field is a `Fact<T>` with `status: "verified" \| "provisional"` and a note saying what it needs |
| `services.ts` | The six service records | Delete one and it vanishes from the homepage, services index, footer, enquiry form and sitemap |
| `projects.ts` | The portfolio | Every record is `placeholder: true`; `specs` values of `null` render as empty slots |
| `approach.ts` | Process, principles, industries | |
| `insights.ts` | Articles | `draft: true` hides an article in production |
| `images.ts` | **Generated** image manifest | Alt text, aspect ratio, loading colour, blur-up, credit |

### Replacing a photograph

Drop a file at `public/img/<key>.jpg` using the existing key, then update its
entry in `images.ts` — `alt`, `ratio`, `placeholder: false`, and remove
`credit`. Every layout, aspect ratio and loading colour follows automatically.

### Adding a real project

1. Replace title, location, sector and dates with the real ones.
2. Fill the `specs` values. A `null` renders as a visible empty slot, so a
   half-finished record looks unfinished rather than misleading.
3. Swap the image keys for Daima's own photographs.
4. Set `placeholder: false` — the marker disappears, the page becomes
   indexable, it enters the sitemap and it gains `CreativeWork` structured data.

---

## Pages

| Route | |
|---|---|
| `/` | Hero, credibility, services, portfolio, process, principles, industries, insights, enquiry |
| `/about` | Company, approach, principles, team slot, credentials, service area |
| `/services` · `/services/[slug]` | Six services, each with scope, deliverables and local coverage |
| `/projects` · `/projects/[slug]` | Filterable portfolio; full project record with gallery, challenges, outcome, related work |
| `/approach` | Five-stage process, hold points, the handover file |
| `/contact` | Channels, address, hours, map, directions, enquiry form |
| `/insights` · `/insights/[slug]` | Articles with a contents rail |
| `/content-notes` | Generated handover inventory (noindex) |

---

## SEO

- Titles, descriptions, canonicals and Open Graph tags are built in one place
  (`src/lib/seo.ts`), so they cannot drift apart as pages are added.
- Structured data (`src/lib/jsonld.tsx`): `GeneralContractor` /
  `ProfessionalService` with service catalogue and areas served, `WebSite`,
  `BreadcrumbList` on every interior page, `Service` per service page,
  `Article` per insight. Project markup is emitted **only** for non-placeholder
  records.
- Semantic headings, exactly one `<h1>` per page, real `<nav>`/`<address>`/
  `<time>` elements, breadcrumbs on every interior page.
- Local SEO: county and locality lists drive the footer, the service pages and
  `areaServed` in structured data. Edit them in `company.serviceArea`.
- Project filtering uses real links and a query string, so every filtered view
  is shareable and works without JavaScript.
- Images are served through `next/image` as AVIF/WebP with correct `sizes`,
  blur-up placeholders and a dominant-colour ground.

---

## Performance and accessibility

- **No animation library.** The whole motion system is three CSS transitions and
  a class toggle, driven by one `IntersectionObserver` per element that
  disconnects as soon as it fires.
- Reveal states are scoped to a `js` class set before hydration, so the page is
  fully legible without scripting.
- `prefers-reduced-motion: reduce` disables every animation, including the
  drifting blueprint grid and image hover scales.
- Every text/ground pairing was chosen against WCAG AA and the ratios are
  recorded in `DESIGN.md`. The copper accent has three values for exactly this
  reason.
- Keyboard: visible focus rings, a skip link, `aria-current` on the active nav
  item, labelled form fields with `aria-invalid` and `role="alert"` errors.
- Mobile layouts are designed rather than shrunk: a full-screen numbered nav
  panel, and a fixed Call / WhatsApp / Quote / Directions bar that hides itself
  when the enquiry form is on screen.

---

## Still to wire up before launch

Listed in full, in the UI, at `/content-notes`. In short:

1. **The enquiry form sends nothing.** `/api/enquiry` validates and returns a
   reference. Connect it to an inbox or CRM, store the uploaded drawing
   somewhere durable, and add spam protection and a rate limit.
2. Set `NEXT_PUBLIC_SITE_URL`.
3. Set `company.contact.mapQuery` to the exact office address so the map pin is
   right.
4. Create a Google Business Profile with matching name, address and phone — the
   strongest local ranking factor for a Nairobi contractor, and worth more than
   anything on this site.
5. Add analytics and verify the domain in Google Search Console.
6. Add a privacy notice — required once the form collects personal data.

---

## Design

See **`DESIGN.md`** for the visual system: the drawing-sheet concept, the
graphite/concrete/copper palette with contrast ratios, the type ramp, the ruled
field, the motion rules, and the two `IntersectionObserver` traps that are worth
knowing about before touching the reveal code.
