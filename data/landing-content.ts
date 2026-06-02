export type ListingStatKind = "bed" | "bath" | "area";

export type Listing = {
  title: string;
  slug: string;
  location: string;
  price: string;
  image: string;
  imageAlt: string;
  eyebrow?: {
    label: string;
    tone: "neutral" | "warm";
  };
  offset?: boolean;
  stats: Array<{
    kind: ListingStatKind;
    value: string;
    label: string;
  }>;
};

export const brandName = "YETI HOMES";

export const navigationItems = [
  { label: "Collections", href: "#collections", active: true },
  { label: "Exclusives", href: "#collections" },
  { label: "Neighborhoods", href: "#digest" },
  { label: "Insights", href: "#insights" },
];

export const heroContent = {
  eyebrow: "Editorial Real Estate",
  title: "Curation Over Quantity.",
  description:
    "A refined collection of architecturally significant homes, private opportunities, and neighborhood intelligence for buyers who care about design.",
  image: "/hero.jpg",
  imageAlt:
    "Ultra-modern architectural villa with glass walls and clean concrete lines set against a soft dusk sky with warm interior lighting",
};

export const priceRanges = ["2Cr - 3Cr", "3Cr - 5Cr", "5Cr - 8Cr", "8Cr - 15Cr", "18 Crore +"];

export const propertyTypes = ["Houses & Villas", "Apartments", "Commercial Lands", "Residential Lands"];

export const newsletterContent = {
  eyebrow: "The Weekly Digest",
  title: "Architecture, Insights, & Off-Market Secrets.",
  description:
    "Join 12,000+ enthusiasts who receive our weekly curated selection of the world's most significant properties.",
  image: "/home.jpg",
  imageAlt:
    "Minimalist modern office space with large windows and neutral tones representing luxury real estate services",
};

export const footerLinks = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms of Service", href: "/legal/terms-conditions" },
  { label: "Cookie Settings", href: "/legal/cookies" },
  { label: "Contact", href: "/contact" },
];
