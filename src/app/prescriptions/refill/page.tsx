import { FormPageBody } from "@/components/FormAside";
import { Notice } from "@/components/forms/fields";
import { RefillForm } from "@/components/forms/RefillForm";
import { PageHeader } from "@/components/PageHeader";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Prescription Refill and Renewal Request, Pitt Meadows",
  description:
    "Request a prescription refill online at Pittridge Pharmacy in Pitt Meadows. Our pharmacy team reviews each request and whether a renewal may be available.",
  path: "/prescriptions/refill",
});

export default function RefillPage() {
  return (
    <>
      <PageHeader
        title="Refill or renewal request"
        intro="Tell us which medication you need. Have your medication label nearby. The prescription number helps."
        crumbs={[
          { name: "Prescriptions", path: "/prescriptions" },
          { name: "Refill or renewal", path: "/prescriptions/refill" },
        ]}
      />
      <FormPageBody>
        <div className="mb-8">
          <Notice>
            Refill requests are reviewed by the pharmacy team. A renewal may require pharmacist assessment or contact with
            the prescriber.
          </Notice>
        </div>
        <RefillForm />
      </FormPageBody>
    </>
  );
}
