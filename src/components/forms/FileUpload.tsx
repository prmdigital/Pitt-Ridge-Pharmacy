"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, FileText, ImageIcon, Loader2, RefreshCw, Trash2, Upload } from "lucide-react";
import { formSettings } from "@/config/site";
import { UploadError, uploadFile } from "@/lib/client/api";
import { validateFileMeta } from "@/lib/validation/schemas";

type State =
  | { kind: "empty" }
  | { kind: "uploading"; file: File; progress: number }
  | { kind: "done"; file: File }
  | { kind: "failed"; file: File | null; message: string };

const acceptAttr = [...Object.keys(formSettings.upload.accept), ...Object.values(formSettings.upload.accept).flat()].join(",");
const previewable = (f: File) => f.type === "image/jpeg" || f.type === "image/png";
const sizeLabel = (bytes: number) =>
  bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;

/**
 * Prescription upload with validation, preview, progress, replace and remove.
 * The file uploads as soon as it's chosen. The form only receives a private upload id.
 */
export function FileUpload({
  onUploaded,
  onBusyChange,
  error,
}: {
  onUploaded: (uploadId: string) => void;
  onBusyChange: (busy: boolean) => void;
  error?: string;
}) {
  const [state, setState] = useState<State>({ kind: "empty" });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const [announcement, setAnnouncement] = useState("");

  // Release preview memory when the file changes or the form unmounts.
  useEffect(() => () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);
  useEffect(() => () => abortRef.current?.abort(), []);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    abortRef.current?.abort();
    onUploaded("");

    const problem = validateFileMeta({ name: file.name, type: file.type, size: file.size });
    if (problem) {
      setState({ kind: "failed", file: null, message: problem });
      setPreviewUrl(null);
      setAnnouncement(problem);
      return;
    }

    setPreviewUrl(previewable(file) ? URL.createObjectURL(file) : null);
    setState({ kind: "uploading", file, progress: 0 });
    setAnnouncement("Uploading your file.");
    onBusyChange(true);

    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const id = await uploadFile(file, {
        signal: controller.signal,
        onProgress: (progress) => setState({ kind: "uploading", file, progress }),
      });
      onUploaded(id);
      setState({ kind: "done", file });
      setAnnouncement("Upload complete.");
    } catch (e) {
      if ((e as Error).name === "AbortError") return;
      const message = e instanceof UploadError ? e.message : "The upload didn't finish. Please try again.";
      setState({ kind: "failed", file, message });
      setAnnouncement(message);
    } finally {
      if (abortRef.current === controller) onBusyChange(false);
    }
  }

  function remove() {
    abortRef.current?.abort();
    onBusyChange(false);
    onUploaded("");
    setPreviewUrl(null);
    setState({ kind: "empty" });
    setAnnouncement("File removed.");
    if (inputRef.current) inputRef.current.value = "";
    inputRef.current?.focus();
  }

  // The form's "upload required" error only applies while nothing is chosen.
  const shownError = state.kind === "failed" ? state.message : state.kind === "empty" ? error : undefined;
  const file = state.kind === "empty" ? null : state.file;

  return (
    <div>
      <p className="field-label" id="upload-label">
        Prescription image or PDF <span className="font-normal text-muted">(required)</span>
      </p>
      <p id="upload-notice" className="field-hint">
        Please upload a clear image. Bring the original prescription when coming for pickup if required by the pharmacy.
      </p>
      <p id="upload-rules" className="field-hint">
        JPG, PNG, HEIC or PDF. Maximum 10 MB.
      </p>

      <input
        ref={inputRef}
        id="f-upload"
        type="file"
        accept={acceptAttr}
        className="peer sr-only"
        aria-labelledby="upload-label"
        aria-describedby={`upload-notice upload-rules${shownError ? " upload-error" : ""}`}
        aria-invalid={shownError ? true : undefined}
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {!file ? (
        <label
          htmlFor="f-upload"
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            handleFile(e.dataTransfer.files?.[0]);
          }}
          className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-card border-2 border-dashed px-6 py-10 text-center peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-orange-strong ${
            dragging ? "border-green-strong bg-green-50" : shownError ? "border-[#b42318] bg-white" : "border-[#8a9aa9] bg-white hover:bg-green-50"
          }`}
        >
          <Upload aria-hidden className="size-8 text-green-strong" />
          <span className="text-lg font-semibold">Choose a file or take a photo</span>
          <span className="text-muted">or drag and drop it here</span>
        </label>
      ) : (
        <div className="rounded-card border-2 border-line bg-white p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-green-50">
              {previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element -- local blob preview
                <img src={previewUrl} alt="Preview of the prescription you selected" className="h-full w-full object-cover" />
              ) : file!.type === "application/pdf" ? (
                <FileText aria-hidden className="size-10 text-green-strong" />
              ) : (
                <ImageIcon aria-hidden className="size-10 text-green-strong" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">{file!.name}</p>
              <p className="text-sm text-muted">
                {sizeLabel(file!.size)}
                {!previewUrl && state.kind !== "failed" && " · Preview not available for this file type"}
              </p>

              {state.kind === "uploading" && (
                <div className="mt-2">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Loader2 aria-hidden className="size-4 animate-spin" /> Uploading… {state.progress}%
                  </div>
                  <progress
                    value={state.progress}
                    max={100}
                    aria-label="Upload progress"
                    className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full [&::-moz-progress-bar]:bg-green-strong [&::-webkit-progress-bar]:bg-green-100 [&::-webkit-progress-value]:bg-green-strong"
                  />
                </div>
              )}
              {state.kind === "done" && (
                <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-green-strong">
                  <CheckCircle2 aria-hidden className="size-4" /> Uploaded
                </p>
              )}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" className="btn btn-sm btn-outline" onClick={() => inputRef.current?.click()}>
              <RefreshCw aria-hidden className="size-4" /> Replace file
            </button>
            <button type="button" className="btn btn-sm border-2 border-transparent text-[#8a1c12] underline hover:bg-[#fef3f2]" onClick={remove}>
              <Trash2 aria-hidden className="size-4" /> Remove
            </button>
          </div>
        </div>
      )}

      {shownError && (
        <p id="upload-error" className="field-error">
          <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
          <span>
            <span className="sr-only">Error: </span>
            {shownError}
          </span>
        </p>
      )}
      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>
      <p className="mt-2 text-sm text-muted">
        Your file is stored privately and is only used by the pharmacy team to handle this request.
      </p>
    </div>
  );
}
