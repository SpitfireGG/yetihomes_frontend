import type { PropertyType } from "@/data/property-catalog";
import { propertyTypeToApiPropertyType } from "@/lib/property-cache-utils";
import { getCachedPropertySearch } from "@/lib/property-server-cache";
import PropertyBrowserPage from "@/components/shared/property-browser-page";

const INTENT_TO_LISTING_TYPE: Record<string, "SALE" | "RENT"> = {
  buy: "SALE",
  rent: "RENT",
};

export default async function PropertyBrowserRoute({
  propertyType,
  searchParams,
}: {
  propertyType: PropertyType;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  let initialResponse = null;
  const resolvedSearchParams = searchParams ? await searchParams : {};

  const intent =
    typeof resolvedSearchParams.intent === "string"
      ? resolvedSearchParams.intent.toLowerCase()
      : undefined;
  const listingType = intent ? INTENT_TO_LISTING_TYPE[intent] : undefined;

  const filters: {
    propertyType: "HOUSE" | "APARTMENT" | "LAND";
    limit: number;
    city?: string;
    minPrice?: number;
    maxPrice?: number;
    q?: string;
    listingType?: "SALE" | "RENT";
    subType?: string;
  } = {
    limit: 20,
    propertyType: propertyTypeToApiPropertyType[propertyType],
  };

  if (listingType) {
    filters.listingType = listingType;
  }

  if (
    resolvedSearchParams.city &&
    typeof resolvedSearchParams.city === "string"
  ) {
    filters.city = resolvedSearchParams.city;
  }

  if (
    resolvedSearchParams.q &&
    typeof resolvedSearchParams.q === "string"
  ) {
    filters.q = resolvedSearchParams.q;
  }

  if (
    resolvedSearchParams.minPrice &&
    typeof resolvedSearchParams.minPrice === "string"
  ) {
    const minPrice = parseInt(resolvedSearchParams.minPrice, 10);
    if (!isNaN(minPrice)) {
      filters.minPrice = minPrice;
    }
  }

  if (
    resolvedSearchParams.maxPrice &&
    typeof resolvedSearchParams.maxPrice === "string"
  ) {
    const maxPrice = parseInt(resolvedSearchParams.maxPrice, 10);
    if (!isNaN(maxPrice)) {
      filters.maxPrice = maxPrice;
    }
  }

  if (
    resolvedSearchParams.type &&
    typeof resolvedSearchParams.type === "string"
  ) {
    filters.subType = resolvedSearchParams.type;
  }

  try {
    initialResponse = await getCachedPropertySearch(filters);
  } catch {}

  return (
    <PropertyBrowserPage
      propertyType={propertyType}
      listingType={listingType}
      initialResponse={initialResponse}
      initialFilters={filters}
    />
  );
}
