import { NextResponse } from "next/server";
import { deliverToPharmacy } from "@/lib/server/deliver";
import { clientKey, rateLimit } from "@/lib/server/rate-limit";
import { isSameOrigin } from "@/lib/server/security";
import { claimUpload } from "@/lib/server/storage";
import { schemas, toFieldErrors, type RequestType } from "@/lib/validation/schemas";

const MAX_BODY_BYTES = 32 * 1024;
const MIN_FILL_MS = 3000;

/** Receives prescription, refill, transfer and contact form submissions. */
export async function POST(req: Request, ctx: RouteContext<"/api/requests/[type]">) {
  const { type } = await ctx.params;
  if (!(type in schemas)) return NextResponse.json({ error: "Not found." }, { status: 404 });
  const kind = type as RequestType;

  if (!isSameOrigin(req)) return NextResponse.json({ error: "Request not allowed." }, { status: 403 });

  const limit = rateLimit(`req:${clientKey(req)}`, 10, 60 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many requests from this device. Please call the pharmacy, or try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } },
    );
  }

  if (Number(req.headers.get("content-length")) > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Your message is too long." }, { status: 413 });
  }

  const raw = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!raw || typeof raw !== "object") return NextResponse.json({ error: "We couldn't read the form." }, { status: 400 });

  // Spam checks. Bots filling the hidden field get a normal-looking reply and nothing is processed.
  if (typeof raw.website === "string" && raw.website.length > 0) {
    return NextResponse.json({ ok: true, reference: "PR-RECEIVED" });
  }
  if (typeof raw.startedAt === "number" && Date.now() - raw.startedAt < MIN_FILL_MS) {
    return NextResponse.json({ error: "That was quick. Please check your details and submit again." }, { status: 400 });
  }

  const parsed = schemas[kind].safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Some details need attention.", fieldErrors: toFieldErrors(parsed.error.issues) },
      { status: 422 },
    );
  }

  if (kind === "new") {
    const uploadId = (parsed.data as { uploadId: string }).uploadId;
    const upload = await claimUpload(uploadId);
    if (!upload) {
      return NextResponse.json(
        {
          error: "We couldn't find your uploaded prescription.",
          fieldErrors: { uploadId: "Please upload the prescription again." },
        },
        { status: 422 },
      );
    }
  }

  const { website: _w, startedAt: _s, ...data } = parsed.data as Record<string, unknown>;
  const { reference } = await deliverToPharmacy(kind, data);
  return NextResponse.json({ ok: true, reference });
}
