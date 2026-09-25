import "server-only";
import { NextResponse } from "next/server";
import { isPreview } from "@/config/site";

/** On a public preview deployment, refuse all submissions so no patient data is received or stored. */
export function rejectIfPreview() {
  if (!isPreview) return null;
  return NextResponse.json(
    { error: "This is a preview site and does not accept requests. Please call the pharmacy." },
    { status: 403 },
  );
}
