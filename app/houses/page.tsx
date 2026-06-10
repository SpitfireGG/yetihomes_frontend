import type { Metadata } from "next";
import PropertyBrowserRoute from "@/components/shared/property-browser-route";

const INTENT_TITLES: Record<string, string> = {
  buy: "Houses for Sale",
  rent: "Houses for Rent",
};

const INTENT_DESCRIPTIONS: Record<string, string> = {
  buy: "Browse curated houses and villas across Nepal. Find your dream home to buy with Yeti Homes Estate — editorial real estate for discerning buyers.",
  rent: "Find houses for rent across Nepal. Browse curated rental homes with Yeti Homes Estate — editorial real estate for discerning tenants.",
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const intent =
    typeof params.intent === "string" ? params.intent.toLowerCase() : "";
  const title = INTENT_TITLES[intent] ?? "Houses";
  const description =
    INTENT_DESCRIPTIONS[intent] ??
    "Browse curated houses and villas across Nepal. Find your dream home with Yeti Homes Estate — editorial real estate for discerning buyers.";

  return {
    title: `${title} in Nepal | Yeti Homes Estate`,
    description,
    alternates: { canonical: `https://www.yetihomesestate.com.np/houses` },
    openGraph: {
      title: `${title} in Nepal | Yeti Homes Estate`,
      description,
      url: `https://www.yetihomesestate.com.np/houses`,
      siteName: "Yeti Homes Estate",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} in Nepal | Yeti Homes Estate`,
      description,
    },
  };
}

export default function HousesPage({
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
  return <PropertyBrowserRoute propertyType="house" searchParams={searchParams} />;
}
