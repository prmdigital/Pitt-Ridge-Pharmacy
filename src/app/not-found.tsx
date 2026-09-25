import Link from "next/link";
import { site } from "@/config/site";

export default function NotFound() {
  return (
    <section className="below-header container-page pb-20">
      <h1 className="mt-12 text-4xl font-extrabold">We couldn&apos;t find that page</h1>
      <p className="mt-4 max-w-xl text-lg text-muted">
        The page may have moved. Try one of these, or call us at{" "}
        <a href={site.phone.href} className="font-semibold text-green-strong underline">
          {site.phone.display}
        </a>
        .
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn btn-secondary">Home</Link>
        <Link href="/prescriptions" className="btn btn-outline">Prescriptions</Link>
        <Link href="/contact" className="btn btn-outline">Contact</Link>
      </div>
    </section>
  );
}
