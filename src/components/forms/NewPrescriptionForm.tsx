"use client";

import { useState } from "react";
import { newPrescriptionSchema } from "@/lib/validation/schemas";
import { FileUpload } from "./FileUpload";
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

export function NewPrescriptionForm() {
  const [uploading, setUploading] = useState(false);
  const f = useRequestForm("new", newPrescriptionSchema, {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phone: "",
    email: "",
    uploadId: "",
    fulfilment: "" as Fulfilment,
    contactMethod: "" as ContactMethod,
    message: "",
    consent: false,
  });
  const { values: v, set, errors: e } = f;

  if (f.status === "success") {
    return (
      <SuccessPanel title="Request received" reference={f.reference}>
        <p>
          Your request has been received. Our pharmacy team will review the information and contact you if anything else
          is needed.
        </p>
        <p>Please bring the original prescription when coming for pickup if required by the pharmacy.</p>
      </SuccessPanel>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(ev) => f.onSubmit(ev, () => (uploading ? "Please wait for the upload to finish." : null))}
      className="relative space-y-8"
    >
      <ErrorSummary ref={f.summaryRef} errors={e} formError={f.formError} />
      <Honeypot />

      <FormSection title="Patient details">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField name="firstName" label="Patient first name" autoComplete="given-name" required value={v.firstName} onChange={(x) => set("firstName", x)} error={e.firstName} />
          <TextField name="lastName" label="Patient last name" autoComplete="family-name" required value={v.lastName} onChange={(x) => set("lastName", x)} error={e.lastName} />
        </div>
        <DobField value={v.dateOfBirth} onChange={(x) => set("dateOfBirth", x)} error={e.dateOfBirth} />
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField name="phone" label="Phone number" type="tel" autoComplete="tel" inputMode="tel" required value={v.phone} onChange={(x) => set("phone", x)} error={e.phone} />
          <TextField
            name="email"
            label="Email address"
            type="email"
            autoComplete="email"
            value={v.email}
            onChange={(x) => set("email", x)}
            error={e.email}
            hint="Required if you'd like us to contact you by email."
          />
        </div>
      </FormSection>

      <FormSection title="Prescription">
        <FileUpload onUploaded={(id) => set("uploadId", id)} onBusyChange={setUploading} error={e.uploadId} />
      </FormSection>

      <FormSection title="Pickup and contact">
        <RadioGroup name="fulfilment" legend="Pickup or delivery" options={fulfilmentOptions} value={v.fulfilment} onChange={(x) => set("fulfilment", x)} error={e.fulfilment} />
        <RadioGroup name="contactMethod" legend="Preferred contact method" options={contactOptions} value={v.contactMethod} onChange={(x) => set("contactMethod", x)} error={e.contactMethod} />
        <TextAreaField
          name="message"
          label="Additional message"
          hint="For example, a time that suits you for pickup. For urgent questions, please call us."
          value={v.message}
          onChange={(x) => set("message", x)}
          error={e.message}
        />
      </FormSection>

      <PrivacyConsent checked={v.consent} onChange={(x) => set("consent", x)} error={e.consent} />
      <SubmitButton submitting={f.status === "submitting"}>Submit New Prescription</SubmitButton>
    </form>
  );
}
