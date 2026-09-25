import { Phone } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { FaqList } from "@/components/sections/FaqList";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { QuickActions } from "@/components/sections/QuickActions";
import { site } from "@/config/site";
import { faqs } from "@/content/faqs";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Prescriptions in Pitt Meadows | New, Refill and Transfer",
  description:
    "Send a new prescription request, request a refill or renewal review, or transfer your prescriptions to Pittridge Pharmacy in Pitt Meadows, BC.",
  path: "/prescriptions",
});

const prescriptionFaqIds = ["upload-photo", "original-prescription", "refill", "renewal", "transfer", "contact", "urgent"];

export default function PrescriptionsPage() {
  const items = faqs.filter((f) => prescriptionFaqIds.includes(f.id));
  return (
    <>
      <PageHeader
        title="Prescriptions"
        intro="Choose what you need. Each request goes to our pharmacy team for review."
        crumbs={[{ name: "Prescriptions", path: "/prescriptions" }]}
      />
      <section aria-label="Prescription requests" className="container-page py-12">
        <QuickActions />
        <p className="mt-8 flex flex-wrap items-center gap-2 text-lg">
          Not sure which one to use?
          <a href={site.phone.href} className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-green-strong underline">
            <Phone aria-hidden className="size-4" /> Call {site.phone.display}
          </a>
        </p>
      </section>
      <div className="bg-green-50">
        <HowItWorks />
      </div>
      <section aria-labelledby="rx-faq" className="container-page max-w-4xl py-16">
        <h2 id="rx-faq" className="mb-8 text-3xl">
          Prescription questions
        </h2>
        <FaqList items={items} />
      </section>
    </>
  );
}
