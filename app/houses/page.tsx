import type { Metadata } from "next";
import PropertyBrowserRoute from "@/components/shared/property-browser-route";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Houses for Sale in Nepal | YetiHomes",
  description:
    "Browse curated houses and villas across Nepal. Find your dream home with YetiHomes — editorial real estate for discerning buyers.",
};

export default function HousesPage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string; minPrice?: string; maxPrice?: string }>;
}) {
  return <PropertyBrowserRoute propertyType="house" searchParams={searchParams} />;
}
