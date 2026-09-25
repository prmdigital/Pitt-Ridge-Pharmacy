"use client";

import { refillSchema } from "@/lib/validation/schemas";
import {
  DobField,
  ErrorSummary,
  FormSection,
  Honeypot,
  PrivacyConsent,
  RadioGroup,
  SubmitButton,
  SuccessPanel,
  TextAreaField,
  TextField,
} from "./fields";
import { contactOptions, fulfilmentOptions, type ContactMethod, type Fulfilment } from "./options";
import { useRequestForm } from "./useRequestForm";

export function RefillForm() {
  const f = useRequestForm("refill", refillSchema, {
    patientName: "",
    dateOfBirth: "",
    phone: "",
    email: "",
    medicationName: "",
    rxNumber: "",
    quantityNotes: "",
    fulfilment: "" as Fulfilment,
    contactMethod: "" as ContactMethod,
    message: "",
    consent: false,
  });
  const { values: v, set, errors: e } = f;

  if (f.status === "success") {
    return (
      <SuccessPanel title="Refill request received" reference={f.reference}>
        <p>
          Your request has been received. Our pharmacy team will review the information and contact you if anything else
          is needed.
        </p>
        <p>If a renewal needs a pharmacist assessment or contact with your prescriber, we&apos;ll let you know.</p>
      </SuccessPanel>
    );
  }

  return (
    <form noValidate onSubmit={(ev) => f.onSubmit(ev)} className="relative space-y-8">
      <ErrorSummary ref={f.summaryRef} errors={e} formError={f.formError} />
      <Honeypot />

      <FormSection title="Patient details">
        <TextField name="patientName" label="Patient name" autoComplete="name" required value={v.patientName} onChange={(x) => set("patientName", x)} error={e.patientName} />
        <DobField value={v.dateOfBirth} onChange={(x) => set("dateOfBirth", x)} error={e.dateOfBirth} />
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField name="phone" label="Phone number" type="tel" autoComplete="tel" inputMode="tel" required value={v.phone} onChange={(x) => set("phone", x)} error={e.phone} />
          <TextField name="email" label="Email address" type="email" autoComplete="email" value={v.email} onChange={(x) => set("email", x)} error={e.email} hint="Required if you'd like us to contact you by email." />
        </div>
      </FormSection>

      <FormSection title="Medication">
        <TextField name="medicationName" label="Medication name" required value={v.medicationName} onChange={(x) => set("medicationName", x)} error={e.medicationName} hint="As shown on the label. Add one medication per line in the notes if you need more than one." />
        <TextField name="rxNumber" label="Prescription or Rx number" value={v.rxNumber} onChange={(x) => set("rxNumber", x)} error={e.rxNumber} hint="If available. You can find it on your medication label." maxLength={40} />
        <TextAreaField name="quantityNotes" label="Refill quantity or medication notes" value={v.quantityNotes} onChange={(x) => set("quantityNotes", x)} error={e.quantityNotes} maxLength={500} rows={3} />
      </FormSection>

      <FormSection title="Pickup and contact">
        <RadioGroup name="fulfilment" legend="Pickup or delivery" options={fulfilmentOptions} value={v.fulfilment} onChange={(x) => set("fulfilment", x)} error={e.fulfilment} />
        <RadioGroup name="contactMethod" legend="Preferred contact method" options={contactOptions} value={v.contactMethod} onChange={(x) => set("contactMethod", x)} error={e.contactMethod} />
        <TextAreaField name="message" label="Additional message" value={v.message} onChange={(x) => set("message", x)} error={e.message} hint="For urgent questions, please call us." />
      </FormSection>

      <PrivacyConsent checked={v.consent} onChange={(x) => set("consent", x)} error={e.consent} />
      <SubmitButton submitting={f.status === "submitting"}>Request a Refill</SubmitButton>
    </form>
  );
}
