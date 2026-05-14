# TestSprite MCP — Nexa Pay (`nexa_pay_web_public`)

## 1️⃣ Document Metadata

| Field | Value |
|--------|--------|
| **Project** | nexa_pay_web_public |
| **Repository root** | `d:\nexa\nexa_pay_web_public` |
| **Target URL** | `http://localhost:3003` (Next.js dev, `-p 3003`) |
| **Run date** | 2026-05-05 |
| **Execution scope** | Frontend — **15 / 20** high-priority cases (dev-mode cap); TC016–TC020 skipped |
| **Runner** | TestSprite MCP (`generateCode_and_execute`) |
| **Account** | Free plan, credits remaining per `testsprite_check_account_info` |
| **Artifacts** | [`tmp/raw_report.md`](tmp/raw_report.md), [`tmp/test_results.json`](tmp/test_results.json), generated Playwright scripts `TC001`–`TC015` |

**Note:** Late in the run the CLI logged `AUTH_FAILED` / “CREATE_API_KEY” when syncing some remote statuses; local `raw_report.md` and `test_results.json` were still written. For stable dashboard sync, add a valid TestSprite **API key** in Cursor MCP settings.

---

## 2️⃣ Requirement Validation Summary

### R1 — Waitlist submission

Covers successful POST flow and optional fields.

| ID | Case | Result | Notes |
|----|------|--------|-------|
| TC001 | Submit waitlist (minimal valid path) | Passed | Join flow + submit |
| TC002 | Submit with complete details (incl. usage textarea) | Passed | End-to-end form |

### R2 — Landing discovery & navigation

User can move through marketing sections via hero/nav/footer story.

| ID | Case | Result | Notes |
|----|------|--------|-------|
| TC003 | Browse full landing story | Passed | Scroll/nav narrative |
| TC007 | Hero → footer story | Passed | Section traversal |
| TC015 | Open explainer from footer | Passed | Link to `/about/nexa-pay` |

### R3 — Locale switching (EN / FR / AR)

Language selector updates copy; RTL expectations vary by test.

| ID | Case | Result | Notes |
|----|------|--------|-------|
| TC004 | Switch to Arabic (RTL layout | Passed | Agent marked pass (see TC005 for RTL assertion conflict) |
| TC005 | EN → FR → AR → EN with RTL checks | **Failed** | Arabic copy appeared; automated check found **no `dir="rtl"` in DOM** per agent’s search strategy (`document.documentElement.dir` is set in `LocaleContext` — consider asserting `html[dir=rtl]` if tests rely on subtree nodes only) |
| TC006 | Switch to French | Passed | |
| TC008 | Return to English after locale change | Passed | |

### R4 — SEO explainer pages (`/about/nexa-pay`, localized)

| ID | Case | Result | Notes |
|----|------|--------|-------|
| TC009 | English explainer + return home | Passed | |
| TC013 | French explainer + return home | Passed | |
| TC010 | Arabic explainer + RTL + home link | **Failed** | Report: “home” link did not navigate off `/ar/about/nexa-pay`. **Verify** `next/link` client navigation vs Playwright timing; [`NexaPayAboutArticle`](../components/seo/NexaPayAboutArticle.tsx) uses `<Link href="/">` — may need `scroll={false}` or plain `<a href="/">` if automation misses hydration |

### R5 — Theme (light / dark)

| ID | Case | Result | Notes |
|----|------|--------|-------|
| TC011 | Toggle to dark | Passed | |
| TC012 | Toggle light ↔ dark on landing | Passed | |
| TC014 | Toggle back to light | Passed | |

---

## 3️⃣ Coverage & Matching Metrics

| Metric | Value |
|--------|--------|
| **Executed** | 15 |
| **Passed** | 13 |
| **Failed** | 2 |
| **Pass rate** | **86.7%** |

| Requirement group | Total | Passed | Failed |
|-------------------|-------|--------|--------|
| R1 Waitlist | 2 | 2 | 0 |
| R2 Landing / footer | 3 | 3 | 0 |
| R3 Locale | 4 | 3 | 1 |
| R4 Explainer pages | 3 | 2 | 1 |
| R5 Theme | 3 | 3 | 0 |

---

## 4️⃣ Key Gaps / Risks

1. **RTL assertion (TC005 vs TC004)** — TC005 failed because the agent searched for `dir=rtl` on elements and found none, while `LocaleContext` sets `document.documentElement.dir = "rtl"` for Arabic. **Risk:** false negative unless tests assert `await page.locator("html").getAttribute("dir") === "rtl"`. Low product risk if manual QA confirms Arabic layout.

2. **Arabic explainer home navigation (TC010)** — Failure may be **flaky automation** (click before hydration) or **Next.js Link** behavior on localized about route. **Action:** Re-run TC010 after deploy; if persistent, switch footer “home” on about pages to `<a href="/">` for full document navigation or add E2E `waitForURL`.

3. **API key / remote sync** — `AUTH_FAILED` suggests refreshing TestSprite **API key** in MCP so dashboards and video links stay fully synced.

4. **Dev server load** — Tests ran against **`npm run dev`** (15-test cap). For heavier suites use **`npm run build && npx next start -p 3003`** and `serverMode: "production"` in MCP (up to 30 tests).

5. **Generated Playwright scripts** — Heavy XPath indices (`button[8]`, etc.) are **brittle** if UI order changes. Prefer stable `data-testid` attributes on critical controls if you adopt these scripts in CI.

---

## Quick links

- Raw report: [`tmp/raw_report.md`](tmp/raw_report.md)
- TestSprite dashboard (project in raw report): links under each TC in `raw_report.md`
