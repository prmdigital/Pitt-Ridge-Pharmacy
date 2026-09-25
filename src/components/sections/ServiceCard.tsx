import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Placeholder } from "@/components/Placeholder";
import type { Service } from "@/content/services";

export function ServiceCard({ service, showPending = false }: { service: Service; showPending?: boolean }) {
  const Icon = service.icon;
  return (
    <article id={service.slug} className="group lift flex scroll-mt-32 flex-col rounded-3xl bg-white p-6 shadow-e2 ring-1 ring-navy/5">
      <span className="icon-swap mb-4 inline-flex size-14 items-center justify-center rounded-2xl bg-green-50 text-green-strong group-hover:bg-green-strong group-hover:text-white">
        <Icon aria-hidden className="size-6" />
      </span>
      <h3 className="text-xl">{service.name}</h3>
      <p className="mt-2 flex-1 text-muted">
        {service.summary[0]} {service.summary[1]}
      </p>
      {showPending && service.pending && (
        <div className="mt-3">
          <Placeholder label={service.pending} />
        </div>
      )}
      <Link
        href={service.cta.href}
        className="mt-5 inline-block min-h-11 py-2 font-semibold text-green-strong underline decoration-2 hover:text-navy"
      >
        {service.cta.label}
        <span className="sr-only"> about {service.name}</span>
        <ArrowRight aria-hidden className="ml-1 inline size-4 align-[-2px]" />
      </Link>
    </article>
  );
}
