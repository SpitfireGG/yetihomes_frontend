import PropertyBrowserRoute from "@/components/shared/property-browser-route";

export const revalidate = 300;

export default function HousesPage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string; minPrice?: string; maxPrice?: string }>;
}) {
  return <PropertyBrowserRoute propertyType="house" searchParams={searchParams} />;
}
