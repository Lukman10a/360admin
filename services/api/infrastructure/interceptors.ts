import { AxiosError, AxiosInstance, AxiosResponse } from "axios";

// Check if we're in development mode and API is likely not available
const isDevelopment = process.env.NODE_ENV === "development";
const isApiAvailable = process.env.NEXT_PUBLIC_API_BASE_URL !== undefined;

// Request interceptor for authentication and logging
export const setupRequestInterceptor = (apiClient: AxiosInstance) => {
  apiClient.interceptors.request.use(
    (config) => {
      // Add auth token if available and not already set
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("auth_token")
          : null;
      if (token && config.headers && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
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
          case 401:
            // Unauthorized - clear token and redirect to login
            if (typeof window !== "undefined") {
              localStorage.removeItem("auth_token");
              // Always log auth errors
              console.warn("🔒 Unauthorized access - token cleared");
            }
            break;
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
