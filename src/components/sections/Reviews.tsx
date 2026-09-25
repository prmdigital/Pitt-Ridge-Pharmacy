import { MessageSquareQuote } from "lucide-react";
import { site } from "@/config/site";

/**
 * Shows real patient reviews supplied by the pharmacy (site.reviews).
 * With none supplied, shows a neutral note. Never add sample or invented testimonials.
 */
export function Reviews() {
  return (
    <section aria-labelledby="reviews-heading" className="py-16 md:py-20">
      <div className="container-page">
        <p className="eyebrow">Patient feedback</p>
        <h2 id="reviews-heading" className="mt-2 text-3xl md:text-4xl">
          What patients say
        </h2>

        {site.reviews.length > 0 ? (
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {site.reviews.map((r) => (
              <li key={`${r.author}-${r.date}`} className="card p-6">
                <blockquote>
                  <p>“{r.text}”</p>
                  <footer className="mt-3 text-sm text-muted">
                    {r.author}, via {r.source}
                  </footer>
                </blockquote>
              </li>
            ))}
          </ul>
        ) : (
          <div
            data-placeholder="Patient reviews"
            className="mt-8 flex flex-col items-start gap-4 rounded-card border-2 border-dashed border-line p-8 sm:flex-row sm:items-center"
          >
            <MessageSquareQuote aria-hidden className="size-10 shrink-0 text-green" />
            <div>
              <p className="font-semibold">Patient reviews will appear here.</p>
              <p className="mt-1 text-muted">
                We only share real feedback from patients, with their permission. Have you visited us? We&apos;d like to
                hear from you.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
