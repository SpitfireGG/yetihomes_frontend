import type { Metadata } from "next";
import PropertyBrowserRoute from "@/components/shared/property-browser-route";

export const revalidate = 300;

const INTENT_TITLES: Record<string, string> = {
  buy: "Apartments for Sale",
  rent: "Apartments for Rent",
};

const INTENT_DESCRIPTIONS: Record<string, string> = {
  buy: "Discover modern apartments for sale in Nepal. Yeti Homes Estate features curated apartments in Kathmandu, Pokhara, and beyond.",
  rent: "Find apartments for rent in Nepal. Yeti Homes Estate features curated rental apartments in Kathmandu, Pokhara, and beyond.",
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const intent =
    typeof params.intent === "string" ? params.intent.toLowerCase() : "";
  const title = INTENT_TITLES[intent] ?? "Apartments";
  const description =
    INTENT_DESCRIPTIONS[intent] ??
    "Discover modern apartments for sale in Nepal. Yeti Homes Estate features curated apartments in Kathmandu, Pokhara, and beyond.";

  return {
    title: `${title} in Nepal | Yeti Homes Estate`,
    description,
  };
}

export default function ApartmentsPage({
  searchParams,
}: {
  searchParams: Promise<{
    city?: string;
    minPrice?: string;
    maxPrice?: string;
    intent?: string;
    type?: string;
  }>;
}) {
  return <PropertyBrowserRoute propertyType="apartment" searchParams={searchParams} />;
}
