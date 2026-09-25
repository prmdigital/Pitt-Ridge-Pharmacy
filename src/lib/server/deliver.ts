import "server-only";
import type { RequestType } from "@/lib/validation/schemas";

/**
 * Hands a validated request to the pharmacy team.
 *
 * MOCK: this does not store or send anything. It only returns a reference number.
 *
 * PRODUCTION INTEGRATION POINT: send the request to a secure destination the
 * pharmacy has approved, such as their pharmacy management system, a secure
 * inbox, or an encrypted queue. Do not send health details by plain email.
 * Store the record with the same retention period as uploads (RETENTION_DAYS).
 *
 * Logging rule: log the reference and request type only. Never log names,
 * contact details, medication names, dates of birth or file contents.
 */
export async function deliverToPharmacy(type: RequestType, _data: Record<string, unknown>) {
  const reference = `PR-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  if (process.env.NODE_ENV !== "production") {
    console.info(`[mock deliver] ${type} request received, ref ${reference}`);
  }
  return { reference };
}
