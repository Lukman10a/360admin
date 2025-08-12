// ============================================================================
// API INFRASTRUCTURE INDEX
// Core API setup, interceptors, and endpoint definitions
// ============================================================================

// Core API client and interceptors
export { default as apiClient, setAuthToken, getAuthToken, isApiConfigured } from './client'
export { setupInterceptors } from './interceptors'

// API endpoint definitions
export { ENDPOINTS } from './endpoint'

// Mock data utilities
export { shouldUseMockData, createMockPaginatedResponse, mockDelay, mockLoginResponse } from './mock-data'
