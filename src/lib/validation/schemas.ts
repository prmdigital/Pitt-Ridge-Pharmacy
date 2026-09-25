import { z } from "zod";
import { formSettings } from "@/config/site";

/**
 * Shared validation for every request form.
 * The same schemas run in the browser (instant feedback) and on the server (the
 * authority). Messages are written for patients: say what's wrong and how to fix it.
 */

const req = (label: string, max = 100) =>
  z.string({ error: `Enter ${label}.` }).trim().min(1, `Enter ${label}.`).max(max, `Keep ${label} under ${max} characters.`);

const optional = (max: number, label = "this field") =>
  z.string().trim().max(max, `Keep ${label} under ${max} characters.`).optional().default("");

const phone = z
  .string({ error: "Enter a phone number." })
  .trim()
  .min(1, "Enter a phone number.")
  .refine((v) => /^\+?1?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(v), {
    message: "Enter a 10-digit phone number, for example 604-555-0123.",
  });

const email = z
  .string()
  .trim()
  .max(254, "Email address is too long.")
  .refine((v) => v === "" || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v), {
    message: "Enter an email address like name@example.com.",
  })
  .optional()
  .default("");

const dobBase = z
  .string()
  .trim()
  .refine((v) => v === "" || isValidDob(v), {
    message: "Enter a valid date of birth. It cannot be in the future.",
  });

const dateOfBirth =
  formSettings.dateOfBirth === "required"
    ? dobBase.refine((v) => v !== "", { message: "Enter the patient's date of birth." })
    : dobBase.optional().default("");

function isValidDob(v: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
  const d = new Date(`${v}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return false;
  const now = new Date();
  return d <= now && d.getUTCFullYear() > now.getUTCFullYear() - 130;
}

const contactMethod = z.enum(["phone", "email"], { message: "Choose how we should contact you." });
const fulfilment = z.enum(["pickup", "delivery"], { message: "Choose pickup or delivery." });

const mustBeTrue = (message: string) => z.boolean({ error: message }).refine((v) => v === true, { message });

const privacyConsent = mustBeTrue(
  "Please confirm you agree to the privacy policy so we can process your request.",
);

/** Spam protection fields shared by all forms. Validated separately on the server. */
const antiSpam = {
  website: z.string().max(0).optional().default(""), // honeypot, must stay empty
  startedAt: z.number().optional(),
};

/** If email is the preferred contact method, email becomes required. */
function requireEmailWhenChosen<T extends { contactMethod: string; email: string }>(
  data: T,
  ctx: z.RefinementCtx,
) {
  if (data.contactMethod === "email" && !data.email) {
    ctx.addIssue({
      code: "custom",
      path: ["email"],
      message: "Enter an email address, or choose phone as your contact method.",
    });
  }
}

export const newPrescriptionSchema = z
  .object({
    firstName: req("the patient's first name"),
    lastName: req("the patient's last name"),
    dateOfBirth,
    phone,
    email,
    uploadId: z.string({ error: "Upload a photo or PDF of the prescription." }).trim().min(1, "Upload a photo or PDF of the prescription."),
    fulfilment,
    contactMethod,
    message: optional(1000, "your message"),
    consent: privacyConsent,
    ...antiSpam,
  })
  .superRefine(requireEmailWhenChosen);

export const refillSchema = z
  .object({
    patientName: req("the patient's name", 120),
    dateOfBirth,
    phone,
    email,
    medicationName: req("the medication name", 200),
    rxNumber: optional(40, "the prescription number"),
    quantityNotes: optional(500, "the refill notes"),
    fulfilment,
    contactMethod,
    message: optional(1000, "your message"),
    consent: privacyConsent,
    ...antiSpam,
  })
  .superRefine(requireEmailWhenChosen);

export const transferSchema = z
  .object({
    firstName: req("the patient's first name"),
    lastName: req("the patient's last name"),
    dateOfBirth,
    phone,
    email,
    currentPharmacyName: req("the current pharmacy's name", 150),
    currentPharmacyAddress: optional(250, "the pharmacy address"),
    currentPharmacyPhone: z
      .string()
      .trim()
      .refine((v) => v === "" || /^\+?1?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(v), {
        message: "Enter a 10-digit phone number for the current pharmacy, or leave it blank.",
      })
      .optional()
      .default(""),
    medicationNames: req("the medications to transfer", 1000),
    transferNotes: optional(1000, "the transfer notes"),
    contactMethod,
    consentContactPrevious: mustBeTrue(
      "Please confirm we may contact your current pharmacy to arrange the transfer.",
    ),
    consent: privacyConsent,
    ...antiSpam,
  })
  .superRefine(requireEmailWhenChosen);

export const contactSchema = z
  .object({
    name: req("your name"),
    phone: z
      .string()
      .trim()
      .refine((v) => v === "" || /^\+?1?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(v), {
        message: "Enter a 10-digit phone number, or leave it blank.",
      })
      .optional()
      .default(""),
    email,
    topic: optional(60),
    message: req("your message", 1500),
    consent: privacyConsent,
    ...antiSpam,
  })
  .superRefine((d, ctx) => {
    if (!d.phone && !d.email) {
      ctx.addIssue({ code: "custom", path: ["phone"], message: "Enter a phone number or an email address so we can reply." });
    }
  });

export const uploadRequestSchema = z.object({
  fileName: z.string().trim().min(1).max(200),
  contentType: z.string().trim().max(100),
  size: z.number().int().positive(),
});

export const schemas = {
  new: newPrescriptionSchema,
  refill: refillSchema,
  transfer: transferSchema,
  contact: contactSchema,
} as const;

export type RequestType = keyof typeof schemas;
export type FieldErrors = Record<string, string>;

/** Turns a Zod result into { fieldName: firstMessage }. */
export function toFieldErrors(issues: z.core.$ZodIssue[]): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

/** Validates a picked file. Used by the browser before upload and by the server. */
export function validateFileMeta(meta: { name: string; type: string; size: number }): string | null {
  const { maxBytes, accept } = formSettings.upload;
  const ext = meta.name.toLowerCase().match(/\.[a-z0-9]+$/)?.[0] ?? "";
  const allowedExts = Object.values(accept).flat();
  // HEIC files often arrive with an empty MIME type, so the extension is checked too.
  const typeOk = meta.type === "" || meta.type in accept;
  if (!allowedExts.includes(ext) || !typeOk) {
    return "This file type isn't accepted. Upload a JPG, PNG, HEIC or PDF file.";
  }
  if (meta.size <= 0) return "This file looks empty. Choose another file.";
  if (meta.size > maxBytes) {
    return `This file is ${(meta.size / 1024 / 1024).toFixed(1)} MB. The limit is 10 MB. Try a smaller photo or a PDF.`;
  }
  return null;
}
