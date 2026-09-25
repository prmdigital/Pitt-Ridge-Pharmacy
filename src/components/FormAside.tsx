import { AlertTriangle, Phone } from "lucide-react";
import { site } from "@/config/site";

/** Sidebar shown next to every request form. */
export function FormAside() {
  return (
    <aside className="space-y-5 lg:sticky lg:top-28" aria-label="Help with your request">
      <div className="card p-6">
        <h2 className="text-lg">What happens next</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-muted">
          <li>Our pharmacy team reviews your request.</li>
          <li>A pharmacist may contact you if more details are needed.</li>
          <li>We confirm when it&apos;s ready for pickup, or for delivery where available.</li>
        </ol>
        <p className="mt-4 text-sm text-muted">Sending a request doesn&apos;t mean a prescription has been approved or filled.</p>
      </div>
      <div className="card p-6">
        <h2 className="text-lg">Prefer to talk?</h2>
        <p className="mt-2 text-muted">Call the pharmacy and we&apos;ll help you over the phone.</p>
        <a href={site.phone.href} className="btn btn-outline mt-4 w-full">
          <Phone aria-hidden className="size-5" /> {site.phone.display}
        </a>
      </div>
      <div className="flex gap-3 rounded-card border-2 border-[#b42318] bg-[#fef3f2] p-5">
        <AlertTriangle aria-hidden className="mt-0.5 size-5 shrink-0 text-[#b42318]" />
        <p className="font-semibold text-[#8a1c12]">
          For a life-threatening emergency, call 911. Online forms are not checked in real time.
        </p>
      </div>
    </aside>
  );
}

export function FormPageBody({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_320px] lg:py-16">
      <div className="min-w-0">{children}</div>
      <FormAside />
    </div>
  );
}
