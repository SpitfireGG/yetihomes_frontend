"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  searchProperties,
  type SearchFilters,
  type SearchMeta,
  type SearchProperty,
  type SearchResponse,
} from "@/lib/api";
import {
  buildPropertySearchCacheKey,
  normalizeSearchFilters,
  type ApiPropertyType,
  type PropertySearchFilters,
} from "@/lib/property-cache-utils";
import {
  primePropertySearchCache,
  readPropertySearchCache,
  writePropertySearchCache,
} from "@/lib/property-client-cache";

type UsePropertySearchOptions = {
  propertyType?: ApiPropertyType;
  initialFilters?: Partial<SearchFilters>;
  initialResponse?: SearchResponse | null;
  debounceMs?: number;
};

type UsePropertySearchReturn = {
  properties: SearchProperty[];
  meta: SearchMeta | null;
  isLoading: boolean;
  isRefreshing: boolean;
  isLoadingMore: boolean;
  error: string | null;
  filters: SearchFilters;
  setFilters: (filters: Partial<SearchFilters>) => void;
  resetFilters: () => void;
  loadMore: () => void;
  setSortBy: (sortBy: SearchFilters["sortBy"]) => void;
};

function buildBaseFilters(
  propertyType?: ApiPropertyType,
  initialFilters?: Partial<SearchFilters>,
): PropertySearchFilters {
  const filtersWithoutCursor = { ...(initialFilters ?? {}) };
  delete filtersWithoutCursor.cursor;

  return normalizeSearchFilters({
    ...(propertyType ? { propertyType } : {}),
    limit: 20,
    ...filtersWithoutCursor,
  });
}

export function usePropertySearch(
  options: UsePropertySearchOptions = {},
): UsePropertySearchReturn {
  const {
    propertyType,
    initialFilters,
    initialResponse,
    debounceMs = 300,
  } = options;
  const initialBaseFiltersRef = useRef<PropertySearchFilters | null>(null);

  if (initialBaseFiltersRef.current === null) {
    initialBaseFiltersRef.current = buildBaseFilters(propertyType, initialFilters);
  }

  const initialBaseFilters = initialBaseFiltersRef.current;
  const initialCachedResponseRef = useRef<SearchResponse | null>(null);

  if (initialCachedResponseRef.current === null) {
    initialCachedResponseRef.current =
      initialResponse ??
      readPropertySearchCache(initialBaseFilters!)?.response ??
      null;
  }

  const initialCachedResponse = initialCachedResponseRef.current;

  const [filters, setFiltersState] = useState<PropertySearchFilters>(
    initialBaseFilters,
  );
  const [debouncedFilters, setDebouncedFilters] = useState<PropertySearchFilters>(
    initialBaseFilters,
  );
  const [properties, setProperties] = useState<SearchProperty[]>(
    initialCachedResponse?.data ?? [],
  );
  const [meta, setMeta] = useState<SearchMeta | null>(
    initialCachedResponse?.meta ?? null,
  );
  const [isLoading, setIsLoading] = useState(!initialCachedResponse);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const visiblePropertiesRef = useRef<SearchProperty[]>(
    initialCachedResponse?.data ?? [],
  );
  const activeSearchKeyRef = useRef(
    buildPropertySearchCacheKey(initialBaseFilters),
  );

  useEffect(() => {
    visiblePropertiesRef.current = properties;
  }, [properties]);

  useEffect(() => {
    if (!initialResponse) {
      return;
    }

    primePropertySearchCache(initialBaseFilters, initialResponse);
  }, [initialBaseFilters, initialResponse]);

  useEffect(() => {
    const delay = filters.q !== undefined ? debounceMs : 0;
    const timer = window.setTimeout(() => {
      setDebouncedFilters(normalizeSearchFilters(filters));
    }, delay);

    return () => {
      window.clearTimeout(timer);
    };
  }, [debounceMs, filters]);

  useEffect(() => {
    const cacheState = readPropertySearchCache(debouncedFilters);
    const cacheKey = buildPropertySearchCacheKey(debouncedFilters);

    activeSearchKeyRef.current = cacheKey;
    setError(null);

    if (cacheState) {
      setProperties(cacheState.response.data);
      setMeta(cacheState.response.meta);

      if (cacheState.status === "fresh") {
        setIsLoading(false);
        setIsRefreshing(false);
        return;
      }

      setIsLoading(false);
      setIsRefreshing(true);
    } else if (visiblePropertiesRef.current.length > 0) {
      setIsLoading(false);
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
      setIsRefreshing(false);
    }

    const abortController = new AbortController();
    let isActive = true;

    async function fetchAndCache() {
      try {
        const result = await searchProperties(
          debouncedFilters,
          abortController.signal,
        );

        if (!isActive || activeSearchKeyRef.current !== cacheKey) {
          return;
        }

        writePropertySearchCache(debouncedFilters, result);
        setProperties(result.data);
        setMeta(result.meta);
        setError(null);
      } catch (fetchError) {
        if (
          !isActive ||
          (fetchError instanceof Error && fetchError.name === "AbortError")
        ) {
          return;
        }

        setError(
          fetchError instanceof Error ? fetchError.message : "Search failed",
        );
      } finally {
        if (isActive && activeSearchKeyRef.current === cacheKey) {
          setIsLoading(false);
          setIsRefreshing(false);
        }
      }
    }

    void fetchAndCache();

    return () => {
      isActive = false;
      abortController.abort();
    };
  }, [debouncedFilters]);

  const setFilters = useCallback((partial: Partial<SearchFilters>) => {
    const filtersWithoutCursor = { ...partial };
    delete filtersWithoutCursor.cursor;

    setFiltersState((previous) => {
      const merged = { ...previous };
      for (const [key, value] of Object.entries(filtersWithoutCursor)) {
        if (value === undefined) {
          delete (merged as Record<string, unknown>)[key];
        } else {
          (merged as Record<string, unknown>)[key] = value;
        }
      }
      return normalizeSearchFilters(merged as PropertySearchFilters);
    });
  }, []);

  const resetFilters = useCallback(() => {
    setFiltersState(initialBaseFilters);
    setDebouncedFilters(initialBaseFilters);
  }, [initialBaseFilters]);

  const loadMore = useCallback(() => {
    if (!meta?.hasMore || !meta.nextCursor || isLoadingMore) {
      return;
    }

    const activeFilters = debouncedFilters;
    const cacheKey = buildPropertySearchCacheKey(activeFilters);

    setIsLoadingMore(true);
    setError(null);

    void searchProperties(
      {
        ...activeFilters,
        cursor: meta.nextCursor,
      },
    )
      .then((result) => {
        if (activeSearchKeyRef.current !== cacheKey) {
          return;
        }

        setProperties((previous) => {
          const mergedProperties = [
            ...previous,
            ...result.data.filter(
              (property) => !previous.some((item) => item.id === property.id),
            ),
          ];
          const mergedResponse = {
            data: mergedProperties,
            meta: result.meta,
          };

          writePropertySearchCache(activeFilters, mergedResponse);
          return mergedProperties;
        });
        setMeta(result.meta);
      })
      .catch((fetchError) => {
        setError(
          fetchError instanceof Error ? fetchError.message : "Search failed",
        );
      })
      .finally(() => {
        setIsLoadingMore(false);
      });
  }, [debouncedFilters, isLoadingMore, meta]);

  const setSortBy = useCallback(
    (sortBy: SearchFilters["sortBy"]) => {
      setFilters({ sortBy });
    },
    [setFilters],
  );

  return {
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
  };
}
