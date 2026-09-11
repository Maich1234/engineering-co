import Link from "next/link";
import { company, fact } from "@/content/company";
import { services } from "@/content/services";
import { nav, secondaryNav } from "@/lib/site";
import { Wordmark } from "./logo";
import { Provisional, RuleLine } from "./primitives";

export function SiteFooter() {
  const areas = fact(company.serviceArea.localities);
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[var(--rule-dark)] bg-graphite-950 text-on-dark">
      <div className="field" aria-hidden />

      <div className="shell relative pb-14 pt-16 md:pb-16 md:pt-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Wordmark />
            <p className="t-body mt-7 max-w-sm opacity-62">{company.oneLiner}</p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/contact#enquiry" className="btn btn--primary btn--sm">
                <span>Request a Quote</span>
                <span className="btn__arrow" aria-hidden>
                  &#8594;
                </span>
              </Link>
              <a
                href={`tel:${fact(company.contact.phoneHref)}`}
                className="btn btn--ghost-dark btn--sm"
                aria-label={`Call ${company.name}`}
              >
                <span>{fact(company.contact.phone)}</span>
              </a>
            </div>
          </div>

          <nav className="lg:col-span-3" aria-label="Services">
            <h2 className="t-label-sm text-on-dark-3">Services</h2>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-[0.9375rem] opacity-72 transition-opacity hover:opacity-100"
                  >
                    {s.navTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="lg:col-span-2" aria-label="Site">
            <h2 className="t-label-sm text-on-dark-3">Site</h2>
            <ul className="mt-5 space-y-3">
              {[...nav.filter((n) => n.href !== "/"), ...secondaryNav].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.9375rem] opacity-72 transition-opacity hover:opacity-100"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className="t-label-sm text-on-dark-3">Contact</h2>
            <address className="mt-5 space-y-3 not-italic text-[0.9375rem] opacity-72">
              {fact(company.contact.addressLines).map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <a href={`mailto:${fact(company.contact.email)}`} className="block break-all hover:opacity-100">
                {fact(company.contact.email)}
              </a>
            </address>
            <Provisional className="mt-4">Placeholder details</Provisional>
            <ul className="mt-5 space-y-1.5">
              {fact(company.contact.hours).map((h) => (
                <li key={h.days} className="t-label-sm flex justify-between gap-3 opacity-50">
                  <span>{h.days}</span>
                  <span className="t-num tracking-normal">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Local reach — genuine local SEO surface, not a keyword dump. */}
        <div className="mt-16 border-t border-[var(--rule-dark)] pt-8">
          <h2 className="t-label-sm text-on-dark-3">Areas we work in</h2>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2.5">
            {areas.map((area) => (
              <li key={area} className="t-label-sm opacity-45">
                {area}
              </li>
            ))}
          </ul>
        </div>

        <RuleLine className="mt-10" />

        <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <p className="t-label-sm max-w-xl opacity-40">
            &copy; {year} {company.name}. Concept site by Wabunifu Labs. Company
            details, project records and photography on this build are
            placeholders pending verification —{" "}
            <Link href="/content-notes" className="underline underline-offset-4 hover:opacity-100">
              see content notes
            </Link>
            .
          </p>
          <p className="t-label-sm opacity-40">
            {fact(company.serviceArea.base)}
          </p>
        </div>
      </div>
    </footer>
  );
}
