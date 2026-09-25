# Pittridge Pharmacy website

Website for Pittridge Pharmacy, a community pharmacy in Pitt Meadows, BC.
Built with Next.js 16 (App Router), TypeScript, Tailwind CSS 4 and Zod.

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
```

## Before launch: information still needed from the pharmacy

The site never guesses. Anything not supplied shows a visible **"To be confirmed"** marker.
Search the code for `data-placeholder`, or the rendered pages for "To be confirmed".

| Needed | Where to add it |
| --- | --- |
| **Official logo vector file** (an interim SVG redrawn from the storefront sign is used now) | Replace `public/brand/pittridge-pharmacy-logo.svg` |
| Confirm opening hours (taken from the storefront sign) and holiday hours | `site.hours` in `src/config/site.ts` (also feeds `OpeningHoursSpecification` schema) |
| Delivery area and days, and what "free prescription pickup" includes | `site.deliveryArea`, and the `delivery` FAQ in `src/content/faqs.ts` |
| Whether date of birth is required | `formSettings.dateOfBirth` in `src/config/site.ts` (`hidden`, `optional` or `required`) |
| Which prescriptions need the original at pickup | `original-prescription` FAQ |
| Services that need an appointment, and how to book | `appointments` FAQ, `pending` notes in `src/content/services.ts` |
| Details for each service (minor ailments assessed, vaccines offered, monitoring types, senior discount terms) | `pending` notes in `src/content/services.ts` |
| Photos: storefront, team, Jatin Patel, pharmacist with patient | Replace `<ImagePlaceholder>` uses (home, about) with real images in `public/images/` using descriptive filenames |
| Pharmacy story and a short intro from Jatin | `src/app/about/page.tsx` |
| Real patient reviews, with permission | `site.reviews` |
| Map coordinates | `site.geo` (for schema) |
| Privacy contact, retention period, service providers, effective dates | `src/app/privacy/page.tsx`, `src/app/terms/page.tsx` |

When a service or FAQ is fully confirmed, delete its `pending` field. Confirmed FAQs are
then included in the `FAQPage` structured data automatically.

**Legal review:** the privacy policy and terms are drafts. They make no claim of compliance
with PIPA, PIPEDA or any other law. Have them reviewed before launch.

## Sitemap

```
/                          Home: full-bleed hero, overlapping quick actions, contact strip, service ticker, about + stats, services band, how it works, FAQ, contact form band
/prescriptions             Hub for the three request types, plus prescription FAQs
/prescriptions/new         New prescription form with upload
/prescriptions/refill      Refill and renewal form
/prescriptions/transfer    Transfer form
/services                  All 9 confirmed services (from the brief and the storefront sign)
/about                     Pharmacy and team
/contact                   Contact details, hours, directions, contact form (accepts ?topic=<service-slug>)
/privacy                   Privacy policy (draft)
/terms                     Terms of use (draft)
/sitemap.xml  /robots.txt  /opengraph-image
```

## Component plan

```
src/config/site.ts          All business facts. Single source of truth.
src/content/                services.ts, faqs.ts (confirmed content + `pending` markers)
src/components/layout/      Header, Nav (desktop + mobile menu), MobileActionBar, Footer
src/components/sections/    QuickActions, HowItWorks, ServiceCard, FaqList, Reviews, FinalCta
src/components/forms/       useRequestForm (shared state), fields (inputs, error summary, success),
                            FileUpload, NewPrescriptionForm, RefillForm, TransferForm, ContactForm
