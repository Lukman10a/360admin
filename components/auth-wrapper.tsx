"use client";

import { getAuthToken } from "@/services/api/infrastructure/client";
import { useHydrated, useUserStore } from "@/stores/user-store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

interface AuthWrapperProps {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, setAuthenticated, setUser } = useUserStore();
  const hydrated = useHydrated();

  // Sync authentication state after hydration
  useEffect(() => {
    if (!hydrated) return;

    const token = getAuthToken();
    console.log("AuthWrapper - token exists:", !!token);
    console.log("AuthWrapper - isAuthenticated:", isAuthenticated);

    if (token && !isAuthenticated) {
      // If we have a token but not authenticated, set to authenticated
      console.log("Setting authenticated to true due to token presence");
      setAuthenticated(true);
    } else if (!token && isAuthenticated) {
      // If no token but authenticated, clear the user data
      console.log("Clearing user data due to missing token");
      setUser(null);
    }
  }, [hydrated, isAuthenticated, setAuthenticated, setUser]);

  // Handle redirects after hydration
  useEffect(() => {
    if (!hydrated) return;

    // If authenticated user is on login page, redirect to dashboard
    if (isAuthenticated && pathname === "/login") {
      router.push("/dashboard");
      return;
    }

    // If unauthenticated user is not on login page, redirect to login
    if (!isAuthenticated && pathname !== "/login") {
      router.push("/login");
      return;
    }
  }, [isAuthenticated, pathname, hydrated, router]);

  // Show loading while hydrating
  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  // Show content if authenticated or on login page
  if (isAuthenticated || pathname === "/login") {
    return <>{children}</>;
  }

  // Show loading while redirecting unauthenticated users
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      <span className="ml-2">Redirecting...</span>
    </div>
  );
}
