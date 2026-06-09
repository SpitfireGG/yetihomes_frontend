import type { SearchProperty } from "@/lib/api";

export type PropertyStatItem = {
  kind: string;
  value: string;
  label: string;
};

const PLACEHOLDER = "—";

export function getPropertyStats(property: SearchProperty): PropertyStatItem[] {
  const stats: PropertyStatItem[] = [];

  const isHouse = property.propertyType === "HOUSE";
  const isApartment = property.propertyType === "APARTMENT";
  const isLand = property.propertyType === "LAND";

  const details = isApartment ? property.apartmentDetails : property.houseDetails;

  const areaValue = property.areaValue;
  const areaUnit = property.areaUnit?.replace("_", " ");

  stats.push({
    kind: "area",
    value: areaValue ?? PLACEHOLDER,
    label: areaUnit ?? "Area",
  });

  if (isHouse || isApartment) {
    const beds = isHouse
      ? property.houseDetails?.bedrooms
      : property.apartmentDetails?.bedrooms;

    stats.push({
      kind: "bed",
      value: beds != null ? String(beds) : PLACEHOLDER,
      label: "Beds",
    });

    const baths = details?.bathrooms;

    stats.push({
      kind: "bath",
      value: baths != null ? String(baths) : PLACEHOLDER,
      label: "Baths",
    });

    const facing = details?.facingDirection?.replace("_", " ") || PLACEHOLDER;

    stats.push({
      kind: "facing",
      value: facing,
      label: "Facing",
    });
  } else if (isLand) {
    const land = property.landDetails;

    const roadAccess = land?.roadAccessFeet;

    if (roadAccess) {
      stats.push({
        kind: "road",
        value: roadAccess ?? PLACEHOLDER,
        label: roadAccess ? "Ft Road" : "Road",
      });
    }

    const facing = land?.facingDirection?.replace("_", " ") || PLACEHOLDER;

    stats.push({
      kind: "facing",
      value: facing,
      label: "Facing",
    });
  }

  return stats;
}
