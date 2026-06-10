import "server-only";

import type { Metadata } from "next";
import { getPrimaryImageUrl, type SearchProperty } from "@/lib/api";
import { getCachedPropertyBySlug } from "@/lib/property-server-cache";

const SITE_URL = "https://www.yetihomesestate.com.np";

const FALLBACK_OG_IMAGE = {
  url: `${SITE_URL}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: "Yeti Homes Estate",
};

async function tryFetchProperty(
  slug: string,
): Promise<SearchProperty | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
    const base = apiUrl.endsWith("/api") ? apiUrl : `${apiUrl}/api`;
    const url = `${base}/properties/search/${slug}`;

    const response = await fetch(url, {
      signal: controller.signal,
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 600, tags: ["properties", `property:${slug}`] },
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(
          `[generatePropertyMetadata] Property "${slug}" returned 404 from ${url}`,
        );
        return null;
      }
      console.warn(
        `[generatePropertyMetadata] Property "${slug}" returned ${response.status} from ${url}`,
      );
      return null;
    }

    const payload = await response.json();
    return (payload as { data: SearchProperty | null }).data ?? null;
  } catch (error) {
    console.error(
      `[generatePropertyMetadata] Fetch failed for "${slug}":`,
      error instanceof Error ? error.message : error,
    );
    if (error instanceof Error && error.name === "AbortError") {
      console.error(
        `[generatePropertyMetadata] Request timed out for "${slug}" after 5s`,
      );
    }
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export async function generatePropertyMetadata(
  slug: string,
  pathPrefix: string,
): Promise<Metadata> {
  const pageUrl = `${SITE_URL}/${pathPrefix}/${slug}`;

  let property: SearchProperty | null = null;

  try {
    property = await getCachedPropertyBySlug(slug);
  } catch (cacheError) {
    console.warn(
      `[generatePropertyMetadata] getCachedPropertyBySlug failed for "${slug}", trying direct fetch:`,
      cacheError instanceof Error ? cacheError.message : cacheError,
    );
  }

  if (!property) {
    property = await tryFetchProperty(slug);
  }

  if (!property) {
    console.warn(
      `[generatePropertyMetadata] All fetch attempts failed for "${slug}", using brand fallback`,
    );
    return fallbackMetadata(pageUrl);
  }

  const imageUrl = getPrimaryImageUrl(property.images);
  const title = property.title;
  const description =
    property.summary ??
    `${property.propertyType} in ${property.city ?? ""}${
      property.district ? ` - ${property.district}` : ""
    }`;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: pageUrl },
    openGraph: {
      title,
      description,
      url: pageUrl,
      type: "website",
      siteName: "Yeti Homes Estate",
      locale: "en_US",
      images: imageUrl
        ? [{ url: imageUrl, width: 1200, height: 630, alt: title }]
        : [FALLBACK_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : [FALLBACK_OG_IMAGE.url],
    },
  };
}

function fallbackMetadata(pageUrl: string): Metadata {
  return {
    title: "Yeti Homes Estate | Premium Real Estate in Nepal",
    description:
      "Discover curated homes, apartments, and land for sale in Nepal.",
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: pageUrl },
    openGraph: {
      title: "Yeti Homes Estate | Premium Real Estate in Nepal",
      description:
        "Discover curated homes, apartments, and land for sale in Nepal.",
      url: pageUrl,
      type: "website",
      siteName: "Yeti Homes Estate",
      locale: "en_US",
      images: [FALLBACK_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: "Yeti Homes Estate | Premium Real Estate in Nepal",
      description:
        "Discover curated homes, apartments, and land for sale in Nepal.",
      images: [FALLBACK_OG_IMAGE.url],
    },
  };
}
