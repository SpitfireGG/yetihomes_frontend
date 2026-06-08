import type { Metadata } from "next";
import PropertyBrowserRoute from "@/components/shared/property-browser-route";

export const revalidate = 300;

const INTENT_TITLES: Record<string, string> = {
  buy: "Land for Sale",
  rent: "Land for Rent",
};

const INTENT_DESCRIPTIONS: Record<string, string> = {
  buy: "Explore prime land plots for sale across Nepal. Residential, commercial, and investment land opportunities curated by Yeti Homes Estate.",
  rent: "Find land for rent across Nepal. Browse curated rental land plots with Yeti Homes Estate — editorial real estate for discerning tenants.",
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const intent =
    typeof params.intent === "string" ? params.intent.toLowerCase() : "";
  const title = INTENT_TITLES[intent] ?? "Land";
  const description =
    INTENT_DESCRIPTIONS[intent] ??
    "Explore prime land plots for sale across Nepal. Residential, commercial, and investment land opportunities curated by Yeti Homes Estate.";

  return {
    title: `${title} in Nepal | Yeti Homes Estate`,
    description,
  };
}

export default function LandsPage({
  searchParams,
}: {
  searchParams: Promise<{
    city?: string;
    minPrice?: string;
    maxPrice?: string;
    intent?: string;
    type?: string;
    q?: string;
    facingDirection?: string;
  }>;
}) {
  return <PropertyBrowserRoute propertyType="land" searchParams={searchParams} />;
}
