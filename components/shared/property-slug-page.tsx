"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import PropertySlugTemplate from "@/components/shared/property-slug-template";
import { getPropertyBySlug, type SearchProperty } from "@/lib/api";
import {
  primePropertyDetailCache,
  readPropertyDetailCache,
  writePropertyDetailCache,
} from "@/lib/property-detail-cache";

function initPropertyState(slug: string, initialProperty?: SearchProperty | null) {
  if (initialProperty) {
    return primePropertyDetailCache(initialProperty);
  }
  const cachedState = readPropertyDetailCache(slug);
  return cachedState?.property ?? null;
}

function initLoadingState(slug: string, initialProperty?: SearchProperty | null) {
  if (initialProperty) return false;
  const cachedState = readPropertyDetailCache(slug);
  return !cachedState;
}

export default function PropertySlugPage({
  slug,
  initialProperty,
}: {
  slug: string;
  initialProperty?: SearchProperty | null;
}) {
  const [property, setProperty] = useState<SearchProperty | null>(() =>
    initPropertyState(slug, initialProperty),
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(() =>
    initLoadingState(slug, initialProperty),
  );
  const [requestKey, setRequestKey] = useState(0);
  const isActiveRef = useRef(true);

  const fetchProperty = useCallback(async () => {
    const abortController = new AbortController();

    try {
      const result = await getPropertyBySlug(slug, abortController.signal);

      if (!isActiveRef.current) return;

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
        !isActiveRef.current ||
        (fetchError instanceof Error && fetchError.name === "AbortError")
      ) {
        return;
      }

      setError(
        fetchError instanceof Error ? fetchError.message : "Unable to load this property.",
      );
    } finally {
      if (isActiveRef.current) {
        setIsLoading(false);
      }
    }

    return () => {
      abortController.abort();
    };
  }, [slug]);

  useEffect(() => {
    if (initialProperty) return;

    const cachedState = readPropertyDetailCache(slug);

    if (cachedState && cachedState.status === "fresh" && requestKey === 0) {
      setIsLoading(false);
      return;
    }

    if (!cachedState) {
      setIsLoading(true);
    }

    void fetchProperty();
  }, [initialProperty, requestKey, slug, fetchProperty]);

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
