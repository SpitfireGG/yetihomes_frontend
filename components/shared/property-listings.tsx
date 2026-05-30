"use client";

import { Icons } from "@/components/ui/icons";

import React from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import type { SearchProperty, SearchFilters } from "@/lib/api";
import { formatNprPrice, getPrimaryImageUrl } from "@/lib/api";
import {
  propertyCollectionLabels,
  type PropertyType,
} from "@/data/property-catalog";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

function PropertyFooterStat({ property }: { property: SearchProperty }) {
  if (property.propertyType === "LAND") {
    return (
      <div className="flex items-center gap-1.5 bg-surface-container-low px-2 py-1 rounded-md border border-outline-variant">
        <Icons.maximize size={14} className="text-secondary" />
        <span className="text-sm font-bold text-on-surface">
          {property.areaValue ?? "—"}
        </span>
        <span className="text-xs font-medium text-outline">
          {property.areaUnit?.replace("_", " ") ?? ""}
        </span>
      </div>
    );
  }

  return null;
}

type CardMetaItem = {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  iconClass?: string;
  value: string;
};

function getCardMeta(property: SearchProperty): CardMetaItem[] {
  if (property.propertyType === "HOUSE" && property.houseDetails) {
    const meta: CardMetaItem[] = [];
    if (property.houseDetails.floors)
      meta.push({ icon: Icons.layers, iconClass: "text-primary", value: `${property.houseDetails.floors} Floors` });
    if (property.areaValue && property.areaUnit)
      meta.push({ icon: Icons.maximize, iconClass: "text-secondary", value: `${property.areaValue} ${property.areaUnit.replace("_", " ")}` });
    if (property.houseDetails.bathrooms)
      meta.push({ icon: Icons.bathroom, iconClass: "text-tertiary", value: `${property.houseDetails.bathrooms} Baths` });
    return meta;
  }

  if (property.propertyType === "APARTMENT" && property.apartmentDetails) {
    const meta: CardMetaItem[] = [];
    if (property.apartmentDetails.floorNumber)
      meta.push({ icon: Icons.layers, iconClass: "text-primary", value: `Floor ${property.apartmentDetails.floorNumber}` });
    if (property.areaValue && property.areaUnit)
      meta.push({ icon: Icons.maximize, iconClass: "text-secondary", value: `${property.areaValue} ${property.areaUnit.replace("_", " ")}` });
    if (property.apartmentDetails.bathrooms)
      meta.push({ icon: Icons.bathroom, iconClass: "text-tertiary", value: `${property.apartmentDetails.bathrooms} Baths` });
    return meta;
  }

  if (property.propertyType === "LAND" && property.landDetails) {
    const meta: CardMetaItem[] = [];
    if (property.landDetails.roadAccessFeet)
      meta.push({ icon: Icons.navigation, iconClass: "text-primary", value: `${property.landDetails.roadAccessFeet} ft Road` });
    if (property.landDetails.facingDirection)
      meta.push({ icon: Icons.layers, iconClass: "text-secondary", value: property.landDetails.facingDirection.replace("_", " ") });
    if (property.landDetails.isCornerPlot) meta.push({ icon: Icons.maximize, iconClass: "text-tertiary", value: "Corner Plot" });
    return meta;
  }

  return [];
}

function getTypeLabel(property: SearchProperty): string {
  if (property.propertyType === "HOUSE" && property.houseDetails) {
    return property.houseDetails.subType.replace("_", " ");
  }
  if (property.propertyType === "APARTMENT" && property.apartmentDetails) {
    return property.apartmentDetails.subType.replace("_", " ");
  }
  if (property.propertyType === "LAND" && property.landDetails) {
    return property.landDetails.subType.replace("_", " ");
  }
  return property.propertyType;
}

function getTypeColor(property: SearchProperty): string {
  if (property.badgeTone === "WARM") return "text-secondary";
  if (property.badgeTone === "COOL") return "text-tertiary";
  return "text-primary";
}

function getPricePeriod(property: SearchProperty): string {
  if (property.pricePeriod === "MONTHLY") return "/mo";
  if (property.pricePeriod === "YEARLY") return "/yr";
  return "Total";
}

function SkeletonCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border-2 border-outline-variant/60 bg-surface-container-lowest shadow-sm animate-pulse">
      <div className="aspect-[4/3] w-full bg-surface-container-high" />
      <div className="flex flex-1 flex-col p-5 gap-3">
        <div className="h-5 w-3/4 bg-surface-container-high rounded" />
        <div className="h-3 w-1/2 bg-surface-container-high rounded" />
        <div className="h-3 w-2/3 bg-surface-container-high rounded mt-2" />
        <div className="mt-auto pt-4 border-t border-outline-variant/40 flex justify-between">
          <div className="h-5 w-1/3 bg-surface-container-high rounded" />
          <div className="h-5 w-1/4 bg-surface-container-high rounded" />
        </div>
      </div>
    </div>
  );
}

