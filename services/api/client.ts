import axios, { AxiosInstance } from 'axios'
import { setupInterceptors } from './interceptors'
import { API_BASE_URL } from './endpoint'

// API Configuration
const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || API_BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
}

// Create Axios instance
const apiClient: AxiosInstance = axios.create(API_CONFIG)

// Setup interceptors
setupInterceptors(apiClient)

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
  return process.env.NEXT_PUBLIC_API_BASE_URL !== undefined
}

export default apiClient 