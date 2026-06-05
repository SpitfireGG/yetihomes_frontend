import "server-only";

import { unstable_cache } from "next/cache";
import {
  ApiError,
  resolveApiAssetUrl,
  type LandingCategory,
  type LandingPageApiResponse,
} from "@/lib/api";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// Ensure the URL ends with /api (NestJS global prefix)
const resolvedBaseUrl = API_BASE_URL.endsWith("/api") ? API_BASE_URL : `${API_BASE_URL}/api`;

export const LANDING_PAGE_CACHE_REVALIDATE_SECONDS = 60;

export type LandingCityCard = {
  city: string;
  count: number;
  imageUrl: string;
  dominantPropertyType: "HOUSE" | "APARTMENT" | "LAND" | null;
};

export type LandingPageServerData = {
  categories: LandingCategory[];
  cities: LandingCityCard[];
};

async function fetchLandingPageApi(): Promise<LandingPageApiResponse> {
  const response = await fetch(`${resolvedBaseUrl}/properties/search/landing`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      payload &&
      typeof payload === "object" &&
      "message" in payload &&
      typeof payload.message === "string"
        ? payload.message
        : `Request failed with status ${response.status}`;

    throw new ApiError(message, response.status, payload);
  }

  return payload as LandingPageApiResponse;
}

const getLandingPageCache = unstable_cache(
  async (): Promise<LandingPageServerData> => {
    const response = await fetchLandingPageApi();

    return {
      categories: response.data.categories,
      cities: response.data.cities.map((city) => ({
        ...city,
        imageUrl: resolveApiAssetUrl(city.imageUrl),
      })),
    };
  },
  ["landing-page-data"],
  {
    revalidate: LANDING_PAGE_CACHE_REVALIDATE_SECONDS,
    tags: ["landing-page", "properties"],
  },
);

export async function getCachedLandingPageData(): Promise<LandingPageServerData | null> {
  try {
    return await getLandingPageCache();
  } catch {
    return null;
  }
}
