import type { Metadata } from "next";
import PropertyBrowserRoute from "@/components/shared/property-browser-route";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Land for Sale in Nepal | YetiHomes",
  description:
    "Explore prime land plots for sale across Nepal. Residential, commercial, and investment land opportunities curated by YetiHomes.",
};

export default function LandsPage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string; minPrice?: string; maxPrice?: string }>;
}) {
  return <PropertyBrowserRoute propertyType="land" searchParams={searchParams} />;
}
