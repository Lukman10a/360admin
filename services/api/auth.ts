import apiClient, { setAuthToken } from './client'
import { LoginRequest, LoginResponse, User, ApiResponse } from '../types'

export const authApi = {
  // Login user
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<ApiResponse<LoginResponse>>('/auth/login', credentials)
    
    // Set token in client and localStorage
    if (response.data.success && response.data.data.token) {
      setAuthToken(response.data.data.token)
    }
    
    return response.data.data
  },

  // Logout user
  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/auth/logout')
    } catch (error) {
      // Even if logout fails on server, clear local token
      console.warn('Logout request failed, but clearing local token')
    } finally {
      setAuthToken(null)
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