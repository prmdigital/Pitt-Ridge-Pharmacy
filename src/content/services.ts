import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BadgePercent,
  ClipboardCheck,
  FlaskConical,
  Package,
  Ruler,
  Stethoscope,
  Syringe,
  Truck,
} from "lucide-react";

export type Service = {
  slug: string;
  name: string;
  /** Shorter name used on the homepage. Falls back to `name`. */
  shortName?: string;
  /** One short sentence for the homepage featured list. */
  teaser?: string;
  /** Shown in the homepage featured services (keep to four). */
  featured?: boolean;
  icon: LucideIcon;
  summary: [string, string];
  cta: { label: string; href: string };
  /** Details the pharmacy still needs to confirm. Rendered as a visible placeholder on /services. */
  pending?: string;
};

/**
 * Only services confirmed by Pittridge Pharmacy (the original brief and the storefront signage).
 * Do not add to this list without confirmation.
 */
export const services: Service[] = [
  {
    slug: "pharmacist-prescribing",
    name: "Minor Ailments Prescribing",
    icon: Stethoscope,
    summary: [
      "Our pharmacist can assess and prescribe for some minor ailments.",
      "Contact us to ask whether your concern is one we can help with.",
    ],
    cta: { label: "Talk to a pharmacist", href: "/contact?topic=pharmacist-prescribing" },
    pending: "Which minor ailments are assessed, and whether an appointment is needed",
  },
  {
    slug: "medication-reviews",
    name: "Medication Reviews",
    featured: true,
    teaser: "Go over your medications with a pharmacist.",
    icon: ClipboardCheck,
    summary: [
      "Go over the medications you take with a pharmacist.",
      "Bring your questions, and we will help you understand your routine.",
    ],
    cta: { label: "Ask about a review", href: "/contact?topic=medication-review" },
    pending: "Whether a booking is needed, and what to bring",
  },
  {
    slug: "compounding",
    name: "Medication Compounding",
    icon: FlaskConical,
    summary: [
      "We can prepare some medications in a custom form or strength when a prescriber orders it.",
      "Contact us to ask about your prescription.",
    ],
    cta: { label: "Ask about compounding", href: "/contact?topic=compounding" },
  },
  {
    slug: "blister-packaging",
    name: "Free Blister Packaging",
    featured: true,
    teaser: "Doses sorted into sealed packs by day and time.",
    icon: Package,
    summary: [
      "We can sort your medications into sealed packs by day and time.",
      "It can make daily doses easier to follow for patients and caregivers.",
    ],
    cta: { label: "Ask about blister packs", href: "/contact?topic=blister-packaging" },
    pending: "How often packs are prepared, and how pickup or delivery works",
  },
  {
    slug: "home-monitoring",
    name: "Home Monitoring Services",
    icon: Activity,
    summary: [
      "Our pharmacist can talk with you about checking your health at home each day.",
      "Ask us which options may suit your needs.",
    ],
    cta: { label: "Ask a pharmacist", href: "/contact?topic=home-monitoring" },
    pending: "Which monitoring services are offered",
  },
  {
    slug: "medication-delivery",
    name: "Free Prescription Pickup and Home Delivery",
    shortName: "Free Medication Delivery",
    featured: true,
    teaser: "Free home delivery. Ask us if we deliver to you.",
    icon: Truck,
    summary: [
      "Prescription pickup and home delivery are free.",
      "Contact us to check whether delivery is available at your address.",
    ],
    cta: { label: "Check delivery", href: "/contact?topic=delivery" },
    pending: "What free prescription pickup includes, the delivery area and delivery days",
  },
  {
    slug: "vaccines",
    name: "Travel and Routine Immunizations",
    shortName: "Immunization and Travel Vaccines",
    featured: true,
    teaser: "Routine and travel vaccines at the pharmacy.",
    icon: Syringe,
    summary: [
      "Get routine vaccines and travel vaccines at the pharmacy.",
      "Contact us before your trip to talk about what you may need.",
    ],
    cta: { label: "Ask about vaccines", href: "/contact?topic=vaccines" },
    pending: "Which vaccines are offered, and whether an appointment is needed",
  },
  {
    slug: "compression-stockings",
    name: "Custom Compression Stocking",
    icon: Ruler,
    summary: [
      "We offer custom compression stockings.",
      "Contact us and our team will explain the next steps.",
    ],
    cta: { label: "Ask about stockings", href: "/contact?topic=compression-stockings" },
    pending: "Whether measuring is done in store, and whether an appointment is needed",
  },
  {
    slug: "senior-discount",
    name: "Senior Discount",
    icon: BadgePercent,
    summary: [
      "We offer a discount for seniors.",
      "Ask our team how it applies to your purchases.",
    ],
    cta: { label: "Ask about the discount", href: "/contact?topic=senior-discount" },
    pending: "Discount amount, eligible age, and which items it applies to",
  },
];

export const featuredServices = services.filter((s) => s.featured);
