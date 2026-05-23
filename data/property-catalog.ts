export type PropertyType = "house" | "land" | "apartment";

export type PropertyStatIcon =
  | "area"
  | "bedroom"
  | "bathroom"
  | "kitchen"
  | "garage"
  | "floor"
  | "parking"
  | "furnishing"
  | "road"
  | "facing"
  | "title"
  | "landUse"
  | "balcony"
  | "lift";

export type PropertyStat = {
  icon: PropertyStatIcon;
  label: string;
  value: string;
};

export const propertyTypeToApiPropertyType: Record<PropertyType, "HOUSE" | "APARTMENT" | "LAND"> = {
  house: "HOUSE",
  land: "LAND",
  apartment: "APARTMENT",
};

export const propertyRouteSegments: Record<PropertyType, string> = {
  house: "/houses",
  land: "/lands",
  apartment: "/apartments",
};

export const propertyCollectionLabels: Record<PropertyType, string> = {
  house: "Properties",
  land: "Land Plots",
  apartment: "Apartments",
};
