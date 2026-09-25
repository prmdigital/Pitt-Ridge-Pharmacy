"use client";

import { useEffect, useState } from "react";
import { site } from "@/config/site";

type Status = { open: boolean; text: string };

const fmt = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return `${((h + 11) % 12) + 1}${m ? `:${String(m).padStart(2, "0")}` : ""} ${h >= 12 ? "p.m." : "a.m."}`;
};

/** Works out open/closed from site.hours in Pitt Meadows time (America/Vancouver). */
function computeStatus(now = new Date()): Status | null {
  if (!site.hours) return null;
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Vancouver",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = get("weekday");
  const mins = Number(get("hour")) * 60 + Number(get("minute"));
  const today = site.hours.find((h) => h.days.includes(day));
  const toMins = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3, 5));

  if (today && mins >= toMins(today.opens) && mins < toMins(today.closes)) {
    return { open: true, text: `Open now · until ${fmt(today.closes)}` };
  }
  if (today && mins < toMins(today.opens)) {
    return { open: false, text: `Closed · opens today at ${fmt(today.opens)}` };
  }
  return { open: false, text: "Closed now · open 7 days a week" };
}

/** Live open/closed pill. Renders nothing until mounted, to avoid a server/client mismatch. */
export function OpenStatus({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    setStatus(computeStatus());
    const id = window.setInterval(() => setStatus(computeStatus()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  if (!status) return <span className={`inline-block h-5 ${className}`} aria-hidden />;
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span
        aria-hidden
        className={`live-dot relative inline-block size-2.5 rounded-full ${status.open ? "bg-[#3fbf4a]" : "bg-orange"}`}
      />
      {status.text}
    </span>
  );
}
