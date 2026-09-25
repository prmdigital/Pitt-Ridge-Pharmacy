import { NextResponse } from "next/server";
import { rejectIfPreview } from "@/lib/server/preview";
import { formSettings } from "@/config/site";
import { clientKey, rateLimit } from "@/lib/server/rate-limit";
import { isSameOrigin, randomId, sign } from "@/lib/server/security";
import { createUploadSlot } from "@/lib/server/storage";
import { uploadRequestSchema, validateFileMeta } from "@/lib/validation/schemas";

const URL_TTL_MS = 10 * 60 * 1000;

/** Step 1 of an upload: validate the file details and return a short-lived signed URL. */
export async function POST(req: Request) {
  const preview = rejectIfPreview();
  if (preview) return preview;
  if (!isSameOrigin(req)) return NextResponse.json({ error: "Request not allowed." }, { status: 403 });

  const limit = rateLimit(`sign:${clientKey(req)}`, 20, 60 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many uploads from this device. Please wait and try again, or call the pharmacy." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } },
    );
  }

  const body = uploadRequestSchema.safeParse(await req.json().catch(() => null));
  if (!body.success) return NextResponse.json({ error: "We couldn't read that file's details." }, { status: 400 });

  const { fileName, contentType, size } = body.data;
  const problem = validateFileMeta({ name: fileName, type: contentType, size });
  if (problem) return NextResponse.json({ error: problem }, { status: 400 });

  // Normalise the type from the extension so HEIC files with an empty MIME type still work.
  const ext = fileName.toLowerCase().match(/\.[a-z0-9]+$/)?.[0] ?? "";
  const normalisedType =
    Object.entries(formSettings.upload.accept).find(([, exts]) => exts.includes(ext))?.[0] ?? contentType;

  const id = randomId(18);
  await createUploadSlot(id, normalisedType, size);

  const exp = Date.now() + URL_TTL_MS;
  const sig = sign(`${id}.${exp}`);
  return NextResponse.json({ uploadId: id, uploadUrl: `/api/uploads/${id}?exp=${exp}&sig=${sig}`, expiresAt: exp });
}
