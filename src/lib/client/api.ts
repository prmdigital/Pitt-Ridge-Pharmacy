import { isPreview } from "@/config/site";
import type { FieldErrors, RequestType } from "@/lib/validation/schemas";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const previewRef = () => `PREVIEW-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

/**
 * Browser-side service layer. Components call these functions and never talk
 * to endpoints directly, so the backend can change without touching the UI.
 *
 * Privacy rule: nothing here logs form values, file names or file contents.
 */

export type SubmitResult =
  | { ok: true; reference: string }
  | { ok: false; error: string; fieldErrors?: FieldErrors };

const NETWORK_ERROR = `We couldn't reach the pharmacy's website. Check your connection and try again, or call us.`;

export async function submitRequest(type: RequestType, payload: Record<string, unknown>): Promise<SubmitResult> {
  // Preview site: nothing is sent anywhere. The form behaves normally for demonstrations.
  if (isPreview) {
    await wait(700);
    return { ok: true, reference: previewRef() };
  }
  try {
    const res = await fetch(`/api/requests/${type}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "same-origin",
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.ok) return { ok: true, reference: data.reference };
    return {
      ok: false,
      error: data.error ?? "Something went wrong. Please try again, or call the pharmacy.",
      fieldErrors: data.fieldErrors,
    };
  } catch {
    return { ok: false, error: NETWORK_ERROR };
  }
}

export class UploadError extends Error {}

/**
 * Uploads a file in two steps: ask the server for a short-lived signed URL,
 * then send the bytes to it with progress events. Returns the private upload id.
 */
export async function uploadFile(
  file: File,
  { onProgress, signal }: { onProgress: (pct: number) => void; signal?: AbortSignal },
): Promise<string> {
  // Preview site: simulate progress locally; the file never leaves the device.
  if (isPreview) {
    for (let pct = 10; pct <= 100; pct += 15) {
      if (signal?.aborted) throw new DOMException("Upload cancelled", "AbortError");
      onProgress(Math.min(pct, 100));
      await wait(120);
    }
    onProgress(100);
    return "preview-upload";
  }
  let slot: { uploadId: string; uploadUrl: string };
  try {
    const res = await fetch("/api/uploads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName: file.name, contentType: file.type, size: file.size }),
      signal,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new UploadError(data.error ?? "We couldn't start the upload. Please try again.");
    slot = data;
  } catch (e) {
    if (e instanceof UploadError) throw e;
    if ((e as Error).name === "AbortError") throw e;
    throw new UploadError(NETWORK_ERROR);
  }

  await new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", slot.uploadUrl);
    xhr.setRequestHeader("Content-Type", "application/octet-stream");
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) return resolve();
      let msg = "The upload didn't finish. Please try again.";
      try {
        msg = JSON.parse(xhr.responseText).error ?? msg;
      } catch {}
      reject(new UploadError(msg));
    };
    xhr.onerror = () => reject(new UploadError(NETWORK_ERROR));
    xhr.onabort = () => reject(new DOMException("Upload cancelled", "AbortError"));
    signal?.addEventListener("abort", () => xhr.abort(), { once: true });
    xhr.send(file);
  });

  return slot.uploadId;
}