src/components/             Logo, Placeholder/ImagePlaceholder, PageHeader (breadcrumbs), HoursList, JsonLd, FormAside
src/lib/validation/         Zod schemas shared by browser and server
src/lib/client/             api.ts (service layer), analytics.ts (no-op, no health data)
src/lib/server/             storage, malware-scan, deliver, rate-limit, security (HMAC signing, file sniffing)
src/app/api/                uploads (sign), uploads/[id] (PUT only), requests/[type], internal/retention
```

## How uploads and requests work

1. The browser validates the file (type and 10 MB limit) and asks `POST /api/uploads` for a slot.
2. The server validates again and returns a signed URL that expires in 10 minutes (HMAC-SHA256).
3. The browser `PUT`s the file with a progress bar. The server checks the signature, size and the
   file's real type from its first bytes (a renamed `.exe` is rejected), runs the malware hook, and
   stores it privately.
4. The form submits only the private upload id. The server validates every field again, claims the
   upload (each upload can be used once), and hands the request to `deliverToPharmacy`.

There is no route that serves uploaded files. The local adapter writes to `.data/private-uploads/`
(git-ignored, outside `public/`).

### Security measures in place

- Same-origin check on every write endpoint; security headers and CSP in `next.config.ts`; HSTS in production
- Client- and server-side validation with the same schemas
- Signed, expiring, single-use upload URLs; file type sniffing; 10 MB limit; request body size limit
- Rate limiting (20 uploads and 10 submissions per hour per IP), a honeypot field, and a minimum fill time
- No form values in logs, console output or analytics events
- Retention purge endpoint protected by a bearer token

## Production integration points

Search the code for `PRODUCTION INTEGRATION POINT`.

| Module | Current (mock) | Replace with |
| --- | --- | --- |
| `lib/server/storage.ts` | Local private folder | Private object storage in Canada (for example S3 `ca-central-1`) with public access blocked, encryption, provider-signed URLs and a lifecycle rule |
| `lib/server/malware-scan.ts` | Structural PDF checks only | ClamAV or a provider scanning service. **Don't describe the current check as virus scanning.** |
| `lib/server/deliver.ts` | Returns a reference number only; nothing is sent | A secure destination approved by the pharmacy (pharmacy system, secure inbox, encrypted queue). Not plain email. |
| `lib/server/rate-limit.ts` | In-memory, per instance | A shared store (Redis/Upstash) or edge rate limiting |
| `lib/client/analytics.ts` | No-op | A privacy-respecting provider. Keep the allow-listed event shape. |
| Retention | `POST /api/internal/retention` | Call it daily from a scheduler with `INTERNAL_CRON_TOKEN` |

Also consider adding CAPTCHA-free bot protection (for example Cloudflare Turnstile) if spam appears.

## Photos

Homepage photos are licensed Freepik stock, resized and stripped of metadata:

| File | Freepik title |
| --- | --- |
| `public/images/pharmacist-explaining-prescription-to-patient-pitt-meadows.jpg` | Chemist explaining prescription to woman in drugstore |
| `public/images/weekly-pill-organizer-medication-routine.jpg` | Pill box arrangement still life |
| `public/images/pharmacist-checking-blister-pack-medication.jpg` | Side view pharmacist at work |
| `public/images/pharmacy-shelves-interior.jpg` | Empty drugstore with bottles and packages (used under navy tints) |

These show models, not Pittridge staff. The team photo shows hands only, so it can't be mistaken
for Jatin Patel. Replace them with real photos of the pharmacy when available, keeping the same filenames.

## Design and motion

- One font family (Plus Jakarta Sans). Layered layout: floating header card, full-bleed photos under navy tints, cards overlapping section edges, 4-step shadow scale (`shadow-e1` to `shadow-e4`).
- Motion is CSS only: hero fade-up, staggered quick actions, scroll reveal (CSS scroll-driven
  animations; content stays visible in browsers without support), hero photo zoom, live open/closed dot, service ticker with a pause button, small hover lift, mobile menu
  fade, and FAQ expansion. All of it is off when `prefers-reduced-motion` is set.
- `src/components/sections/Reviews.tsx` is kept for when real patient reviews are supplied. It is not on the homepage.

## Brand and accessibility notes

- Colours come from the logo. Text on green and orange uses darker variants (`green-strong`,
  `orange-strong`) so contrast meets WCAG AA. Orange is used only for the main action on each screen.
- Forms have visible labels, "(required)" and "(optional)" text, an error summary that receives focus,
  inline errors linked with `aria-describedby`, and live announcements for upload status.
- A skip link, visible focus rings, 44 px or larger tap targets, and reduced-motion support are included.
- Structured data: `Pharmacy` with `PostalAddress` on every page, `BreadcrumbList` on inner pages,
  `FAQPage` for confirmed visible FAQs only, and `OpeningHoursSpecification` once hours are supplied.
