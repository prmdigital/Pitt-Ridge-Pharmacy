import "server-only";
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

let devSecret: string | null = null;

function signingSecret() {
  const s = process.env.UPLOAD_SIGNING_SECRET;
  if (s && s.length >= 32) return s;
  if (process.env.NODE_ENV === "production") {
    throw new Error("UPLOAD_SIGNING_SECRET must be set (32+ characters) in production.");
  }
  // Development only: a per-process secret. Uploads signed before a restart become invalid.
  devSecret ??= randomBytes(32).toString("base64url");
  return devSecret;
}

export function sign(value: string) {
  return createHmac("sha256", signingSecret()).update(value).digest("base64url");
}

export function verify(value: string, signature: string) {
  const expected = Buffer.from(sign(value));
  const given = Buffer.from(signature);
  return expected.length === given.length && timingSafeEqual(expected, given);
}

export function randomId(bytes = 16) {
  return randomBytes(bytes).toString("base64url");
}

/** Rejects cross-site form posts. Browsers always send Origin on POST/PUT with fetch. */
export function isSameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

/**
 * Checks the first bytes of a file against the claimed type, so a renamed
 * executable can't pass as a JPG. Returns the detected MIME type or null.
 */
export function sniffFileType(buf: Uint8Array): string | null {
  const b = (i: number) => buf[i];
  if (b(0) === 0xff && b(1) === 0xd8 && b(2) === 0xff) return "image/jpeg";
  if (b(0) === 0x89 && b(1) === 0x50 && b(2) === 0x4e && b(3) === 0x47) return "image/png";
  if (b(0) === 0x25 && b(1) === 0x50 && b(2) === 0x44 && b(3) === 0x46) return "application/pdf";
  // HEIC/HEIF: ISO BMFF "ftyp" box at offset 4 with a HEIF brand.
  const ftyp = String.fromCharCode(...buf.slice(4, 8));
  const brand = String.fromCharCode(...buf.slice(8, 12));
  if (ftyp === "ftyp" && ["heic", "heix", "hevc", "heim", "heis", "mif1", "msf1"].includes(brand)) {
    return "image/heic";
  }
  return null;
}
