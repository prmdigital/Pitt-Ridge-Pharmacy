import Image from "next/image";
import Link from "next/link";
import { ArrowRight, UserRound } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Placeholder } from "@/components/Placeholder";
import { FinalCta } from "@/components/sections/FinalCta";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import storefrontImage from "../../../public/images/pittridge-pharmacy-storefront-pitt-meadows.jpg";

export const metadata = buildMetadata({
  title: "About Pittridge Pharmacy | Your Pitt Meadows Pharmacy",
  description:
    "Meet Pittridge Pharmacy in Pitt Meadows, BC. Managed by pharmacist Jatin Patel, our team helps individuals, families and caregivers with everyday medication care.",
  path: "/about",
});

export default function AboutPage() {
  const manager = site.staff[0];
  return (
    <>
      <PageHeader
        title="About our pharmacy"
        intro="A community pharmacy in Pitt Meadows, open 7 days a week."
        crumbs={[{ name: "About", path: "/about" }]}
      />

      <section aria-labelledby="story-heading" className="container-page grid items-center gap-10 py-12 md:py-16 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 id="story-heading" className="text-3xl font-extrabold md:text-[2.6rem] md:leading-tight">
            Everyday care, close to home
          </h2>
          <p className="mt-4 text-lg text-muted">
            {site.name} is here to make everyday medication care easier for individuals, families, and caregivers in Pitt
            Meadows.
          </p>
          <p className="mt-4 text-lg text-muted">
            Our team takes time to listen, explain, and help patients choose the next practical step. Whether you&apos;re
            filling a new prescription, managing several medications, or looking after a parent or child, you can talk
            with us.
          </p>
          <div className="mt-6">
            <Placeholder block label="The pharmacy's own story: when it opened, what matters to the team, languages spoken" />
          </div>
        </div>
        <div className="relative">
          <div aria-hidden className="absolute -right-4 -bottom-4 h-full w-full rounded-3xl bg-green-100" />
          <Image
            src={storefrontImage}
            alt="The Pittridge Pharmacy storefront in Pitt Meadows, with the pharmacy sign, services and opening hours in the windows"
            placeholder="blur"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="relative w-full rounded-3xl object-cover shadow-e3"
          />
        </div>
      </section>

      <section aria-labelledby="team-heading" className="bg-green-50 py-12 md:py-16">
        <div className="container-page">
          <h2 id="team-heading" className="text-3xl font-extrabold md:text-[2.6rem] md:leading-tight">
            Meet the team
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-[280px_1fr]">
            <div className="flex aspect-square items-center justify-center rounded-card bg-white" data-placeholder="Photo of Jatin Patel">
              <UserRound aria-hidden className="size-24 text-green" />
              <span className="sr-only">Photo of {manager.name} to come</span>
            </div>
            <div className="card p-6 md:p-8">
              <h3 className="text-xl font-bold">{manager.name}</h3>
              <p className="mt-1 font-semibold text-green-strong">{manager.role}</p>
              <p className="mt-4 text-lg text-muted">
                {manager.name} is the {manager.role.toLowerCase()} at {site.name}. You can ask to speak
                with the pharmacist when you call or visit.
              </p>
              <div className="mt-4">
                <Placeholder label="A short introduction in Jatin's own words" />
              </div>
            </div>
          </div>
          <p className="mt-6 text-muted">
            <Placeholder label="Other team members to feature, if any" />
          </p>
        </div>
      </section>

      <section className="container-page py-12 md:py-16">
        <h2 className="text-3xl font-extrabold md:text-[2.6rem] md:leading-tight">Visit or get in touch</h2>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          You&apos;ll find us at {site.address.street}, {site.address.city}. We serve {site.serviceArea}.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/contact" className="btn btn-secondary">
            Contact and directions <ArrowRight aria-hidden className="size-5" />
          </Link>
          <Link href="/services" className="btn btn-outline">
            See our services
          </Link>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
