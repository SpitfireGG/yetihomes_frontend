import "server-only";

import { unstable_cache } from "next/cache";
import {
  ApiError,
  mapAffiliation,
  type Affiliation,
  type AffiliationsApiResponse,
} from "@/lib/api";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const resolvedBaseUrl = API_BASE_URL.endsWith("/api") ? API_BASE_URL : `${API_BASE_URL}/api`;

export const AFFILIATION_CACHE_REVALIDATE_SECONDS = 60;

async function fetchAffiliationsApi(): Promise<AffiliationsApiResponse> {
  const response = await fetch(`${resolvedBaseUrl}/affiliations`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
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

  return payload as AffiliationsApiResponse;
}

const getAffiliationsCache = unstable_cache(
  async () => {
    const response = await fetchAffiliationsApi();
    return response.data.map(mapAffiliation);
  },
  ["affiliations"],
  {
    revalidate: AFFILIATION_CACHE_REVALIDATE_SECONDS,
    tags: ["affiliations"],
  },
);

export async function getCachedAffiliations(): Promise<Affiliation[]> {
  try {
    return await getAffiliationsCache();
  } catch {
    return [];
  }
}
