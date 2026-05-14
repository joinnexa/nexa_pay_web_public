# Nexa Pay — Public Website Product Specification

**Document type:** Product specification (TestSprite / QA)  
**Product:** `nexa_pay_web_public` — Nexa Pay marketing & waitlist site  
**Version:** 1.0  
**Last updated:** May 2026

---

## 1. Product overview

### 1.1 What this product is

**Nexa Pay** (consumer-facing product name) is a Morocco-focused digital wallet: P2P transfers, merchant checkout via QR, security-focused onboarding, and ecosystem integrations. The **Nexa Pay public website** (`nexa_pay_web_public`) is not the wallet app itself. It is the **official marketing and lead-capture surface** for Nexa Pay: it explains the product vision, builds trust, supports **English, French, and Arabic**, and drives **waitlist sign-ups** for the private beta.

### 1.2 Purpose of this website

| Goal | Description |
|------|-------------|
| **Educate** | Communicate value proposition: Morocco-first wallet, lower-friction transfers, QR merchant payments, transparency, phased city rollout. |
| **Convert** | Collect waitlist leads via the **Request Early Access** form. |
| **Discoverability** | Ship SEO-friendly metadata, `sitemap.xml`, `robots.txt`, structured data (JSON-LD), and dedicated **“What is Nexa Pay?”** article-style pages. |
| **Brand** | Present Nexa Pay as part of the broader Nexa ecosystem; surface contact emails and social handles in the footer. |

### 1.3 How it should work (high level)

1. Visitors land on the **home page** with a long-scroll narrative (hero → why → services → pillars → segments → how early access works → roadmap → waitlist form → trust → footer).
2. The **navigation bar** provides smooth scroll to section anchors; **Join the Waitlist** scrolls to the form.
3. Users may switch **language** (EN / FR / AR) and **theme** (light / dark). Arabic uses **RTL** layout; preference persists in `localStorage`.
4. Submitting the waitlist **POST**s JSON to the site’s **Next.js Route Handler** `POST /api/v1/waitlist`, which validates input and either forwards to the backend API (if `BACKEND_URL` is set) or **stores locally** under `data/waitlist-entries.json` as a fallback.
5. Optional **About** URLs serve longer SEO content about Nexa Pay in EN / FR / AR.

---

## 2. Technical context

| Item | Detail |
|------|--------|
| **Stack** | Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Framer Motion, shadcn-style UI primitives |
| **Dev server** | `npm run dev` → **port 3003** (`next dev -p 3003`) |
| **Public API base (client)** | `NEXT_PUBLIC_API_BASE_URL` or defaults to `http://localhost:3000` for waitlist `fetch` — **align this with the actual dev port** (3003) when testing locally |
| **Site URL (canonical)** | `NEXT_PUBLIC_SITE_URL` or default `https://nexapay.ma` |

---

## 3. Information architecture & routes

| Route | Purpose |
|-------|---------|
| `/` | Main landing (all primary sections + waitlist) |
| `/about/nexa-pay` | English “What is Nexa Pay?” article / SEO page |
| `/fr/about/nexa-pay` | French version |
| `/ar/about/nexa-pay` | Arabic version (RTL) |
| `/api/v1/waitlist` | Waitlist submission endpoint (POST only from browser in normal use) |
| `/sitemap.xml` | Sitemap (home + three about paths) |
| `/robots.txt` | Crawler rules |

---

## 4. Feature requirements (for testing)

### 4.1 Home page content sections

In order of typical vertical flow:

1. **Hero** — Private beta messaging, primary CTA “Join the Waitlist”, secondary “How It Works” (scroll).
2. **Why we exist** — Problem / solution framing for Moroccan payment friction.
3. **About / Services** — Cards describing transfers, fees positioning, QR merchant pay, unified wallet, operational traceability, expansion.
4. **Advantages** — Differentiators list.
5. **Pillars** — Speed/reliability, transparent pricing, merchant checkout, traceability.
6. **Segments** — Merchants, individuals, partners.
7. **How early access works** — Three steps: join waitlist → selected for beta → start using Nexa Pay; beta limitations note.
8. **Roadmap** — City rollout (e.g. Casablanca, Rabat, Marrakech) with status text.
9. **Waitlist form** — See §5.
10. **Trust & safety** — Security / transparency / compliance posture; beta disclaimer (“Not a bank”).
11. **Footer** — Contact emails, quick link to About, social labels, legal-style disclaimer.

**Expected behavior:** Sections render without blocking errors; anchor navigation reaches the correct section; content reflects selected locale.

### 4.2 Navigation & scroll behavior

