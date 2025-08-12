import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'
import { ApiService } from '../api/api-service'
import { setAuthToken, getAuthToken } from '../api'
import {
  LoginRequest, LoginResponse, RegisterRequest, RegisterResponse,
  UpdateUserRequest, UpdateUserResponse, DeleteUserResponse, UpgradeUserResponse,
  RequestPasswordResetRequest, RequestPasswordResetResponse,
  ResetPasswordRequest, ResetPasswordResponse, ChangePasswordRequest, ChangePasswordResponse,
  ApiSuccessResponse
} from '../types'

// ============================================================================
// AUTHENTICATION HOOKS
// ============================================================================

// User Profile Query
export const useUserProfile = (options?: UseQueryOptions<ApiSuccessResponse<any>>) => {
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: () => ApiService.getUserProfile(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!getAuthToken(), // Only fetch if user is authenticated
    ...options,
  })
}

// User Login Mutation
export const useLogin = (options?: UseMutationOptions<LoginResponse, Error, LoginRequest>) => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (request: LoginRequest) => ApiService.login(request),
    onSuccess: (data) => {
      // Set auth token
      setAuthToken(data.token)
      
      // Invalidate user profile to refetch with new token
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] })
      
      // Clear any error states
      queryClient.setQueryData(['auth', 'error'], null)
    },
    onError: (error) => {
      // Set error state
      queryClient.setQueryData(['auth', 'error'], error.message)
    },
    ...options,
  })
}

// User Registration Mutation
export const useRegister = (options?: UseMutationOptions<RegisterResponse, Error, RegisterRequest>) => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (request: RegisterRequest) => ApiService.register(request),
    onSuccess: (data) => {
      // Set auth token
      setAuthToken(data.token)
      
      // Invalidate user profile to refetch with new token
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] })
      
      // Clear any error states
      queryClient.setQueryData(['auth', 'error'], null)
    },
    onError: (error) => {
      // Set error state
      queryClient.setQueryData(['auth', 'error'], error.message)
    },
    ...options,
  })
}

// User Logout
export const useLogout = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async () => {
      // Clear auth token
      setAuthToken(null)
      
      // Clear all user-related queries
      queryClient.removeQueries({ queryKey: ['user'] })
      queryClient.removeQueries({ queryKey: ['transactions'] })
      
      // Reset auth state
      queryClient.setQueryData(['auth', 'user'], null)
      queryClient.setQueryData(['auth', 'error'], null)
      
      return Promise.resolve()
    },
  })
}

// Check Authentication Status
export const useAuthStatus = () => {
  const token = getAuthToken()
  const { data: user, isLoading, error } = useUserProfile()
  
  return {
    isAuthenticated: !!token && !!user,
    isLoading,
    user: user?.data || null,
    error,
    token,
  }
}

// ============================================================================
// USER MANAGEMENT HOOKS
// ============================================================================

// Update User Profile Mutation
export const useUpdateProfile = (options?: UseMutationOptions<UpdateUserResponse, Error, { id: string; request: UpdateUserRequest }>) => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, request }: { id: string; request: UpdateUserRequest }) => 
      ApiService.updateUser(id, request),
    onSuccess: (_, { id }) => {
      // Invalidate user profile and specific user
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] })
      queryClient.invalidateQueries({ queryKey: ['user', id] })
    },
    ...options,
  })
}

// Delete User Account Mutation
export const useDeleteAccount = (options?: UseMutationOptions<DeleteUserResponse, Error, string>) => {
  const queryClient = useQueryClient()
  const logoutMutation = useLogout()
  
  return useMutation({
    mutationFn: (id: string) => ApiService.deleteUser(id),
    onSuccess: (_, id) => {
      // Remove user from cache
      queryClient.removeQueries({ queryKey: ['user', id] })
      queryClient.invalidateQueries({ queryKey: ['users'] })
      
      // Logout user after account deletion
      logoutMutation.mutate()
    },
    ...options,
  })
}

// Upgrade User Account Mutation
export const useUpgradeAccount = (options?: UseMutationOptions<UpgradeUserResponse, Error, void>) => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: () => ApiService.upgradeUser(),
    onSuccess: () => {
      // Invalidate user profile
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] })
    },
    ...options,
  })
}

// ============================================================================
// PASSWORD MANAGEMENT HOOKS
// ============================================================================

// Request Password Reset Mutation
export const useRequestPasswordReset = (options?: UseMutationOptions<RequestPasswordResetResponse, Error, RequestPasswordResetRequest>) => {
  return useMutation({
    mutationFn: (request: RequestPasswordResetRequest) => ApiService.requestPasswordReset(request),
    ...options,
  })
}

// Reset Password Mutation
export const useResetPassword = (options?: UseMutationOptions<ResetPasswordResponse, Error, ResetPasswordRequest>) => {
  return useMutation({
    mutationFn: (request: ResetPasswordRequest) => ApiService.resetPassword(request),
    ...options,
  })
}

// Change Password Mutation
export const useChangePassword = (options?: UseMutationOptions<ChangePasswordResponse, Error, ChangePasswordRequest>) => {
  return useMutation({
    mutationFn: (request: ChangePasswordRequest) => ApiService.changePassword(request),
    ...options,
  })
}

// ============================================================================
// AUTH STATE MANAGEMENT
// ============================================================================

// Get Auth Error
export const useAuthError = () => {
  return useQuery({
    queryKey: ['auth', 'error'],
    queryFn: () => null,
    staleTime: Infinity,
    gcTime: Infinity,
  })
}

// Set Auth Error
export const useSetAuthError = () => {
  const queryClient = useQueryClient()
  
  const setError = (error: string | null) => {
    queryClient.setQueryData(['auth', 'error'], error)
  }
  
  const clearError = () => {
    queryClient.setQueryData(['auth', 'error'], null)
  }
  
  return { setError, clearError }
}

// ============================================================================
// AUTH GUARDS & PROTECTION
// ============================================================================

// Require Authentication Hook
export const useRequireAuth = (redirectTo?: string) => {
  const { isAuthenticated, isLoading, user } = useAuthStatus()
  
  // You can add router logic here if needed
  // const router = useRouter()
  
  // useEffect(() => {
  //   if (!isLoading && !isAuthenticated && redirectTo) {
  //     router.push(redirectTo)
  //   }
  // }, [isAuthenticated, isLoading, redirectTo, router])
  
  return {
    isAuthenticated,
    isLoading,
    user,
    requireAuth: !isLoading && !isAuthenticated,
  }
}

// Optional Authentication Hook
export const useOptionalAuth = () => {
  const { isAuthenticated, isLoading, user } = useAuthStatus()
  
  return {
    isAuthenticated,
    isLoading,
    user,
    isReady: !isLoading,
  }
}

// ============================================================================
// AUTH PERSISTENCE
// ============================================================================

// Persist Auth State
export const usePersistAuth = () => {
  const queryClient = useQueryClient()
  
  const persistAuth = () => {
    const token = getAuthToken()
    if (token) {
      // Prefetch user profile if token exists
      queryClient.prefetchQuery({
        queryKey: ['user', 'profile'],
        queryFn: () => ApiService.getUserProfile(),
        staleTime: 5 * 60 * 1000,
      })
    }
  }
  
  return { persistAuth }
}

// Auto-refresh Auth Token
export const useAutoRefreshAuth = () => {
  const queryClient = useQueryClient()
  
  const refreshAuth = () => {
    // Implement token refresh logic here if needed
    // For now, just invalidate user profile to refetch
    queryClient.invalidateQueries({ queryKey: ['user', 'profile'] })
  }
  
  return { refreshAuth }
} 