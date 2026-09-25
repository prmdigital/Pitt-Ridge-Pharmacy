"use client";

import { useCallback, useRef, useState } from "react";
import type { z } from "zod";
import { submitRequest } from "@/lib/client/api";
import { track } from "@/lib/client/analytics";
import { toFieldErrors, type FieldErrors, type RequestType } from "@/lib/validation/schemas";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Shared form state for all request forms.
 * - Validates with the same Zod schema the server uses.
 * - After the first submit attempt, fields re-validate as the patient types.
 * - On failure, focus moves to the error summary so screen readers announce it.
 */
export function useRequestForm<T extends Record<string, unknown>>(
  type: RequestType,
  schema: z.ZodType,
  initial: T,
) {
  const [values, setValues] = useState<T>(initial);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [reference, setReference] = useState<string | null>(null);
  const attempted = useRef(false);
  const startedAt = useRef<number | null>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const revalidate = useCallback(
    (next: T) => {
      const r = schema.safeParse(next);
      setErrors(r.success ? {} : toFieldErrors(r.error.issues));
    },
    [schema],
  );

  const set = useCallback(
    <K extends keyof T>(key: K, value: T[K]) => {
      if (startedAt.current === null) {
        startedAt.current = Date.now();
        track({ name: "form_started", form: type });
      }
      setValues((prev) => {
        const next = { ...prev, [key]: value };
        if (attempted.current) revalidate(next);
        return next;
      });
    },
    [revalidate, type],
  );

  const focusSummary = () => requestAnimationFrame(() => summaryRef.current?.focus());

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>, extraCheck?: () => string | null) => {
    e.preventDefault();
    attempted.current = true;
    setFormError(null);

    const blocking = extraCheck?.();
    const r = schema.safeParse(values);
    const fieldErrors = r.success ? {} : toFieldErrors(r.error.issues);
    if (blocking) fieldErrors.uploadId = blocking;
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      focusSummary();
      return;
    }

    setStatus("submitting");
    const website = (e.currentTarget.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
    const result = await submitRequest(type, { ...values, website, startedAt: startedAt.current ?? undefined });

    if (result.ok) {
      setReference(result.reference);
      setStatus("success");
      track({ name: "form_submitted", form: type });
      return;
    }
    setStatus("error");
    setErrors(result.fieldErrors ?? {});
    setFormError(result.error);
    track({ name: "form_failed", form: type });
    focusSummary();
  };

  return { values, set, errors, formError, status, reference, onSubmit, summaryRef };
}
