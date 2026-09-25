"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeftRight, Mail, MapPin, Phone, Printer } from "lucide-react";
import { Logo } from "@/components/Logo";
import { directionsUrl, site } from "@/config/site";
import { DesktopNav, MobileMenu } from "./Nav";

const info = [
  { icon: MapPin, label: "Address", value: `${site.address.street}, ${site.address.city}`, href: directionsUrl, external: true },
  { icon: Phone, label: "Phone", value: site.phone.display, href: site.phone.href },
  { icon: Printer, label: "Fax", value: site.fax.display },
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
];

/**
 * Floating header card. It sits over the hero photo and stays fixed.
 * The contact row collapses after scrolling so the bar stays compact.
 * Every page's first section uses `.below-header` to leave room for it.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header data-scrolled={scrolled} className="fixed inset-x-0 top-0 z-50 pt-3">
      {/* Same container as page content; the card bleeds out by its own padding on desktop,
          so the logo lines up exactly with the content edge at every width. */}
      <div className="container-page">
      <div
        className={`relative -mx-1 rounded-[1.75rem] lg:-mx-6 bg-white/95 ring-1 ring-navy/5 backdrop-blur transition-shadow duration-300 ${
          scrolled ? "shadow-e4" : "shadow-e3"
        }`}
      >
        {/* Contact row, desktop only */}
        <div className="hdr-info hidden lg:grid">
          <div>
            <ul className="mx-6 grid grid-cols-[1.25fr_0.8fr_0.8fr_1.25fr] gap-4 border-b border-line py-3">
              {info.map(({ icon: Icon, label, value, href, external }) => {
                const body = (
                  <>
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-navy text-white">
                      <Icon aria-hidden className="size-4" />
                    </span>
                    <span className="min-w-0 leading-tight">
                      <span className="block text-xs font-bold tracking-[0.1em] text-green-strong uppercase">{label}</span>
                      <span className="block truncate text-sm font-semibold text-navy">{value}</span>
                    </span>
                  </>
                );
                return (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        {...(external ? { target: "_blank", rel: "noopener" } : {})}
                        className="flex min-h-11 items-center gap-2.5 rounded-lg no-underline"
                      >
                        {body}
                        {external && <span className="sr-only"> (opens Google Maps in a new tab)</span>}
                      </a>
                    ) : (
                      <div className="flex items-center gap-2.5">{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="flex h-[4.5rem] items-center justify-between gap-4 pr-3 pl-4 lg:h-20 lg:px-6">
          <Logo className="h-10 w-auto sm:h-12 lg:h-10 xl:h-12" />
          <DesktopNav />
          <div className="hidden items-center gap-2 lg:flex">
            <a href={site.phone.href} className="btn btn-sm btn-navy px-3.5 xl:px-4" aria-label={`Call now: ${site.phone.display}`}>
              <Phone aria-hidden className="size-4" />
              <span className="hidden xl:inline">Call Now</span>
            </a>
            <Link href="/prescriptions/transfer" className="btn btn-sm btn-primary">
              <ArrowLeftRight aria-hidden className="size-4" />
              Transfer Prescription
            </Link>
          </div>
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={site.phone.href}
              className="inline-flex size-12 items-center justify-center rounded-full bg-green-strong text-white"
              aria-label={`Call ${site.name} at ${site.phone.display}`}
            >
              <Phone aria-hidden className="size-5" />
            </a>
            <MobileMenu />
          </div>
        </div>
      </div>
      </div>
    </header>
  );
}
