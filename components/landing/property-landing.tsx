import { Icons } from "@/components/ui/icons";
import Image from "next/image";
import Link from "next/link";
import type { ElementType } from "react";
import SectionHeading from "../shared/sectionHeading";
import type { LandingCategory, LandingCategoryKey } from "@/lib/api";
import type { LandingCityCard } from "@/lib/landing-server-cache";

const CATEGORY_TO_ROUTE: Record<string, string> = {
  residential: "/houses",
  commercial: "/apartments",
  "semi-commercial": "/apartments",
  villa: "/houses",
  apartments: "/apartments",
  "land-plot": "/lands",
};

type FallbackCategory = LandingCategory;

const fallbackCategories: FallbackCategory[] = [
  { key: "residential", label: "Residential", count: 0 },
  { key: "commercial", label: "Commercial", count: 0 },
  { key: "semi-commercial", label: "Semi-Commercial", count: 0 },
  { key: "villa", label: "Villa", count: 0 },
  { key: "apartments", label: "Apartments", count: 0 },
  { key: "land-plot", label: "Land Plot", count: 0 },
];

const fallbackCities: LandingCityCard[] = [
  {
    city: "Kavrepalanchok",
    count: 15,
    imageUrl:
      "https://images.unsplash.com/photo-1599387113175-9c84918f6233?auto=format&fit=crop&w=600&q=80",
    dominantPropertyType: "LAND",
  },
  {
    city: "Lalitpur",
    count: 90,
    imageUrl:
      "https://images.unsplash.com/photo-1629813959196-8ac01f11cb20?auto=format&fit=crop&w=600&q=80",
    dominantPropertyType: "HOUSE",
  },
  {
    city: "Kathmandu",
    count: 160,
    imageUrl:
      "https://images.unsplash.com/photo-1598263156828-9842c36a4491?auto=format&fit=crop&w=600&q=80",
    dominantPropertyType: "HOUSE",
  },
  {
    city: "Budhanilkantha",
    count: 50,
    imageUrl:
      "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=600&q=80",
    dominantPropertyType: "HOUSE",
  },
  {
    city: "Madhyapur Thimi",
    count: 35,
    imageUrl:
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=600&q=80",
    dominantPropertyType: "HOUSE",
  },
  {
    city: "Bhaktapur",
    count: 65,
    imageUrl:
      "https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&w=600&q=80",
    dominantPropertyType: "HOUSE",
  },
];

const categoryIconMap: Record<LandingCategoryKey, ElementType> = {
  residential: Icons.home,
  commercial: Icons.briefcase,
  "semi-commercial": Icons.store,
  villa: Icons.home,
  apartments: Icons.building,
  "land-plot": Icons.map,
};

function formatListingCount(count: number) {
  return `${count} ${count === 1 ? "listing" : "listings"}`;
}

