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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { setUser, setAuthenticated, clearUser } = useUserStore();

  useEffect(() => {
    const checkAuth = async () => {
      const token = getAuthToken();
      const hasToken = !!token;

      if (hasToken) {
        try {
          // If we have a token but no user in store, we need to fetch user data
          // For now, we'll assume the user data is persisted in localStorage via Zustand
          // In a real app, you might want to validate the token and fetch fresh user data
          setAuthenticated(true);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Failed to load user data:", error);
          // If token is invalid, clear everything
          clearUser();
          setAuthenticated(false);
          setIsAuthenticated(false);
        }
      } else {
        // No token, clear user data
        clearUser();
        setAuthenticated(false);
        setIsAuthenticated(false);
      }

      setIsLoading(false);

      // If not authenticated and not on login page, redirect to login
      if (!hasToken && pathname !== "/login") {
        console.log("No token found, redirecting to login");
        router.push("/login");
        return;
      }

      // If authenticated and on login page, redirect to dashboard
      if (hasToken && pathname === "/login") {
        console.log("Token found, redirecting to dashboard");
        router.push("/dashboard");
        return;
      }
    };

    checkAuth();
  }, [pathname, router, setUser, setAuthenticated, clearUser]);

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
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // If not authenticated and not on login page, show loading (will redirect)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      <span className="ml-2">Redirecting to login...</span>
    </div>
  );
}
