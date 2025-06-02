import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

// API Configuration
const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1',
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
}

// Check if we're in development mode and API is likely not available
const isDevelopment = process.env.NODE_ENV === 'development'
const isApiAvailable = process.env.NEXT_PUBLIC_API_BASE_URL !== undefined

// Create Axios instance
const apiClient: AxiosInstance = axios.create(API_CONFIG)

// Request interceptor for authentication and logging
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Log requests in development only if API is configured
    if (isDevelopment && isApiAvailable) {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
        data: config.data,
        params: config.params,
      })
    }

    return config
  },
  (error: AxiosError) => {
    if (isDevelopment && isApiAvailable) {
      console.error('❌ Request Error:', error)
    }
    return Promise.reject(error)
  }
)

// Response interceptor for error handling and logging
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log successful responses in development only if API is configured
    if (isDevelopment && isApiAvailable) {
      console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
        status: response.status,
        data: response.data,
      })
    }

    return response
  },
  (error: AxiosError) => {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response
      
      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token')
            // Only log in development with API configured
            if (isDevelopment && isApiAvailable) {
              console.warn('🔒 Unauthorized access - token cleared')
            }
          }
          break
        case 403:
          if (isDevelopment && isApiAvailable) {
            console.warn('🚫 Forbidden access')
          }
          break
        case 404:
          if (isDevelopment && isApiAvailable) {
            console.warn('🔍 Resource not found')
          }
          break
        case 500:
          if (isDevelopment && isApiAvailable) {
            console.error('🔥 Server error')
          }
          break
        default:
          if (isDevelopment && isApiAvailable) {
            console.error(`❌ API Error ${status}:`, data)
          }
      }
    } else if (error.request) {
      // Network error - only log if API is expected to be available
      if (isDevelopment && isApiAvailable) {
        console.error('🌐 Network Error:', error.message)
      } else if (isDevelopment && !isApiAvailable) {
        // Silently handle network errors in development when API is not configured
        console.info('ℹ️ API not configured - using mock data mode')
      }
    } else {
      // Other error
      if (isDevelopment && isApiAvailable) {
        console.error('❌ Error:', error.message)
      }
    }

    return Promise.reject(error)
  }
)

// Helper function to set auth token
export const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem('auth_token', token)
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
    
    // Also set cookie for middleware
    if (typeof document !== 'undefined') {
      document.cookie = `auth_token=${token}; path=/; max-age=${7 * 24 * 60 * 60}` // 7 days
    }
  } else {
    localStorage.removeItem('auth_token')
    delete apiClient.defaults.headers.common['Authorization']
    
    // Clear cookie
    if (typeof document !== 'undefined') {
      document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
  }
}

// Helper function to get auth token
export const getAuthToken = (): string | null => {
  return typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
}

// Helper function to check if API is available
export const isApiConfigured = (): boolean => {
  return isApiAvailable
}

export default apiClient 