import type { Metadata } from "next";
import PropertyBrowserRoute from "@/components/shared/property-browser-route";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Apartments for Sale in Nepal | YetiHomes",
  description:
    "Discover modern apartments for sale in Nepal. YetiHomes features curated apartments in Kathmandu, Pokhara, and beyond.",
};

export default function ApartmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string; minPrice?: string; maxPrice?: string }>;
}) {
  return <PropertyBrowserRoute propertyType="apartment" searchParams={searchParams} />;
}
