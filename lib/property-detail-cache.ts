import {
  PROPERTY_DETAIL_CLIENT_STALE_MS,
  PROPERTY_DETAIL_CLIENT_TTL_MS,
} from "@/lib/property-cache-config";
import type { SearchProperty } from "@/lib/api";

type PropertyDetailCacheEntry = {
  property: SearchProperty;
  savedAt: number;
};

type PropertyDetailCacheState = {
  ageMs: number;
  property: SearchProperty;
  savedAt: number;
  status: "fresh" | "stale";
};

const propertyDetailMemoryCache = new Map<string, PropertyDetailCacheEntry>();
const DETAIL_STORAGE_PREFIX = "yetihomes:property-detail:";

function getStorageKey(slug: string) {
  return `${DETAIL_STORAGE_PREFIX}${slug}`;
}

function isBrowser() {
  return typeof window !== "undefined";
}

function readDetailEntryFromStorage(slug: string) {
  if (!isBrowser()) {
    return null;
  }

  const raw = window.sessionStorage.getItem(getStorageKey(slug));

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as PropertyDetailCacheEntry;
  } catch {
    window.sessionStorage.removeItem(getStorageKey(slug));
    return null;
  }
}

function removeDetailEntry(slug: string) {
  propertyDetailMemoryCache.delete(slug);

  if (!isBrowser()) {
    return;
  }

  window.sessionStorage.removeItem(getStorageKey(slug));
}

function persistDetailEntry(slug: string, entry: PropertyDetailCacheEntry) {
  propertyDetailMemoryCache.set(slug, entry);

  if (!isBrowser()) {
    return;
  }

  try {
    window.sessionStorage.setItem(getStorageKey(slug), JSON.stringify(entry));
  } catch {
    // Ignore session storage failures and keep the in-memory cache available.
  }
}

export function readPropertyDetailCache(
  slug: string,
): PropertyDetailCacheState | null {
  const normalizedSlug = slug.trim();
  const entry =
    propertyDetailMemoryCache.get(normalizedSlug) ??
    readDetailEntryFromStorage(normalizedSlug);

  if (!entry) {
    return null;
  }

  const ageMs = Date.now() - entry.savedAt;

  if (ageMs > PROPERTY_DETAIL_CLIENT_TTL_MS) {
    removeDetailEntry(normalizedSlug);
    return null;
  }

  if (!propertyDetailMemoryCache.has(normalizedSlug)) {
    propertyDetailMemoryCache.set(normalizedSlug, entry);
  }

  return {
    ageMs,
    property: entry.property,
    savedAt: entry.savedAt,
    status: ageMs <= PROPERTY_DETAIL_CLIENT_STALE_MS ? "fresh" : "stale",
  };
}

export function writePropertyDetailCache(property: SearchProperty) {
  persistDetailEntry(property.slug, {
    property,
    savedAt: Date.now(),
  });
}

export function primePropertyDetailCache(property: SearchProperty) {
  const cached = readPropertyDetailCache(property.slug);

  if (cached) {
    return cached.property;
  }

  writePropertyDetailCache(property);
  return property;
}
