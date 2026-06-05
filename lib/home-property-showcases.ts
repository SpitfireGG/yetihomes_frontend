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

type ApiPropertyType = NonNullable<SearchFilters["propertyType"]>;
type ShowcaseSectionKind =
  | "featured_residential"
  | "featured_land"
  | "value_land"
  | "value_home"
  | "similar";

const FEATURED_LISTING_COUNT = 6;
const FEATURED_LAND_COUNT = 4;
const VALUE_LAND_COUNT = 4;
const VALUE_HOME_COUNT = 4;
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

function formatEnumLabel(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  return value
    .split("_")
    .map((part) => part.charAt(0) + part.slice(1).toLowerCase())
    .join(" ");
}

function formatNumericValue(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  const numericValue = Number.parseFloat(value);

  if (!Number.isFinite(numericValue)) {
    return value;
  }

  if (Number.isInteger(numericValue)) {
    return String(numericValue);
  }

  return String(Number(numericValue.toFixed(2)));
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

function buildResidentialStats(property: SearchProperty) {
  const stats: PropertyShowcaseListing["stats"] = [];
  const isApartment = property.propertyType === "APARTMENT";
  const details = isApartment ? property.apartmentDetails : property.houseDetails;

  const areaValue = formatNumericValue(property.areaValue);
  const areaUnit = formatEnumLabel(property.areaUnit);
  if (areaValue && areaUnit) {
    stats.push({ kind: "area", value: areaValue, label: areaUnit });
  } else if (property.listingType === "RENT") {
    stats.push({ kind: "furnishing", value: "", label: "For Rent" });
  } else {
    stats.push({ kind: "furnishing", value: "", label: "For Sale" });
  }

  if (isApartment) {
    if (property.apartmentDetails?.floorNumber != null) {
      stats.push({ kind: "floor", value: property.apartmentDetails.floorNumber, label: property.apartmentDetails.floorNumber === 1 ? "Floor" : "Floors" });
    } else if (property.apartmentDetails?.bedrooms != null) {
      stats.push({ kind: "bed", value: property.apartmentDetails.bedrooms, label: property.apartmentDetails.bedrooms === 1 ? "Bed" : "Beds" });
    } else if (details?.bathrooms != null) {
      stats.push({ kind: "bath", value: details.bathrooms, label: details.bathrooms === 1 ? "Bath" : "Baths" });
    }
  } else if (property.houseDetails?.floors != null) {
    stats.push({ kind: "floor", value: property.houseDetails.floors, label: property.houseDetails.floors === 1 ? "Floor" : "Floors" });
  } else if (property.houseDetails?.bedrooms != null) {
    stats.push({ kind: "bed", value: property.houseDetails.bedrooms, label: property.houseDetails.bedrooms === 1 ? "Bed" : "Beds" });
  } else if (details?.bathrooms != null) {
    stats.push({ kind: "bath", value: details.bathrooms, label: details.bathrooms === 1 ? "Bath" : "Baths" });
  }

  const facing = formatEnumLabel(details?.facingDirection);
  if (facing) {
    stats.push({ kind: "facing", value: facing, label: "Facing" });
  } else {
    const furnishing = formatEnumLabel(details?.furnishingStatus);
    if (furnishing) {
      stats.push({ kind: "furnishing", value: "", label: furnishing });
    } else if (property.electricity) {
      stats.push({ kind: "furnishing", value: "", label: formatEnumLabel(property.electricity) ?? "Electricity" });
    } else if (property.waterAvailability) {
      stats.push({ kind: "furnishing", value: "", label: formatEnumLabel(property.waterAvailability) ?? "Water" });
    }
  }

  const roadSize = details?.roadSize;
  if (roadSize != null) {
    stats.push({ kind: "road", value: roadSize, label: "Ft Road" });
  } else if (details?.roadType) {
    stats.push({ kind: "road", value: "", label: formatEnumLabel(details.roadType) ?? "Road" });
  } else if (isApartment ? property.apartmentDetails?.hasParking : property.houseDetails?.parkingSpaces) {
    const parkingValue = isApartment ? 1 : property.houseDetails?.parkingSpaces;
    stats.push({ kind: "parking", value: parkingValue ?? 1, label: parkingValue === 1 ? "Parking" : "Parkings" });
  } else if (details?.bathrooms != null) {
    stats.push({ kind: "bath", value: details.bathrooms, label: details.bathrooms === 1 ? "Bath" : "Baths" });
  } else if (property.titleStatus) {
    stats.push({ kind: "furnishing", value: "", label: formatEnumLabel(property.titleStatus) ?? "Titled" });
  }

  return stats.slice(0, 4);
}

function buildLandStats(property: SearchProperty) {
  const stats: PropertyShowcaseListing["stats"] = [];
  const land = property.landDetails;

  const areaValue = formatNumericValue(property.areaValue);
  const areaUnit = formatEnumLabel(property.areaUnit);
  if (areaValue && areaUnit) {
    stats.push({ kind: "area", value: areaValue, label: areaUnit });
  } else if (property.listingType === "RENT") {
    stats.push({ kind: "furnishing", value: "", label: "For Rent" });
  } else {
    stats.push({ kind: "furnishing", value: "", label: "For Sale" });
  }

  const roadAccess = formatNumericValue(land?.roadAccessFeet);
  if (roadAccess) {
    stats.push({ kind: "road", value: roadAccess, label: "Ft Road" });
  } else {
    const frontage = formatNumericValue(land?.frontageFeet);
    if (frontage) {
      stats.push({ kind: "road", value: frontage, label: "Ft Frontage" });
    } else if (property.electricity) {
      stats.push({ kind: "furnishing", value: "", label: formatEnumLabel(property.electricity) ?? "Electricity" });
    }
  }

  const facingDirection = formatEnumLabel(land?.facingDirection);
  if (facingDirection) {
    stats.push({ kind: "facing", value: facingDirection, label: "Facing" });
  } else if (land?.plotShape) {
    stats.push({ kind: "furnishing", value: "", label: formatEnumLabel(land.plotShape) ?? "Plot" });
  }

  if (land?.isCornerPlot) {
    stats.push({ kind: "parking", value: 1, label: "Corner Plot" });
  } else if (land?.plotShape) {
    stats.push({ kind: "furnishing", value: "", label: formatEnumLabel(land.plotShape) ?? "Plot" });
  } else if (land?.zoningType) {
    stats.push({ kind: "furnishing", value: "", label: formatEnumLabel(land.zoningType) ?? "Zoned" });
  } else if (property.waterAvailability) {
    stats.push({ kind: "furnishing", value: "", label: formatEnumLabel(property.waterAvailability) ?? "Water" });
  } else if (property.titleStatus) {
    stats.push({ kind: "furnishing", value: "", label: formatEnumLabel(property.titleStatus) ?? "Titled" });
  }

  return stats.slice(0, 4);
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
    stats:
      property.propertyType === "LAND"
        ? buildLandStats(property)
        : buildResidentialStats(property),
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

    const residentialProperties = sortByCreatedDesc(
      dedupeProperties([...houses, ...apartments]),
    );
    const landProperties = sortByCreatedDesc(lands);
    const featuredResidential = residentialProperties.filter(
      (property) => property.isFeatured,
    );
    const featuredLands = landProperties.filter((property) => property.isFeatured);
    const cheapestResidential = sortByPriceAsc(residentialProperties);
    const cheapestLands = sortByPriceAsc(landProperties);
    const reservedIds = new Set<string>();

    const featuredListings = selectUniqueProperties(
      featuredResidential,
      residentialProperties,
      FEATURED_LISTING_COUNT,
      reservedIds,
    );
    const featuredLandListings = selectUniqueProperties(
      featuredLands,
      landProperties,
      FEATURED_LAND_COUNT,
      reservedIds,
    );
    const residentialPlotListings = selectUniqueProperties(
      cheapestLands,
      landProperties,
      VALUE_LAND_COUNT,
      reservedIds,
    );
    const valueHomeListings = selectUniqueProperties(
      cheapestResidential,
      residentialProperties,
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
      similarListings: mapSectionListings(similarListings, "similar"),
      residentialPlotListings: mapSectionListings(
        residentialPlotListings,
        "value_land",
      ),
      valueHomeListings: mapSectionListings(valueHomeListings, "value_home"),
    };
  },
);
