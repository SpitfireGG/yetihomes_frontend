"use client";

import { Icons } from "@/components/ui/icons";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PropertyDetailsPanel from "@/components/landing/property-details";
import CustomFilter from "@/components/shared/filter";
import PropertyListings from "@/components/shared/property-listings";
import { usePropertySearch } from "@/lib/use-property-search";
import {
  type SearchFilters,
  type SearchProperty,
  type SearchResponse,
} from "@/lib/api";
import type { PropertyType } from "@/data/property-catalog";
import {
  propertyTypeToApiPropertyType,
} from "@/lib/property-cache-utils";
import { clearPropertySearchCache } from "@/lib/property-client-cache";

export default function PropertyBrowserPage({
  propertyType,
  listingType,
  initialResponse,
  initialFilters,
}: {
  propertyType: PropertyType;
  listingType?: "SALE" | "RENT";
  initialResponse?: SearchResponse | null;
  initialFilters?: Record<string, unknown>;
}) {
  const apiPropertyType = propertyTypeToApiPropertyType[propertyType];

  const {
    properties,
    meta,
    isLoading,
    isRefreshing,
    isLoadingMore,
    error,
    filters,
    setFilters,
    resetFilters,
    loadMore,
    setSortBy,
  } = usePropertySearch({
    propertyType: apiPropertyType,
    initialResponse,
    initialFilters,
  });

  const PAGE_SIZE = 20;
  const totalPages = Math.ceil((meta?.total ?? 0) / PAGE_SIZE);

  const [selectedProperty, setSelectedProperty] =
    useState<SearchProperty | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  useEffect(() => {
    function onVisibilityChange() {
      if (document.visibilityState === "visible") {
        clearPropertySearchCache();
      }
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      const requiredItems = page * PAGE_SIZE;
      if (requiredItems > properties.length && (meta?.hasMore ?? false)) {
        loadMore();
      }
    },
    [properties.length, meta?.hasMore, loadMore],
  );

  const handleFilterChange = useCallback(
    (newFilters: Partial<SearchFilters>) => {
      setFilters(newFilters);
    },
    [setFilters],
  );

  return (
    <main className="relative flex h-[calc(100svh-76px)] w-full flex-col overflow-hidden bg-background font-body lg:flex-row">
      <div className="hidden h-full w-[300px] shrink-0 border-r border-outline-variant/30 bg-surface-container-lowest lg:block">
        <div className="h-full w-full overflow-hidden">
          <CustomFilter
            propertyType={propertyType}
            onFilterChange={handleFilterChange}
            onReset={resetFilters}
          />
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex items-center justify-between gap-3 border-b border-outline-variant/50 bg-surface-container-lowest px-4 py-3 lg:hidden">
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-outline-variant bg-surface px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-on-surface transition-colors hover:border-primary hover:text-primary"
          >
            <Icons.slidersHorizontal size={15} strokeWidth={2.2} />
            Filters
          </button>

          <p className="max-w-[13rem] text-right text-[11px] font-medium leading-relaxed text-on-surface-variant">
            {meta
              ? `${meta.total} results found`
              : "Tap any property to open quick view."}
          </p>
        </div>

        <div className="min-h-0 flex-1">
          <PropertyListings
            properties={properties}
            total={meta?.total ?? 0}
            isLoading={isLoading}
            isRefreshing={isRefreshing}
            isLoadingMore={isLoadingMore}
            hasMore={meta?.hasMore ?? false}
            error={error}
            propertyType={propertyType}
            sortBy={filters.sortBy}
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={PAGE_SIZE}
            onPropertySelect={(property) => {
              setSelectedProperty((prev) =>
                prev?.id === property.id ? null : property,
              );
            }}
            selectedPropertyId={selectedProperty?.id}
            onLoadMore={loadMore}
            onSortChange={setSortBy}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      <AnimatePresence>
        {selectedProperty && (
          <motion.div
            initial={{ width: 0, opacity: 0, x: 50 }}
            animate={{ width: "auto", opacity: 1, x: 0 }}
            exit={{ width: 0, opacity: 0, x: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="hidden h-full shrink-0 border-l border-outline-variant/30 bg-surface-container-lowest xl:block"
          >
            <PropertyDetailsPanel
              property={selectedProperty}
              propertyType={propertyType}
              onClose={() => setSelectedProperty(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileFilterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 bg-brand-navy-900/35 backdrop-blur-[2px] lg:hidden"
            onClick={() => setIsMobileFilterOpen(false)}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
              className="h-full w-full max-w-[380px] bg-surface-container-lowest shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <CustomFilter
                propertyType={propertyType}
                onClose={() => setIsMobileFilterOpen(false)}
                onFilterChange={handleFilterChange}
                onReset={resetFilters}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProperty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-brand-navy-900/35 backdrop-blur-[2px] xl:hidden"
            onClick={() => setSelectedProperty(null)}
          >
            <motion.div
              initial={{ y: 36, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 36, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
              className="ml-auto h-full w-full bg-surface-container-lowest shadow-2xl sm:max-w-[560px]"
              onClick={(event) => event.stopPropagation()}
            >
              <PropertyDetailsPanel
                property={selectedProperty}
                propertyType={propertyType}
                onClose={() => setSelectedProperty(null)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
