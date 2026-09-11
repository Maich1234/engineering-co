import { services } from "@/content/services";
import { industries } from "@/content/approach";
import { company, fact } from "@/content/company";
import { Backdrop } from "./plate";
import { ButtonLink, Provisional } from "./primitives";
import { Reveal } from "./reveal";

/**
 * The hero is the only place on the site where a photograph is allowed to
 * fill the frame. Everything over it — the ruled field, the readings rail,
 * the plate note — is drawing-sheet furniture, so the photograph reads as a
 * site record rather than a stock image.
 */
export function Hero() {
  const readings = [
    { label: "Base", value: fact(company.serviceArea.base) },
    { label: "Disciplines", value: String(services.length).padStart(2, "0") },
    { label: "Sectors", value: String(industries.length).padStart(2, "0") },
  ];

  return (
    <section
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-graphite-950"
      style={{ paddingTop: "var(--header-h)" }}
    >
      <Backdrop image="hero-foundation-mat" priority sizes="100vw" quality={74} />

      {/* Scrims: enough to hold 15:1 text contrast without flattening the photo. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-graphite-950 via-graphite-950/62 to-graphite-950/35"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-graphite-950/82 via-graphite-950/30 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-graphite-950/85 to-transparent"
      />
      <div className="field" aria-hidden />

      <div className="shell relative pb-10 pt-24 md:pb-14">
        <Reveal>
          <p className="t-label flex flex-wrap items-center gap-x-3 gap-y-2 text-on-dark-2">
            <span className="inline-block h-1.5 w-1.5 bg-copper" aria-hidden />
            <span>{fact(company.serviceArea.base)}</span>
            <span aria-hidden className="opacity-30">
              /
            </span>
            <span>Civil Engineering &amp; Construction</span>
          </p>
        </Reveal>

        <Reveal delay={90}>
          <h1 className="t-display mt-7 max-w-5xl">
            Engineering Foundations.
            <br />
            Building the Future.
          </h1>
        </Reveal>

        <Reveal delay={170}>
          <p className="t-lede mt-8 max-w-xl text-on-dark/82">
            Professional civil engineering and construction solutions delivered
            with precision, reliability, and a commitment to quality.
          </p>
        </Reveal>

        <Reveal delay={240} className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href="/projects" variant="primary">
            Explore Our Work
          </ButtonLink>
          <ButtonLink href="/contact#enquiry" variant="ghost-dark">
            Request a Consultation
          </ButtonLink>
        </Reveal>
      </div>

      {/* Readings rail — a title block, not a stats bar. Nothing here is a
          claim: every figure is counted from the site's own content. */}
      <Reveal delay={320} className="relative border-t border-[var(--rule-dark)]">
        <div className="shell flex flex-col gap-y-4 py-5 md:flex-row md:items-center md:justify-between md:py-6">
          <dl className="flex flex-wrap items-baseline gap-x-9 gap-y-3">
            {readings.map((reading) => (
              <div key={reading.label} className="flex items-baseline gap-2.5">
                <dt className="t-label-sm text-on-dark-3">{reading.label}</dt>
                <dd className="t-num text-[0.9375rem] text-on-dark">{reading.value}</dd>
              </div>
            ))}
          </dl>

          <div className="flex items-center gap-4">
            <Provisional title="This photograph is stock, standing in for Daima's own site photography">
              Placeholder photography
            </Provisional>
            <span className="t-label-sm hidden items-center gap-2.5 text-on-dark-3 sm:flex" aria-hidden>
              Scroll
              <span className="inline-block h-px w-8 bg-current opacity-45" />
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
