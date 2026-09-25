"use client";

import { useState } from "react";
import { Pause, Play, Plus } from "lucide-react";
import { services } from "@/content/services";

/**
 * Slow-moving strip of confirmed services. It pauses on hover or focus, has a
 * visible pause button (WCAG 2.2.2), and stays still under reduced motion.
 */
export function ServiceTicker() {
  const [paused, setPaused] = useState(false);
  const names = services.map((s) => s.name);

  return (
    <section aria-label="Our services" className="marquee relative overflow-hidden bg-green-strong text-white" data-paused={paused}>
      <div className="flex">
        {/* The list is shown twice so the loop is seamless; the copy is hidden from screen readers. */}
        <div className="marquee-track flex shrink-0 items-center">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1 || undefined} className="flex shrink-0 items-center">
              {names.map((n) => (
                <li key={n} className="flex items-center gap-6 py-4 pr-6 text-lg font-bold whitespace-nowrap">
                  <Plus aria-hidden className="size-5 text-green-100" strokeWidth={3} />
                  {n}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        className="absolute top-1/2 right-3 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-navy/80 text-white hover:bg-navy"
        aria-pressed={paused}
      >
        {paused ? <Play aria-hidden className="size-4" /> : <Pause aria-hidden className="size-4" />}
        <span className="sr-only">Pause scrolling services</span>
      </button>
    </section>
  );
}
