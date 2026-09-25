import Link from "next/link";
import { AlertTriangle, Mail, MapPin, Phone, Printer } from "lucide-react";
import { HoursList } from "@/components/HoursList";
import { Logo } from "@/components/Logo";
import { OpenStatus } from "@/components/OpenStatus";
import { directionsUrl, fullAddress, site } from "@/config/site";

const links = [
  ["/prescriptions/new", "New prescription"],
  ["/prescriptions/refill", "Refill or renewal"],
  ["/prescriptions/transfer", "Transfer a prescription"],
  ["/services", "Pharmacy services"],
  ["/about", "About us"],
  ["/contact", "Contact"],
];

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden bg-navy text-white">
      <div aria-hidden className="absolute -top-40 -right-40 size-96 rounded-full bg-green/10 blur-3xl" />
      <div aria-hidden className="absolute -bottom-40 -left-20 size-80 rounded-full bg-teal/30 blur-3xl" />

      <div className="container-page relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1.2fr_1fr]">
        <div className="space-y-5">
          <div className="inline-block rounded-2xl bg-white px-4 py-3 shadow-e3">
            <Logo className="h-11 w-auto" />
          </div>
          <p className="text-xl font-bold text-green-100">{site.tagline}</p>
          <p className="max-w-xs text-white/75">A community pharmacy serving {site.serviceArea}.</p>
          <p className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/15">
            <OpenStatus />
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-white">Quick links</h2>
          <span aria-hidden className="mt-2 mb-4 block h-1 w-10 rounded-full bg-green" />
          <ul className="space-y-0.5">
            {links.map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="inline-flex min-h-11 items-center text-white/80 no-underline hover:text-white hover:underline">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold text-white">Contact</h2>
          <span aria-hidden className="mt-2 mb-4 block h-1 w-10 rounded-full bg-green" />
          <ul className="space-y-4 text-white/85">
            <li>
              <a href={directionsUrl} target="_blank" rel="noopener" className="flex items-start gap-3 text-white/85 no-underline hover:text-white">
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <MapPin aria-hidden className="size-4 text-green-100" />
                </span>
                <span>
                  {fullAddress}
                  <span className="sr-only"> (opens Google Maps in a new tab)</span>
                </span>
              </a>
            </li>
            <li>
              <a href={site.phone.href} className="flex min-h-11 items-center gap-3 text-white/85 no-underline hover:text-white">
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Phone aria-hidden className="size-4 text-green-100" />
                </span>
                Phone: {site.phone.display}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                <Printer aria-hidden className="size-4 text-green-100" />
              </span>
              Fax: {site.fax.display}
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex min-h-11 items-center gap-3 text-white/85 no-underline [overflow-wrap:anywhere] hover:text-white">
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Mail aria-hidden className="size-4 text-green-100" />
                </span>
                {site.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold text-white">Hours</h2>
          <span aria-hidden className="mt-2 mb-4 block h-1 w-10 rounded-full bg-green" />
          <div className="text-white/85">
            <HoursList dark />
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-6 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
          <p className="inline-flex items-center gap-2 font-semibold text-white">
            <AlertTriangle aria-hidden className="size-4 text-orange" /> For a life-threatening emergency, call 911.
          </p>
          <p>
            © {new Date().getFullYear()} {site.name} ·{" "}
            <Link href="/privacy" className="inline-flex min-h-11 items-center text-white/70 hover:text-white">Privacy</Link> ·{" "}
            <Link href="/terms" className="inline-flex min-h-11 items-center text-white/70 hover:text-white">Terms</Link>
          </p>
        </div>
      </div>
      <div className="h-16 md:hidden" aria-hidden />
    </footer>
  );
}
