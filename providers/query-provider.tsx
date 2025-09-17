"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Time before data is considered stale
            staleTime: 60 * 1000, // 1 minute
            // Time before inactive queries are garbage collected
            gcTime: 5 * 60 * 1000, // 5 minutes (formerly cacheTime)
            // Retry failed requests
            retry: (failureCount, error: any) => {
              // In development without API configured, don't retry network errors
              if (
                process.env.NODE_ENV === "development" &&
                !process.env.NEXT_PUBLIC_API_BASE_URL
              ) {
                return false;
              }

              // Don't retry on 4xx errors except 408, 429
              if (
                error?.response?.status >= 400 &&
                error?.response?.status < 500
              ) {
                if (
                  error?.response?.status === 408 ||
                  error?.response?.status === 429
                ) {
                  return failureCount < 3;
                }
                return false;
              }
              // Retry on network errors and 5xx errors
              return failureCount < 3;
            },
            // Refetch on window focus in production
            refetchOnWindowFocus: process.env.NODE_ENV === "production",
            // Refetch on reconnect
            refetchOnReconnect: true,
            // Refetch on mount if data is stale
            refetchOnMount: true,
          },
          mutations: {
            // Retry failed mutations
            retry: (failureCount, error: any) => {
              // Don't retry on 4xx errors except 408, 429
              if (
                error?.response?.status >= 400 &&
                error?.response?.status < 500
              ) {
                if (
                  error?.response?.status === 408 ||
                  error?.response?.status === 429
                ) {
                  return failureCount < 2;
                }
                return false;
              }
              // Retry on network errors and 5xx errors
              return failureCount < 2;
            },
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Show React Query DevTools in development */}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