- Navbar links scroll smoothly to section IDs (e.g. overview, about, howItWorks, segments, trust, contact/join).
- “Join the Waitlist” / equivalent scrolls to the form region (`joinForm`).
- Mobile vs desktop: navbar collapses or adapts at small breakpoints (verify tap targets and menu usability).

### 4.3 Internationalization (i18n)

- **Locales:** `en`, `fr`, `ar`.
- **Persistence:** `nexa-pay-locale` in `localStorage`.
- **DOM:** `document.documentElement.lang` and `dir` (`rtl` for Arabic).
- **Expectation:** Switching language updates all visible `LocaleContext` strings (nav, hero, sections, form labels, footer).

### 4.4 Theme (light / dark)

- **Persistence:** `nexa-pay-theme` in `localStorage`; respects `prefers-color-scheme` if unset.
- **Expectation:** `document.documentElement` toggles `dark` class; UI remains readable and contrast is acceptable.

### 4.5 SEO & metadata

- Root layout defines default **title**, **description**, Open Graph, Twitter card, **canonical** alternates, icons.
- Home injects **JSON-LD** for organization/website.
- **Sitemap** lists `/`, `/about/nexa-pay`, `/fr/about/nexa-pay`, `/ar/about/nexa-pay`.

### 4.6 About article pages

- Localized long-form content component with metadata appropriate to language.
- Arabic route uses RTL and correct `lang`.

---

## 5. Waitlist feature (critical path)

### 5.1 Form fields (client)

| Field | Required | Notes |
|-------|----------|--------|
| `full_name` | Yes | Max 255 chars (server) |
| `phone_number` | Yes | Max 50 chars (server) |
| `email` | Yes | Must match email pattern (server) |
| `city` | Yes | Max 100 chars (server); default UI often “Casablanca” |
| `user_type` | Optional | `consumer` \| `merchant` \| `investor` (lowercase); invalid values rejected |
| `how_will_use_nexa` | Optional | Max 2000 chars |
| `source` | Sent by client | Default `nexa_pay_web_public` |

### 5.2 API contract — `POST /api/v1/waitlist`

**Request:** `Content-Type: application/json`, body as above.

**Success (local fallback, 201):**

```json
{
  "data": {
    "id": "<uuid>",
    "full_name": "...",
    "phone_number": "...",
    "email": "...",
    "city": "...",
    "created_at": "<iso8601>",
    ...
  },
  "message": "Thank you for joining the waitlist."
}
```

**Validation failure (400):** `{ "message": "<reason>" }` — e.g. missing name, invalid email, invalid `user_type`.

**Invalid JSON (400):** `{ "message": "Invalid JSON body" }`

**Backend proxy:** If `BACKEND_URL` is set, the handler forwards to `${BACKEND_URL}/api/v1/waitlist` and returns that response (timeout 5s; on failure, falls back to local file storage).

### 5.3 UI expectations after submit

- Loading state during submit; prevent double submit.
- On success: success message (localized), form reset to defaults.
- On error: error message (server `message` or generic localized error).

---

## 6. Relationship to the Nexa Pay mobile product

The **mobile Nexa Pay app** (Flutter) delivers wallet, OTP/PIN auth, P2P, QR/NFC, KYC, etc. **This website** must accurately describe that roadmap without implying users can complete banking transactions on the web. Testing should confirm disclaimers and beta messaging remain visible and consistent.

---

## 7. Out of scope for this website

- In-browser wallet login, balance, or money movement (handled in the app + backend).
- Admin dashboards (`nexa_pay_web_app` is a separate product).

---

## 8. Suggested TestSprite / E2E scenarios (summary)

1. Load `/` — hero and footer render; no console fatal errors.
2. Change language FR / AR / EN — strings and direction (RTL for AR) update.
3. Toggle dark mode — layout and contrast remain usable.
4. Click each main nav item — viewport scrolls to the correct section.
5. Submit waitlist with **valid** payload — success state and message.
6. Submit with **invalid email** or **missing required field** — 400 and error message.
7. Submit with **invalid `user_type`** — validation error.
8. Visit `/about/nexa-pay`, `/fr/about/nexa-pay`, `/ar/about/nexa-pay` — pages load; AR is RTL.
9. `GET /sitemap.xml` and `GET /robots.txt` — return expected structure.

---

## 9. Document control

| Field | Value |
|-------|--------|
| **Repository path** | `nexa_pay_web_public/` |
| **Primary entry** | `app/page.tsx`, `app/layout.tsx` |
| **Waitlist implementation** | `app/api/v1/waitlist/route.ts`, `app/home/sections/join-form/JoinForm.tsx` |
| **Strings / locale** | `contexts/LocaleContext.tsx` |

---

*Upload this file as the Product Specification when configuring Nexa Pay public web tests in TestSprite.*
