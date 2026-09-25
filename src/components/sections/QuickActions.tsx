import Link from "next/link";
import { ArrowLeftRight, ArrowRight, FileText, Info, RefreshCw } from "lucide-react";

const actions = [
  {
    href: "/prescriptions/new",
    icon: FileText,
    title: "New Prescription",
    text: "Upload a clear photo of your prescription.",
    note: "Bring the original prescription when coming for pickup if required.",
    button: "Submit New Prescription",
    primary: true,
  },
  {
    href: "/prescriptions/refill",
    icon: RefreshCw,
    title: "Refill or Renewal Request",
    text: "Ask for a refill. Our team reviews if a renewal is needed.",
    button: "Request a Refill",
  },
  {
    href: "/prescriptions/transfer",
    icon: ArrowLeftRight,
    title: "Transfer Prescription",
    text: "Moving pharmacies? We contact your current one for you.",
    button: "Transfer Prescription",
  },
];

/** The three main prescription actions: the strongest element on the homepage. */
export function QuickActions({ headingLevel = "h2", animate = false }: { headingLevel?: "h2" | "h3"; animate?: boolean }) {
  const H = headingLevel;
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {actions.map(({ href, icon: Icon, title, text, note, button, primary }, i) => (
        <li
          key={href}
          style={animate ? ({ "--delay": `${200 + i * 100}ms` } as React.CSSProperties) : undefined}
          className={`group lift relative flex flex-col overflow-hidden rounded-3xl p-6 shadow-e4 first:sm:col-span-2 lg:p-7 first:lg:col-span-1 ${
            primary ? "bg-navy text-white" : "bg-white ring-1 ring-navy/5"
          } ${animate ? "motion-fade-up" : ""}`}
        >
          {/* Corner accent */}
          <span
            aria-hidden
            className={`absolute -top-10 -right-10 size-32 rounded-full ${primary ? "bg-white/5" : "bg-green-50"}`}
          />
          <span
            className={`icon-swap relative inline-flex size-14 items-center justify-center rounded-2xl ${
              primary ? "bg-orange-strong text-white" : "bg-navy text-white group-hover:bg-green-strong"
            }`}
          >
            <Icon aria-hidden className="size-7" />
          </span>
          <H className={`relative mt-5 text-xl font-extrabold ${primary ? "text-white" : ""}`}>{title}</H>
          <p className={`relative mt-2 ${primary ? "text-white/85" : "text-muted"}`}>{text}</p>
          {note && (
            <p className="relative mt-3 flex gap-2 rounded-xl bg-white/10 p-3 text-[0.95rem] font-semibold text-white">
              <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-green-100" />
              {note}
            </p>
          )}
          <div className="relative mt-auto pt-6">
            <Link href={href} className={`btn w-full text-center whitespace-normal ${primary ? "btn-primary" : "btn-secondary"}`}>
              {button}
              <ArrowRight aria-hidden className="arrow-nudge size-5" />
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
