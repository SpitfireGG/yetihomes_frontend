import "server-only";

import { cache } from "react";
import type { SearchFilters, SearchProperty } from "@/lib/api";
import {
  formatNprPrice,
  resolveApiAssetUrl,
} from "@/lib/api";
import type {
  HomePropertyShowcaseData,
  PropertyShowcaseEyebrowTone,
  PropertyShowcaseListing,
} from "@/components/landing/property-showcase-types";
import { getAllProperties } from "@/lib/property-server-cache";
import { getPropertyStats } from "@/lib/property-stats";

type ApiPropertyType = NonNullable<SearchFilters["propertyType"]>;
type ShowcaseSectionKind =
  | "featured_residential"
  | "featured_land"
  | "value_land"
  | "value_home"
  | "apartment"
  | "similar";

const FEATURED_LISTING_COUNT = 6;
const FEATURED_LAND_COUNT = 4;
const VALUE_LAND_COUNT = 4;
const VALUE_HOME_COUNT = 4;
const APARTMENT_LISTING_COUNT = 6;
const SIMILAR_LISTING_COUNT = 4;

const propertyHrefByType: Record<ApiPropertyType, string> = {
  HOUSE: "/houses",
  APARTMENT: "/apartments",
  LAND: "/lands",
};



function dedupeProperties(properties: SearchProperty[]) {
  const byId = new Map<string, SearchProperty>();

  for (const property of properties) {
    if (!byId.has(property.id)) {
      byId.set(property.id, property);
    }
  }

  return Array.from(byId.values());
}

async function getAllCachedPropertiesForType(
  propertyType: ApiPropertyType,
): Promise<SearchProperty[]> {
  const allProperties = await getAllProperties();
  const filtered = allProperties.filter((p) => p.propertyType === propertyType);
  return dedupeProperties(filtered);
}

function parsePriceAmount(priceAmount: string) {
  const price = Number.parseFloat(priceAmount);

  return Number.isFinite(price) ? price : Number.POSITIVE_INFINITY;
}

function parseCreatedAt(value: string) {
  const timestamp = new Date(value).getTime();

  return Number.isFinite(timestamp) ? timestamp : 0;
}

function sortByCreatedDesc(properties: SearchProperty[]) {
  return [...properties].sort(
    (left, right) => parseCreatedAt(right.createdAt) - parseCreatedAt(left.createdAt),
  );
}

function sortByPriceAsc(properties: SearchProperty[]) {
  return [...properties].sort((left, right) => {
    const priceDifference =
      parsePriceAmount(left.priceAmount) - parsePriceAmount(right.priceAmount);

    if (priceDifference !== 0) {
      return priceDifference;
    }

    return parseCreatedAt(right.createdAt) - parseCreatedAt(left.createdAt);
  });
}

function mapBadgeTone(
  tone: SearchProperty["badgeTone"],
): PropertyShowcaseEyebrowTone {
  if (tone === "WARM") {
    return "warm";
  }

  if (tone === "COOL") {
    return "cool";
  }

  return "neutral";
}

function resolveEyebrow(
  property: SearchProperty,
  section: ShowcaseSectionKind,
  index: number,
): PropertyShowcaseListing["eyebrow"] {
  const backendLabel = property.badgeLabel?.trim();

  if (backendLabel) {
    return {
      label: backendLabel,
      tone: mapBadgeTone(property.badgeTone),
    };
  }

  const priceAmount = parsePriceAmount(property.priceAmount);

  switch (section) {
    case "featured_residential":
      return {
        label: property.isFeatured ? "Featured" : "New Arrival",
        tone: property.isFeatured ? "warm" : "neutral",
      };
    case "featured_land":
      return {
        label: property.isFeatured ? "Featured" : "Prime Plot",
        tone: property.isFeatured ? "cool" : "neutral",
      };
    case "value_home":
      if (priceAmount < 20_000_000) {
        return { label: "Under 2 Cr", tone: "warm" };
      }

      if (priceAmount < 35_000_000) {
        return { label: "Value Pick", tone: "warm" };
      }

      return { label: "Smart Buy", tone: "neutral" };
    case "value_land":
      if (priceAmount < 30_000_000) {
        return { label: "Land Value", tone: "cool" };
      }

      return { label: "Plot Pick", tone: "neutral" };
    case "apartment":
      return {
        label: property.isFeatured ? "Featured" : "New Arrival",
        tone: property.isFeatured ? "cool" : "neutral",
      };
    case "similar":
      return {
        label: index === 0 ? "Just Listed" : "Recommended",
        tone: "neutral",
      };
  }
}

