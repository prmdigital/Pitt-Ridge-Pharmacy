import { FormPageBody } from "@/components/FormAside";
import { NewPrescriptionForm } from "@/components/forms/NewPrescriptionForm";
import { PageHeader } from "@/components/PageHeader";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "New Prescription Request in Pitt Meadows",
  description:
    "Send a new prescription request to Pittridge Pharmacy in Pitt Meadows. Upload a clear photo or PDF of your prescription, choose pickup or delivery, and we'll contact you.",
  path: "/prescriptions/new",
});

export default function NewPrescriptionPage() {
  return (
    <>
      <PageHeader
        title="New prescription request"
        intro="Upload a photo of your prescription and tell us how you'd like to receive it."
        crumbs={[
          { name: "Prescriptions", path: "/prescriptions" },
          { name: "New prescription", path: "/prescriptions/new" },
        ]}
      />
      <FormPageBody>
        <NewPrescriptionForm />
      </FormPageBody>
    </>
  );
}
