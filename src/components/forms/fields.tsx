"use client";

import Link from "next/link";
import { forwardRef, useEffect, useRef } from "react";
import { AlertCircle, CheckCircle2, Info, Loader2 } from "lucide-react";
import { formSettings, site } from "@/config/site";

/* ---------- Shared bits ---------- */

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="field-error">
      <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
      <span>
        <span className="sr-only">Error: </span>
        {message}
      </span>
    </p>
  );
}

/** `required: null` hides the tag, for fields whose group heading explains the rule. */
function Label({ htmlFor, label, required }: { htmlFor: string; label: string; required?: boolean | null }) {
  return (
    <label htmlFor={htmlFor} className="field-label">
      {label}
      {required === null ? null : required ? (
        <span className="ml-1 font-normal text-muted">(required)</span>
      ) : (
        <span className="ml-1 font-normal text-muted">(optional)</span>
      )}
    </label>
  );
}

const describedBy = (...ids: (string | false | undefined)[]) => ids.filter(Boolean).join(" ") || undefined;

/* ---------- Inputs ---------- */

type BaseProps = {
  name: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  hint?: string;
  required?: boolean | null;
};

export function TextField({
  name,
  label,
  value,
  onChange,
  error,
  hint,
  required,
  type = "text",
  autoComplete,
  inputMode,
  maxLength = 200,
}: BaseProps & {
  type?: "text" | "email" | "tel" | "date";
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  maxLength?: number;
}) {
  const id = `f-${name}`;
  return (
    <div>
      <Label htmlFor={id} label={label} required={required} />
      {hint && (
        <span id={`${id}-hint`} className="field-hint">
          {hint}
        </span>
      )}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(hint && `${id}-hint`, error && `${id}-error`)}
        className="field-input"
        max={type === "date" ? new Date().toISOString().slice(0, 10) : undefined}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

export function TextAreaField({ name, label, value, onChange, error, hint, required, maxLength = 1000, rows = 4 }: BaseProps & { maxLength?: number; rows?: number }) {
  const id = `f-${name}`;
  return (
    <div>
      <Label htmlFor={id} label={label} required={required} />
      {hint && (
        <span id={`${id}-hint`} className="field-hint">
          {hint}
        </span>
      )}
      <textarea
        id={id}
        name={name}
        value={value}
        rows={rows}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(hint && `${id}-hint`, error && `${id}-error`, `${id}-count`)}
        className="field-input resize-y"
      />
      <p id={`${id}-count`} className="mt-1 text-right text-sm text-muted">
        {value.length} of {maxLength} characters
      </p>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

export function RadioGroup<V extends string>({
  name,
  legend,
  options,
  value,
  onChange,
  error,
  hint,
}: {
  name: string;
  legend: string;
  options: { value: V; label: string; hint?: string }[];
  value: V | "";
  onChange: (v: V) => void;
  error?: string;
  hint?: string;
}) {
  const id = `f-${name}`;
  return (
    <fieldset
      id={id}
      tabIndex={-1}
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy(hint && `${id}-hint`, error && `${id}-error`)}
    >
      <legend className="field-label">
        {legend} <span className="font-normal text-muted">(required)</span>
      </legend>
      {hint && (
        <span id={`${id}-hint`} className="field-hint">
          {hint}
        </span>
      )}
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((o) => {
          const checked = value === o.value;
          return (
            <label
              key={o.value}
              className={`flex min-h-12 cursor-pointer items-start gap-3 rounded-lg border-2 p-3.5 has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-orange-strong ${
                checked ? "border-green-strong bg-green-50" : error ? "border-[#b42318]" : "border-[#8a9aa9]"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={o.value}
                checked={checked}
                onChange={() => onChange(o.value)}
                className="mt-1 size-5 shrink-0 accent-green-strong focus-visible:outline-none"
              />
              <span>
                <span className="font-semibold">{o.label}</span>
                {o.hint && <span className="block text-[0.95rem] text-muted">{o.hint}</span>}
              </span>
            </label>
          );
        })}
      </div>
      <FieldError id={`${id}-error`} message={error} />
    </fieldset>
  );
}

export function CheckboxField({
  name,
  checked,
  onChange,
  error,
  children,
}: {
  name: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  error?: string;
  children: React.ReactNode;
}) {
  const id = `f-${name}`;
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-required
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 size-6 shrink-0 accent-green-strong"
        />
        <label htmlFor={id} className="text-[1rem]">
          {children} <span className="text-muted">(required)</span>
        </label>
      </div>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

/** Date of birth, shown only if the pharmacy's setting allows it. */
export function DobField({ value, onChange, error }: { value: string; onChange: (v: string) => void; error?: string }) {
  if (formSettings.dateOfBirth === "hidden") return null;
  return (
    <TextField
      name="dateOfBirth"
      label="Date of birth"
      type="date"
      autoComplete="bday"
      value={value}
      onChange={onChange}
      error={error}
      required={formSettings.dateOfBirth === "required"}
      hint="Helps us match the request to the right patient record."
    />
  );
}

export function PrivacyConsent({ checked, onChange, error }: { checked: boolean; onChange: (v: boolean) => void; error?: string }) {
  return (
    <CheckboxField name="consent" checked={checked} onChange={onChange} error={error}>
      I agree that {site.name} may use the information in this form to process my request and contact me, as described
      in the{" "}
      <Link href="/privacy" target="_blank" className="font-semibold text-green-strong underline">
        privacy policy<span className="sr-only"> (opens in a new tab)</span>
      </Link>
      .
    </CheckboxField>
  );
}

/** Hidden field for bots. Real visitors never see or fill it. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor="f-website">Leave this field empty</label>
      <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
    </div>
  );
}

/* ---------- Form-level messages ---------- */

const fieldLabels: Record<string, string> = {
  firstName: "First name",
  lastName: "Last name",
  patientName: "Patient name",
  name: "Name",
  dateOfBirth: "Date of birth",
  phone: "Phone number",
  email: "Email address",
  uploadId: "Prescription upload",
  fulfilment: "Pickup or delivery",
  contactMethod: "Preferred contact method",
  medicationName: "Medication name",
  medicationNames: "Medications to transfer",
  rxNumber: "Prescription number",
  currentPharmacyName: "Current pharmacy name",
  currentPharmacyPhone: "Current pharmacy phone",
  currentPharmacyAddress: "Current pharmacy address",
  consentContactPrevious: "Permission to contact your current pharmacy",
  consent: "Privacy agreement",
  message: "Message",
  quantityNotes: "Refill notes",
  transferNotes: "Transfer notes",
};

/**
 * Moves to a field from the error summary. The whole field (label, hint, input) is
 * centred so nothing sits under the fixed header, then the input receives focus.
 */
function jumpToField(e: React.MouseEvent<HTMLAnchorElement>, key: string) {
  const el = document.getElementById(`f-${key}`);
  if (!el) return;
  e.preventDefault();
  const block = el.tagName === "FIELDSET" ? el : el.closest("div") ?? el;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  block.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
  const target = el.tagName === "FIELDSET" ? el.querySelector<HTMLInputElement>("input") ?? el : el;
  target.focus({ preventScroll: true });
}

/** Lists every problem with a link to the field. Receives focus after a failed submit. */
export const ErrorSummary = forwardRef<HTMLDivElement, { errors: Record<string, string>; formError: string | null }>(
  function ErrorSummary({ errors, formError }, ref) {
    // List problems in the order the fields appear on the page, not the order they were checked.
    const pos = (key: string) => {
      if (typeof document === "undefined") return 0;
      const el = document.getElementById(`f-${key === "uploadId" ? "upload" : key}`);
      return el ? el.getBoundingClientRect().top + window.scrollY : Number.MAX_SAFE_INTEGER;
    };
    const entries = Object.entries(errors).sort(([a], [b]) => pos(a) - pos(b));
    const show = entries.length > 0 || formError;
    return (
      <div ref={ref} tabIndex={-1} role="alert" aria-live="assertive" className="focus:outline-none">
        {show && (
          <div className="mb-8 rounded-card border-2 border-[#b42318] bg-[#fef3f2] p-5">
            <h2 className="flex items-center gap-2 text-lg text-[#8a1c12]">
              <AlertCircle aria-hidden className="size-5" />
              {formError ?? "Please fix the following:"}
            </h2>
            {entries.length > 0 && (
              <ul className="mt-3 list-disc space-y-1 pl-6">
                {entries.map(([key, msg]) => (
                  <li key={key}>
                    <a
                      href={`#f-${key === "uploadId" ? "upload" : key}`}
                      onClick={(e) => jumpToField(e, key === "uploadId" ? "upload" : key)}
                      className="inline-flex min-h-11 items-center font-semibold text-[#8a1c12] underline"
                    >
                      {fieldLabels[key] ?? key}: {msg}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    );
  },
);

export function Notice({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-card border-l-4 border-green bg-green-50 p-4">
      <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-green-strong" />
      <div>{children}</div>
    </div>
  );
}

export function SubmitButton({ submitting, children }: { submitting: boolean; children: React.ReactNode }) {
  return (
    <button type="submit" className="btn btn-primary w-full text-lg sm:w-auto disabled:opacity-70" disabled={submitting} aria-disabled={submitting}>
      {submitting ? (
        <>
          <Loader2 aria-hidden className="size-5 animate-spin" />
          Sending…
        </>
      ) : (
        children
      )}
    </button>
  );
}

export function SuccessPanel({ title, reference, children }: { title: string; reference: string | null; children: React.ReactNode }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  // Bring the confirmation into view once, centred so the fixed header never covers it.
  useEffect(() => {
    const el = headingRef.current?.closest<HTMLElement>("[role=status]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el?.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
    headingRef.current?.focus({ preventScroll: true });
  }, []);
  return (
    <div role="status" className="rounded-card border-2 border-green bg-green-50 p-6 md:p-8">
      <CheckCircle2 aria-hidden className="size-10 text-green-strong" />
      <h2 className="mt-3 text-2xl md:text-3xl" tabIndex={-1} ref={headingRef}>
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-lg">{children}</div>
      {reference && (
        <p className="mt-4 text-muted">
          Reference number: <strong className="text-navy">{reference}</strong>
        </p>
      )}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a href={site.phone.href} className="btn btn-outline">
          Call {site.phone.display}
        </a>
        <Link href="/" className="btn btn-secondary">
          Back to home
        </Link>
      </div>
    </div>
  );
}

export function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="space-y-5 border-t border-line pt-8 first:border-t-0 first:pt-0">
      <legend className="float-left mb-5 w-full text-xl font-bold">{title}</legend>
      <div className="clear-left space-y-5">{children}</div>
    </fieldset>
  );
}
