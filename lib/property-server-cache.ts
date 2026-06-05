import "server-only";

import {
  ApiError,
  type SearchFilters,
  type SearchMeta,
  type SearchProperty,
  type SearchResponse,
} from "@/lib/api";
import {
  PROPERTY_DETAIL_REVALIDATE_SECONDS,
  PROPERTY_LIST_REVALIDATE_SECONDS,
} from "@/lib/property-cache-config";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// Ensure the URL ends with /api (NestJS global prefix)
const resolvedBaseUrl = API_BASE_URL.endsWith("/api") ? API_BASE_URL : `${API_BASE_URL}/api`;

type ServerApiResponse<T> = {
  data: T;
  message: string;
  statusCode: number;
  success: boolean;
  timestamp: string;
};

type ServerApiResponseWithMeta<T, M> = ServerApiResponse<T> & {
  meta?: M;
};

async function serverApiGet<T, M = never>(
  path: string,
  revalidate: number,
  tags: string[],
): Promise<ServerApiResponseWithMeta<T, M>> {
  const response = await fetch(`${resolvedBaseUrl}${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate,
      tags,
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

  return payload as ServerApiResponseWithMeta<T, M>;
}

function normalizeServerSearchFilters(filters: SearchFilters): SearchFilters {
  return Object.fromEntries(
    Object.entries(filters)
      .filter(([, value]) => value !== undefined && value !== null && value !== "")
      .sort(([left], [right]) => left.localeCompare(right)),
  ) as SearchFilters;
}

function serializeServerSearchFilters(filters: SearchFilters) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(normalizeServerSearchFilters(filters))) {
    params.set(key, String(value));
  }

  return params.toString();
}

export async function getCachedPropertySearch(
  filters: SearchFilters,
): Promise<SearchResponse> {
  const normalizedFilters = normalizeServerSearchFilters(filters);
  const serializedFilters = serializeServerSearchFilters(normalizedFilters);
  const querySuffix = serializedFilters ? `?${serializedFilters}` : "";

  const response = await serverApiGet<SearchProperty[], SearchMeta>(
    `/properties/search${querySuffix}`,
    PROPERTY_LIST_REVALIDATE_SECONDS,
    ["properties", "properties:search"],
  );

  return {
    data: response.data,
    meta: response.meta ?? {
      hasMore: false,
      limit: normalizedFilters.limit ?? response.data.length,
      nextCursor: null,
      total: response.data.length,
    },
  };
}

export async function getAllProperties(): Promise<SearchProperty[]> {
  try {
    const allProperties: SearchProperty[] = [];
    let hasMore = true;
    let skip = 0;
    const take = 50;

    while (hasMore) {
      const response = await serverApiGet<SearchProperty[], SearchMeta>(
        `/properties/search?skip=${skip}&take=${take}`,
        PROPERTY_LIST_REVALIDATE_SECONDS,
        ["properties", "properties:all"],
      );

      allProperties.push(...response.data);

      if (response.data.length < take) {
        hasMore = false;
      } else {
        skip += take;
      }
    }

    return allProperties;
  } catch {
    return [];
  }
}

export async function getCachedPropertyBySlug(slug: string) {
  try {
    const response = await serverApiGet<SearchProperty | null>(
      `/properties/search/${slug}`,
      PROPERTY_DETAIL_REVALIDATE_SECONDS,
      ["properties", `property:${slug}`],
    );

    return response.data;
  } catch {
    return null;
  }
}
