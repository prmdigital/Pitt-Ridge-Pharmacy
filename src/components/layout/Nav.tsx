"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowLeftRight, Menu, Phone, X } from "lucide-react";
import { nav, site } from "@/config/site";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function DesktopNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Main" className="hidden lg:block">
      <ul className="flex items-center gap-0.5 xl:gap-1">
        {nav.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-11 items-center rounded-md px-2 font-semibold xl:px-3 no-underline hover:text-green-strong ${
                  active ? "text-green-strong underline decoration-2 underline-offset-8" : "text-navy"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function MobileMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close when the route changes.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    // Close when tapping or clicking anywhere outside the menu and its button.
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !buttonRef.current?.contains(t)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="inline-flex size-12 items-center justify-center rounded-full border-2 border-navy text-navy"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      </button>

      <div
        id={panelId}
        ref={panelRef}
        data-open={open}
        inert={!open}
        className="menu-panel absolute inset-x-0 top-full mt-2 max-h-[calc(100dvh-7rem)] overflow-y-auto rounded-[1.75rem] bg-white shadow-e4 ring-1 ring-navy/5"
      >
        <nav aria-label="Main" className="px-5 py-4">
          <ul className="divide-y divide-line">
            {nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-12 items-center py-3 text-lg font-semibold no-underline ${
                      active ? "text-green-strong" : "text-navy"
                    }`}
                  >
                    {item.label}
                    {active && <span className="ml-2 text-sm font-medium text-muted">(current page)</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 grid gap-3 pb-2 sm:grid-cols-2">
            <a href={site.phone.href} className="btn btn-outline">
              <Phone aria-hidden className="size-5" />
              Call {site.phone.display}
            </a>
            <Link href="/prescriptions/transfer" className="btn btn-primary">
              <ArrowLeftRight aria-hidden className="size-5" />
              Transfer Prescription
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