export default function PropertyListings({
  properties,
  total,
  isLoading,
  isRefreshing,
  isLoadingMore,
  hasMore,
  error,
  propertyType,
  sortBy,
  onPropertySelect,
  selectedPropertyId,
  onLoadMore,
  onSortChange,
}: {
  properties: SearchProperty[];
  total: number;
  isLoading: boolean;
  isRefreshing?: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  error: string | null;
  propertyType: PropertyType;
  sortBy?: SearchFilters["sortBy"];
  onPropertySelect?: (property: SearchProperty) => void;
  selectedPropertyId?: string;
  onLoadMore?: () => void;
  onSortChange?: (sort: SearchFilters["sortBy"]) => void;
}) {
  const collectionLabel = propertyCollectionLabels[propertyType];

  return (
    <div className="h-full flex-1 overflow-y-auto bg-surface px-4 py-5 custom-scrollbar sm:px-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-headline text-xl font-semibold tracking-tight text-on-surface">
          {isLoading
            ? `Loading ${collectionLabel}...`
            : `Showing ${total} ${collectionLabel}`}
        </h2>
        <div className="flex items-center gap-2 text-sm font-medium text-on-surface-variant">
          {isRefreshing ? (
            <>
              <Icons.loader size={14} className="animate-spin text-primary" />
              <span className="shrink-0 text-xs uppercase tracking-[0.14em] text-primary">
                Updating
              </span>
            </>
          ) : null}
          <span className="shrink-0">Sort by:</span>
          <select
            className="min-w-0 cursor-pointer border-none bg-transparent font-semibold text-on-surface outline-none focus:ring-0"
            value={sortBy ?? "newest"}
            onChange={(e) =>
              onSortChange?.(
                e.target.value as SearchFilters["sortBy"],
              )
            }
          >
            <option value="newest">Newest Arrivals</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <p className="font-semibold">Search Error</p>
          <p>{error}</p>
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : properties.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 rounded-full bg-surface-container-high p-6">
            <Icons.mapPin size={32} className="text-outline" />
          </div>
          <h3 className="mb-2 font-headline text-lg font-semibold text-on-surface">
            No properties found
          </h3>
          <p className="max-w-sm text-sm text-on-surface-variant">
            Try adjusting your filters or search criteria to find what
            you&apos;re looking for.
          </p>
        </div>
      ) : (
        <>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3"
          >
            {properties.map((property) => {
              const imageUrl = getPrimaryImageUrl(property.images);
              const cardMeta = getCardMeta(property);
              const typeLabel = getTypeLabel(property);
              const typeColor = getTypeColor(property);
              const pricePeriod = getPricePeriod(property);

              return (
                <motion.div
                  key={property.id}
                  variants={cardVariants}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  onClick={() => onPropertySelect?.(property)}
                  className={`group flex cursor-pointer flex-col overflow-hidden rounded-2xl border-2 bg-surface-container-lowest shadow-sm transition-all duration-300 hover:shadow-xl ${
                    selectedPropertyId === property.id
                      ? "border-primary shadow-md shadow-primary/20"
                      : "border-outline-variant/60"
                  }`}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container-high">
                    <Image
                      src={imageUrl}
                      alt={property.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute left-4 top-4 rounded-lg border border-outline-variant/50 bg-surface-container-lowest/95 px-3 py-1.5 shadow-sm backdrop-blur-sm">
                      <span
                        className={`text-sm font-bold tracking-wide capitalize ${typeColor}`}
                      >
                        {typeLabel}
                      </span>
                    </div>
                    {property.isFeatured && (
                      <div className="absolute right-4 top-4 rounded-lg bg-primary px-2.5 py-1 shadow-sm">
                        <span className="text-xs font-bold uppercase tracking-wider text-white">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-headline text-lg font-semibold leading-tight text-on-surface transition-colors group-hover:text-primary">
                          {property.title}
                        </h3>
                      </div>
                      <button
                        type="button"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-container text-primary transition-colors duration-200 hover:bg-primary hover:text-on-primary"
                      >
                        <Icons.bookmark size={18} strokeWidth={2.5} />
                      </button>
                    </div>

                    <div className="mb-5 flex items-center gap-1.5 text-on-surface-variant">
                      <Icons.mapPin
                        size={16}
                        strokeWidth={2.5}
                        className="text-outline"
                      />
                      <span className="text-sm font-medium truncate">
                        {property.locationText}
                      </span>
                    </div>

                    {cardMeta.length > 0 ? (
                      <div className="mb-4 flex flex-wrap items-center gap-3 border-b border-outline-variant/40 pb-4">
                        {cardMeta.map((item, index) => (
                          <div
                            key={item.value}
                            className="flex items-center gap-2"
                          >
                            {index > 0 ? (
                              <span className="h-1 w-1 rounded-full bg-outline-variant" />
                            ) : null}
                            <item.icon size={16} className={item.iconClass ?? "text-outline"} />
                            <span className="text-sm font-bold uppercase tracking-wider text-on-surface-variant">
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="mt-auto" />
                    )}

                    <div
                      className={`flex items-center justify-between pt-4 ${
                        cardMeta.length > 0
                          ? ""
                          : "border-t border-outline-variant/40"
                      }`}
                    >
                      <div className="flex items-baseline gap-1">
                        <span className="font-headline text-lg font-semibold text-on-surface">
                          {formatNprPrice(property.priceAmount)}
                        </span>
                        <span className="text-sm font-medium text-on-surface-variant">
                          {pricePeriod}
                        </span>
                      </div>

                      <PropertyFooterStat property={property} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {hasMore && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={onLoadMore}
                disabled={isLoadingMore}
                className="inline-flex items-center gap-2 rounded-full border-2 border-outline-variant bg-surface-container-lowest px-8 py-3 font-headline text-sm font-semibold tracking-wide text-on-surface transition-all hover:border-primary hover:text-primary hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoadingMore ? (
                  <>
                    <Icons.loader size={16} className="animate-spin" />
                    Loading...
                  </>
                ) : (
                  `Load More (${properties.length} of ${total})`
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
