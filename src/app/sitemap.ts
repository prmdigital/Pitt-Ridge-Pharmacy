import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

const routes: { path: string; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/prescriptions", priority: 0.9, changeFrequency: "monthly" },
  { path: "/prescriptions/new", priority: 0.9, changeFrequency: "monthly" },
  { path: "/prescriptions/refill", priority: 0.9, changeFrequency: "monthly" },
  { path: "/prescriptions/transfer", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({ url: absoluteUrl(r.path), changeFrequency: r.changeFrequency, priority: r.priority }));
}
