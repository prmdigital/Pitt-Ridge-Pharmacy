/**
 * Static availability badge.
 *
 * The site previously showed a live open/closed clock (OpenStatus), which could
 * read "Closed now" after hours. A brochure site reads better with a steady,
 * reassuring signal, so this shows the confirmed "open 7 days a week" selling
 * point instead. Concrete opening hours live in <HoursList> and the hero.
 */
export function OpenBadge({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span aria-hidden className="inline-block size-2.5 rounded-full bg-[#3fbf4a]" />
      Open 7 days a week
    </span>
  );
}
