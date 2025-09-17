import { useUserStore } from "@/stores/user-store";
import axios, { AxiosInstance } from "axios";
import { API_BASE_URL } from "./endpoint";
import { setupInterceptors } from "./interceptors";

// API Configuration
const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || API_BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    "Content-Type": "application/json",
  },
};

// Create Axios instance
const apiClient: AxiosInstance = axios.create(API_CONFIG);

// Setup interceptors
setupInterceptors(apiClient);

// Helper function to set auth token
export const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem("auth_token", token);
    // Set both Authorization and x-auth-token for compatibility
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    apiClient.defaults.headers.common["x-auth-token"] = token;

    // Also set cookie for middleware
    if (typeof document !== "undefined") {
      document.cookie = `auth_token=${token}; path=/; max-age=${
        7 * 24 * 60 * 60
      }`; // 7 days
    }

    // Update Zustand store token synchronously so interceptors can read it
    try {
      const store = (useUserStore as any).getState?.();
      store?.setToken?.(token);
    } catch (e) {
      // fallback: setState
      try {
        (useUserStore as any).setState?.({ token });
      } catch (err) {
        // ignore
      }
    }
  } else {
    localStorage.removeItem("auth_token");
    delete apiClient.defaults.headers.common["Authorization"];
    delete apiClient.defaults.headers.common["x-auth-token"];

    // Clear cookie
    if (typeof document !== "undefined") {
      document.cookie =
        "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    // Clear token from Zustand store
    try {
      const store = (useUserStore as any).getState?.();
      store?.setToken?.(null);
    } catch (e) {
      try {
        (useUserStore as any).setState?.({ token: null });
      } catch (err) {
        // ignore
      }
    }
  }
};

// Helper function to get auth token
export const getAuthToken = (): string | null => {
  // Prefer token from store if available
  try {
    const store = (useUserStore as any).getState?.();
    const t = store?.token ?? null;
    return t;
  } catch (e) {
    // ignore
  }

  // If not available in store (server-side or unexpected), return null
  return null;
};

// Helper function to check if API is available
export const isApiConfigured = (): boolean => {
  return process.env.NEXT_PUBLIC_API_BASE_URL !== undefined;
};

export default apiClient;
