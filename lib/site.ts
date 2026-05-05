/** Canonical origin for canonical URLs, sitemap, robots, and metadata (set in Vercel). */
export function getSiteOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "") || "https://nexapay.ma";
  return raw.startsWith("http") ? raw : `https://${raw}`;
}

export function canonical(pathname: string): string {
  const p = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${getSiteOrigin()}${p}`;
}
