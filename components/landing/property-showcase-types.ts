export type PropertyShowcaseEyebrowTone = "neutral" | "warm" | "cool";

export type PropertyShowcaseStatKind =
  | "bed"
  | "bath"
  | "area"
  | "road"
  | "facing"
  | "parking"
  | "floor"
  | "furnishing";

export type PropertyShowcaseListing = {
  id: string;
  title: string;
  slug: string;
  href: string;
  location: string;
  price: string;
  image: string;
  imageAlt: string;
  images: string[];
  offset?: boolean;
  eyebrow?: {
    label: string;
    tone: PropertyShowcaseEyebrowTone;
  };
  stats: Array<{
    kind: PropertyShowcaseStatKind;
    value: string | number;
    label: string;
  }>;
};

export type HomePropertyShowcaseData = {
  featuredListings: PropertyShowcaseListing[];
  featuredLandListings: PropertyShowcaseListing[];
  similarListings: PropertyShowcaseListing[];
  residentialPlotListings: PropertyShowcaseListing[];
  valueHomeListings: PropertyShowcaseListing[];
};
