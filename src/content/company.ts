/**
 * COMPANY RECORD
 * ------------------------------------------------------------------
 * This is the single source of truth for every factual statement the
 * site makes about Daima Civil Engineering Works.
 *
 * Fields carry a `status`:
 *   "verified"    — confirmed with the company; safe to publish.
 *   "provisional" — a working placeholder. Rendered with a marker and
 *                   listed on /content-notes until it is confirmed.
 *
 * NOTHING in this file invents capability, scale, history or
 * accreditation. Where a fact is not known it is left provisional
 * rather than guessed at.
 */

export type Status = "verified" | "provisional";

export type Fact<T> = {
  value: T;
  status: Status;
  /** What the editor needs to do before this can be published. */
  note?: string;
};

const provisional = <T,>(value: T, note: string): Fact<T> => ({
  value,
  status: "provisional",
  note,
});

const verified = <T,>(value: T): Fact<T> => ({ value, status: "verified" });

export const company = {
  name: "Daima Civil Engineering Works",
  shortName: "Daima",
  /** Used in <title> suffixes and structured data. */
  legalName: provisional(
    "Daima Civil Engineering Works",
    "Confirm the registered legal name and any suffix (Ltd / Limited).",
  ),
  tagline: "Engineering Foundations. Building the Future.",
  discipline: "Civil engineering and construction",

  /** One sentence. Everything here is defensible without further proof. */
  oneLiner:
    "A civil engineering and construction company based in Nairobi, working with developers, businesses, institutions and private clients across the city and the areas around it.",

  serviceArea: {
    base: verified("Nairobi, Kenya"),
    /** Drives the local-SEO copy and the areas list on /contact. */
    areas: provisional(
      [
        "Nairobi County",
        "Kiambu County",
        "Machakos County",
        "Kajiado County",
      ],
      "Confirm how far Daima actually travels for work before publishing this list.",
    ),
    localities: provisional(
      [
        "Westlands",
        "Karen",
        "Kilimani",
        "Kasarani",
        "Ruiru",
        "Kikuyu",
        "Ruaka",
        "Syokimau",
        "Athi River",
        "Kitengela",
      ],
      "Trim to the areas Daima genuinely serves. These drive local search coverage.",
    ),
  },

  contact: {
    phone: provisional("+254 700 000 000", "Replace with the real office line."),
    phoneHref: provisional("+254700000000", "Replace with the real office line."),
    whatsapp: provisional(
      "+254700000000",
      "Replace with the real WhatsApp business number.",
    ),
    email: provisional(
      "info@daimacivil.co.ke",
      "Replace with the real enquiries inbox.",
    ),
    addressLines: provisional(
      ["Office address line 1", "Nairobi", "Kenya"],
      "Replace with the real street address, building and floor.",
    ),
    /** Google Maps embed + directions both read from this. */
    mapQuery: provisional(
      "Nairobi, Kenya",
      "Replace with the exact office address or a Google Maps place ID so the pin is correct.",
    ),
    hours: provisional(
      [
        { days: "Monday – Friday", time: "8:00 – 17:00" },
        { days: "Saturday", time: "8:00 – 13:00" },
        { days: "Sunday & public holidays", time: "Closed" },
      ],
      "Confirm the real office hours, including site-visit availability.",
    ),
  },

  /**
   * Deliberately empty. Certifications, registrations (NCA class, EBK,
   * etc.), headcount, years trading, project counts and client names all
   * belong here — and only once someone has the paperwork in front of
   * them. The site is built to display them and reads fine without them.
   */
  credentials: {
    registrations: provisional(
      [] as { body: string; detail: string }[],
      "Add NCA registration class, EBK/IEK membership or any other registration once the certificates are to hand. Nothing is claimed until then.",
    ),
    statistics: provisional(
      [] as { label: string; value: string }[],
      "Add verified figures (years trading, projects completed, team size) only from company records.",
    ),
    testimonials: provisional(
      [] as { quote: string; attribution: string; role: string }[],
      "Add client testimonials only with written permission and the client's real name.",
    ),
  },

  social: provisional(
    [] as { label: string; url: string }[],
    "Add live social profiles once confirmed. Broken or squatted handles are worse than none.",
  ),
} as const;

/** Convenience: reads a Fact without the caller unwrapping it. */
export function fact<T>(f: Fact<T>): T {
  return f.value;
}

export function isProvisional(f: Fact<unknown>): boolean {
  return f.status === "provisional";
}

/** Every provisional company field, for /content-notes. */
export function provisionalCompanyFields(): { path: string; note: string }[] {
  const out: { path: string; note: string }[] = [];
  const walk = (node: unknown, path: string) => {
    if (!node || typeof node !== "object") return;
    if ("status" in (node as Record<string, unknown>) && "value" in (node as Record<string, unknown>)) {
      const f = node as Fact<unknown>;
      if (f.status === "provisional") out.push({ path, note: f.note ?? "" });
      return;
    }
    for (const [k, v] of Object.entries(node as Record<string, unknown>)) {
      walk(v, path ? `${path}.${k}` : k);
    }
  };
  walk(company, "");
  return out;
}
