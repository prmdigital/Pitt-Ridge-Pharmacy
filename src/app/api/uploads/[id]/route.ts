import { NextResponse } from "next/server";
import { rejectIfPreview } from "@/lib/server/preview";
import { formSettings } from "@/config/site";
import { isSameOrigin, sniffFileType, verify } from "@/lib/server/security";
import { getUpload, storeUpload } from "@/lib/server/storage";

/**
 * Step 2 of an upload: receive the file bytes at the signed URL.
 * There is intentionally no GET handler. Uploaded files are never served back.
 */
export async function PUT(req: Request, ctx: RouteContext<"/api/uploads/[id]">) {
  const preview = rejectIfPreview();
  if (preview) return preview;
  const { id } = await ctx.params;
  const url = new URL(req.url);
  const exp = Number(url.searchParams.get("exp"));
  const sig = url.searchParams.get("sig") ?? "";

  if (!isSameOrigin(req)) return NextResponse.json({ error: "Request not allowed." }, { status: 403 });
  if (!Number.isFinite(exp) || exp < Date.now() || !verify(`${id}.${exp}`, sig)) {
    return NextResponse.json({ error: "This upload link has expired. Please choose the file again." }, { status: 403 });
  }

  const meta = await getUpload(id);
  if (!meta || meta.status !== "pending") {
    return NextResponse.json({ error: "This upload link has already been used. Please choose the file again." }, { status: 409 });
  }

  const declared = Number(req.headers.get("content-length"));
  if (declared > formSettings.upload.maxBytes) {
    return NextResponse.json({ error: "This file is larger than 10 MB." }, { status: 413 });
  }

  const bytes = new Uint8Array(await req.arrayBuffer());
  if (bytes.byteLength !== meta.size || bytes.byteLength > formSettings.upload.maxBytes) {
    return NextResponse.json({ error: "The file didn't upload completely. Please try again." }, { status: 400 });
  }

  const detected = sniffFileType(bytes);
  const typeMatches =
    detected === meta.contentType || (detected === "image/heic" && meta.contentType === "image/heif");
  if (!typeMatches) {
    return NextResponse.json(
      { error: "This file doesn't look like a JPG, PNG, HEIC or PDF. Please choose another file." },
      { status: 415 },
    );
  }

  const stored = await storeUpload(meta, bytes);
  if (stored.status !== "clean") {
    return NextResponse.json({ error: "We couldn't accept this file. Please try a different photo or PDF." }, { status: 422 });
  }
  return NextResponse.json({ ok: true });
}
