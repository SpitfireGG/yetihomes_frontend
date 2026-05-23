import "server-only";

import { unstable_cache } from "next/cache";
import {
  ApiError,
  resolveApiAssetUrl,
  type LandingCategory,
  type LandingPageApiResponse,
} from "@/lib/api";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

const LANDING_CITY_IMAGE_FALLBACK =
  "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=900&q=80";

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
  const response = await fetch(`${API_BASE_URL}/properties/search/landing`, {
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
        imageUrl: resolveApiAssetUrl(city.imageUrl, LANDING_CITY_IMAGE_FALLBACK),
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
