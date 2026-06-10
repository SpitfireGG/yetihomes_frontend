import "server-only";

import type { Metadata } from "next";
import { getCachedPropertyBySlug } from "@/lib/property-server-cache";
import { getPrimaryImageUrl } from "@/lib/api";

const SITE_URL = "https://www.yetihomesestate.com.np";

const FALLBACK_OG_IMAGE = {
  url: `${SITE_URL}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: "Yeti Homes Estate",
};

export async function generatePropertyMetadata(
  slug: string,
  pathPrefix: string,
): Promise<Metadata> {
  try {
    const property = await getCachedPropertyBySlug(slug);

    if (!property) {
      return fallbackMetadata(slug, pathPrefix, "Property not found");
    }

    const imageUrl = getPrimaryImageUrl(property.images);
    const pageUrl = `${SITE_URL}/${pathPrefix}/${slug}`;
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
  } catch (error) {
    console.error(
      `[generatePropertyMetadata] Failed to fetch property "${slug}":`,
      error instanceof Error ? error.message : error,
    );
    return fallbackMetadata(slug, pathPrefix, "Metadata fetch failed");
  }
}

function fallbackMetadata(
  slug: string,
  pathPrefix: string,
  _reason: string,
): Metadata {
  const pageUrl = `${SITE_URL}/${pathPrefix}/${slug}`;

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
