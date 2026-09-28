import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo";
import interiorImage from "../../public/images/pharmacy-shelves-interior.jpg";

/**
 * Inner-page header: tinted photo band with breadcrumbs and matching BreadcrumbList schema.
 * Pass `image` to show a photo beside the title from lg up (hidden on small screens to keep the header short).
 */
export function PageHeader({
  title,
  intro,
  crumbs,
  children,
  image,
  imageAlt = "",
}: {
  title: string;
  intro?: React.ReactNode;
  crumbs: Crumb[];
  children?: React.ReactNode;
  image?: StaticImageData;
  imageAlt?: string;
}) {
  const trail = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <section className="below-header relative isolate overflow-hidden bg-navy text-white">
      <Image src={interiorImage} alt="" fill priority sizes="100vw" className="motion-hero-zoom -z-10 object-cover opacity-30" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/90 to-teal/70" />
      <div aria-hidden className="absolute -right-24 -bottom-24 -z-10 size-80 rounded-full bg-green/20 blur-3xl" />
      <div
        className={`container-page pt-12 pb-14 md:pt-16 md:pb-20 ${
          image ? "lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12" : ""
        }`}
      >
        <div>
        <nav aria-label="Breadcrumb" className="motion-fade-up mb-3">
          <ol className="flex flex-wrap items-center gap-1 text-[0.95rem] text-white/75">
            {trail.map((c, i) => {
              const last = i === trail.length - 1;
              return (
                <li key={c.path} className="flex items-center gap-1">
                  {last ? (
                    <span aria-current="page" className="font-semibold text-white">
                      {c.name}
                    </span>
                  ) : (
                    <>
                      <Link href={c.path} className="inline-flex min-h-11 items-center text-white/75 underline hover:text-white">
                        {c.name}
                      </Link>
                      <ChevronRight aria-hidden className="size-4" />
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        <h1 className="motion-fade-up max-w-3xl text-4xl font-extrabold text-white md:text-5xl" style={{ "--delay": "80ms" } as React.CSSProperties}>
          {title}
        </h1>
        {intro && (
          <div className="motion-fade-up mt-4 max-w-2xl text-lg text-white/85 [&_a]:text-white [&_a]:underline" style={{ "--delay": "160ms" } as React.CSSProperties}>
            {intro}
          </div>
        )}
        {children && (
          <div className="motion-fade-up" style={{ "--delay": "220ms" } as React.CSSProperties}>
            {children}
          </div>
        )}
        </div>
        {image && (
          <div className="motion-fade-up relative hidden lg:block" style={{ "--delay": "200ms" } as React.CSSProperties}>
            <div aria-hidden className="absolute -right-4 -bottom-4 h-full w-full rounded-3xl bg-green/30" />
            <Image
              src={image}
              alt={imageAlt}
              priority
              placeholder="blur"
              sizes="(min-width: 1024px) 40vw, 1px"
              className="relative aspect-[4/3] w-full rounded-3xl object-cover shadow-e4 ring-4 ring-white/10"
            />
          </div>
        )}
      </div>
      <JsonLd data={breadcrumbJsonLd(trail)} />
    </section>
  );
}
