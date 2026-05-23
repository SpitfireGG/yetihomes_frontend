import "server-only";

import { unstable_cache } from "next/cache";
import {
  ApiError,
  mapReview,
  type Review,
  type ReviewsApiResponse,
} from "@/lib/api";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export const REVIEW_CACHE_REVALIDATE_SECONDS = 60;

async function fetchReviewsApi(): Promise<ReviewsApiResponse> {
  const response = await fetch(`${API_BASE_URL}/reviews`, {
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

  return payload as ReviewsApiResponse;
}

const getReviewsCache = unstable_cache(
  async () => {
    const response = await fetchReviewsApi();
    return response.data.map(mapReview);
  },
  ["reviews"],
  {
    revalidate: REVIEW_CACHE_REVALIDATE_SECONDS,
    tags: ["reviews"],
  },
);

export async function getCachedReviews(): Promise<Review[]> {
  try {
    return await getReviewsCache();
  } catch {
    return [];
  }
}
