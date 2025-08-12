import apiClient, { setAuthToken } from '../infrastructure/client'
import { LoginRequest, LoginResponse, User, ApiResponse } from '../../types'
import { shouldUseMockData, mockDelay, mockLoginResponse } from '../infrastructure/mock-data'

export const authApi = {
  // Login user
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    // Always try mock data first in development if API fails
    if (shouldUseMockData()) {
      await mockDelay()
      
      // Simple mock validation
      if (credentials.userName === 'testing@gmail.com' && credentials.password === 'testing') {
        setAuthToken(mockLoginResponse.token)
        return mockLoginResponse
      } else {
        throw new Error('Invalid credentials')
      }
    }
    
    try {
      const response = await apiClient.post<LoginResponse>('/auth/login', credentials)
      
      // Set token in client and localStorage
      if (response.data.token) {
        setAuthToken(response.data.token)
      }
      
      return response.data
    } catch (error: any) {
      // In development, fall back to mock data if API fails
      if (process.env.NODE_ENV === 'development') {
        console.warn('API login failed, falling back to mock data:', error.message)
        
        // Try mock validation as fallback
        if (credentials.userName === 'testing@gmail.com' && credentials.password === 'testing') {
          await mockDelay()
          setAuthToken(mockLoginResponse.token)
          return mockLoginResponse
        } else {
          throw new Error('Invalid credentials (API unavailable, using mock validation)')
        }
      }
      
      console.error('Login API call failed:', error)
      throw error
    }
  },

  // Logout user
  logout: async (): Promise<void> => {
    // In development or when using mock data, just clear the token
    if (shouldUseMockData()) {
      console.log('Logout: Clearing mock session')
      setAuthToken(null)
      return
    }
    
    // Always clear local token regardless of API response
    try {
      // Try to notify server about logout (if API is available)
      if (process.env.NEXT_PUBLIC_API_BASE_URL) {
        await apiClient.post('/auth/logout')
        console.log('Logout: Server notified successfully')
      }
    } catch (error) {
      // Even if logout fails on server, we still clear local token
      console.warn('Logout: Server notification failed, but clearing local session:', error)
    } finally {
      // Always clear local authentication data
      setAuthToken(null)
      console.log('Logout: Local session cleared')
    }
  },

  // Get current user profile
  getProfile: async (): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>('/auth/profile')
    return response.data.data
  },

  // Refresh token
  refreshToken: async (): Promise<{ token: string }> => {
    const response = await apiClient.post<ApiResponse<{ token: string }>>('/auth/refresh')
    
    // Update token in client and localStorage
    if (response.data.success && response.data.data.token) {
      setAuthToken(response.data.data.token)
    }
    
    return response.data.data
  },

  // Verify token validity
  verifyToken: async (): Promise<boolean> => {
    try {
      await apiClient.get('/auth/verify')
      return true
    } catch (error) {
      setAuthToken(null)
      return false
    }
  },

  // Change password
  changePassword: async (data: { currentPassword: string; newPassword: string }): Promise<void> => {
    await apiClient.post('/auth/change-password', data)
  },

  // Request password reset
  requestPasswordReset: async (email: string): Promise<void> => {
    await apiClient.post('/auth/forgot-password', { email })
  },

  // Reset password with token
  resetPassword: async (data: { token: string; password: string }): Promise<void> => {
    await apiClient.post('/auth/reset-password', data)
  },
} 