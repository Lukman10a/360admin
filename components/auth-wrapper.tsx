"use client";

import { useHydrated, useUserStore } from "@/stores/user-store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

interface AuthWrapperProps {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useUserStore();
  const hydrated = useHydrated();
  const redirectingRef = useRef(false);
  const lastPathnameRef = useRef<string | null>(null);

  // Simple redirect logic - only run after hydration and when pathname changes
  useEffect(() => {
    if (!hydrated || redirectingRef.current) return;

    // Only process if this is the first render or pathname actually changed
    const isFirstRender = lastPathnameRef.current === null;
    const pathnameChanged = lastPathnameRef.current !== pathname;

    if (!isFirstRender && !pathnameChanged) {
      return;
    }
    lastPathnameRef.current = pathname;

    const shouldRedirectToDashboard = isAuthenticated && pathname === "/login";
    const shouldRedirectToLogin = !isAuthenticated && pathname !== "/login";

    if (shouldRedirectToDashboard) {
      console.log(
        "AuthWrapper: Redirecting authenticated user from login to dashboard"
      );
      redirectingRef.current = true;
      router.push("/dashboard");
      setTimeout(() => {
        redirectingRef.current = false;
      }, 1000);
    } else if (shouldRedirectToLogin) {
      console.log("AuthWrapper: Redirecting unauthenticated user to login");
      redirectingRef.current = true;
      router.push("/login");
      setTimeout(() => {
        redirectingRef.current = false;
      }, 1000);
    }
  }, [pathname, isAuthenticated, hydrated, router]);

  // If on login page, show without auth check
  if (pathname === "/login") {
    return <>{children}</>;
  }

  // Show loading spinner while hydrating
  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <span className="ml-2">Checking authentication...</span>
      </div>
    );
  }

  // If authenticated, show the protected content
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // If not authenticated and not on login page, show redirect message
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      <span className="ml-2">Redirecting to login...</span>
    </div>
  );
}
