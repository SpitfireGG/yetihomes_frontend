import "server-only";

import {
  ApiError,
  mapBlogArticle,
  type BlogBySlugApiResponse,
  type BlogArticle,
  type BlogsApiResponse,
} from "@/lib/api";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// Ensure the URL ends with /api (NestJS global prefix)
const resolvedBaseUrl = API_BASE_URL.endsWith("/api") ? API_BASE_URL : `${API_BASE_URL}/api`;

export const BLOG_LIST_REVALIDATE_SECONDS = 0;
export const BLOG_DETAIL_REVALIDATE_SECONDS = 0;

async function fetchBlogsApi(path: string) {
  const response = await fetch(`${resolvedBaseUrl}${path}`, {
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

  return payload;
}

export async function getCachedBlogs(): Promise<BlogArticle[]> {
  const response = (await fetchBlogsApi("/blogs")) as BlogsApiResponse;

  return response.data.map(mapBlogArticle);
}

export async function getCachedBlogBySlug(
  slug: string,
): Promise<BlogArticle | null> {
  try {
    const response = (await fetchBlogsApi(
      `/blogs/${slug}`,
    )) as BlogBySlugApiResponse;

    return mapBlogArticle(response.data);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }

    throw error;
  }
}
