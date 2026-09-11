import { NextResponse } from "next/server";

/**
 * ENQUIRY ENDPOINT — NOT WIRED TO ANYTHING
 * ------------------------------------------------------------------
 * This validates the submission and hands back a reference so the form
 * can be seen working end to end. It does not send, store or forward
 * anything, and it deliberately does not persist the uploaded file.
 *
 * BEFORE GOING LIVE, do all three:
 *   1. Deliver the enquiry (Resend / SendGrid / SMTP) to the real inbox,
 *      and copy it to whoever quotes work.
 *   2. Put the upload somewhere durable (S3, R2, Drive) and include the
 *      link in the notification — drawings are the point of the upload.
 *   3. Add spam protection (Turnstile or hCaptcha) and a rate limit.
 *      A public form on a contractor's site attracts bots within days.
 */

export const runtime = "nodejs";

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

function reference(): string {
  const now = new Date();
  const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(
    now.getDate(),
  ).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `DCW-${stamp}-${rand}`;
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed submission." }, { status: 400 });
  }

  const value = (key: string) => String(form.get(key) ?? "").trim();

  const enquiry = {
    name: value("name"),
    phone: value("phone"),
    email: value("email"),
    projectType: value("projectType"),
    location: value("location"),
    description: value("description"),
    timeline: value("timeline"),
  };

  const missing = (["name", "phone", "projectType", "location", "description"] as const).filter(
    (key) => !enquiry[key],
  );
  if (missing.length > 0) {
    return NextResponse.json(
      { ok: false, error: `Missing required field(s): ${missing.join(", ")}` },
      { status: 422 },
    );
  }

  const upload = form.get("drawing");
  if (upload instanceof File && upload.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json({ ok: false, error: "Attachment too large." }, { status: 413 });
  }

  const ref = reference();

  // Stands in for delivery. Replace with the mail/CRM call.
  console.info("[enquiry] %s — %s, %s (%s)", ref, enquiry.name, enquiry.projectType, enquiry.location);

  return NextResponse.json({ ok: true, reference: ref });
}