function resolvePropertyImages(property: SearchProperty) {
  const sortedImages = [...(property.images || [])].sort((left, right) => {
    if (left.isPrimary === right.isPrimary) {
      return 0;
    }
    return left.isPrimary ? -1 : 1;
  });
  const resolvedImages = sortedImages
    .map((image) => resolveApiAssetUrl(image.url))
    .filter((url) => url.length > 0);
  const uniqueImages = Array.from(new Set(resolvedImages));
  const primaryImage = uniqueImages[0] ?? "";
  const primaryAlt =
    sortedImages.find((image) => image.isPrimary)?.altText ??
    sortedImages[0]?.altText ??
    `${property.title} preview`;

  return {
    image: primaryImage,
    imageAlt: primaryAlt,
    images: uniqueImages,
  };
}

function showcaseStats(property: SearchProperty): PropertyShowcaseListing["stats"] {
  return getPropertyStats(property) as PropertyShowcaseListing["stats"];
}

function toShowcaseListing(
  property: SearchProperty,
  section: ShowcaseSectionKind,
  index: number,
): PropertyShowcaseListing {
  const images = resolvePropertyImages(property);
  const hrefBase = propertyHrefByType[property.propertyType];

  return {
    id: property.id,
    title: property.title,
    slug: property.slug,
    href: `${hrefBase}/${property.slug}`,
    location: property.locationText,
    price: formatNprPrice(property.priceAmount),
    image: images.image,
    imageAlt: images.imageAlt,
    images: images.images,
    offset: index % 2 === 1,
    eyebrow: resolveEyebrow(property, section, index),
    stats: showcaseStats(property),
  };
}

function selectUniqueProperties(
  primarySource: SearchProperty[],
  fallbackSource: SearchProperty[],
  count: number,
  reservedIds: Set<string>,
) {
  const picked: SearchProperty[] = [];
  const localIds = new Set<string>();

  for (const source of [primarySource, fallbackSource]) {
    for (const property of source) {
      if (picked.length >= count) {
        break;
      }

      if (reservedIds.has(property.id) || localIds.has(property.id)) {
        continue;
      }

      picked.push(property);
      localIds.add(property.id);
      reservedIds.add(property.id);
    }

    if (picked.length >= count) {
      break;
    }
  }

  return picked;
}

function mapSectionListings(
  properties: SearchProperty[],
  section: ShowcaseSectionKind,
) {
  return properties.map((property, index) =>
    toShowcaseListing(property, section, index),
  );
}

export const getHomePropertyShowcaseData = cache(
  async (): Promise<HomePropertyShowcaseData> => {
    const [houses, apartments, lands] = await Promise.all([
      getAllCachedPropertiesForType("HOUSE"),
      getAllCachedPropertiesForType("APARTMENT"),
      getAllCachedPropertiesForType("LAND"),
    ]);

    const sortedHouses = sortByCreatedDesc(houses);
    const sortedApartments = sortByCreatedDesc(apartments);
    const landProperties = sortByCreatedDesc(lands);
    const featuredHouses = sortedHouses.filter(
      (property) => property.isFeatured,
    );
    const featuredApartments = sortedApartments.filter(
      (property) => property.isFeatured,
    );
    const featuredLands = landProperties.filter((property) => property.isFeatured);
    const cheapestHouses = sortByPriceAsc(sortedHouses);
    const cheapestLands = sortByPriceAsc(landProperties);
    const residentialProperties = sortByCreatedDesc(
      dedupeProperties([...houses, ...apartments]),
    );
    const cheapestResidential = sortByPriceAsc(residentialProperties);
    const reservedIds = new Set<string>();

    const featuredListings = selectUniqueProperties(
      featuredHouses,
      sortedHouses,
      FEATURED_LISTING_COUNT,
      reservedIds,
    );
    const featuredLandListings = selectUniqueProperties(
      featuredLands,
      landProperties,
      FEATURED_LAND_COUNT,
      reservedIds,
    );
    const apartmentListings = selectUniqueProperties(
      featuredApartments,
      sortedApartments,
      APARTMENT_LISTING_COUNT,
      reservedIds,
    );
    const residentialPlotListings = selectUniqueProperties(
      cheapestLands,
      landProperties,
      VALUE_LAND_COUNT,
      reservedIds,
    );
    const valueHomeListings = selectUniqueProperties(
      cheapestHouses,
      sortedHouses,
      VALUE_HOME_COUNT,
      reservedIds,
    );
    const similarListings = selectUniqueProperties(
      residentialProperties,
      cheapestResidential,
      SIMILAR_LISTING_COUNT,
      reservedIds,
    );

    return {
      featuredListings: mapSectionListings(
        featuredListings,
        "featured_residential",
      ),
      featuredLandListings: mapSectionListings(
        featuredLandListings,
        "featured_land",
      ),
      apartmentListings: mapSectionListings(
        apartmentListings,
        "apartment",
      ),
      similarListings: mapSectionListings(similarListings, "similar"),
      residentialPlotListings: mapSectionListings(
        residentialPlotListings,
        "value_land",
      ),
      valueHomeListings: mapSectionListings(valueHomeListings, "value_home"),
    };
  },
);
