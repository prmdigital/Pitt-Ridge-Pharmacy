import { Info } from "lucide-react";

/**
 * Visible marker for information the pharmacy has not supplied yet.
 * Search the codebase for `data-placeholder` (or the page for "To be confirmed")
 * before launch. Never replace one of these with a guess.
 */
export function Placeholder({ label, block = false }: { label: string; block?: boolean }) {
  const Tag = block ? "p" : "span";
  return (
    <Tag
      data-placeholder={label}
      className={`${block ? "flex" : "inline-flex"} items-start gap-1.5 rounded-md border border-dashed border-purple/60 bg-purple-50 px-2 py-1 text-[0.95rem] font-medium text-purple`}
    >
      <Info aria-hidden className="mt-0.5 size-4 shrink-0" />
      <span>
        <span className="font-semibold">To be confirmed:</span> {label}
      </span>
    </Tag>
  );
}

/**
 * Stand-in for photos the pharmacy has not supplied. Uses a soft brand panel
 * rather than stock photography, so no image misrepresents the real pharmacy.
 */
export function ImagePlaceholder({
  description,
  className = "",
}: {
  description: string;
  className?: string;
}) {
  return (
    <div
      data-placeholder={`Photo: ${description}`}
      className={`relative flex items-end overflow-hidden rounded-card bg-green-50 ${className}`}
    >
      <svg aria-hidden viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <circle cx="330" cy="60" r="120" fill="#E4EED8" />
        <circle cx="60" cy="260" r="90" fill="#EEF3F7" />
        <path d="M185 110h30v30h30v30h-30v30h-30v-30h-30v-30h30z" fill="#6B9E32" opacity="0.35" />
      </svg>
      <p className="relative m-4 rounded-md bg-white/90 px-3 py-1.5 text-sm text-muted">
        <span className="font-semibold text-purple">Photo to come:</span> {description}
      </p>
    </div>
  );
}
