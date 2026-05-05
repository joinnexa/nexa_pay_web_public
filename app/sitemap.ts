import type { MetadataRoute } from "next";
import { canonical } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/about/nexa-pay", "/fr/about/nexa-pay", "/ar/about/nexa-pay"];
  const now = new Date();
  return paths.map((path) => ({
    url: canonical(path),
    lastModified: now,
    changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "/" ? 1 : 0.7,
  }));
}
