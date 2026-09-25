import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { purgeExpired, retentionDays } from "@/lib/server/storage";

/**
 * Deletes uploads older than RETENTION_DAYS.
 * Call from a scheduled job: POST with header `Authorization: Bearer <INTERNAL_CRON_TOKEN>`.
 */
export async function POST(req: Request) {
  const token = process.env.INTERNAL_CRON_TOKEN;
  const given = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  const ok = !!token && given.length === token.length && timingSafeEqual(Buffer.from(given), Buffer.from(token));
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const days = retentionDays();
  const removed = await purgeExpired(days);
  return NextResponse.json({ ok: true, retentionDays: days, removed });
}
