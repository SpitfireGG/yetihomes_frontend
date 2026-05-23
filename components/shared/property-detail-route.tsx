import { notFound } from "next/navigation";
import PropertySlugPage from "@/components/shared/property-slug-page";
import { getCachedPropertyBySlug } from "@/lib/property-server-cache";

export default async function PropertyDetailRoute({
  slug,
}: {
  slug: string;
}) {
  let initialProperty = null;

  try {
    initialProperty = await getCachedPropertyBySlug(slug);
  } catch {
    return <PropertySlugPage slug={slug} />;
  }

  if (!initialProperty) {
    notFound();
  }

  return <PropertySlugPage slug={slug} initialProperty={initialProperty} />;
}
