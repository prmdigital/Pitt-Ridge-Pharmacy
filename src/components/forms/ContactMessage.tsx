"use client";

import { useSearchParams } from "next/navigation";
import { services } from "@/content/services";
import { ContactForm } from "./ContactForm";

const topics: Record<string, string> = Object.fromEntries(services.map((s) => [s.slug, s.name]));
topics["medication-review"] = "Medication Reviews";
topics["delivery"] = "Free Prescription Pickup and Home Delivery";

/**
 * Reads ?topic=<service-slug> in the browser, so the Contact page can be static
 * (required for GitHub Pages). Unknown topics are ignored.
 */
export function ContactMessage() {
  const raw = useSearchParams().get("topic") ?? "";
  const topicSlug = raw in topics ? raw : "";
  return (
    <>
      {topicSlug && (
        <p className="mt-2 text-lg text-muted">
          You&apos;re asking about: <strong className="text-navy">{topics[topicSlug]}</strong>
        </p>
      )}
      <div className="mt-6">
        <ContactForm key={topicSlug} topic={topicSlug} />
      </div>
    </>
  );
}
