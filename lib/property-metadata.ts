import type { Metadata } from "next";
import { getCachedPropertyBySlug } from "@/lib/property-server-cache";
import { getPrimaryImageUrl } from "@/lib/api";

export async function generatePropertyMetadata(
  slug: string,
): Promise<Metadata> {
  try {
    const property = await getCachedPropertyBySlug(slug);

    if (!property) {
      return {};
    }

    const imageUrl = getPrimaryImageUrl(property.images);
    const title = property.title;
    const description =
      property.summary ??
      `${property.propertyType} in ${property.city ?? ""} - ${property.district ?? ""}`.trim() ??
      undefined;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "article",
        images: imageUrl
          ? [{ url: imageUrl, width: 1200, height: 630, alt: title }]
          : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: imageUrl ? [imageUrl] : undefined,
      },
    };
  } catch {
    return {};
  }
}
