import type { SearchFilters } from "@/lib/api";
import type { PropertyType } from "@/data/property-catalog";

export type PropertySearchFilters = Omit<SearchFilters, "cursor">;
export type ApiPropertyType = NonNullable<SearchFilters["propertyType"]>;

export const propertyTypeToApiPropertyType: Record<PropertyType, ApiPropertyType> =
  {
    house: "HOUSE",
    land: "LAND",
    apartment: "APARTMENT",
  };

export function normalizeSearchFilters(
  filters: PropertySearchFilters,
): PropertySearchFilters {
  return Object.fromEntries(
    Object.entries(filters)
      .filter(([, value]) => value !== undefined && value !== null && value !== "")
      .sort(([left], [right]) => left.localeCompare(right)),
  ) as PropertySearchFilters;
}

export function serializeSearchFilters(filters: PropertySearchFilters) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(normalizeSearchFilters(filters))) {
    params.set(key, String(value));
  }

  return params.toString();
}

export function buildPropertySearchCacheKey(filters: PropertySearchFilters) {
  const serialized = serializeSearchFilters(filters);

  return serialized || "default";
}
