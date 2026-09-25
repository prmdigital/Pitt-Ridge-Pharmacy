import Link from "next/link";
import { ArrowLeftRight, FilePlus2, RefreshCw } from "lucide-react";

const actions = [
  { href: "/prescriptions/new", label: "New Prescription", icon: FilePlus2 },
  { href: "/prescriptions/refill", label: "Refill", icon: RefreshCw },
  { href: "/prescriptions/transfer", label: "Transfer", icon: ArrowLeftRight },
];

/** Sticky bottom bar on small screens for the three main prescription actions. */
export function MobileActionBar() {
  return (
    <nav
      aria-label="Prescription actions"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-2px_10px_rgba(6,38,64,0.08)] md:hidden"
    >
      <ul className="grid grid-cols-3">
        {actions.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className="flex min-h-16 flex-col items-center justify-center gap-1 px-1 text-center text-[0.8rem] leading-tight font-semibold text-navy no-underline hover:bg-green-50"
            >
              <Icon aria-hidden className="size-5 text-green-strong" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
