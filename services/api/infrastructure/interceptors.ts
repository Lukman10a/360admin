import { useUserStore } from "@/stores/user-store";
import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { setAuthToken } from "./client";

// Check if we're in development mode and API is likely not available
const isDevelopment = process.env.NODE_ENV === "development";
const isApiAvailable = process.env.NEXT_PUBLIC_API_BASE_URL !== undefined;

let clearingAuth = false; // guard to avoid repeated clears

// Helper to get current token (try store first)
const getCurrentToken = () => {
  try {
    const state = (useUserStore as any).getState?.();
    const tokenFromStore = state?.token || null;
    if (tokenFromStore) return tokenFromStore;
  } catch (e) {
    // ignore
  }

  // Do not read directly from localStorage here — rely on the Zustand store as the single source of truth.
  return null;
};

// Request interceptor for authentication and logging
export const setupRequestInterceptor = (apiClient: AxiosInstance) => {
  apiClient.interceptors.request.use(
    (config) => {
      // Remove any existing Authorization header to avoid conflicts
      if (config.headers.Authorization) {
        delete config.headers.Authorization;
      }

      // Add auth token if available and not already set
      const token = getCurrentToken();
      if (token && config.headers && !config.headers["x-auth-token"]) {
        config.headers["x-auth-token"] = `${token}`;
      }

      // Log requests in development
      if (isDevelopment) {
        console.log(
          `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`,
          {
            data: config.data,
            params: config.params,
            headers: config.headers,
          }
        );
      }

      return config;
    },
    (error: AxiosError) => {
      if (isDevelopment) {
        console.error("❌ Request Error:", error);
      }
      return Promise.reject(error);
    }
  );
};

// Response interceptor for error handling and logging
export const setupResponseInterceptor = (apiClient: AxiosInstance) => {
  apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
      // Log successful responses in development
      if (isDevelopment) {
        console.log(
          `✅ API Response: ${response.config.method?.toUpperCase()} ${
            response.config.url
          }`,
          {
            status: response.status,
            data: response.data,
          }
        );
      }

      return response;
    },
    (error: AxiosError) => {
      // Handle different error scenarios
      if (error.response) {
        // Server responded with error status
        const { status, data } = error.response;

        switch (status) {
          case 401: {
            // Unauthorized - clear token and user once
            if (typeof window !== "undefined" && !clearingAuth) {
              clearingAuth = true;
              try {
                console.warn("🔒 Unauthorized access - clearing auth state");
                // Clear stored token and defaults
                setAuthToken(null);
                // Clear Zustand user state if available
                const store = (useUserStore as any).getState?.();
                store?.clearUser?.();
              } catch (e) {
                console.error("Error while clearing auth state:", e);
              } finally {
                // delay reset of guard to avoid tight loops but allow future handling
                setTimeout(() => {
                  clearingAuth = false;
                }, 1000);
              }
            }
            break;
          }
          case 403:
            console.warn("🚫 Forbidden access");
            break;
          case 404:
            console.warn("🔍 Resource not found");
            break;
          case 500:
            console.error("🔥 Server error");
            break;
          default:
            console.error(`❌ API Error ${status}:`, data);
        }
      } else if (error.request) {
        // Network error
        console.error("🌐 Network Error:", error.message);
      } else {
        // Other error
        console.error("❌ Error:", error.message);
      }

      return Promise.reject(error);
    }
  );
};

// Setup all interceptors for an API client
export const setupInterceptors = (apiClient: AxiosInstance) => {
  setupRequestInterceptor(apiClient);
  setupResponseInterceptor(apiClient);
};
