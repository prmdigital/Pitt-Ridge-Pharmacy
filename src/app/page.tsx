import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Navigation,
  Package,
  Phone,
  Printer,
  Truck,
} from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { OpenStatus } from "@/components/OpenStatus";
import { FaqList } from "@/components/sections/FaqList";
import { QuickActions } from "@/components/sections/QuickActions";
import { ServiceTicker } from "@/components/sections/ServiceTicker";
import { directionsUrl, site } from "@/config/site";
import { faqs } from "@/content/faqs";
import { featuredServices, services } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import heroImage from "../../public/images/pharmacist-explaining-prescription-to-patient-pitt-meadows.jpg";
import teamImage from "../../public/images/pharmacist-checking-blister-pack-medication.jpg";
import interiorImage from "../../public/images/pharmacy-shelves-interior.jpg";
import organizerImage from "../../public/images/weekly-pill-organizer-medication-routine.jpg";

export const metadata = buildMetadata({
  title: "Pittridge Pharmacy | Pitt Meadows Pharmacy for Prescriptions, Refills and Transfers",
  description:
    "Pittridge Pharmacy is your local Pitt Meadows pharmacy, open 7 days a week. Send a new prescription, refill or transfer request online, with free delivery and blister packaging.",
  path: "/",
});

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties;
const homeFaqIds = ["upload-photo", "original-prescription", "refill", "transfer", "delivery", "urgent"];

/*
 * Photos are licensed Freepik stock (see README). They show models, not Pittridge staff.
 * Replace with real photos of the pharmacy when available, keeping the same filenames.
 */
