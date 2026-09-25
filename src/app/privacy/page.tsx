import { PageHeader } from "@/components/PageHeader";
import { Placeholder } from "@/components/Placeholder";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Pittridge Pharmacy in Pitt Meadows collects, uses and protects the information you share through this website.",
  path: "/privacy",
});

/*
 * DRAFT. This page describes how the website is built to handle information.
 * It must be reviewed by the pharmacy and a qualified privacy advisor before
 * launch. It deliberately makes no claim of compliance with any law.
 */
export default function PrivacyPage() {
  return (
    <>
      <PageHeader title="Privacy policy" crumbs={[{ name: "Privacy", path: "/privacy" }]} />
      <div className="container-page py-12">
        <div className="prose-page">
          <Placeholder
            block
            label="Draft for review. The pharmacy and a privacy advisor must review this policy, confirm the privacy officer, retention period and legal obligations, and set the effective date before launch."
          />

          <p>
            {site.name} respects your privacy. This policy explains what information we collect through this website, why
            we collect it, and how we look after it.
          </p>

          <h2>What we collect</h2>
          <ul>
            <li>
              <strong>Prescription, refill and transfer requests:</strong> patient name, date of birth if you give it, phone
              number, email address, medication details, pharmacy details, your pickup or delivery choice, and any message
              you write.
            </li>
            <li>
              <strong>Prescription uploads:</strong> the image or PDF you choose to upload.
            </li>
            <li>
              <strong>Contact messages:</strong> your name, contact details and message.
            </li>
          </ul>

          <h2>Why we collect it</h2>
          <p>
            We use this information only to process your request, prepare your medications, contact you about your
            request, and, for transfers, contact your previous pharmacy with your permission.
          </p>

          <h2>How we protect it</h2>
          <ul>
            <li>Forms and uploads are sent over an encrypted (HTTPS) connection.</li>
            <li>Uploaded files are stored privately. They are never published or available through a public web link.</li>
            <li>Access is limited to the pharmacy team members who need it to handle your request.</li>
            <li>We don&apos;t include health information in website analytics.</li>
          </ul>

          <h2>How long we keep it</h2>
          <p>
            Uploaded files and online request records are deleted from the website&apos;s storage after a set period.
            Information that becomes part of your pharmacy record is kept as required for pharmacy practice.
          </p>
          <Placeholder block label="Retention period for website uploads and requests, and pharmacy record retention" />

          <h2>Sharing</h2>
          <p>
            We don&apos;t sell your information. We share it only as needed to provide your care, for example with your
            prescriber or previous pharmacy, or where the law requires it.
          </p>
          <Placeholder block label="Service providers that host or process website data, and where data is stored" />

          <h2>Your choices</h2>
          <p>
            You can ask to see or correct the personal information we hold about you, or ask questions about this policy.
            Contact us at <a href={`mailto:${site.email}`}>{site.email}</a> or {site.phone.display}.
          </p>
          <Placeholder block label="Name or title of the pharmacy's privacy contact" />

          <h2>Changes</h2>
          <p>We may update this policy. The date below shows when it last changed.</p>
          <Placeholder block label="Effective date" />
        </div>
      </div>
    </>
  );
}
