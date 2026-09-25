import "server-only";

/**
 * Fixed-window rate limiter kept in memory.
 *
 * PRODUCTION INTEGRATION POINT: memory is per instance and resets on deploy.
 * Swap for a shared store (Redis, Upstash, or your host's edge rate limiting).
 */
const g = globalThis as unknown as { __prRateBuckets?: Map<string, { count: number; resetAt: number }> };
const buckets = (g.__prRateBuckets ??= new Map());

export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfterSec: 0 };
  }
  bucket.count += 1;
  if (bucket.count > limit) {
    return { ok: false, retryAfterSec: Math.ceil((bucket.resetAt - now) / 1000) };
  }
  return { ok: true, retryAfterSec: 0 };
}

/** Best-effort client key. Behind a proxy, configure it to set x-forwarded-for reliably. */
export function clientKey(req: Request) {
  const fwd = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return fwd || req.headers.get("x-real-ip") || "unknown";
}
