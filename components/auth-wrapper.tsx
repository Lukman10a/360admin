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
  const { user, isAuthenticated, setAuthenticated, clearUser } = useUserStore();
  const hydrated = useHydrated();

  useEffect(() => {
    if (!hydrated) return;

    const token = getAuthToken();

    if (token) {
      if (!isAuthenticated) {
        setAuthenticated(true);
      }
    } else {
      if (isAuthenticated) {
        clearUser();
      }
    }

    // Handle redirects
    if (isAuthenticated && pathname === "/login") {
      router.push("/dashboard");
    } else if (!isAuthenticated && pathname !== "/login") {
      router.push("/login");
    }
  }, [
    pathname,
    router,
    hydrated,
    isAuthenticated,
    setAuthenticated,
    clearUser,
  ]);

  // If on login page, show without auth check
  if (pathname === "/login") {
    return <>{children}</>;
  }

  // If authenticated, show the protected content
  if (isAuthenticated) {
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

  // If not authenticated and not on login page, show redirect message
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      <span className="ml-2">Redirecting to login...</span>
    </div>
  );
}
