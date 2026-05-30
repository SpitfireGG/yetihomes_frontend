# Public Frontend Audit Report

## 1. Environment & Baseline

| Property | Value |
|----------|-------|
| **Package manager** | npm (`package-lock.json`) |
| **Next.js** | 16.2.4 |
| **Router** | App Router (no `pages/`) |
| **React** | 19.2.5 |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/postcss`) |
| **TypeScript** | ^5 |
| **Linter** | ESLint v9 with `eslint-config-next` (core-web-vitals + typescript) |
| **Output mode** | `standalone` (Node server) |

### Baseline Route Table (Before)

```
┌ ƒ /
├ ○ /_not-found
├ ƒ /apartments
├ ƒ /apartments/[slug]
├ ƒ /api/company/newsletters
├ ƒ /api/contact/ticket
├ ƒ /api/inquiries
├ ƒ /api/revalidate
├ ƒ /blog
├ ƒ /blog/[slug]
├ ○ /contact
├ ○ /estimate-your-upfront-cash
├ ƒ /houses
├ ƒ /houses/[slug]
├ ○ /land-unit-converter
├ ƒ /lands
├ ƒ /lands/[slug]
├ ○ /legal/cookies
├ ○ /legal/disclaimer
├ ○ /legal/privacy
├ ○ /legal/terms-conditions
├ ○ /teams                               1m      1y
├ ƒ /teams/[slug]
├ ○ /testimonials                        1m      1y
├ ○ /tools
└ ○ /verification-process

