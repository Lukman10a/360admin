import apiClient from './client'
import {
  SystemUser,
  CreateSystemUserRequest,
  UpdateSystemUserRequest,
  Subscriber,
  CreateSubscriberRequest,
  UpdateSubscriberRequest,
  CreditUser,
  CreditUserAction,
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
} from '../types'
import {
  mockSystemUsers,
  mockSubscribers,
  mockCreditUsers,
  createMockPaginatedResponse,
  createMockResponse,
  mockDelay,
  shouldUseMockData
} from './mock-data'

// System Users API
export const systemUsersApi = {
  // Get all system users
  getAll: async (params?: PaginationParams): Promise<PaginatedResponse<SystemUser>> => {
    if (shouldUseMockData()) {
      await mockDelay()
      const response = createMockPaginatedResponse(mockSystemUsers, params?.page, params?.limit)
      return response.data
    }
    
    try {
      const response = await apiClient.get<ApiResponse<PaginatedResponse<SystemUser>>>('/system-users', { params })
      return response.data.data
    } catch (error) {
      // Fallback to mock data on error
      await mockDelay()
      const response = createMockPaginatedResponse(mockSystemUsers, params?.page, params?.limit)
      return response.data
    }
  },

  // Get system user by ID
  getById: async (id: number): Promise<SystemUser> => {
    const response = await apiClient.get<ApiResponse<SystemUser>>(`/system-users/${id}`)
    return response.data.data
  },

  // Create new system user
  create: async (data: CreateSystemUserRequest): Promise<SystemUser> => {
    if (shouldUseMockData()) {
      await mockDelay()
      const newUser: SystemUser = {
        id: Math.max(...mockSystemUsers.map(u => u.id)) + 1,
        fullName: data.fullName,
        username: data.username,
        email: data.email,
        role: data.role,
        status: 'Active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      mockSystemUsers.push(newUser)
      return newUser
    }
    
    try {
      const response = await apiClient.post<ApiResponse<SystemUser>>('/system-users', data)
      return response.data.data
    } catch (error) {
      // Fallback to mock creation
      await mockDelay()
      const newUser: SystemUser = {
        id: Math.max(...mockSystemUsers.map(u => u.id)) + 1,
        fullName: data.fullName,
        username: data.username,
        email: data.email,
        role: data.role,
        status: 'Active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      mockSystemUsers.push(newUser)
      return newUser
    }
  },

  // Update system user
  update: async (id: number, data: UpdateSystemUserRequest): Promise<SystemUser> => {
    const response = await apiClient.put<ApiResponse<SystemUser>>(`/system-users/${id}`, data)
    return response.data.data
  },

  // Delete system user
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/system-users/${id}`)
  },

  // Toggle user status
  toggleStatus: async (id: number): Promise<SystemUser> => {
    const response = await apiClient.patch<ApiResponse<SystemUser>>(`/system-users/${id}/toggle-status`)
    return response.data.data
  },
}

// Subscribers API
export const subscribersApi = {
  // Get all subscribers
  getAll: async (params?: PaginationParams): Promise<PaginatedResponse<Subscriber>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Subscriber>>>('/subscribers', { params })
    return response.data.data
  },

  // Get subscriber by ID
  getById: async (id: number): Promise<Subscriber> => {
    const response = await apiClient.get<ApiResponse<Subscriber>>(`/subscribers/${id}`)
    return response.data.data
  },

  // Create new subscriber
  create: async (data: CreateSubscriberRequest): Promise<Subscriber> => {
    const response = await apiClient.post<ApiResponse<Subscriber>>('/subscribers', data)
    return response.data.data
  },

  // Update subscriber
  update: async (id: number, data: UpdateSubscriberRequest): Promise<Subscriber> => {
    const response = await apiClient.put<ApiResponse<Subscriber>>(`/subscribers/${id}`, data)
    return response.data.data
  },

  // Delete subscriber
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/subscribers/${id}`)
  },

  // Toggle subscriber status
  toggleStatus: async (id: number): Promise<Subscriber> => {
    const response = await apiClient.patch<ApiResponse<Subscriber>>(`/subscribers/${id}/toggle-status`)
    return response.data.data
  },

  // Upgrade subscriber account
  upgradeAccount: async (id: number, accountType: 'Agent' | 'Vendor'): Promise<Subscriber> => {
    const response = await apiClient.patch<ApiResponse<Subscriber>>(`/subscribers/${id}/upgrade`, { accountType })
    return response.data.data
  },

  // Credit/Debit subscriber wallet
  updateWallet: async (id: number, data: { action: 'credit' | 'debit'; amount: number; reason: string }): Promise<Subscriber> => {
    const response = await apiClient.patch<ApiResponse<Subscriber>>(`/subscribers/${id}/wallet`, data)
    return response.data.data
  },
}

// Credit Users API
export const creditUsersApi = {
  // Get all credit users
  getAll: async (params?: PaginationParams): Promise<PaginatedResponse<CreditUser>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<CreditUser>>>('/credit-users', { params })
    return response.data.data
  },

  // Get credit user by ID
  getById: async (id: number): Promise<CreditUser> => {
    const response = await apiClient.get<ApiResponse<CreditUser>>(`/credit-users/${id}`)
    return response.data.data
  },

  // Get credit user by email
  getByEmail: async (email: string): Promise<CreditUser> => {
    const response = await apiClient.get<ApiResponse<CreditUser>>(`/credit-users/email/${email}`)
    return response.data.data
  },

  // Create new credit user
  create: async (data: { email: string; fullName: string; phone: string; initialBalance?: number }): Promise<CreditUser> => {
    const response = await apiClient.post<ApiResponse<CreditUser>>('/credit-users', data)
    return response.data.data
  },

  // Update credit user
  update: async (id: number, data: { fullName?: string; phone?: string; status?: 'Active' | 'Inactive' }): Promise<CreditUser> => {
    const response = await apiClient.put<ApiResponse<CreditUser>>(`/credit-users/${id}`, data)
    return response.data.data
  },

  // Delete credit user
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/credit-users/${id}`)
  },

  // Credit/Debit user balance
  updateBalance: async (data: CreditUserAction): Promise<CreditUser> => {
    const response = await apiClient.post<ApiResponse<CreditUser>>('/credit-users/balance', data)
    return response.data.data
  },

  // Get user balance history
  getBalanceHistory: async (id: number, params?: PaginationParams): Promise<PaginatedResponse<any>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<any>>>(`/credit-users/${id}/balance-history`, { params })
    return response.data.data
  },

  // Toggle user status
  toggleStatus: async (id: number): Promise<CreditUser> => {
    const response = await apiClient.patch<ApiResponse<CreditUser>>(`/credit-users/${id}/toggle-status`)
    return response.data.data
  },
} 