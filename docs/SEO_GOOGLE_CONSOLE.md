# Google Search Console — Nexa Pay (`nexapay.ma`)

This repo emits `robots.txt` and `sitemap.xml` dynamically. Canonical URLs rely on **`NEXT_PUBLIC_SITE_URL`** (no trailing slash), e.g. `https://nexapay.ma`. Set this in **Vercel → Project → Settings → Environment Variables** for Production (and Preview if you want correct canonicals on previews).

## 1. Verify the property

1. Open [Google Search Console](https://search.google.com/search-console/).
2. Add **URL-prefix** property: `https://nexapay.ma`
3. Use the **DNS** or **HTML file** verification method Vercel recommends for your registrar.

## 2. Submit the sitemap

In GSC → **Sitemaps**, submit:

```
https://nexapay.ma/sitemap.xml
```

## 3. Request indexing (URL Inspection)

After deploy, inspect and **Request indexing** for at least:

- `https://nexapay.ma/`
- `https://nexapay.ma/about/nexa-pay`
- `https://nexapay.ma/fr/about/nexa-pay`
- `https://nexapay.ma/ar/about/nexa-pay`
- Homepage waitlist anchor section is still `#joinForm`; the homepage URL alone is enough for crawlers.

## 4. Post-deploy checks

- **Page indexing**: no “Excluded” due to noindex — root layout sets `robots.index: true`.
- **Canonical**: GSC URL Inspection → “Google-selected canonical” should match `nexapay.ma` HTTPS URLs.
- **Enhancements**: fix any breadcrumb/mobile usability issues reported over time.

See also:

- [`SEO_BACKLINKS.md`](SEO_BACKLINKS.md) — first authority pass.
- [`SEO_MONITORING.md`](SEO_MONITORING.md) — weekly review.