function CustomRequirementCTA() {
  return (
    <section className="bg-surface-container-lowest px-6 pb-12 pt-8 lg:px-12">
      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 overflow-hidden rounded-[20px] bg-gradient-to-r from-primary via-primary to-secondary p-8 text-white shadow-lg lg:flex-row lg:p-12">
        <div className="absolute left-0 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/3 translate-y-1/3 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute left-1/4 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full border-4 border-white/5" />

        <div className="relative z-10 w-full flex-1 text-center lg:text-left">
          <div className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-surface-container-lowest px-3 py-1 text-xs font-bold text-on-surface shadow-sm">
            <Icons.checkSquare size={14} className="text-tertiary" />
            <span>Custom Search</span>
          </div>

          <h2 className="mb-3 text-3xl font-bold tracking-tight lg:text-4xl">
            Have a Custom Requirement?
          </h2>
          <p className="mx-auto max-w-xl text-sm font-medium text-white/90 lg:mx-0 lg:text-base">
            If you are looking for a specific property and having difficulty
            finding it, our experts are here to help. Your perfect space awaits.
          </p>
        </div>

        <div className="relative z-10 flex w-full shrink-0 flex-col items-center gap-4 lg:w-auto lg:items-end">
          <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-surface-container-lowest px-6 py-3 text-sm font-bold text-primary shadow-sm transition-colors hover:bg-primary-container sm:w-auto">
              Send us your Requirement
              <Icons.arrowRight size={16} />
            </button>
            <button className="flex w-full items-center justify-center rounded-lg border border-white/50 bg-transparent px-6 py-3 text-sm font-bold text-white transition-all hover:border-white hover:bg-white/10 sm:w-auto">
              Talk to an Expert
            </button>
          </div>

          <div className="mt-2 flex items-center gap-3">
            <div className="flex -space-x-3">
              <Image
                className="h-8 w-8 rounded-full border-2 border-brand-accent-400 object-cover"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                alt="Customer"
                width={32}
                height={32}
              />
              <Image
                className="h-8 w-8 rounded-full border-2 border-brand-accent-400 object-cover"
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80"
                alt="Customer"
                width={32}
                height={32}
              />
              <Image
                className="h-8 w-8 rounded-full border-2 border-brand-accent-400 object-cover"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
                alt="Customer"
                width={32}
                height={32}
              />
              <Image
                className="h-8 w-8 rounded-full border-2 border-brand-accent-400 object-cover"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                alt="Customer"
                width={32}
                height={32}
              />
            </div>
            <span className="text-xs font-medium text-white/90">
              5.0/5 (1,200+ matched)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedCategories({
  categories,
}: {
  categories: LandingCategory[];
}) {
  return (
    <section className="bg-surface-container-lowest px-6 pb-20 pt-10 lg:px-12">
      <div className="mx-auto mb-12 max-w-7xl text-center">
        <SectionHeading title="Featured Categories" align="center" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => {
          const Icon = categoryIconMap[category.key];
          const route = CATEGORY_TO_ROUTE[category.key] || "/houses";

          return (
            <Link
              key={category.key}
              href={route}
              className="group flex h-40 flex-col items-center justify-center rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 text-center shadow-sm transition-all duration-300 hover:border-primary hover:shadow-md"
            >
              <div className="mb-4 text-primary transition-transform duration-300 group-hover:scale-110">
                <Icon size={36} strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-semibold text-on-surface transition-colors group-hover:text-primary">
                {category.label}
              </h3>
              {category.count > 0 ? (
                <p className="mt-1 text-[11px] font-medium text-on-surface-variant">
                  {formatListingCount(category.count)}
                </p>
              ) : null}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function CityGrid({
  cities,
}: {
  cities: LandingCityCard[];
}) {
  return (
    <section className="bg-surface-container-lowest px-6 pb-24 lg:px-12">
      <div className="mx-auto mb-12 max-w-7xl text-center">
        <SectionHeading
          title="Find Properties in These Cities"
          description="Explore the finest properties across some of the most sought-after cities"
          align="center"
        />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {cities.map((cityData) => (
          <Link
            key={cityData.city}
            href={`/houses?city=${encodeURIComponent(cityData.city)}`}
            className="group relative h-48 w-full overflow-hidden rounded-2xl bg-surface-container-high shadow-sm transition-shadow duration-300 hover:shadow-lg"
          >
            <Image
              src={cityData.imageUrl}
              alt={`${cityData.city} Property View`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 16vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 p-4 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <h3 className="translate-y-4 text-lg font-bold text-white transition-transform duration-500 ease-out group-hover:translate-y-0">
                {cityData.city}
              </h3>
              <span className="mt-1 translate-y-4 text-sm font-medium text-brand-accent-200 transition-transform delay-75 duration-500 ease-out group-hover:translate-y-0">
                {cityData.count} Properties
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function PropertyLanding({
  categories,
  cities,
}: {
  categories?: LandingCategory[];
  cities?: LandingCityCard[];
}) {
  const categoriesToRender =
    categories && categories.length > 0 ? categories : fallbackCategories;
  const citiesToRender = cities && cities.length > 0 ? cities : fallbackCities;

  return (
    <main className="min-h-screen bg-background font-sans text-on-surface antialiased">
      <CustomRequirementCTA />
      <FeaturedCategories categories={categoriesToRender} />
      <CityGrid cities={citiesToRender} />
    </main>
  );
}
