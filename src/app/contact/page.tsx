import { AlertTriangle, Mail, MapPin, Navigation, Phone, Printer, UserRound } from "lucide-react";
import { Suspense } from "react";
import { ContactForm } from "@/components/forms/ContactForm";
import { ContactMessage } from "@/components/forms/ContactMessage";
import { HoursList } from "@/components/HoursList";
import { Logo } from "@/components/Logo";
import { PageHeader } from "@/components/PageHeader";
import { directionsUrl, fullAddress, site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Pittridge Pharmacy | Pitt Meadows, BC",
  description:
    "Call Pittridge Pharmacy at 778-801-7001, email info@pittridgepharmacy.com, or visit us at 1-12155, 191 B Street, Pitt Meadows, BC. Get directions and send us a message.",
  path: "/contact",
});

export default function ContactPage() {

  return (
    <>
      <PageHeader title="Contact us" intro="Call, email, or visit. We're happy to help." crumbs={[{ name: "Contact", path: "/contact" }]} />

      <div className="container-page grid gap-10 py-12 md:py-16 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-6">
          <div className="card p-6 md:p-8">
            <Logo linked={false} className="h-12 w-auto" />
            <ul className="mt-6 space-y-4 text-lg">
              <li className="flex items-start gap-3">
                <UserRound aria-hidden className="mt-1 size-5 shrink-0 text-green-strong" />
                <span>
                  <strong>{site.staff[0].name}</strong>
                  <br />
                  <span className="text-muted">{site.staff[0].role}</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone aria-hidden className="mt-1 size-5 shrink-0 text-green-strong" />
                <span>
                  <span className="block text-sm text-muted">Phone</span>
                  <a href={site.phone.href} className="font-semibold text-navy underline">
                    {site.phone.display}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Printer aria-hidden className="mt-1 size-5 shrink-0 text-green-strong" />
                <span>
                  <span className="block text-sm text-muted">Fax</span>
                  {site.fax.display}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail aria-hidden className="mt-1 size-5 shrink-0 text-green-strong" />
                <span className="min-w-0">
                  <span className="block text-sm text-muted">Email</span>
                  <a href={`mailto:${site.email}`} className="font-semibold break-all text-navy underline">
                    {site.email}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin aria-hidden className="mt-1 size-5 shrink-0 text-green-strong" />
                <span>
                  <span className="block text-sm text-muted">Address</span>
                  <address className="not-italic">{fullAddress}</address>
                </span>
              </li>
            </ul>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={site.phone.href} className="btn btn-primary">
                <Phone aria-hidden className="size-5" /> Call Now
              </a>
              <a href={directionsUrl} target="_blank" rel="noopener" className="btn btn-outline">
                <Navigation aria-hidden className="size-5" /> Get Directions
                <span className="sr-only"> (opens Google Maps in a new tab)</span>
              </a>
            </div>
          </div>

          <div className="card p-6 md:p-8">
            <h2 className="text-xl">Opening hours</h2>
            <div className="mt-3">
              <HoursList />
            </div>
          </div>

          <div className="flex gap-3 rounded-card border-2 border-[#b42318] bg-[#fef3f2] p-5">
            <AlertTriangle aria-hidden className="mt-0.5 size-6 shrink-0 text-[#b42318]" />
            <p className="text-lg font-semibold text-[#8a1c12]">For a life-threatening emergency, call 911.</p>
          </div>
        </div>

        <section aria-labelledby="message-heading">
          <h2 id="message-heading" className="text-3xl">
            Send us a message
          </h2>
          {/* Fallback (no topic) renders on the server; the browser then applies ?topic= if present. */}
          <Suspense fallback={<div className="mt-6"><ContactForm /></div>}>
            <ContactMessage />
          </Suspense>
        </section>
      </div>
    </>
  );
}
