import { Placeholder } from "@/components/Placeholder";
import { site } from "@/config/site";

function fmt(t: string) {
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 ? "p.m." : "a.m.";
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${suffix}`;
}

/** Shows opening hours once supplied in site config. Until then, a visible placeholder. */
export function HoursList({ dark = false }: { dark?: boolean }) {
  if (!site.hours) {
    return (
      <div className="space-y-2">
        <Placeholder label="Opening hours" />
        <p className={dark ? "text-white/85" : "text-muted"}>
          Please call {site.phone.display} to check hours before you visit.
        </p>
      </div>
    );
  }
  if (dark) {
    return (
      <dl className="space-y-3">
        {site.hours.map((row) => (
          <div key={row.label}>
            <dt className="text-sm font-semibold text-green-100">{row.label}</dt>
            <dd className="whitespace-nowrap">
              {fmt(row.opens)} to {fmt(row.closes)}
            </dd>
          </div>
        ))}
      </dl>
    );
  }
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5">
      {site.hours.map((row) => (
        <div key={row.label} className="contents">
          <dt className="font-semibold">{row.label}</dt>
          <dd>
            {fmt(row.opens)} to {fmt(row.closes)}
          </dd>
        </div>
      ))}
    </dl>
  );
}
