import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { directionsUrl, site } from "@/config/site";

export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-heading" className="bg-navy py-16 text-white md:py-20">
      <div className="container-page flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 id="final-cta-heading" className="text-3xl text-white md:text-4xl">
            Need help with a prescription?
          </h2>
          <p className="mt-3 max-w-xl text-white/85">
            Call us, send a request online, or visit us at {site.address.street} in {site.address.city}.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
          <a href={site.phone.href} className="btn btn-primary">
            <Phone aria-hidden className="size-5" />
            Call {site.name}
          </a>
          <Link href="/prescriptions" className="btn bg-white text-navy hover:bg-green-50">
            Start a Request
          </Link>
          <a href={directionsUrl} target="_blank" rel="noopener" className="btn btn-outline-light">
            <MapPin aria-hidden className="size-5" />
            Get Directions<span className="sr-only"> (opens Google Maps in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
