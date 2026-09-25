import "server-only";
import { mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { scanForMalware } from "./malware-scan";

/**
 * Private upload storage.
 *
 * LOCAL MOCK ADAPTER: files go to ./.data/private-uploads, which sits outside
 * /public, is git-ignored, and has no route that serves it. Nothing here is
 * ever reachable by URL.
 *
 * PRODUCTION INTEGRATION POINT: replace this module with a private object
 * store (for example an S3 bucket in ca-central-1 with public access blocked,
 * encryption at rest, and a lifecycle rule for retention). `createUploadSlot`
 * would then return a pre-signed PUT URL from the provider instead of our own
 * signed route. Keep the same exported functions so the routes don't change.
 */

const ROOT = path.join(process.cwd(), ".data", "private-uploads");

export type UploadMeta = {
  id: string;
  contentType: string;
  size: number;
  createdAt: number;
  status: "pending" | "clean" | "rejected";
  /** Set when a form submission claims this upload. Prevents reuse. */
  claimedAt?: number;
};

const metaPath = (id: string) => path.join(ROOT, `${id}.json`);
const filePath = (id: string) => path.join(ROOT, `${id}.bin`);
const safeId = (id: string) => /^[A-Za-z0-9_-]{16,64}$/.test(id);

export async function createUploadSlot(id: string, contentType: string, size: number) {
  await mkdir(ROOT, { recursive: true });
  const meta: UploadMeta = { id, contentType, size, createdAt: Date.now(), status: "pending" };
  await writeFile(metaPath(id), JSON.stringify(meta), { mode: 0o600 });
  return meta;
}

export async function getUpload(id: string): Promise<UploadMeta | null> {
  if (!safeId(id)) return null;
  try {
    return JSON.parse(await readFile(metaPath(id), "utf8")) as UploadMeta;
  } catch {
    return null;
  }
}

export async function storeUpload(meta: UploadMeta, bytes: Uint8Array) {
  await writeFile(filePath(meta.id), bytes, { mode: 0o600 });
  const verdict = await scanForMalware(bytes, meta.contentType);
  const updated: UploadMeta = { ...meta, status: verdict.clean ? "clean" : "rejected" };
  await writeFile(metaPath(meta.id), JSON.stringify(updated), { mode: 0o600 });
  if (!verdict.clean) await rm(filePath(meta.id), { force: true });
  return updated;
}

export async function claimUpload(id: string) {
  const meta = await getUpload(id);
  if (!meta || meta.status !== "clean" || meta.claimedAt) return null;
  const updated = { ...meta, claimedAt: Date.now() };
  await writeFile(metaPath(id), JSON.stringify(updated), { mode: 0o600 });
  return updated;
}

/** Deletes uploads older than the retention period. Returns the number removed. */
export async function purgeExpired(retentionDays: number) {
  const cutoff = Date.now() - retentionDays * 24 * 60 * 60 * 1000;
  let removed = 0;
  let entries: string[] = [];
  try {
    entries = await readdir(ROOT);
  } catch {
    return 0;
  }
  for (const name of entries) {
    const full = path.join(ROOT, name);
    const info = await stat(full);
    if (info.mtimeMs < cutoff) {
      await rm(full, { force: true });
      if (name.endsWith(".bin")) removed += 1;
    }
  }
  return removed;
}

export function retentionDays() {
  const n = Number(process.env.RETENTION_DAYS);
  return Number.isFinite(n) && n > 0 ? n : 30;
}
