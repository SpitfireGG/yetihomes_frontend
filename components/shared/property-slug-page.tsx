"use client";

import { useEffect, useState } from "react";
import PropertySlugTemplate from "@/components/shared/property-slug-template";
import { getPropertyBySlug, type SearchProperty } from "@/lib/api";
import {
  primePropertyDetailCache,
  readPropertyDetailCache,
  writePropertyDetailCache,
} from "@/lib/property-detail-cache";

export default function PropertySlugPage({
  slug,
  initialProperty,
}: {
  slug: string;
  initialProperty?: SearchProperty | null;
}) {
  const initialCachedState = initialProperty ? null : readPropertyDetailCache(slug);
  const [property, setProperty] = useState<SearchProperty | null>(
    initialProperty ?? initialCachedState?.property ?? null,
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!initialProperty && !initialCachedState);
  const [, setIsRefreshing] = useState(
    Boolean(!initialProperty && initialCachedState?.status === "stale"),
  );
  const [requestKey, setRequestKey] = useState(0);

  useEffect(() => {
    if (!initialProperty) {
      return;
    }

    const cachedProperty = primePropertyDetailCache(initialProperty);
    setProperty(cachedProperty);
    setError(null);
    setIsLoading(false);
    setIsRefreshing(false);
  }, [initialProperty]);

  useEffect(() => {
    if (initialProperty) {
      return;
    }

    const cachedState = readPropertyDetailCache(slug);

    if (cachedState) {
      setProperty(cachedState.property);
      setError(null);

      if (cachedState.status === "fresh" && requestKey === 0) {
        setIsLoading(false);
        setIsRefreshing(false);
        return;
      }

      setIsLoading(false);
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
      setIsRefreshing(false);
    }

    const abortController = new AbortController();
    let isActive = true;

    async function fetchProperty() {
      try {
        const result = await getPropertyBySlug(slug, abortController.signal);

        if (!isActive) {
          return;
        }

        if (!result) {
          setProperty(null);
          setError("Property not found.");
          return;
        }

        writePropertyDetailCache(result);
        setProperty(result);
        setError(null);
      } catch (fetchError) {
        if (
          !isActive ||
          (fetchError instanceof Error && fetchError.name === "AbortError")
        ) {
          return;
        }

        setError(
          fetchError instanceof Error ? fetchError.message : "Unable to load this property.",
        );
      } finally {
        if (isActive) {
          setIsLoading(false);
          setIsRefreshing(false);
        }
      }
    }

    void fetchProperty();

    return () => {
      isActive = false;
      abortController.abort();
    };
  }, [initialProperty, requestKey, slug]);

  if (isLoading && !property) {
    return (
      <div className="flex h-screen w-full items-center justify-center font-headline text-lg">
        Loading...
      </div>
    );
  }

  if (error && !property) {
    return (
      <div className="flex h-screen w-full items-center justify-center px-6">
        <div className="max-w-md rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700 shadow-sm">
          <p className="font-headline text-xl font-semibold text-red-800">
            Unable to load this property
          </p>
          <p className="mt-2 text-sm">
            {error}
          </p>
          <button
            type="button"
            onClick={() => {
              setIsLoading(true);
              setIsRefreshing(false);
              setError(null);
              setProperty(
                (previous) =>
                  previous ?? readPropertyDetailCache(slug)?.property ?? null,
              );
              setRequestKey((value) => value + 1);
            }}
            className="mt-4 rounded-full bg-red-700 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-800"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!property) {
    return null;
  }

  return <PropertySlugTemplate property={property} />;
}
