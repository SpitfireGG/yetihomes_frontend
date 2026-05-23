import type { PropertyType } from "@/data/property-catalog";
import { propertyTypeToApiPropertyType } from "@/lib/property-cache-utils";
import { getCachedPropertySearch } from "@/lib/property-server-cache";
import PropertyBrowserPage from "@/components/shared/property-browser-page";

export default async function PropertyBrowserRoute({
  propertyType,
  searchParams,
}: {
  propertyType: PropertyType;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  let initialResponse = null;
  const resolvedSearchParams = searchParams ? await searchParams : {};

  const filters: {
    propertyType: "HOUSE" | "APARTMENT" | "LAND";
    limit: number;
    city?: string;
    minPrice?: number;
    maxPrice?: number;
  } = {
    limit: 20,
    propertyType: propertyTypeToApiPropertyType[propertyType],
  };

  if (
    resolvedSearchParams.city &&
    typeof resolvedSearchParams.city === "string"
  ) {
    filters.city = resolvedSearchParams.city;
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

  try {
    initialResponse = await getCachedPropertySearch(filters);
  } catch {}

  return (
    <PropertyBrowserPage
      propertyType={propertyType}
      initialResponse={initialResponse}
      initialFilters={filters}
    />
  );
}
