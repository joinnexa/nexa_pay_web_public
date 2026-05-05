# Weekly SEO monitoring — Nexa Pay

**Cadence**: once per week (15–20 minutes).

## Google Search Console

1. **Performance**
   - Filter queries containing: `nexa`, `nexa pay`, `nexapay`.
   - Note impressions/clicks trends (expect slow ramp weeks 1–4).

2. **Pages** (Indexing)
   - Ensure `/`, `/about/nexa-pay`, `/fr/about/nexa-pay`, `/ar/about-nexa-pay` are **Indexed**.
   - If “Crawled / currently not indexed” persists >14 days, check internal links pointing to those URLs.

3. **Sitemaps**
   - Confirm `https://nexapay.ma/sitemap.xml` stays “Success”.
   - Re-submit after large content/deploy changes.

4. **Experience / Core Web Vitals** (mobile)
   - Investigate regressions after major JS/CSS/image changes.

## Manual sanity

- Homepage and about pages resolve **HTTPS 200**.
- No accidental `noindex` in previews/staging leaked to production.

## When to escalate

- Branded queries show **wrong domain** canonical → inspect hreflang reciprocal links and duplicated content across properties.
- **Soft 404** on SPA routes → confirm Vercel build output and `NEXT_PUBLIC_SITE_URL`.
