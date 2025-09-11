"use client";

import { getAuthToken } from "@/services/api/infrastructure/client";
import { useUserStore } from "@/stores/user-store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AuthWrapperProps {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, setAuthenticated, clearUser } = useUserStore();

  useEffect(() => {
    const checkAuth = () => {
      const token = getAuthToken();
      const hasToken = !!token;
      const hasUserData = !!user;

      console.log("Auth check:", {
        hasToken,
        hasUserData,
        pathname,
        isAuthenticated,
        userExists: !!user,
      });

      if (hasToken && hasUserData) {
        // User is authenticated with both token and user data
        if (!isAuthenticated) {
          console.log("Setting authenticated to true");
          setAuthenticated(true);
        }
        setIsLoading(false);

        // If on login page, redirect to dashboard
        if (pathname === "/login") {
          console.log("User authenticated, redirecting to dashboard");
          router.push("/dashboard");
        }
      } else if (hasToken && !hasUserData) {
        // Has token but no user data - this shouldn't happen with proper setup
        console.log("Token found but no user data, clearing auth");
        clearUser();
        setIsLoading(false);

        if (pathname !== "/login") {
          router.push("/login");
        }
      } else {
        // No token, clear user data
        console.log("No token found, clearing user data");
        clearUser();
        setIsLoading(false);

        // If not on login page, redirect to login
        if (pathname !== "/login") {
          console.log("No token found, redirecting to login");
          router.push("/login");
        }
      }
    };

    // Add a small delay to ensure Zustand has loaded from localStorage
    const timeoutId = setTimeout(checkAuth, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname, router, user, isAuthenticated, setAuthenticated, clearUser]);

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <span className="ml-2">Checking authentication...</span>
      </div>
    );
  }

  // If on login page, show without auth check
  if (pathname === "/login") {
    return <>{children}</>;
  }

  // If authenticated, show the protected content
  if (isAuthenticated && user) {
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
