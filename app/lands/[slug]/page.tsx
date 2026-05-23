import PropertyDetailRoute from "@/components/shared/property-detail-route";

export const revalidate = 600;

export default async function LandPropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PropertyDetailRoute slug={slug} />;
}
