/**
 * Single source of truth for Pittridge Pharmacy business information.
 *
 * Everything here was supplied by the pharmacy, except values set to `null`.
 * `null` means "not supplied yet". Components render a visible <Placeholder>
 * for these, and structured data leaves them out. Never fill these with guesses.
 */

export const site = {
  name: "Pittridge Pharmacy",
  legalNameDisplay: "PITTRIDGE PHARMACY",
  tagline: "Your Health. Our Priority.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.pittridgepharmacy.com").replace(/\/$/, ""),
  locale: "en_CA",

  phone: { display: "778-801-7001", href: "tel:+17788017001", e164: "+1-778-801-7001" },
  fax: { display: "778-801-7002", e164: "+1-778-801-7002" },
  email: "info@pittridgepharmacy.com",

  address: {
    // Kept exactly as supplied by the pharmacy.
    street: "1-12155, 191 B Street",
    city: "Pitt Meadows",
    region: "BC",
    regionName: "British Columbia",
    postalCode: "V3Y 2S2",
    country: "CA",
  },

  serviceArea: "Pitt Meadows and surrounding British Columbia communities",

  staff: [
    {
      name: "Jatin Patel",
      role: "Pharmacy Manager and Pharmacist",
      photo: null as string | null, // TODO(pharmacy): supply an authentic staff photo
    },
  ],

  /**
   * Opening hours, from the storefront signage (open 7 days a week).
   * Shown on the site and in OpeningHoursSpecification schema.
   * TODO(pharmacy): confirm these, and add holiday hours if needed.
   */
  hours: [
    { label: "Monday to Friday", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "17:00" },
    { label: "Saturday", days: ["Saturday"], opens: "10:00", closes: "14:00" },
    { label: "Sunday", days: ["Sunday"], opens: "10:00", closes: "12:00" },
  ] as null | { label: string; days: string[]; opens: string; closes: string }[],

  /** Delivery boundaries. NOT SUPPLIED. Free pickup and home delivery are confirmed; the area is not. */
  deliveryArea: null as string | null,

  /** Geo coordinates for schema. NOT SUPPLIED. Leave null rather than approximate. */
  geo: null as null | { lat: number; lng: number },

  /** Real patient reviews supplied by the pharmacy. Leave empty until supplied. */
  reviews: [] as { author: string; text: string; source: string; date: string }[],

  social: [] as { label: string; href: string }[],
} as const;

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${site.name}, ${fullAddress}`,
)}`;

/**
 * Form behaviour settings.
 * dateOfBirth: the brief says "only if required". The pharmacy has not confirmed,
 * so it is shown as optional. Set to "required" or "hidden" once confirmed.
 */
export const formSettings = {
  dateOfBirth: "optional" as "hidden" | "optional" | "required",
  upload: {
    maxBytes: 10 * 1024 * 1024,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/heic": [".heic"],
      "image/heif": [".heif"],
      "application/pdf": [".pdf"],
    } as Record<string, string[]>,
  },
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/prescriptions", label: "Prescriptions" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

/**
 * Preview mode for public demo links (set NEXT_PUBLIC_PREVIEW_MODE=true).
 * - Shows a banner saying forms are not monitored.
 * - Forms run fully in the browser but send nothing: no patient data leaves the device.
 * - API routes refuse submissions, and search engines are told not to index the site.
 * Turn it off only once a real, approved backend is connected (see README).
 */
export const isPreview = process.env.NEXT_PUBLIC_PREVIEW_MODE === "true";
