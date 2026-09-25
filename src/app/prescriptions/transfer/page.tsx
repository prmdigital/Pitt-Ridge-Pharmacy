import { FormPageBody } from "@/components/FormAside";
import { Notice } from "@/components/forms/fields";
import { TransferForm } from "@/components/forms/TransferForm";
import { PageHeader } from "@/components/PageHeader";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Transfer Your Prescription to Pittridge Pharmacy, Pitt Meadows",
  description:
    "Moving your prescriptions to Pittridge Pharmacy in Pitt Meadows? Send us your current pharmacy's details and our team will contact them for you.",
  path: "/prescriptions/transfer",
});

export default function TransferPage() {
  return (
    <>
      <PageHeader
        title="Transfer your prescriptions"
        intro="Moving from another pharmacy? Tell us where your prescriptions are now, and we'll take it from there."
        crumbs={[
          { name: "Prescriptions", path: "/prescriptions" },
          { name: "Transfer", path: "/prescriptions/transfer" },
        ]}
      />
      <FormPageBody>
        <div className="mb-8">
          <Notice>Our team will contact the previous pharmacy and let you know if more information is required.</Notice>
        </div>
        <TransferForm />
      </FormPageBody>
    </>
  );
}
