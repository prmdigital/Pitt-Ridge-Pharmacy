import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Placeholder } from "@/components/Placeholder";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Website Terms of Use",
  description: "Terms for using the Pittridge Pharmacy website and its online prescription request forms.",
  path: "/terms",
});

/* DRAFT. To be reviewed by the pharmacy and a legal advisor before launch. */
export default function TermsPage() {
  return (
    <>
      <PageHeader title="Website terms of use" crumbs={[{ name: "Terms", path: "/terms" }]} />
      <div className="container-page py-12">
        <div className="prose-page">
          <Placeholder block label="Draft for review. The pharmacy and a legal advisor must review these terms and set the effective date before launch." />

          <h2>Using this website</h2>
          <p>
            This website gives general information about {site.name} and lets you send requests to our pharmacy team. By
            using it, you agree to these terms.
          </p>

          <h2>Not for emergencies</h2>
          <p>
            <strong>For a life-threatening emergency, call 911.</strong> Online forms are not monitored in real time. For
            urgent questions, call us at <a href={site.phone.href}>{site.phone.display}</a>.
          </p>

          <h2>Online requests</h2>
          <ul>
            <li>Sending a request does not mean a prescription has been approved, filled or guaranteed.</li>
            <li>Every request is reviewed by the pharmacy team. A pharmacist may contact you for more details.</li>
            <li>Renewals may require pharmacist assessment or contact with your prescriber.</li>
            <li>You may need to bring the original prescription when you come for pickup.</li>
            <li>Delivery depends on your address and is confirmed by the pharmacy.</li>
          </ul>

          <h2>Health information on this site</h2>
          <p>
            Information on this website is general. It is not a substitute for advice from a pharmacist, doctor or other
            health professional about your own situation.
          </p>

          <h2>Accurate information</h2>
          <p>
            Please give accurate details in your requests. Only submit requests for yourself, or for someone you are
            authorized to act for.
          </p>

          <h2>Privacy</h2>
          <p>
            Our <Link href="/privacy">privacy policy</Link> explains how we handle the information you send us.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms? Email <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
          <Placeholder block label="Effective date" />
        </div>
      </div>
    </>
  );
}
