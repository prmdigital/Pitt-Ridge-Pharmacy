import { PageHeader } from "@/components/PageHeader";
import { FinalCta } from "@/components/sections/FinalCta";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { site } from "@/config/site";
import { services } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import servicesImage from "../../../public/images/pharmacist-checking-blood-pressure.jpg";

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
        image={servicesImage}
        imageAlt="A pharmacist checking a patient's blood pressure at the pharmacy counter"
      />

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