export default function HomePage() {
  return (
    <>
      {/* ───────── Hero ───────── */}
      <section aria-labelledby="hero-heading" className="below-header relative isolate overflow-hidden bg-green-50 pb-36 lg:pb-48">
        {/* Soft brand shapes */}
        <div aria-hidden className="absolute -top-32 -left-32 -z-10 size-[28rem] rounded-full bg-green-100/70 blur-3xl" />
        <div aria-hidden className="absolute bottom-0 left-1/3 -z-10 size-72 rounded-full bg-orange/10 blur-3xl" />

        <div className="container-page relative grid items-center gap-10 pt-8 lg:static lg:min-h-[34rem] lg:grid-cols-2 lg:pt-16">
          <div className="relative z-10 max-w-xl">
            <p className="eyebrow-pill motion-fade-up bg-white shadow-e1">
              <MapPin aria-hidden className="size-3.5" /> Pitt Meadows community pharmacy
            </p>
            <h1
              id="hero-heading"
              className="motion-fade-up mt-5 text-[2.6rem] leading-[1.05] font-extrabold tracking-tight sm:text-6xl lg:text-[4.25rem]"
              style={delay(80)}
            >
              Pharmacy care that fits <span className="text-green-strong">your routine.</span>
            </h1>
            <p className="motion-fade-up mt-6 max-w-lg text-lg text-muted md:text-xl" style={delay(160)}>
              Prescription requests, medication support, delivery, and pharmacist care from a local Pitt Meadows team.
            </p>
            <div className="motion-fade-up mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={delay(240)}>
              <Link href="/prescriptions/new" className="btn btn-primary px-7 text-lg shadow-e3">
                Start a Prescription Request
                <ArrowRight aria-hidden className="size-5" />
              </Link>
              <a href={site.phone.href} className="btn btn-outline px-7 text-lg">
                <Phone aria-hidden className="size-5" />
                Call the Pharmacy
              </a>
            </div>
            <ul className="motion-fade-up mt-8 flex flex-wrap gap-x-6 gap-y-2 font-semibold text-navy" style={delay(320)}>
              {["Free delivery", "Free blister packs", "Open 7 days a week"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckCircle2 aria-hidden className="size-5 text-green-strong" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Photo: a card on mobile, full-bleed on the right from lg up */}
          <div className="motion-fade-up relative aspect-[4/3] overflow-hidden rounded-3xl shadow-e4 lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[56%] lg:rounded-none lg:rounded-bl-[5rem] lg:shadow-none" style={delay(120)}>
            <Image
              src={heroImage}
              alt="A pharmacist explaining a prescription to a patient"
              priority
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="motion-hero-zoom object-cover object-[35%_center]"
            />
            <div aria-hidden className="absolute inset-y-0 left-0 hidden w-40 bg-gradient-to-r from-green-50 to-transparent lg:block" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy/35 via-transparent to-transparent" />
          </div>

          {/* Floating status card */}
          <div
            className="motion-fade-up absolute right-6 bottom-6 z-10 hidden rounded-2xl bg-white/95 p-4 pr-5 shadow-e4 backdrop-blur sm:block lg:right-[6%] lg:bottom-56"
            style={delay(500)}
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex size-11 items-center justify-center rounded-full bg-green-50 text-green-strong">
                <Clock aria-hidden className="size-5" />
              </span>
              <div className="text-sm">
                <OpenStatus className="font-bold text-navy" />
                <p className="mt-0.5 text-muted">Mon–Fri 9–5 · Sat 10–2 · Sun 10–12</p>
              </div>
            </div>
          </div>
          <div
            className="motion-fade-up absolute top-44 right-[40%] z-10 hidden items-center gap-2 rounded-full bg-navy px-4 py-2.5 text-sm font-bold text-white shadow-e4 xl:flex"
            style={delay(620)}
          >
            <Truck aria-hidden className="size-4 text-green-100" /> Free medication delivery
          </div>
        </div>
      </section>

      {/* ───────── Quick actions (overlapping the hero) ───────── */}
      <section aria-labelledby="quick-heading" className="relative z-10 -mt-24 lg:-mt-32">
        <div className="container-page">
          <h2 id="quick-heading" className="sr-only">
            Prescription requests
          </h2>
          <QuickActions headingLevel="h3" animate />
        </div>
      </section>

      <div className="mt-16 md:mt-20">
        <ServiceTicker />
      </div>

      {/* ───────── About ───────── */}
      <section aria-labelledby="about-heading" className="py-20 md:py-28">
        <div className="container-page grid items-center gap-16 lg:grid-cols-2">
          <div className="motion-reveal relative pb-12">
            <div className="group relative h-[22rem] overflow-hidden rounded-3xl shadow-e3 md:h-[28rem]">
              <Image
                src={teamImage}
                alt="A pharmacist checking a blister pack of medication"
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 560px, 100vw"
                className="img-zoom object-cover"
              />
            </div>
            <div aria-hidden className="absolute -top-5 -left-5 -z-10 size-40 rounded-3xl bg-green-100" />
            <dl className="absolute inset-x-4 bottom-0 grid grid-cols-3 divide-x divide-line rounded-2xl bg-white py-5 text-center shadow-e4 sm:inset-x-10">
              {[
                ["7", "days a week"],
                ["Free", "delivery"],
                [String(services.length), "pharmacy services"],
              ].map(([n, label]) => (
                <div key={label} className="px-2">
                  <dt className="sr-only">{label}</dt>
                  <dd className="text-3xl font-extrabold text-green-strong md:text-4xl">{n}</dd>
                  <dd className="mt-1 text-sm font-medium text-muted">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <p className="eyebrow-pill motion-reveal">About us</p>
            <h2 id="about-heading" className="motion-reveal mt-3 text-3xl font-extrabold md:text-[2.6rem] md:leading-tight">
              Your neighbourhood pharmacy in Pitt Meadows
            </h2>
            <p className="motion-reveal mt-5 text-lg text-muted">
              Managed by <strong className="font-semibold text-navy">{site.staff[0].name}</strong>, Pharmacy Manager and
              Pharmacist. We take time to listen, explain, and help you choose the next step.
            </p>
            <ul className="motion-reveal mt-6 space-y-3">
              {["Talk directly with a pharmacist", "Practical help for families and caregivers", "Senior discount available"].map((t) => (
                <li key={t} className="flex items-center gap-3 font-semibold">
                  <span className="inline-flex size-7 items-center justify-center rounded-full bg-green-strong text-white">
                    <CheckCircle2 aria-hidden className="size-4" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="motion-reveal mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/about" className="btn btn-navy">
                Meet Our Pharmacy <ArrowRight aria-hidden className="size-5" />
              </Link>
              <a href={site.phone.href} className="btn btn-outline">
                <Phone aria-hidden className="size-5" /> {site.phone.display}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Services: tinted photo band with overlapping cards ───────── */}
      <section aria-labelledby="services-heading">
        <div className="relative isolate overflow-hidden bg-navy pt-20 pb-44 md:pt-24">
          <Image src={interiorImage} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-25" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-br from-navy via-navy/90 to-teal/80" />
          <div className="container-page flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow-light motion-reveal">Our services</p>
              <h2 id="services-heading" className="motion-reveal mt-3 max-w-xl text-3xl font-extrabold text-white md:text-[2.6rem] md:leading-tight">
                Support beyond the prescription
              </h2>
            </div>
            <Link href="/services" className="btn motion-reveal self-start bg-white text-navy hover:bg-green-50 md:self-auto">
              View All Services <ArrowRight aria-hidden className="size-5" />
            </Link>
          </div>
        </div>
        <div className="container-page relative z-10 -mt-32">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredServices.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.slug} className="motion-reveal">
                  <Link
                    href={`/services#${s.slug}`}
                    className="group lift flex h-full flex-col rounded-3xl bg-white p-6 no-underline shadow-e3 ring-1 ring-navy/5"
                  >
                    <span className="icon-swap inline-flex size-14 items-center justify-center rounded-2xl bg-green-50 text-green-strong group-hover:bg-green-strong group-hover:text-white">
                      <Icon aria-hidden className="size-7" />
                    </span>
                    <span className="mt-5 text-lg font-bold text-navy">{s.shortName ?? s.name}</span>
                    <span className="mt-2 flex-1 text-muted">{s.teaser}</span>
                    <span className="mt-5 inline-flex items-center gap-1.5 font-semibold text-green-strong">
                      Learn more <ArrowRight aria-hidden className="arrow-nudge size-4" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ───────── How it works ───────── */}
      <section aria-labelledby="how-heading" className="py-20 md:py-28">
        <div className="container-page grid items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow-pill motion-reveal">How it works</p>
            <h2 id="how-heading" className="motion-reveal mt-3 text-3xl font-extrabold md:text-[2.6rem] md:leading-tight">
              From request to pickup in three steps
            </h2>
            <ol className="relative mt-10 space-y-8 before:absolute before:top-2 before:bottom-2 before:left-6 before:w-0.5 before:bg-green-100">
              {[
                ["Send your request", "Use a form on this site, or call us."],
                ["Our team reviews it", "A pharmacist may contact you if more details are needed."],
                ["Pick up or get it delivered", "We confirm when it's ready. Delivery where available."],
              ].map(([title, text], i) => (
                <li key={title} className="motion-reveal relative flex gap-5">
                  <span className="relative z-10 inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-navy text-lg font-extrabold text-white ring-8 ring-white">
                    {i + 1}
                  </span>
                  <div className="pt-1.5">
                    <h3 className="text-lg font-bold">{title}</h3>
                    <p className="mt-1 text-muted">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link href="/prescriptions" className="btn btn-secondary motion-reveal mt-10">
              Start a Request <ArrowRight aria-hidden className="size-5" />
            </Link>
          </div>
          <div className="motion-reveal relative">
            <div className="group relative h-[24rem] overflow-hidden rounded-3xl shadow-e3 md:h-[32rem]">
              <Image
                src={organizerImage}
                alt="A hand filling a weekly pill organizer"
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 560px, 100vw"
                className="img-zoom object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-4 flex size-36 flex-col items-center justify-center rounded-full bg-orange-strong p-4 text-center text-white shadow-e4 ring-8 ring-white md:-left-8 md:size-40">
              <Package aria-hidden className="size-7" />
              <span className="mt-1 text-sm leading-tight font-bold">Free blister packaging</span>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section aria-labelledby="faq-heading" className="bg-green-50 py-20 md:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow-pill motion-reveal bg-white">Questions</p>
            <h2 id="faq-heading" className="motion-reveal mt-3 text-3xl font-extrabold md:text-[2.6rem] md:leading-tight">
              Questions patients often ask
            </h2>
            <div className="motion-reveal mt-8 rounded-3xl bg-navy p-7 text-white shadow-e3">
              <p className="text-lg font-bold">Can&apos;t find your answer?</p>
              <p className="mt-2 text-white/80">Our team is happy to help by phone.</p>
              <a href={site.phone.href} className="btn btn-primary mt-5">
                <Phone aria-hidden className="size-5" /> Call {site.phone.display}
              </a>
              <p className="mt-4 text-sm text-white/70">
                <OpenStatus />
              </p>
            </div>
          </div>
          <div className="motion-reveal">
            <FaqList items={faqs.filter((f) => homeFaqIds.includes(f.id))} />
            <Link href="/prescriptions#rx-faq" className="mt-4 inline-flex min-h-11 items-center gap-1.5 font-semibold text-green-strong underline">
              More prescription questions <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── Contact strip ───────── */}
      <section aria-labelledby="visit-heading" className="py-16 md:py-20">
        <div className="container-page">
          <div className="text-center">
            <p className="eyebrow-pill motion-reveal">We&apos;re close by</p>
            <h2 id="visit-heading" className="motion-reveal mt-3 text-3xl font-extrabold md:text-4xl">
              Visit, call or send a message
            </h2>
          </div>
          <ul className="mt-12 grid gap-10 text-center sm:grid-cols-2 lg:grid-cols-4">
            <li className="motion-reveal group">
              <span className="icon-swap mx-auto inline-flex size-16 items-center justify-center rounded-full bg-navy text-white ring-8 ring-green-50 group-hover:bg-green-strong">
                <MapPin aria-hidden className="size-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold">Visit us</h3>
              <p className="mt-1 text-muted">
                {site.address.street}
                <br />
                {site.address.city}, {site.address.region} {site.address.postalCode}
              </p>
              <a href={directionsUrl} target="_blank" rel="noopener" className="mt-1 inline-flex min-h-11 items-center gap-1 font-semibold text-green-strong underline">
                Get directions<span className="sr-only"> (opens Google Maps in a new tab)</span>
              </a>
            </li>
            <li className="motion-reveal group">
              <span className="icon-swap mx-auto inline-flex size-16 items-center justify-center rounded-full bg-navy text-white ring-8 ring-green-50 group-hover:bg-green-strong">
                <Clock aria-hidden className="size-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold">Opening hours</h3>
              <p className="mt-1 text-muted">
                <span className="whitespace-nowrap">Mon–Fri: 9 a.m. – 5 p.m.</span>
                <br />
                <span className="whitespace-nowrap">Sat: 10 a.m. – 2 p.m.</span>
                <br />
                <span className="whitespace-nowrap">Sun: 10 a.m. – 12 p.m.</span>
              </p>
            </li>
            <li className="motion-reveal group">
              <span className="icon-swap mx-auto inline-flex size-16 items-center justify-center rounded-full bg-navy text-white ring-8 ring-green-50 group-hover:bg-green-strong">
                <Mail aria-hidden className="size-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold">Email us</h3>
              <a href={`mailto:${site.email}`} className="mt-1 inline-flex min-h-11 items-center text-muted underline [overflow-wrap:anywhere] hover:text-navy">
                {site.email}
              </a>
            </li>
            <li className="motion-reveal group">
              <span className="icon-swap mx-auto inline-flex size-16 items-center justify-center rounded-full bg-navy text-white ring-8 ring-green-50 group-hover:bg-green-strong">
                <Phone aria-hidden className="size-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold">Call or fax</h3>
              <p className="mt-1 text-muted">
                Phone:{" "}
                <a href={site.phone.href} className="font-semibold text-navy underline">
                  {site.phone.display}
                </a>
                <br />
                <span className="inline-flex items-center gap-1">
                  <Printer aria-hidden className="size-4" /> Fax: {site.fax.display}
                </span>
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* ───────── Contact: form card over tinted photo ───────── */}
      <section aria-labelledby="contact-heading" className="relative isolate overflow-hidden py-20 md:py-28">
        <Image src={interiorImage} alt="" fill sizes="100vw" className="-z-10 object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/95 via-navy/85 to-teal/75" />
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div className="text-white lg:order-2">
            <p className="eyebrow-light motion-reveal">Get in touch</p>
            <h2 id="contact-heading" className="motion-reveal mt-3 text-3xl font-extrabold text-white md:text-[2.6rem] md:leading-tight">
              Need help with a prescription?
            </h2>
            <p className="motion-reveal mt-4 max-w-md text-lg text-white/85">
              Call us, start a request online, or stop by the pharmacy.
            </p>
            <div className="motion-reveal mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={site.phone.href} className="btn btn-primary">
                <Phone aria-hidden className="size-5" /> Call {site.name}
              </a>
              <Link href="/prescriptions" className="btn bg-white text-navy hover:bg-green-50">
                Start a Request
              </Link>
              <a href={directionsUrl} target="_blank" rel="noopener" className="btn btn-outline-light">
                <Navigation aria-hidden className="size-5" /> Get Directions
                <span className="sr-only"> (opens Google Maps in a new tab)</span>
              </a>
            </div>
            <p className="motion-reveal mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-semibold ring-1 ring-white/20">
              <AlertTriangle aria-hidden className="size-4 text-orange" /> For a life-threatening emergency, call 911.
            </p>
          </div>
          <div className="motion-reveal rounded-3xl bg-white p-6 shadow-e4 md:p-8 lg:order-1">
            <h3 className="text-2xl font-extrabold">Send us a message</h3>
            <p className="mt-1 mb-4 text-muted">We&apos;ll reply by phone or email.</p>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
