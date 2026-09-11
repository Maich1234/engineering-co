import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { EnquiryForm } from "@/components/enquiry-form";
import { CtaBand } from "@/components/sections";
import {
  Section,
  SectionHead,
  Eyebrow,
  Provisional,
} from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { company, fact } from "@/content/company";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Daima Civil Engineering Works in Nairobi — phone, WhatsApp, email, office hours, directions and a project enquiry form for construction and civil engineering work.",
  path: "/contact",
  image: "/img/nairobi-skyline.jpg",
});

export default function ContactPage() {
  const phone = fact(company.contact.phone);
  const phoneHref = fact(company.contact.phoneHref);
  const whatsapp = fact(company.contact.whatsapp).replace(/[^\d]/g, "");
  const email = fact(company.contact.email);
  const address = fact(company.contact.addressLines);
  const hours = fact(company.contact.hours);
  const mapQuery = fact(company.contact.mapQuery);
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}`;

  const channels = [
    {
      label: "Call",
      value: phone,
      href: `tel:${phoneHref}`,
      note: "Office hours, Monday to Saturday.",
      provisional: true,
    },
    {
      label: "WhatsApp",
      value: phone,
      href: `https://wa.me/${whatsapp}`,
      note: "Send photographs of the site or a drawing directly.",
      provisional: true,
    },
    {
      label: "Email",
      value: email,
      href: `mailto:${email}`,
      note: "Best for drawings, bills of quantities and tender documents.",
      provisional: true,
    },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <PageHeader
        eyebrow="Contact"
        title="Talk to us about the project."
        lede="Call, message or send the drawings. If it is easier to describe the project in writing, the enquiry form below asks for everything we need to give you a useful answer."
        image="nairobi-skyline"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        meta={[
          { label: "Base", value: fact(company.serviceArea.base) },
          { label: "Response", value: "Office hours" },
        ]}
      />

      {/* Channels */}
      <Section tone="graphite" seam={false}>
        <div className="grid gap-x-10 gap-y-10 md:grid-cols-3">
          {channels.map((channel, i) => (
            <Reveal key={channel.label} delay={i * 70} className="border-t border-[var(--rule-dark)] pt-6">
              <span className="t-label-sm text-on-dark-3">{channel.label}</span>
              <a
                href={channel.href}
                {...(channel.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="t-num mt-3 block break-all text-[1.1875rem] transition-colors duration-300 hover:text-copper-light"
              >
                {channel.value}
              </a>
              <p className="t-body mt-3 opacity-55">{channel.note}</p>
              {channel.provisional ? <Provisional className="mt-4">Placeholder</Provisional> : null}
            </Reveal>
          ))}
        </div>

        {/* Address, hours, directions */}
        <div className="mt-16 grid gap-x-12 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow index="01" label="Office" />
            </Reveal>
            <Reveal delay={60} className="mt-7">
              <address className="not-italic">
                {address.map((line) => (
                  <span key={line} className="t-h4 block opacity-88">
                    {line}
                  </span>
                ))}
              </address>
              <Provisional className="mt-5">Replace with the real address</Provisional>
            </Reveal>

            <Reveal delay={120} className="mt-9">
              <h2 className="t-label text-on-dark-3">Opening hours</h2>
              <ul className="mt-5">
                {hours.map((h) => (
                  <li
                    key={h.days}
                    className="flex items-baseline justify-between gap-6 border-t border-[var(--rule-dark)] py-3.5"
                  >
                    <span className="t-body opacity-72">{h.days}</span>
                    <span className="t-num text-[0.9375rem]">{h.time}</span>
                  </li>
                ))}
                <li className="border-t border-[var(--rule-dark)]" />
              </ul>
            </Reveal>

            <Reveal delay={180} className="mt-8 flex flex-wrap gap-3">
              <a
                href={directions}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary btn--sm"
              >
                <span>Get Directions</span>
                <span className="btn__arrow" aria-hidden>
                  &#8594;
                </span>
              </a>
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--ghost-dark btn--sm"
              >
                <span>WhatsApp</span>
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal kind="plate">
              <div className="plate-mask">
                <div
                  className="relative w-full border border-[var(--rule-dark)] bg-steel-600"
                  style={{ aspectRatio: "16 / 11" }}
                >
                  <iframe
                    title={`Map showing the location of ${company.name} in Nairobi`}
                    src={mapSrc}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 h-full w-full"
                    style={{ border: 0, filter: "grayscale(0.35) contrast(1.04)" }}
                  />
                </div>
              </div>
            </Reveal>
            <p className="t-label-sm mt-3 flex items-start gap-2 opacity-50">
              <span aria-hidden className="mt-[3px] inline-block h-px w-4 bg-current" />
              <span className="tracking-[0.14em]">
                Map centred on Nairobi — set the exact office address in{" "}
                <span className="t-num">company.contact.mapQuery</span> to move the pin.
              </span>
            </p>
          </div>
        </div>
      </Section>

      {/* Enquiry */}
      <Section id="enquiry" tone="graphite-800">
        <div className="grid gap-x-14 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow index="02" label="Project enquiry" />
            </Reveal>
            <Reveal delay={60}>
              <h2 className="t-h1 mt-8">Have a project in mind?</h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="t-lede mt-6 opacity-72">
                Tell us what you are planning and our team can help you determine
                the next step.
              </p>
            </Reveal>
            <Reveal delay={180} className="mt-9 border-t border-[var(--rule-dark)] pt-6">
              <h3 className="t-label-sm text-on-dark-3">What helps most</h3>
              <ul className="mt-4 space-y-2.5">
                {[
                  "Where the site is",
                  "What you want built, altered or repaired",
                  "Drawings or approvals, if any exist yet",
                  "When you would like it finished",
                ].map((item) => (
                  <li key={item} className="t-body grid grid-cols-[auto_1fr] gap-x-3 opacity-60">
                    <span aria-hidden className="mt-[0.6rem] inline-block h-1 w-1 shrink-0 bg-copper" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={100} className="lg:col-span-7 lg:col-start-6">
            <EnquiryForm />
          </Reveal>
        </div>
      </Section>

      {/* Service area */}
      <Section tone="paper" tight>
        <SectionHead
          index="03"
          label="Service area"
          title="Where we travel."
          lede="Nairobi and the counties around it. If your site is further out, ask — it depends on the size of the package."
          align="stack"
        />
        <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
          <Reveal className="border-t border-[var(--rule-light)] pt-6">
            <h3 className="t-label-sm text-ink-3">Counties</h3>
            <ul className="mt-4 space-y-2.5">
              {fact(company.serviceArea.areas).map((area) => (
                <li key={area} className="t-body text-ink-2">
                  {area}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={70} className="border-t border-[var(--rule-light)] pt-6">
            <h3 className="t-label-sm text-ink-3">Areas</h3>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2.5">
              {fact(company.serviceArea.localities).map((area) => (
                <li key={area} className="t-body text-ink-2">
                  {area}
                </li>
              ))}
            </ul>
            <Provisional tone="light" className="mt-6">
              Confirm coverage
            </Provisional>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        eyebrow="Or start here"
        title="Send the drawings."
        body="If you already have architectural or structural drawings, sending them is the fastest route to a real answer rather than a range."
        image="plans-floor"
        primary={{ href: "#enquiry", label: "Request a Consultation" }}
        secondary={{ href: "/services", label: "See services" }}
      />
    </>
  );
}
