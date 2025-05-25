import apiClient from './client'
import {
  AirtimeDiscount,
  CreateAirtimeDiscountRequest,
  UpdateAirtimeDiscountRequest,
  DataPlan,
  CreateDataPlanRequest,
  UpdateDataPlanRequest,
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
} from '../types'

// Airtime Discounts API
export const airtimeDiscountsApi = {
  // Get all airtime discounts
  getAll: async (params?: PaginationParams): Promise<PaginatedResponse<AirtimeDiscount>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<AirtimeDiscount>>>('/airtime-discounts', { params })
    return response.data.data
  },

  // Get airtime discount by ID
  getById: async (id: number): Promise<AirtimeDiscount> => {
    const response = await apiClient.get<ApiResponse<AirtimeDiscount>>(`/airtime-discounts/${id}`)
    return response.data.data
  },

  // Get airtime discount by network
  getByNetwork: async (network: 'MTN' | 'Glo' | 'Airtel' | '9mobile'): Promise<AirtimeDiscount> => {
    const response = await apiClient.get<ApiResponse<AirtimeDiscount>>(`/airtime-discounts/network/${network}`)
    return response.data.data
  },

  // Create new airtime discount
  create: async (data: CreateAirtimeDiscountRequest): Promise<AirtimeDiscount> => {
    const response = await apiClient.post<ApiResponse<AirtimeDiscount>>('/airtime-discounts', data)
    return response.data.data
  },

  // Update airtime discount
  update: async (id: number, data: UpdateAirtimeDiscountRequest): Promise<AirtimeDiscount> => {
    const response = await apiClient.put<ApiResponse<AirtimeDiscount>>(`/airtime-discounts/${id}`, data)
    return response.data.data
  },

  // Delete airtime discount
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/airtime-discounts/${id}`)
  },

  // Toggle discount status
  toggleStatus: async (id: number): Promise<AirtimeDiscount> => {
    const response = await apiClient.patch<ApiResponse<AirtimeDiscount>>(`/airtime-discounts/${id}/toggle-status`)
    return response.data.data
  },

  // Bulk update discounts
  bulkUpdate: async (updates: Array<{ id: number; data: UpdateAirtimeDiscountRequest }>): Promise<AirtimeDiscount[]> => {
    const response = await apiClient.patch<ApiResponse<AirtimeDiscount[]>>('/airtime-discounts/bulk-update', { updates })
    return response.data.data
  },
}

// Data Plans API
export const dataPlansApi = {
  // Get all data plans
  getAll: async (params?: PaginationParams & { network?: string; dataType?: string }): Promise<PaginatedResponse<DataPlan>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<DataPlan>>>('/data-plans', { params })
    return response.data.data
  },

  // Get data plan by ID
  getById: async (id: number): Promise<DataPlan> => {
    const response = await apiClient.get<ApiResponse<DataPlan>>(`/data-plans/${id}`)
    return response.data.data
  },

  // Get data plans by network
  getByNetwork: async (network: 'MTN' | 'Glo' | 'Airtel' | '9mobile', params?: PaginationParams): Promise<PaginatedResponse<DataPlan>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<DataPlan>>>(`/data-plans/network/${network}`, { params })
    return response.data.data
  },

  // Get data plans by type
  getByType: async (dataType: 'Gifting' | 'SME' | 'Corporate' | 'Direct', params?: PaginationParams): Promise<PaginatedResponse<DataPlan>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<DataPlan>>>(`/data-plans/type/${dataType}`, { params })
    return response.data.data
  },

  // Create new data plan
  create: async (data: CreateDataPlanRequest): Promise<DataPlan> => {
    const response = await apiClient.post<ApiResponse<DataPlan>>('/data-plans', data)
    return response.data.data
  },

  // Update data plan
  update: async (id: number, data: UpdateDataPlanRequest): Promise<DataPlan> => {
    const response = await apiClient.put<ApiResponse<DataPlan>>(`/data-plans/${id}`, data)
    return response.data.data
  },

  // Delete data plan
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/data-plans/${id}`)
  },

  // Toggle plan status
  toggleStatus: async (id: number): Promise<DataPlan> => {
    const response = await apiClient.patch<ApiResponse<DataPlan>>(`/data-plans/${id}/toggle-status`)
    return response.data.data
  },

  // Bulk update plans
  bulkUpdate: async (updates: Array<{ id: number; data: UpdateDataPlanRequest }>): Promise<DataPlan[]> => {
    const response = await apiClient.patch<ApiResponse<DataPlan[]>>('/data-plans/bulk-update', { updates })
    return response.data.data
  },

  // Duplicate plan
  duplicate: async (id: number, overrides?: Partial<CreateDataPlanRequest>): Promise<DataPlan> => {
    const response = await apiClient.post<ApiResponse<DataPlan>>(`/data-plans/${id}/duplicate`, overrides)
    return response.data.data
  },

  // Import plans from CSV
  importFromCsv: async (file: File): Promise<{ success: number; failed: number; errors: string[] }> => {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await apiClient.post<ApiResponse<{ success: number; failed: number; errors: string[] }>>(
      '/data-plans/import-csv',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return response.data.data
  },

  // Export plans to CSV
  exportToCsv: async (filters?: { network?: string; dataType?: string; status?: string }): Promise<Blob> => {
    const response = await apiClient.get('/data-plans/export-csv', {
      params: filters,
      responseType: 'blob',
    })
    return response.data
  },
}

// Service Statistics API
export const serviceStatsApi = {
  // Get airtime statistics
  getAirtimeStats: async (period?: 'today' | 'week' | 'month' | 'year'): Promise<any> => {
    const response = await apiClient.get<ApiResponse<any>>('/services/stats/airtime', { params: { period } })
    return response.data.data
  },

  // Get data plan statistics
  getDataPlanStats: async (period?: 'today' | 'week' | 'month' | 'year'): Promise<any> => {
    const response = await apiClient.get<ApiResponse<any>>('/services/stats/data-plans', { params: { period } })
    return response.data.data
  },

  // Get network performance
  getNetworkPerformance: async (period?: 'today' | 'week' | 'month' | 'year'): Promise<any> => {
    const response = await apiClient.get<ApiResponse<any>>('/services/stats/network-performance', { params: { period } })
    return response.data.data
  },

  // Get revenue statistics
  getRevenueStats: async (period?: 'today' | 'week' | 'month' | 'year'): Promise<any> => {
    const response = await apiClient.get<ApiResponse<any>>('/services/stats/revenue', { params: { period } })
    return response.data.data
  },
} 