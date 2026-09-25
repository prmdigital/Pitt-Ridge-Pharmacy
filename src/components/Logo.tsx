import Link from "next/link";
import { site } from "@/config/site";

/**
 * Brand logo. The file at /brand/pittridge-pharmacy-logo.svg is a STAND-IN until the
 * official artwork is supplied. Replace the file itself; don't redraw the logo in code.
 */
export const LOGO_SRC = "/brand/pittridge-pharmacy-logo.svg";

export function Logo({ className = "h-11 w-auto", linked = true }: { className?: string; linked?: boolean }) {
  const img = (
    // eslint-disable-next-line @next/next/no-img-element -- SVG logo, no optimisation needed
    <img src={LOGO_SRC} alt={linked ? `${site.name} home` : site.name} width={240} height={56} className={className} />
  );
  if (!linked) return img;
  return (
    <Link href="/" className="inline-flex min-h-11 shrink-0 items-center rounded-md">
      {img}
    </Link>
  );
}
