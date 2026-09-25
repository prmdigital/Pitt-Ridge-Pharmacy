"use client";

import { contactSchema } from "@/lib/validation/schemas";
import { ErrorSummary, Honeypot, PrivacyConsent, SubmitButton, SuccessPanel, TextAreaField, TextField } from "./fields";
import { useRequestForm } from "./useRequestForm";

export function ContactForm({ topic = "" }: { topic?: string }) {
  const f = useRequestForm("contact", contactSchema, {
    name: "",
    phone: "",
    email: "",
    topic,
    message: "",
    consent: false,
  });
  const { values: v, set, errors: e } = f;

  if (f.status === "success") {
    return (
      <SuccessPanel title="Message sent" reference={f.reference}>
        <p>Thanks for getting in touch. Our team will reply using the contact details you gave us.</p>
      </SuccessPanel>
    );
  }

  return (
    <form noValidate onSubmit={(ev) => f.onSubmit(ev)} className="relative space-y-4">
      <ErrorSummary ref={f.summaryRef} errors={e} formError={f.formError} />
      <Honeypot />
      <TextField name="name" label="Your name" autoComplete="name" required value={v.name} onChange={(x) => set("name", x)} error={e.name} />

      {/* Either is enough; the card subtitle says so and validation asks for one if both are empty. */}
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField name="phone" label="Phone number" type="tel" inputMode="tel" autoComplete="tel" required={null} value={v.phone} onChange={(x) => set("phone", x)} error={e.phone} />
        <TextField name="email" label="Email address" type="email" autoComplete="email" required={null} value={v.email} onChange={(x) => set("email", x)} error={e.email} />
      </div>

      <TextAreaField
        name="message"
        label="Message"
        required
        hint="Please don't include health details. For prescriptions, use a prescription form or call us."
        value={v.message}
        onChange={(x) => set("message", x)}
        error={e.message}
        maxLength={1500}
        rows={3}
      />
      <PrivacyConsent checked={v.consent} onChange={(x) => set("consent", x)} error={e.consent} />
      <SubmitButton submitting={f.status === "submitting"}>Send Message</SubmitButton>
    </form>
  );
}
