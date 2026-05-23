"use client";

import * as Sentry from "@sentry/react";

export function SentryProvider({ children }: { children: React.ReactNode }) {
  return (
    <Sentry.ErrorBoundary
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-red-50 p-4">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-bold text-red-600 mb-2">
              Something went wrong
            </h1>
            <p className="text-gray-600">
              We apologize for the inconvenience. Please try refreshing the
              page.
            </p>
          </div>
        </div>
      }
    >
      {children}
    </Sentry.ErrorBoundary>
  );
}
