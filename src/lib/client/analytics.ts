/**
 * Analytics hook. A no-op until an analytics tool is chosen.
 *
 * Rule: events carry an allow-listed name and form type only. Never pass
 * names, contact details, medications, dates of birth, messages, file names,
 * or anything else a patient typed. If you add a provider, keep this shape.
 */
type AnalyticsEvent =
  | { name: "form_started"; form: string }
  | { name: "form_submitted"; form: string }
  | { name: "form_failed"; form: string }
  | { name: "call_clicked" };

export function track(event: AnalyticsEvent) {
  // PRODUCTION INTEGRATION POINT: forward `event` to a privacy-respecting analytics provider.
  void event;
}
