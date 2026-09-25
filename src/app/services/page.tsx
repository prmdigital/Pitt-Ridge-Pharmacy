import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { FinalCta } from "@/components/sections/FinalCta";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { site } from "@/config/site";
import { services } from "@/content/services";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Pharmacy Services in Pitt Meadows | Delivery, Vaccines, Compounding",
  description:
    "Pittridge Pharmacy services in Pitt Meadows: minor ailments prescribing, medication reviews, compounding, free blister packaging, free prescription pickup and delivery, travel vaccines, and a senior discount.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Pharmacy services"
        intro={
          <p>
            Practical support for your medications, close to home in Pitt Meadows. Questions about a service? Call us at{" "}
            <a href={site.phone.href} className="font-semibold underline">
              {site.phone.display}
            </a>
            .
          </p>
        }
        crumbs={[{ name: "Services", path: "/services" }]}
      >
        <nav aria-label="Jump to a service" className="mt-6">
          <ul className="flex flex-wrap gap-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`#${s.slug}`}
                  className="inline-flex min-h-11 items-center rounded-full bg-white/10 px-4 text-[0.95rem] font-semibold text-white no-underline ring-1 ring-white/25 hover:bg-white hover:text-navy"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>

      <section aria-labelledby="all-services" className="container-page py-12 md:py-16">
        <h2 id="all-services" className="sr-only">
          All services
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} showPending />
          ))}
        </div>
      </section>
      <FinalCta />
    </>
  );
}
