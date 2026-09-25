import { ChevronDown } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { Placeholder } from "@/components/Placeholder";
import type { Faq } from "@/content/faqs";
import { faqJsonLd } from "@/lib/seo";

/**
 * FAQ accordion built on <details>, so it works with keyboard and screen readers
 * without JavaScript. FAQPage schema is emitted only for confirmed, visible answers.
 */
export function FaqList({ items, withSchema = true }: { items: Faq[]; withSchema?: boolean }) {
  return (
    <>
      <div className="divide-y divide-line rounded-card border border-line bg-white">
        {items.map((f) => (
          <details key={f.id} id={`faq-${f.id}`} className="faq group">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
              {f.q}
              <ChevronDown aria-hidden className="size-5 shrink-0 text-green-strong transition-transform group-open:rotate-180" />
            </summary>
            <div className="space-y-3 px-5 pb-5 text-muted">
              <p>{f.a}</p>
              {f.pending && <Placeholder label={f.pending} />}
            </div>
          </details>
        ))}
      </div>
      {withSchema && <JsonLd data={faqJsonLd(items)} />}
    </>
  );
}
