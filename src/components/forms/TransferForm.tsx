"use client";

import { transferSchema } from "@/lib/validation/schemas";
import {
  CheckboxField,
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
import { contactOptions, type ContactMethod } from "./options";
import { useRequestForm } from "./useRequestForm";

export function TransferForm() {
  const f = useRequestForm("transfer", transferSchema, {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phone: "",
    email: "",
    currentPharmacyName: "",
    currentPharmacyAddress: "",
    currentPharmacyPhone: "",
    medicationNames: "",
    transferNotes: "",
    contactMethod: "" as ContactMethod,
    consentContactPrevious: false,
    consent: false,
  });
  const { values: v, set, errors: e } = f;

  if (f.status === "success") {
    return (
      <SuccessPanel title="Transfer request received" reference={f.reference}>
        <p>
          Your request has been received. Our team will contact the previous pharmacy and let you know if more
          information is required.
        </p>
      </SuccessPanel>
    );
  }

  return (
    <form noValidate onSubmit={(ev) => f.onSubmit(ev)} className="relative space-y-8">
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
          <TextField name="email" label="Email address" type="email" autoComplete="email" value={v.email} onChange={(x) => set("email", x)} error={e.email} hint="Required if you'd like us to contact you by email." />
        </div>
      </FormSection>

      <FormSection title="Your current pharmacy">
        <TextField name="currentPharmacyName" label="Current pharmacy name" autoComplete="off" required value={v.currentPharmacyName} onChange={(x) => set("currentPharmacyName", x)} error={e.currentPharmacyName} />
        <TextField name="currentPharmacyAddress" label="Current pharmacy address" autoComplete="off" value={v.currentPharmacyAddress} onChange={(x) => set("currentPharmacyAddress", x)} error={e.currentPharmacyAddress} maxLength={250} />
        <TextField name="currentPharmacyPhone" label="Current pharmacy phone number" type="tel" inputMode="tel" autoComplete="off" value={v.currentPharmacyPhone} onChange={(x) => set("currentPharmacyPhone", x)} error={e.currentPharmacyPhone} hint="Helps us reach them faster." />
      </FormSection>

      <FormSection title="Medications">
        <TextAreaField name="medicationNames" label="Medication names" required value={v.medicationNames} onChange={(x) => set("medicationNames", x)} error={e.medicationNames} hint="List the medications you'd like to transfer, one per line. Write “all” to transfer everything." rows={4} />
        <TextAreaField name="transferNotes" label="Transfer notes" value={v.transferNotes} onChange={(x) => set("transferNotes", x)} error={e.transferNotes} hint="For example, when you'll need your next fill." rows={3} />
      </FormSection>

      <FormSection title="Contact and permission">
        <RadioGroup name="contactMethod" legend="Preferred contact method" options={contactOptions} value={v.contactMethod} onChange={(x) => set("contactMethod", x)} error={e.contactMethod} />
        <CheckboxField name="consentContactPrevious" checked={v.consentContactPrevious} onChange={(x) => set("consentContactPrevious", x)} error={e.consentContactPrevious}>
          I give permission for Pittridge Pharmacy to contact my current pharmacy to transfer the prescriptions listed above.
        </CheckboxField>
        <PrivacyConsent checked={v.consent} onChange={(x) => set("consent", x)} error={e.consent} />
      </FormSection>

      <SubmitButton submitting={f.status === "submitting"}>Transfer Prescription</SubmitButton>
    </form>
  );
}
