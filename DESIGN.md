# Daima Civil Engineering Works — visual system

## The world: **the drawing sheet**

Not a construction website. The reference is the drawing sheet a structural
engineer issues for construction: a ruled field, a title block, plate numbers,
dimension lines, revision marks, and a quantity of white space that exists
because a drawing has to stay readable on a windy site at seven in the morning.

Rejected as the category rut: yellow-and-black hazard branding, the hero with
three icon cards under it, gradient-filled "we build dreams" copy, and stock
photography of people in hard hats shaking hands. None of them survive contact
with someone deciding whether to hand over a building.

Every section is a **band** — a full-width stratum of ground, seamed to the
next by a hairline. Photographs are **plates**, numbered. Wayfinding numbers
each section `01`–`09` in the eyebrow, the way a drawing register does.

## Ground

| Token | Value | Used for |
|---|---|---|
| `--color-graphite-950` | `#0a0c0e` | Header ground, footer, hero scrim |
| `--color-graphite-900` | `#101316` | Page ground, primary bands |
| `--color-graphite-800` | `#16191d` | Alternating bands |
| `--color-steel-600` | `#272c32` | Plate ground while an image loads |
| `--color-paper-100` | `#eae8e3` | Industries band |
| `--color-paper-50` | `#f4f2ee` | Quality, challenges, service-area bands |

The light bands are load-bearing, not decorative. A page that is graphite all
the way down reads as one long scroll; dropping to paper at "Built Around
Quality" and "Challenges & Solutions" tells the eye that the subject changed.

## Ink

| Token | Value | Contrast |
|---|---|---|
| `--color-ink` | `#13161a` | 16.4:1 on paper-50 |
| `--color-ink-2` | `#454b52` | 8.4:1 on paper-50 |
| `--color-ink-3` | `#6b7278` | 4.9:1 on paper-50 |
| `--color-on-dark` | `#e7e5e0` | 15.1:1 on graphite-900 |
| `--color-on-dark-2` | `#a2a8ad` | 7.5:1 on graphite-900 |
| `--color-on-dark-3` | `#767d84` | 4.5:1 on graphite-900 |

## Copper

One accent, three values, because a single hex cannot clear contrast on both
grounds:

| Token | Value | Role |
|---|---|---|
| `--color-copper` | `#c4652c` | Fills, rules, marks. White on it reads 5.1:1 |
| `--color-copper-light` | `#e08a4b` | Copper-family **text on graphite** — 6.8:1 |
| `--color-copper-ink` | `#8f4718` | Copper-family **text on paper** — 6.1:1 |

`--color-copper` at 3.5:1 on graphite fails as body text, which is why
`copper-light` exists. Using the fill colour for text on dark is the most
common way this palette gets broken.

**Where copper is allowed:** the primary button, section index numbers, process
step numbers, the small square marks in lists, link hover, placeholder markers,
the select carets, and the active filter chip. **Where it is not:** headlines.
An early draft ran the second line of the hero in copper and the section
headings with an accented phrase each; at full page length that was five large
orange passages and it tipped from engineered into branded. The headlines are
off-white and the accent earns its weight by being rare.

## Type

- **Display / UI / body —** Archivo variable, with the width axis loaded.
  Headings run at `font-stretch: 92–96%` with tracking from `−0.032em` to
  `−0.02em`. Narrowing the display sizes is what gives the headings their
  engineered proportion; body text stays at normal width for readability.
- **Technical voice —** IBM Plex Mono 400/500, uppercase, `0.2em` tracking, at
  0.625–0.6875rem. It carries every label, index, dimension, spec value,
  breadcrumb and button. The rule is: **if it is a reading, it is mono; if it
  is prose, it is Archivo.** Nothing is mono for decoration.
- `.t-num` uses tabular figures so spec columns align down the page.

## The ruled field

`.field` draws vertical hairlines at the sixth-column positions of the measure,
behind the content of every band, including over photographs in the hero and
page headers. It is the single device that makes the site read as engineered
rather than merely dark. At ≤760px it halves to two divisions so it stays a
grid rather than a texture.

`.blueprint` adds a drifting 80px square grid on the process band only —
90 seconds per cycle, masked to an ellipse, and one composited `transform`
layer. It is the only continuously running animation on the site.

## Motion

Six rules, one `IntersectionObserver` per element, disconnected the moment it
fires. No animation library.

| Reveal | Behaviour | Duration |
|---|---|---|
| `up` | 16px rise + fade | 850–950ms |
| `plate` | Image uncovers from its baseline, inner scale 1.06 → 1 | 1150ms |
| `rule` | Hairline draws left to right | 1000ms |

Two details worth keeping:

1. **The clip lives on an inner mask, never on the observed element.** An
   element clipped to zero height reports a zero intersection ratio and will
   never trigger its own observer. This cost an hour the first time.
2. **Hidden states are scoped to `.js`**, set by an inline script before
   hydration. Without scripting every section renders in its final state rather
   than staying invisible, and `<html>` carries `suppressHydrationWarning`
   because that script mutates its class list.

`prefers-reduced-motion: reduce` disables all of it, including the blueprint
drift and the plate hover scale.

## Photography

All 48 photographs are licensed stock standing in for Daima's own work, and
every one is marked as such. Two treatments tie them together:

- `filter: saturate(0.84) contrast(1.04)` on every plate. Stock arrives in a
  dozen colour temperatures; pulling saturation back lets the set read as one
  body of site records. Hover returns the photograph to full colour, which is
  the whole hover interaction on a card — no overlay, no icon.
- Aspect ratios alternate `16/10` and `4/3`, and grid spans alternate `7/5` and
  `5/7`, so no grid on the site reads as a product catalogue.

Every image carries its dominant colour as the loading ground and a 16px
base64 blur-up, both generated into `src/content/images.ts`.

## Placeholder convention

The `Provisional` chip and the dashed `Slot` are part of the design system, not
a debug affordance. A spec table with a dashed slot where a figure should be
reads as a drawing awaiting information — which is exactly what it is — and is
impossible to mistake for a real number. This is the mechanism that lets the
concept look finished without claiming anything that has not been verified.
