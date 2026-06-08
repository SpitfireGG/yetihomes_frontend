# YetiHomes Frontend

Next.js (App Router) frontend for the YetiHomes real estate platform. Talks to a NestJS backend.

## Getting Started

```bash
cp .env.example .env
# edit .env with your backend URL
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

See `.env.example` for all required vars:

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Yes | NestJS backend URL (e.g. `https://api.example.com/api`) |
| `REVALIDATION_SECRET` | Yes | Shared secret for on-demand revalidation (see below) |
| `RESEND_API_KEY` | No | Transactional email provider key |

## On-Demand Revalidation

The backend calls `POST /api/revalidate` after any property **create / update / delete** to instantly purge Next.js server caches:

```json
{
  "secret": "<REVALIDATION_SECRET>",
  "tag": "properties",
  "slug": "optional-property-slug"
}
```

- `tag: "properties"` clears all cached property lists and details.
- `slug` additionally clears the cache for a specific property detail page.

Without this, stale data survives for the configured revalidate windows (5 min for lists, 10 min for details, 1 hr for the home page).

## Production Build

```bash
npm run build
npm run start
```

For standalone deployment, set `output: "standalone"` in `next.config.ts` and copy the `.next/standalone` directory.

## Architecture

- **Cache layers:** Server fetch cache (tags + revalidate windows) → client in-memory Map → `sessionStorage`
- **Client stale-while-revalidate:** stale data is shown immediately while a background refetch updates the cache
- **Property stats:** Both the landing page showcases and browse listings derive icons/values from `lib/property-stats.ts` — a single shared function, so all surfaces render identically
- **Icons:** Tabler Icons, mapped via `components/ui/icons.ts`. The `Icons` merge object spreads maps in order: `PropertyTypeIcons`, `PropertyDetailIcons`, `AmenityIcons`, `StatusIcons`, `UIIcons`. No duplicate keys between maps.
