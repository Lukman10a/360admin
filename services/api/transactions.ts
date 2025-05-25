import apiClient from './client'
import {
  Transaction,
  TransactionFilters,
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
} from '../types'

export const transactionsApi = {
  // Get all transactions with filters
  getAll: async (filters?: TransactionFilters): Promise<PaginatedResponse<Transaction>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Transaction>>>('/transactions', { params: filters })
    return response.data.data
  },

  // Get transaction by ID
  getById: async (id: number): Promise<Transaction> => {
    const response = await apiClient.get<ApiResponse<Transaction>>(`/transactions/${id}`)
    return response.data.data
  },

  // Get transaction by reference ID
  getByRefId: async (refId: string): Promise<Transaction> => {
    const response = await apiClient.get<ApiResponse<Transaction>>(`/transactions/ref/${refId}`)
    return response.data.data
  },

  // Get user transactions
  getUserTransactions: async (userId: number, params?: PaginationParams): Promise<PaginatedResponse<Transaction>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Transaction>>>(`/transactions/user/${userId}`, { params })
    return response.data.data
  },

  // Get transactions by status
  getByStatus: async (status: 'Success' | 'Failed' | 'Pending' | 'Processing', params?: PaginationParams): Promise<PaginatedResponse<Transaction>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Transaction>>>(`/transactions/status/${status}`, { params })
    return response.data.data
  },

  // Get transactions by type
  getByType: async (type: string, params?: PaginationParams): Promise<PaginatedResponse<Transaction>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Transaction>>>(`/transactions/type/${type}`, { params })
    return response.data.data
  },

  // Get transactions by date range
  getByDateRange: async (dateFrom: string, dateTo: string, params?: PaginationParams): Promise<PaginatedResponse<Transaction>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Transaction>>>('/transactions/date-range', {
      params: { dateFrom, dateTo, ...params }
    })
    return response.data.data
  },

  // Create new transaction
  create: async (data: {
    userId: number
    service: string
    description: string
    amount: number
    type: string
    metadata?: Record<string, any>
  }): Promise<Transaction> => {
    const response = await apiClient.post<ApiResponse<Transaction>>('/transactions', data)
    return response.data.data
  },

  // Update transaction status
  updateStatus: async (id: number, status: 'Success' | 'Failed' | 'Pending' | 'Processing', reason?: string): Promise<Transaction> => {
    const response = await apiClient.patch<ApiResponse<Transaction>>(`/transactions/${id}/status`, { status, reason })
    return response.data.data
  },

  // Retry failed transaction
  retry: async (id: number): Promise<Transaction> => {
    const response = await apiClient.post<ApiResponse<Transaction>>(`/transactions/${id}/retry`)
    return response.data.data
  },

  // Cancel pending transaction
  cancel: async (id: number, reason: string): Promise<Transaction> => {
    const response = await apiClient.patch<ApiResponse<Transaction>>(`/transactions/${id}/cancel`, { reason })
    return response.data.data
  },

  // Refund transaction
  refund: async (id: number, reason: string, amount?: number): Promise<Transaction> => {
    const response = await apiClient.post<ApiResponse<Transaction>>(`/transactions/${id}/refund`, { reason, amount })
    return response.data.data
  },

  // Get transaction statistics
  getStats: async (period?: 'today' | 'week' | 'month' | 'year'): Promise<{
    total: number
    successful: number
    failed: number
    pending: number
    totalAmount: number
    successfulAmount: number
    averageAmount: number
  }> => {
    const response = await apiClient.get<ApiResponse<any>>('/transactions/stats', { params: { period } })
    return response.data.data
  },

  // Get transaction summary by service
  getServiceSummary: async (period?: 'today' | 'week' | 'month' | 'year'): Promise<Array<{
    service: string
    count: number
    amount: number
    successRate: number
  }>> => {
    const response = await apiClient.get<ApiResponse<any>>('/transactions/service-summary', { params: { period } })
    return response.data.data
  },

  // Get transaction summary by user type
  getUserTypeSummary: async (period?: 'today' | 'week' | 'month' | 'year'): Promise<Array<{
    userType: string
    count: number
    amount: number
    successRate: number
  }>> => {
    const response = await apiClient.get<ApiResponse<any>>('/transactions/user-type-summary', { params: { period } })
    return response.data.data
  },

  // Export transactions to CSV
  exportToCsv: async (filters?: TransactionFilters): Promise<Blob> => {
    const response = await apiClient.get('/transactions/export-csv', {
      params: filters,
      responseType: 'blob',
    })
    return response.data
  },

  // Export transactions to Excel
  exportToExcel: async (filters?: TransactionFilters): Promise<Blob> => {
    const response = await apiClient.get('/transactions/export-excel', {
      params: filters,
      responseType: 'blob',
    })
    return response.data
  },

  // Get recent transactions for dashboard
  getRecent: async (limit: number = 10): Promise<Transaction[]> => {
    const response = await apiClient.get<ApiResponse<Transaction[]>>('/transactions/recent', { params: { limit } })
    return response.data.data
  },

  // Search transactions
  search: async (query: string, params?: PaginationParams): Promise<PaginatedResponse<Transaction>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Transaction>>>('/transactions/search', {
      params: { query, ...params }
    })
    return response.data.data
  },

  // Bulk update transactions
  bulkUpdate: async (updates: Array<{ id: number; status: string; reason?: string }>): Promise<Transaction[]> => {
    const response = await apiClient.patch<ApiResponse<Transaction[]>>('/transactions/bulk-update', { updates })
    return response.data.data
  },

  // Get transaction analytics
  getAnalytics: async (period?: 'today' | 'week' | 'month' | 'year'): Promise<{
    dailyStats: Array<{ date: string; count: number; amount: number }>
    hourlyStats: Array<{ hour: number; count: number; amount: number }>
    statusDistribution: Array<{ status: string; count: number; percentage: number }>
    serviceDistribution: Array<{ service: string; count: number; percentage: number }>
  }> => {
    const response = await apiClient.get<ApiResponse<any>>('/transactions/analytics', { params: { period } })
    return response.data.data
  },
} 