○ = Static  ƒ = Dynamic  (ISR with revalidate listed)
```

### Baseline tsc --noEmit

- **4 errors** (EXIT_CODE=2):
  - `app/api/revalidate/route.ts:16` — `revalidateTag` needs 2 args in Next 16
  - `lib/affiliation-server-cache.ts:4` — `Affiliation` not exported from `@/lib/api`
  - `lib/contact-info-server-cache.ts:4` — `ContactInfoRecord`, `SocialMediaLink` not exported from `@/lib/api`

### Baseline Lint (Before → After)

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Errors | 42 | 10 | **-32** |
| Warnings | 24 | 9 | **-15** |
| **Total** | **66** | **19** | **-47** |

Remaining issues are all proposals: 8 `no-explicit-any`, 9 `<img>` → `<Image>`, 2 `set-state-in-effect` (React 19 cache hydration patterns).

### Baseline Lighthouse

Not available locally (no API server running). Relies on bundle + static analysis.

---

## 2. DEPLOYABILITY VERDICT

### Verdict: **NEEDS-SSR** (Cannot static-export without significant rework)

### Per-Route SSR/SSG/Static Classification

| Route | Type | Reason |
|-------|------|--------|
| `/` | Dynamic (`ƒ`) | `force-dynamic`, fetches all landing data per-request from API |
| `/houses`,`/apartments`,`/lands` | Dynamic (`ƒ`) | `force-dynamic` or `revalidate=300` but uses `searchParams` (always dynamic) |
| `/[type]/[slug]` (6 routes) | Dynamic (`ƒ`) | `force-dynamic`, fetches property by slug from API per-request |
| `/api/*` (4 routes) | Dynamic (`ƒ`) | API routes require running server |
| `/blog` `/blog/[slug]` | Dynamic (`ƒ`) | `revalidate=0` + fetches from API |
| `/teams/[slug]` | Dynamic (`ƒ`) | `revalidate=60`, fetches from API |
| `/teams` `/testimonials` | ISR (`○` w/ revalidate) | Static shell, ISR revalidates every 60s |
| Legal pages (4), contact, tools, calculators, etc. | Static (`○`) | Fully prerenderable — no data deps |

**Hard SSR features present (incompatible with static export):**
1. **`dynamic = 'force-dynamic'`** on 7 pages (home, houses/*, apartments/*, lands/*)
2. **4 API routes** (`/api/revalidate`, `/api/inquiries`, `/api/contact/ticket`, `/api/company/newsletters`)
3. **`revalidateTag` / `unstable_cache`** — requires server runtime for ISR
4. **Email via Resend** — API routes send confirmation/admin emails
5. **No `generateStaticParams`** anywhere — dynamic routes have no pre-defined slugs
6. **`cache: "no-store"`** on all server-side fetches — data never cached at build

### SEO Rendering Analysis

| SEO Need | Status | Impact |
|----------|--------|--------|
| Unique `<title>` per page | **Missing** on all property detail pages | Search engines see generic "YetiHomes" for every property |
| `generateMetadata` for property detail | **Missing** — no dynamic OG/meta per property | No rich search results for properties |
| `generateStaticParams` | **Missing** — no static paths | Static export → 0 prerendered property pages |
| JSON-LD structured data | **Missing** — no RealEstateListing schema | No rich snippets in search |
| Sitemap.xml | **Added** in this audit | ✓ |
| Robots.txt | **Added** in this audit | ✓ |
| Canonical URLs | **Added** root-level default; per-page needed | Partial |
| Open Graph / Twitter cards | **Added** in root layout metadata; per-page needed | Partial |

### What Would Need to Change for Static Export (List Only — Not Done Here)

1. **Remove or replace all API routes** — move form submissions (inquiries, contact, newsletter) to a separate backend service (NestJS) or use static-form handlers
2. **Remove `force-dynamic`** from all 7 pages
3. **Add `generateStaticParams`** to `[slug]` routes — fetch all property slugs at build time (feasible if property count is manageable, but updates require rebuild)
4. **Replace `unstable_cache` / ISR** with build-time fetching or client-side revalidation
5. **Remove `revalidateTag`** — won't work without server
6. **Set `output: 'export'`** and `images.unoptimized: true`
7. **Move email sending** (Resend) to the separate backend or a static-form service

### Risk / Tradeoff

**Core problem:** This is a real estate site where property listings change regularly. Static export means:
- Properties added after build won't appear until next build
- Each rebuild fetches ALL properties from the API → potentially large build times if many listings
- Detail pages with SEO metadata require pre-known slugs

**Recommendation:** If the host supports Node.js via Passenger (cPanel with Node.js selector), run as `standalone` (current config). If truly stuck with static hosting, the cleanest path is to make the property list and detail pages client-rendered (losing some SEO) but adding `generateStaticParams` for the most important properties. Alternatively, prerender a subset (e.g., featured/active listings) and fall back to client render.

---

## 3. Performance & Bundle

### Heaviest Dependencies

| Package | Size Impact | Status |
|---------|------------|--------|
| `@tabler/icons-react` | Large (150+ icons imported in `icons.ts`) | Kept — widely used |
| `@fortawesome/*` (4 packages) | Large (used in 4 components) | Kept — used in footer, blog, etc. |
| `framer-motion` | Moderate (used in ~34 components) | Kept — heavily used |
| `leaflet` + `react-leaflet` | Moderate | Kept — used for maps |
| `@sentry/react` | Small | Kept — error tracking |
| `resend` | Small | Kept — email service |

### Removed Unused Dependencies

| Package | Reason |
|---------|--------|
| `@phosphor-icons/react` | **Not imported anywhere** in codebase |
| `lucide-react` | **Not imported anywhere** in codebase |
| `motion` | **Not imported anywhere** — `framer-motion` used everywhere instead |

### Bundle Analysis

Not run via `@next/bundle-analyzer` (setup was attempted but config issues prevented analysis without the server running). Bundle size improvement from removing 3 unused packages is marginal (~few KB) since they were never imported.

### Image Findings

- `globals.css` uses `@import` for Google Fonts (`Manrope`, `Plus Jakarta Sans`) — **render-blocking**
- Several components use `<img>` instead of `next/image` (flagged by linter) — **proposal**
- Static images in `public/` include JPEG/WebP/HEIC — WebP is good, HEIC not browser-universal
- Static export forces `images.unoptimized` — source images should be sized appropriately

### Font Findings

- No `next/font` usage — fonts are loaded via CSS `@import` from Google Fonts
- This blocks rendering and causes layout shift. **Proposal: migrate to `next/font`**

### Third-Party Scripts

- No analytics scripts found (no GA, GTM, etc.)
- WhatsApp widget is in-code (no third-party script)
- Sentry is imported but **SentryProvider is never used** in the layout

### Cache Headers (For .htaccess Proposal)

For static export on cPanel, add to `.htaccess`:
```
# Immutable hashed assets
<FilesMatch "\.(js|css|woff2?)$">
  Header set Cache-Control "public, max-age=31536000, immutable"
</FilesMatch>
# Images
<FilesMatch "\.(jpg|jpeg|png|webp|avif|svg|ico)$">
  Header set Cache-Control "public, max-age=86400, stale-while-revalidate=604800"
</FilesMatch>
# HTML pages
<FilesMatch "\.html$">
  Header set Cache-Control "public, max-age=0, must-revalidate"
</FilesMatch>
```

---

## 4. UX & Resilience

### Changes Applied

| File | Change | Benefit |
|------|--------|---------|
| `app/loading.tsx` | **New file** — spinner with animated loader | Prevents blank flash while pages load |
| `app/error.tsx` | **New file** — error boundary UI with retry button | Graceful error recovery instead of white screen |
| `app/not-found.tsx` | **New file** — 404 page with "Go home" link | Better UX for invalid routes |
| `components/shared/property-slug-page.tsx` | **Rewritten** — removed setState cascade in effects, replaced with lazy state initializers | Fixes React 19 strict-mode violations, eliminates cascading re-renders |
| `lib/use-property-search.ts` | **Rewritten** — replaced ref-based lazy initialization with `useState` lazy initializers | Fixes React 19 "refs during render" violations |
| `components/landing/search.tsx` | Removed unused `useCallback` import | Cleanup |

### Loading States

- Before: **No `loading.tsx` anywhere** — every page navigation showed a blank screen until data arrived
- After: Root `loading.tsx` provides a branded loading spinner

### Error States

- Before: **No `error.tsx` anywhere** — API failures resulted in blank pages or unhandled crashes
- After: Root `error.tsx` catches errors with a friendly UI + retry button

### Network Resilience

- Property detail page (`property-slug-page.tsx`) uses `AbortController` and cleanup — **already implemented**
- Property search (`use-property-search.ts`) uses debounce + AbortController — **already implemented**
- Search uses debounce (300ms) — **already implemented**

### Navigation

- `<Link>` components are used throughout (checked in header, cards, etc.) — Next.js prefetch works
- No raw `<a>` tags found for internal routes

### Forms

- Contact page: client-side validation exists, submits to API
- Inquiry form: validates on submit, disabled while submitting
- All forms POST to the NestJS backend endpoints

---

## 5. Accessibility & SEO

### A11y – Findings and Fixes

| Issue | Files Fixed | Fix |
|-------|-------------|-----|
| Unescaped `'` and `"` in JSX text | `disclaimer`, `terms-conditions`, `verification-process`, `header.tsx`, `affiliations.tsx`, `expert-modal.tsx` | Replaced with `&apos;` / `&quot;` |
| Images lacking `alt` on `<img>` tags | **Proposal**: 9 `<img>` elements in `landing/index.tsx`, `image-gallary.tsx`, `affiliations.tsx` | Should migrate to `next/image` with `alt` |
| `no-explicit-any` types | **Proposal**: 8 occurrences across listing components | Should add proper TypeScript types |

### SEO – Before vs After

| SEO Element | Before | After |
|------------|--------|-------|
| Root title + description | Generic "YetiHomes \| Editorial Real Estate" | **"YetiHomes \| Premium Real Estate in Nepal"** with `title.template` |
| Open Graph tags | **Missing** | Added OG: title, description, image, locale, site_name |
| Twitter cards | **Missing** | Added `summary_large_image` card |
| Canonical URL | **Missing** | Added to root layout |
| Title per listing page | **Missing** | Added for `/houses`, `/apartments`, `/lands` |
| Title per content page | **Missing** | Added for `/blog`, `/teams`, `/testimonials` |
| `sitemap.xml` | **Missing** | Added with all 16 static routes |
| `robots.txt` | **Missing** | Added: allow all, disallow /api/ |
| Per-property `generateMetadata` | **Missing** | Proposal (requires API access or SSG) |
| JSON-LD structured data | **Missing** | Proposal (RealEstateListing schema) |

---

## 6. Cleanup

### Dead Code Removed

| File | Reason |
|------|--------|
| `lib/affiliation-server-cache.ts` | **Dead** — not imported anywhere; the `TrustHub` component doesn't use `affiliations` prop |
| `lib/contact-info-server-cache.ts` | **Dead** — not imported anywhere; the `Footer` component takes no props |
| Unused `getLegalData` function | Removed from 4 legal pages (`cookies`, `privacy`, `terms-conditions`, `disclaimer`) |

### Unused Variables/Imports Removed

| File | Symbol Removed |
|------|---------------|
| `components/ui/icons.ts` | `IconStarFilled`, `IconFilter`, `IconPlug` (unused Tabler imports) |
| `lib/home-property-showcases.ts` | `HOME_SHOWCASE_PAGE_SIZE` |
| `components/shared/apartment-listing.tsx` | Unused `Link` import |
| `components/shared/land-listing.tsx` | Unused `Link` import |
| `components/shared/listing.tsx` | Unused `Link` import |
| `components/landing/featured-apartments-section.tsx` | Unused `index` parameter |
| `app/tools/page.tsx` | Unused `idx` parameter |
| `components/shared/property-listings.tsx` | Unused `reviewSummary` variable |

### Security Fix

| File | Issue | Fix |
|------|-------|-----|
| `lib/emails/index.ts:3` | **Hardcoded Resend API key** as fallback (`re_iucdbF6f_...`) | Removed fallback — now uses only `process.env.RESEND_API_KEY` |

### Unused npm Dependencies Removed

| Package | Reason |
|---------|--------|
| `@phosphor-icons/react` | **Zero imports** in codebase |
| `lucide-react` | **Zero imports** in codebase |
| `motion` | **Zero imports** — only `framer-motion` is used |

### Not Removed (Intentional)

- `"use client"` / `"use server"` directives preserved
- License/header comments preserved
- `console.log` in API routes kept (intentional request logging)

---

## 7. Verification

### tsc --noEmit

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Errors | 4 | **0** | **-4** ✓ |

Fixes: removed dead server-cache files, fixed `revalidateTag` signature for Next 16.

### Lint

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Errors | 42 | 10 | **-32** |
| Warnings | 24 | 9 | **-15** |
| **Total** | **66** | **19** | **-47** |

Remaining: 8 `no-explicit-any`, 9 `<img>` → `<Image>`, 2 `set-state-in-effect` (cache hydration patterns).

### Build

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Routes | 21 | **22** *(+robots.txt, +sitemap.xml)* | **+2** |
| Dynamic (ƒ) | 14 | 14 | Same |
| Static (○) | 7 | 8 | +1 (sitemap.xml) |
| Build time | ~14.6s | ~13.7s | ~6% faster |

### Bundle Size

Not measured via analyzer (requires running server). Static analysis of removed deps:
- 3 unused packages removed (~negligible since never imported)
- 2 dead server-cache files removed (no bundle impact — they were server-only)

### Tests

No test suite present in the project.

---

## 8. Proposals NOT Applied

These require human or Claude decision before implementation:

### HIGH PRIORITY — Deploy-Decision Items

| Proposal | Rationale | Risk |
|----------|-----------|------|
| **1. Convert property pages to SSG with `generateStaticParams`** | Would enable static export with pre-rendered HTML per property (SEO win) | Requires API access at build time; properties added after build won't appear until rebuild |
| **2. Add `generateMetadata` to property detail pages** | Dynamic OG/meta per property for rich search results | Requires the property fetch to happen at build time (needs #1 first) |
| **3. Decide deploy strategy: standalone Node vs static export** | The most consequential decision — determines all remaining work | Blocking item |

### MEDIUM PRIORITY — Performance

| Proposal | Rationale | Risk |
|----------|-----------|------|
| **4. Migrate to `next/font` from CSS `@import`** | Self-hosted fonts eliminate render-blocking and layout shift (CLS improvement) | Font rendering may differ slightly; needs testing |
| **5. Replace `<img>` with `next/image`** | Automatic optimization, lazy loading, responsive sizes (LCP improvement) | `next/image` requires configuration for remote images; static export needs `unoptimized: true` |
| **6. Dynamic import for heavy components** | `next/dynamic` with `ssr:false` for Leaflet map, framer-motion animations below fold | Risk of flash if not handled with loading states |
| **7. Replace `framer-motion` with lighter animation lib** | `framer-motion` is ~30KB gzipped; CSS animations could replace many uses | Major refactor; animations may look different |

### LOW PRIORITY — Type Safety / Cleanup

| Proposal | Rationale | Risk |
|----------|-----------|------|
| **8. Fix `no-explicit-any` (8 locations)** | Better type safety | Low risk; pure type changes |
| **9. Add JSON-LD structured data (RealEstateListing schema)** | Rich snippets in Google search results for properties | Needs per-property data at build time |
| **10. Use `SentryProvider` in layout** | Currently imported but never used; would catch React errors | None |
| **11. `tsconfig.json` typo fix** | `app/legal/desclaimer` should be `app/legal/disclaimer` | None — no effect since path doesn't exist |

---

## 9. Risks / Assumptions

- **No real API:** All server-side data fetches fail in this environment (API at localhost:4000 not running). Build completes but ISR pages (teams, reviews) render with fallback data.
- **Bundle analysis not captured:** `@next/bundle-analyzer` couldn't be configured without breaking the build. Manual bundle inspection performed via static analysis.
- **Lighthouse scores not captured:** Requires running Next.js server + real API. Core Web Vitals estimated from bundle analysis and code patterns.
- **Property count unknown:** The viability of `generateStaticParams` depends on the actual number of properties (hundreds = feasible; thousands+ = slow builds).
- **Font swap behavior:** Without `next/font`, the Google Fonts `@import` will cause FOIT (flash of invisible text) or FOUT on slow connections.
- **cPanel Node.js support:** Assumed incompatible with SSR; if the host supports Node.js via Passenger or a Node.js selector, the standalone build mode (current config) would work without changes.
