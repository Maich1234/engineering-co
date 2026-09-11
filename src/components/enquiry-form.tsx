"use client";

import { useId, useRef, useState } from "react";
import { services } from "@/content/services";
import { company, fact } from "@/content/company";

type FieldErrors = Record<string, string>;

const TIMELINES = [
  "As soon as possible",
  "Within 1–3 months",
  "Within 3–6 months",
  "Later than 6 months",
  "Still deciding",
];

const MAX_UPLOAD_MB = 10;

function validate(data: FormData): FieldErrors {
  const errors: FieldErrors = {};
  const get = (k: string) => String(data.get(k) ?? "").trim();

  if (get("name").length < 2) errors.name = "Please tell us your name.";

  const phone = get("phone").replace(/[\s-]/g, "");
  if (!/^\+?\d{7,15}$/.test(phone))
    errors.phone = "Enter a phone number we can reach you on.";

  const email = get("email");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    errors.email = "That email address does not look right.";

  if (!get("projectType")) errors.projectType = "Choose the closest project type.";
  if (get("location").length < 2)
    errors.location = "Where is the site? An area name is enough.";
  if (get("description").length < 20)
    errors.description = "A sentence or two about the project, please.";

  const file = data.get("drawing");
  if (file instanceof File && file.size > MAX_UPLOAD_MB * 1024 * 1024)
    errors.drawing = `Keep the file under ${MAX_UPLOAD_MB}MB.`;

  return errors;
}

