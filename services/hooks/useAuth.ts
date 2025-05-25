import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authApi } from '../api/auth'
import { LoginRequest, User } from '../types'

// Query keys
export const authKeys = {
  all: ['auth'] as const,
  profile: () => [...authKeys.all, 'profile'] as const,
  verify: () => [...authKeys.all, 'verify'] as const,
}

// Login mutation
export const useLogin = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (credentials: LoginRequest) => authApi.login(credentials),
    onSuccess: (data) => {
      // Cache user data
      queryClient.setQueryData(authKeys.profile(), data.user)
      // Invalidate and refetch any cached data
      queryClient.invalidateQueries({ queryKey: authKeys.all })
    },
    onError: (error) => {
      console.error('Login failed:', error)
    },
  })
}

// Logout mutation
export const useLogout = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear()
    },
    onError: (error) => {
      console.error('Logout failed:', error)
      // Even if logout fails, clear local data
      queryClient.clear()
    },
  })
}

// Get user profile query
export const useProfile = (enabled: boolean = true) => {
  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: () => authApi.getProfile(),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error: any) => {
      // In development without API, don't retry
      if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_API_BASE_URL) {
        return false
      }
      
      // Don't retry on 401 errors
      if (error?.response?.status === 401) {
        return false
      }
      return failureCount < 3
    },
  })
}

// Verify token query
export const useVerifyToken = (enabled: boolean = true) => {
  return useQuery({
    queryKey: authKeys.verify(),
    queryFn: () => authApi.verifyToken(),
    enabled: enabled && process.env.NEXT_PUBLIC_API_BASE_URL !== undefined, // Only enable if API is configured
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: false, // Don't retry token verification
  })
}

// Refresh token mutation
export const useRefreshToken = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: () => authApi.refreshToken(),
    onSuccess: () => {
      // Invalidate auth queries to refetch with new token
      queryClient.invalidateQueries({ queryKey: authKeys.all })
    },
    onError: (error) => {
      console.error('Token refresh failed:', error)
      // Clear auth data on refresh failure
      queryClient.removeQueries({ queryKey: authKeys.all })
    },
  })
}

// Change password mutation
export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: { currentPassword: string; newPassword: string }) => 
      authApi.changePassword(data),
    onSuccess: () => {
      console.log('Password changed successfully')
    },
    onError: (error) => {
      console.error('Password change failed:', error)
    },
  })
}

// Request password reset mutation
export const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: (email: string) => authApi.requestPasswordReset(email),
    onSuccess: () => {
      console.log('Password reset email sent')
    },
    onError: (error) => {
      console.error('Password reset request failed:', error)
    },
  })
}

// Reset password mutation
export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: { token: string; password: string }) => 
      authApi.resetPassword(data),
    onSuccess: () => {
      console.log('Password reset successfully')
    },
    onError: (error) => {
      console.error('Password reset failed:', error)
    },
  })
}

// Custom hook for authentication state
export const useAuth = () => {
  const { data: user, isLoading: isLoadingProfile, error } = useProfile()
  const { data: isTokenValid, isLoading: isVerifyingToken } = useVerifyToken()
  
  const isAuthenticated = !!user && isTokenValid
  const isLoading = isLoadingProfile || isVerifyingToken
  
  return {
    user,
    isAuthenticated,
    isLoading,
    error,
  }
} 