# AUDIT_FRONTEND.md — Frontend Changes

## API Types Updated

**File:** `lib/api.ts`

| Change | Details |
|--------|---------|
| `SearchProperty.propertyCode` | Added: `string \| null` |
| `SearchProperty.houseDetails.facingDirection` | Added: `string \| null` |
| `SearchProperty.houseDetails.roadType` | Added: `string \| null` |
| `SearchProperty.apartmentDetails.facingDirection` | Added: `string \| null` |
| `SearchProperty.apartmentDetails.roadType` | Added: `string \| null` |
| `getNewListings()` | Added: fetches from `GET /api/properties/search/new-listings` |

---

## Property Cards Updated

**File:** `components/shared/property-listings.tsx`

| Change | Details |
|--------|---------|
| `propertyCode` badge | Displayed above title when present. Styled as small uppercase badge with primary color |
| HOUSE meta items | Added `facingDirection` (compass icon) and `roadType` (road icon) |
| APARTMENT meta items | Added `facingDirection` (compass icon) and `roadType` (road icon) |
| Pagination controls | Replaced "Load More" with page-number pagination: `< prev [1] [2] [3] ... [10] next >` with "Page X of Y (Z results)" |

---

## Property Detail Page Updated

**File:** `components/shared/property-slug-template.tsx`

| Change | Details |
|--------|---------|
| `propertyCode` badge | Displayed above title when present |
| HOUSE quick specs | Added `facingDirection` and `roadType` |
| HOUSE detail specs | Added `facingDirection` and `roadType` |
| APARTMENT quick specs | Added `facingDirection` and `roadType` |
| APARTMENT detail specs | Added `facingDirection` and `roadType` |

---

## New Listings (Header)

**File:** `components/landing/header.tsx`

| Change | Details |
|--------|---------|
| API fetch | `useEffect` fetches from `GET /api/properties/search/new-listings` on mount |
| `getTimeAgo()` helper | Converts ISO date to human-readable ("2h ago", "3d ago") |
| Data mapping | API response mapped to `RecentListing[]` shape with price formatting and image extraction |
| Fallback | `FALLBACK_LISTINGS` used as initial state (no loading flash) |

---

## Buy/Rent Intent Integration

**Files:** `app/houses/page.tsx`, `app/lands/page.tsx`, `app/apartments/page.tsx`, `components/shared/property-browser-route.tsx`

| Change | Details |
|--------|---------|
| Intent mapping | `intent=buy` → `listingType=SALE`, `intent=rent` → `listingType=RENT` |
| URL params | `?intent=buy&type=bungalow` → `listingType=SALE` + `subType=BUNGALOW` filters sent to API |
| Dynamic metadata | Page titles change based on intent: "Houses for Sale" vs "Houses for Rent" |
| Filter wiring | `listingType` included in both server-side fetch and client-side re-fetch |

---

## Pagination

**Files:** `components/shared/property-browser-page.tsx`, `components/shared/property-listings.tsx`

| Change | Details |
|--------|---------|
| Page state | `currentPage` state in `PropertyBrowserPage`, resets to 1 on filter change |
| Page controls | Previous/Next buttons + numbered page buttons with ellipsis for >7 pages |
| Page info | "Page X of Y (Z results)" displayed below controls |
| Page size | 20 items per page (matching API default) |
| Auto-load | When navigating to a page beyond loaded data, triggers `loadMore()` via cursor |
| Hidden when | Single-page results hide pagination controls |

---

## Files Modified Summary

| File | Changes |
|------|---------|
| `lib/api.ts` | Added `propertyCode`, `facingDirection`/`roadType` to types; added `getNewListings()` |
| `components/shared/property-listings.tsx` | Added propertyCode badge, facingDirection/roadType meta, pagination controls |
| `components/shared/property-slug-template.tsx` | Added propertyCode badge, facingDirection/roadType to specs |
| `components/shared/property-browser-page.tsx` | Added page state management |
| `components/shared/property-browser-route.tsx` | Added intent→listingType mapping, type→subType mapping |
| `components/landing/header.tsx` | Added API fetch for new listings, getTimeAgo helper |
| `app/houses/page.tsx` | Added intent/type searchParams, dynamic metadata |
| `app/lands/page.tsx` | Added intent/type searchParams, dynamic metadata |
| `app/apartments/page.tsx` | Added intent/type searchParams, dynamic metadata |

---

## Build Verification
- `npm run build` (next build): ✅ Passes with zero errors