export function EnquiryForm({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [reference, setReference] = useState("");
  const [fileName, setFileName] = useState("");

  const light = tone === "light";
  const rule = light ? "border-[var(--rule-light)]" : "border-[var(--rule-dark)]";
  const labelCls = `t-label-sm block ${light ? "text-ink-3" : "text-on-dark-3"}`;
  const fieldCls = `mt-2.5 w-full border-0 border-b bg-transparent px-0 pb-3 pt-1 text-[1rem] outline-none transition-colors duration-300 ${rule} ${
    light
      ? "text-ink placeholder:text-ink-3/55 focus:border-copper-ink"
      : "text-on-dark placeholder:text-on-dark-3/70 focus:border-copper-light"
  }`;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      const first = form.querySelector<HTMLElement>(`[data-field="${Object.keys(found)[0]}"]`);
      first?.focus();
      first?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }

    setState("sending");
    try {
      const res = await fetch("/api/enquiry", { method: "POST", body: data });
      const json = (await res.json()) as { ok: boolean; reference?: string };
      if (!res.ok || !json.ok) throw new Error("rejected");
      setReference(json.reference ?? "");
      setState("sent");
      form.reset();
      setFileName("");
    } catch {
      setState("failed");
    }
  }

  if (state === "sent") {
    return (
      <div
        className={`border ${rule} p-8 sm:p-10`}
        role="status"
        aria-live="polite"
      >
        <span className="t-label text-copper-light">Enquiry received</span>
        <h3 className="t-h3 mt-5">Thank you — we have your details.</h3>
        <p className="t-body mt-4 max-w-lg opacity-72">
          Your reference is <span className="t-num text-copper-light">{reference}</span>.
          A member of the team will come back to you to arrange a call or a site
          visit, depending on what the project needs.
        </p>
        <div className={`mt-7 border-t ${rule} pt-6`}>
          <p className="t-label-sm opacity-55">
            Showcase note — this concept has no mail delivery wired up, so nothing
            was actually sent. Connect the handler at
            <span className="t-num"> /api/enquiry</span> to an inbox or CRM before
            going live.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="action mt-7 opacity-72"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
      <Field
        id={`${uid}-name`}
        name="name"
        label="Name"
        required
        error={errors.name}
        labelCls={labelCls}
        fieldCls={fieldCls}
        autoComplete="name"
        placeholder="Your full name"
      />
      <Field
        id={`${uid}-phone`}
        name="phone"
        label="Phone"
        type="tel"
        required
        error={errors.phone}
        labelCls={labelCls}
        fieldCls={fieldCls}
        autoComplete="tel"
        placeholder="+254 …"
      />
      <Field
        id={`${uid}-email`}
        name="email"
        label="Email"
        type="email"
        error={errors.email}
        labelCls={labelCls}
        fieldCls={fieldCls}
        autoComplete="email"
        placeholder="you@example.com"
        hint="Optional"
      />

      <div>
        <label htmlFor={`${uid}-type`} className={labelCls}>
          Project type <Req />
        </label>
        <select
          id={`${uid}-type`}
          name="projectType"
          data-field="projectType"
          defaultValue=""
          aria-invalid={Boolean(errors.projectType)}
          aria-describedby={errors.projectType ? `${uid}-type-err` : undefined}
          className={`${fieldCls} appearance-none bg-[length:10px] pr-6`}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6'%3E%3Cpath d='M0 0h10L5 6z' fill='%23c4652c'/%3E%3C/svg%3E\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 2px center",
          }}
        >
          <option value="" disabled>
            Select…
          </option>
          {services.map((s) => (
            <option key={s.slug} value={s.title} className="bg-graphite-800 text-on-dark">
              {s.title}
            </option>
          ))}
          <option value="Not sure yet" className="bg-graphite-800 text-on-dark">
            Not sure yet
          </option>
        </select>
        <ErrorText id={`${uid}-type-err`} message={errors.projectType} />
      </div>

      <Field
        id={`${uid}-location`}
        name="location"
        label="Project location"
        required
        error={errors.location}
        labelCls={labelCls}
        fieldCls={fieldCls}
        placeholder="Area, town or county"
      />

      <div>
        <label htmlFor={`${uid}-timeline`} className={labelCls}>
          Expected timeline
        </label>
        <select
          id={`${uid}-timeline`}
          name="timeline"
          defaultValue={TIMELINES[1]}
          className={`${fieldCls} appearance-none pr-6`}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6'%3E%3Cpath d='M0 0h10L5 6z' fill='%23c4652c'/%3E%3C/svg%3E\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 2px center",
            backgroundSize: "10px",
          }}
        >
          {TIMELINES.map((t) => (
            <option key={t} value={t} className="bg-graphite-800 text-on-dark">
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor={`${uid}-desc`} className={labelCls}>
          Brief project description <Req />
        </label>
        <textarea
          id={`${uid}-desc`}
          name="description"
          data-field="description"
          rows={4}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={errors.description ? `${uid}-desc-err` : undefined}
          className={`${fieldCls} resize-y`}
          placeholder="What are you planning to build, alter or repair? Include anything already decided — drawings, approvals, a budget range or a required completion date."
        />
        <ErrorText id={`${uid}-desc-err`} message={errors.description} />
      </div>

      <div className="sm:col-span-2">
        <span className={labelCls}>Drawings or documents</span>
        <label
          htmlFor={`${uid}-file`}
          className={`mt-2.5 flex cursor-pointer items-center justify-between gap-4 border border-dashed ${rule} px-5 py-4 transition-colors duration-300 ${
            light ? "hover:border-copper-ink" : "hover:border-copper-light"
          }`}
        >
          <span className="t-label-sm opacity-65">
            {fileName || "Attach a drawing, BQ or photograph — optional, max 10MB"}
          </span>
          <span className={`t-label-sm shrink-0 ${light ? "text-copper-ink" : "text-copper-light"}`}>
            {fileName ? "Change" : "Browse"}
          </span>
        </label>
        <input
          id={`${uid}-file`}
          name="drawing"
          data-field="drawing"
          type="file"
          accept=".pdf,.dwg,.dxf,.jpg,.jpeg,.png,.heic,.doc,.docx,.xls,.xlsx"
          className="sr-only"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
        />
        <ErrorText id={`${uid}-file-err`} message={errors.drawing} />
      </div>

      <div className={`sm:col-span-2 flex flex-wrap items-center gap-x-7 gap-y-5 border-t ${rule} pt-8`}>
        <button
          type="submit"
          disabled={state === "sending"}
          className="btn btn--primary disabled:opacity-60"
        >
          <span>{state === "sending" ? "Sending…" : "Request a Consultation"}</span>
          <span className="btn__arrow" aria-hidden>
            &#8594;
          </span>
        </button>

        <p className="t-label-sm max-w-xs opacity-50">
          Or call{" "}
          <a href={`tel:${fact(company.contact.phoneHref)}`} className="underline underline-offset-4">
            {fact(company.contact.phone)}
          </a>{" "}
          during office hours.
        </p>

        <div aria-live="polite" className="sr-only">
          {state === "sending" ? "Sending your enquiry" : ""}
        </div>

        {state === "failed" ? (
          <p role="alert" className="t-label-sm w-full text-copper-light">
            Something went wrong sending that. Please call or email us instead —{" "}
            {fact(company.contact.email)}.
          </p>
        ) : null}
      </div>
    </form>
  );
}

/* ----------------------------------------------------------------- parts */

function Req() {
  return (
    <span className="text-copper-light" aria-hidden>
      {" "}
      *
    </span>
  );
}

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="t-label-sm mt-2.5 text-copper-light">
      {message}
    </p>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  required,
  error,
  labelCls,
  fieldCls,
  hint,
  ...rest
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  error?: string;
  labelCls: string;
  fieldCls: string;
  hint?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className={labelCls}>
        {label}
        {required ? <Req /> : null}
        {hint ? <span className="ml-2 opacity-55">{hint}</span> : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        data-field={name}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-err` : undefined}
        className={fieldCls}
        {...rest}
      />
      <ErrorText id={`${id}-err`} message={error} />
    </div>
  );
}
