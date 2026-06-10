import type { Metadata } from "next";
import PropertyDetailRoute from "@/components/shared/property-detail-route";
import { generatePropertyMetadata } from "@/lib/property-metadata";

export const revalidate = 600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return generatePropertyMetadata(slug, "houses");
}

export default async function HousePropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PropertyDetailRoute slug={slug} />;
}
