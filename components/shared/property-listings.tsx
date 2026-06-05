"use client";

import { Icons } from "@/components/ui/icons";
import { Loader } from "@/components/ui/loader";

import React, { useMemo } from "react";
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
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

type CardMetaItem = {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  iconClass?: string;
  value: string;
};

function getCardMeta(property: SearchProperty): CardMetaItem[] {
  const meta: CardMetaItem[] = [];

  // 1. Area / size is always the anchor (top-level on the property,
  //    so it shows even when *Details payloads are null/missing).
  if (property.areaValue && property.areaUnit) {
    meta.push({
      icon: Icons.maximize,
      iconClass: "text-secondary",
      value: `${property.areaValue} ${property.areaUnit.replace("_", " ")}`,
    });
  }

  // 2. Type-specific details: floors, facing, road size (or
  //    best available alternatives if a field is missing).
  if (property.propertyType === "HOUSE") {
    if (property.houseDetails?.floors) {
      meta.push({
        icon: Icons.layers,
        iconClass: "text-primary",
        value: `${property.houseDetails.floors} Floor${property.houseDetails.floors > 1 ? "s" : ""}`,
      });
    } else if (property.houseDetails?.bedrooms) {
      meta.push({
        icon: Icons.bedDouble,
        iconClass: "text-primary",
        value: `${property.houseDetails.bedrooms} Bed${property.houseDetails.bedrooms > 1 ? "s" : ""}`,
      });
    }

    if (property.houseDetails?.facingDirection) {
      meta.push({
        icon: Icons.compass,
        iconClass: "text-primary",
        value: property.houseDetails.facingDirection.replace("_", " "),
      });
    } else if (property.houseDetails?.furnishingStatus) {
      meta.push({
        icon: Icons.armchair,
        iconClass: "text-secondary",
        value: property.houseDetails.furnishingStatus.replace("_", " "),
      });
    }

    if (property.houseDetails?.roadSize) {
      meta.push({
        icon: Icons.road_access,
        iconClass: "text-secondary",
        value: `${property.houseDetails.roadSize}ft Road`,
      });
    } else if (property.houseDetails?.roadType) {
      meta.push({
        icon: Icons.road_access,
        iconClass: "text-secondary",
        value: property.houseDetails.roadType.replace("_", " "),
      });
    } else if (property.houseDetails?.bathrooms) {
      meta.push({
        icon: Icons.bathroom,
        iconClass: "text-tertiary",
        value: `${property.houseDetails.bathrooms} Bath${property.houseDetails.bathrooms > 1 ? "s" : ""}`,
      });
    }
  } else if (property.propertyType === "APARTMENT") {
    if (property.apartmentDetails?.floorNumber) {
      meta.push({
        icon: Icons.layers,
        iconClass: "text-primary",
        value: `Floor ${property.apartmentDetails.floorNumber}`,
      });
    } else if (property.apartmentDetails?.bedrooms) {
      meta.push({
        icon: Icons.bedDouble,
        iconClass: "text-primary",
        value: `${property.apartmentDetails.bedrooms} Bed${property.apartmentDetails.bedrooms > 1 ? "s" : ""}`,
      });
    }

    if (property.apartmentDetails?.facingDirection) {
      meta.push({
        icon: Icons.compass,
        iconClass: "text-primary",
        value: property.apartmentDetails.facingDirection.replace("_", " "),
      });
    } else if (property.apartmentDetails?.furnishingStatus) {
      meta.push({
        icon: Icons.armchair,
        iconClass: "text-secondary",
        value: property.apartmentDetails.furnishingStatus.replace("_", " "),
      });
    }

    if (property.apartmentDetails?.roadSize) {
      meta.push({
        icon: Icons.road_access,
        iconClass: "text-secondary",
        value: `${property.apartmentDetails.roadSize}ft Road`,
      });
    } else if (property.apartmentDetails?.roadType) {
      meta.push({
        icon: Icons.road_access,
        iconClass: "text-secondary",
        value: property.apartmentDetails.roadType.replace("_", " "),
      });
    } else if (property.apartmentDetails?.bathrooms) {
      meta.push({
        icon: Icons.bathroom,
        iconClass: "text-tertiary",
        value: `${property.apartmentDetails.bathrooms} Bath${property.apartmentDetails.bathrooms > 1 ? "s" : ""}`,
      });
    }
  } else if (property.propertyType === "LAND") {
    if (property.landDetails?.roadAccessFeet) {
      meta.push({
        icon: Icons.navigation,
        iconClass: "text-primary",
        value: `${property.landDetails.roadAccessFeet}ft Road`,
      });
    } else if (property.landDetails?.frontageFeet) {
      meta.push({
        icon: Icons.total_area,
        iconClass: "text-primary",
        value: `${property.landDetails.frontageFeet}ft Frontage`,
      });
    }

    if (property.landDetails?.facingDirection) {
      meta.push({
        icon: Icons.compass,
        iconClass: "text-primary",
        value: property.landDetails.facingDirection.replace("_", " "),
      });
    }

    if (property.landDetails?.isCornerPlot) {
      meta.push({
        icon: Icons.maximize,
        iconClass: "text-tertiary",
        value: "Corner Plot",
      });
    } else if (property.landDetails?.plotShape) {
      meta.push({
        icon: Icons.layoutGrid,
        iconClass: "text-secondary",
        value: property.landDetails.plotShape,
      });
    }
  }

  // Cap at 4 details for visual consistency across types.
  return meta.slice(0, 4);
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

function PropertyFooterStat({ property }: { property: SearchProperty }) {
  if (property.propertyType === "LAND") {
    return (
      <div className="flex items-center gap-1.5 bg-surface-container-low px-2 py-1 rounded-md border border-outline-variant">
        <Icons.maximize size={14} className="text-secondary" />
        <span className="text-sm font-bold text-on-surface">
          {property.areaValue ?? "—"}
        </span>
        {property.areaValue && (
          <span className="text-xs font-medium text-outline">
            {property.areaUnit?.replace("_", " ") ?? ""}
          </span>
        )}
      </div>
    );
  }

  return null;
}

const PropertyFooterStatMemo = React.memo(PropertyFooterStat);

type ListingCardData = {
  imageUrl: string;
  cardMeta: CardMetaItem[];
  typeLabel: string;
  typeColor: string;
  pricePeriod: string;
};

const ListingCard = React.memo(function ListingCard({
  property,
  cardData,
  isSelected,
  onSelect,
}: {
  property: SearchProperty;
  cardData: ListingCardData;
  isSelected: boolean;
  onSelect?: (property: SearchProperty) => void;
}) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      onClick={() => onSelect?.(property)}
      className={`group flex cursor-pointer flex-col overflow-hidden rounded-2xl border-2 bg-surface-container-lowest shadow-sm transition-all duration-300 hover:shadow-xl ${
        isSelected
          ? "border-primary shadow-md shadow-primary/20"
          : "border-outline-variant/60"
      }`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container-high">
        <Image
          src={cardData.imageUrl}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute left-4 top-4 rounded-lg border border-outline-variant/50 bg-surface-container-lowest/95 px-3 py-1.5 shadow-sm backdrop-blur-sm">
          <span
            className={`text-sm font-bold tracking-wide capitalize ${cardData.typeColor}`}
          >
            {cardData.typeLabel}
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
            {property.propertyCode && (
              <span className="inline-block px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-primary/10 text-primary rounded-md mb-1">
                {property.propertyCode}
              </span>
            )}
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

        {cardData.cardMeta.length > 0 ? (
          <div className="mb-4 flex flex-wrap items-center gap-3 border-b border-outline-variant/40 pb-4">
            {cardData.cardMeta.map((item, index) => (
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
            cardData.cardMeta.length > 0
              ? ""
              : "border-t border-outline-variant/40"
          }`}
        >
          <div className="flex items-baseline gap-1">
            <span className="font-headline text-lg font-semibold text-on-surface">
              {formatNprPrice(property.priceAmount)}
            </span>
            <span className="text-sm font-medium text-on-surface-variant">
              {cardData.pricePeriod}
            </span>
          </div>

          <PropertyFooterStatMemo property={property} />
        </div>
      </div>
    </motion.div>
  );
});

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

function getPageNumbers(currentPage: number, totalPages: number): (number | "...")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [1];

  if (currentPage > 3) {
    pages.push("...");
  }

  const rangeStart = Math.max(2, currentPage - 1);
  const rangeEnd = Math.min(totalPages - 1, currentPage + 1);

  for (let i = rangeStart; i <= rangeEnd; i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - 2) {
    pages.push("...");
  }

  pages.push(totalPages);

  return pages;
}

function PaginationControls({
  currentPage,
  totalPages,
  totalResults,
  pageSize,
  isLoadingMore,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  pageSize: number;
  isLoadingMore: boolean;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div className="mt-8 flex flex-col items-center gap-4">
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1 || isLoadingMore}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-outline-variant bg-surface-container-lowest text-on-surface transition-colors hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-outline-variant disabled:hover:text-on-surface"
        >
          <Icons.chevronLeft size={18} />
        </button>

        {pageNumbers.map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="inline-flex h-9 w-9 items-center justify-center text-sm font-medium text-outline"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              disabled={isLoadingMore}
              className={`inline-flex h-9 min-w-[2.25rem] items-center justify-center rounded-full px-2 text-sm font-semibold transition-all disabled:cursor-not-allowed ${
                page === currentPage
                  ? "bg-primary text-on-primary shadow-sm shadow-primary/20"
                  : "border border-outline-variant bg-surface-container-lowest text-on-surface hover:border-primary hover:text-primary"
              }`}
            >
              {page}
            </button>
          ),
        )}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages || isLoadingMore}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-outline-variant bg-surface-container-lowest text-on-surface transition-colors hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-outline-variant disabled:hover:text-on-surface"
        >
          <Icons.chevronRight size={18} />
        </button>
      </div>

      <p className="text-xs font-medium text-on-surface-variant">
        Page {currentPage} of {totalPages} ({totalResults.toLocaleString()} results)
      </p>
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
  currentPage: controlledPage,
  totalPages: controlledTotalPages,
  pageSize: controlledPageSize,
  onPropertySelect,
  selectedPropertyId,
  onLoadMore,
  onSortChange,
  onPageChange,
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
  currentPage?: number;
  totalPages?: number;
  pageSize?: number;
  onPropertySelect?: (property: SearchProperty) => void;
  selectedPropertyId?: string;
  onLoadMore?: () => void;
  onSortChange?: (sort: SearchFilters["sortBy"]) => void;
  onPageChange?: (page: number) => void;
}) {
  const collectionLabel = propertyCollectionLabels[propertyType];
  const PAGE_SIZE = controlledPageSize ?? 20;
  const currentPage = controlledPage ?? 1;
  const totalPages = controlledTotalPages ?? Math.ceil(total / PAGE_SIZE);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const displayedProperties = useMemo(
    () => properties.slice(startIndex, startIndex + PAGE_SIZE),
    [properties, startIndex, PAGE_SIZE],
  );

  const usePagination = onPageChange !== undefined && totalPages > 0;

  const items = usePagination ? displayedProperties : properties;

  const cardDataMap = useMemo(() => {
    const map = new Map<string, ListingCardData>();
    for (const property of items) {
      map.set(property.id, {
        imageUrl: getPrimaryImageUrl(property.images),
        cardMeta: getCardMeta(property),
        typeLabel: getTypeLabel(property),
        typeColor: getTypeColor(property),
        pricePeriod: getPricePeriod(property),
      });
    }
    return map;
  }, [items]);

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
              <Loader size={14} />
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
            {items.map((property) => {
              const cardData = cardDataMap.get(property.id)!;
              return (
                <ListingCard
                  key={property.id}
                  property={property}
                  cardData={cardData}
                  isSelected={selectedPropertyId === property.id}
                  onSelect={onPropertySelect}
                />
              );
            })}
          </motion.div>

          {usePagination ? (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              totalResults={total}
              pageSize={PAGE_SIZE}
              isLoadingMore={isLoadingMore}
              onPageChange={onPageChange!}
            />
          ) : hasMore ? (
            <div className="mt-8 flex justify-center">
              <button
                onClick={onLoadMore}
                disabled={isLoadingMore}
                className="inline-flex items-center gap-2 rounded-full border-2 border-outline-variant bg-surface-container-lowest px-8 py-3 font-headline text-sm font-semibold tracking-wide text-on-surface transition-all hover:border-primary hover:text-primary hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoadingMore ? (
                  <>
                    <Loader size={16} />
                    Loading...
                  </>
                ) : (
                  `Load More (${properties.length} of ${total})`
                )}
              </button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
