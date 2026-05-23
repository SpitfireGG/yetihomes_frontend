import {
  PROPERTY_SEARCH_CLIENT_STALE_MS,
  PROPERTY_SEARCH_CLIENT_TTL_MS,
} from "@/lib/property-cache-config";
import {
  buildPropertySearchCacheKey,
  type PropertySearchFilters,
} from "@/lib/property-cache-utils";
import type { SearchResponse } from "@/lib/api";

type SearchCacheEntry = {
  response: SearchResponse;
  savedAt: number;
};

type SearchCacheState = {
  ageMs: number;
  response: SearchResponse;
  savedAt: number;
  status: "fresh" | "stale";
};

const searchMemoryCache = new Map<string, SearchCacheEntry>();
const SEARCH_STORAGE_PREFIX = "yetihomes:property-search:";

function getStorageKey(cacheKey: string) {
  return `${SEARCH_STORAGE_PREFIX}${cacheKey}`;
}

function isBrowser() {
  return typeof window !== "undefined";
}

function readSearchEntryFromStorage(cacheKey: string) {
  if (!isBrowser()) {
    return null;
  }

  const raw = window.sessionStorage.getItem(getStorageKey(cacheKey));

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as SearchCacheEntry;
  } catch {
    window.sessionStorage.removeItem(getStorageKey(cacheKey));
    return null;
  }
}

function removeSearchEntry(cacheKey: string) {
  searchMemoryCache.delete(cacheKey);

  if (!isBrowser()) {
    return;
  }

  window.sessionStorage.removeItem(getStorageKey(cacheKey));
}

function persistSearchEntry(cacheKey: string, entry: SearchCacheEntry) {
  searchMemoryCache.set(cacheKey, entry);

  if (!isBrowser()) {
    return;
  }

  try {
    window.sessionStorage.setItem(getStorageKey(cacheKey), JSON.stringify(entry));
  } catch {
    // Ignore session storage failures and continue with memory cache.
  }
}

export function readPropertySearchCache(
  filters: PropertySearchFilters,
): SearchCacheState | null {
  const cacheKey = buildPropertySearchCacheKey(filters);
  const entry =
    searchMemoryCache.get(cacheKey) ?? readSearchEntryFromStorage(cacheKey);

  if (!entry) {
    return null;
  }

  const ageMs = Date.now() - entry.savedAt;

  if (ageMs > PROPERTY_SEARCH_CLIENT_TTL_MS) {
    removeSearchEntry(cacheKey);
    return null;
  }

  if (!searchMemoryCache.has(cacheKey)) {
    searchMemoryCache.set(cacheKey, entry);
  }

  return {
    ageMs,
    response: entry.response,
    savedAt: entry.savedAt,
    status: ageMs <= PROPERTY_SEARCH_CLIENT_STALE_MS ? "fresh" : "stale",
  };
}

export function writePropertySearchCache(
  filters: PropertySearchFilters,
  response: SearchResponse,
) {
  const cacheKey = buildPropertySearchCacheKey(filters);

  persistSearchEntry(cacheKey, {
    response,
    savedAt: Date.now(),
  });
}

export function primePropertySearchCache(
  filters: PropertySearchFilters,
  response: SearchResponse,
) {
  const cached = readPropertySearchCache(filters);

  if (cached) {
    return cached.response;
  }

  writePropertySearchCache(filters, response);
  return response;
}

export function clearPropertySearchCache() {
  searchMemoryCache.clear();

  if (!isBrowser()) {
    return;
  }

  const keysToRemove: string[] = [];

  for (let index = 0; index < window.sessionStorage.length; index += 1) {
    const key = window.sessionStorage.key(index);

    if (key?.startsWith(SEARCH_STORAGE_PREFIX)) {
      keysToRemove.push(key);
    }
  }

  keysToRemove.forEach((key) => {
    window.sessionStorage.removeItem(key);
  });
}
