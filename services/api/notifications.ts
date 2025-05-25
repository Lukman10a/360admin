import apiClient from './client'
import {
  Notification,
  CreateNotificationRequest,
  UpdateNotificationRequest,
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
} from '../types'

export const notificationsApi = {
  // Get all notifications
  getAll: async (params?: PaginationParams): Promise<PaginatedResponse<Notification>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Notification>>>('/notifications', { params })
    return response.data.data
  },

  // Get notification by ID
  getById: async (id: number): Promise<Notification> => {
    const response = await apiClient.get<ApiResponse<Notification>>(`/notifications/${id}`)
    return response.data.data
  },

  // Get notifications by target audience
  getByAudience: async (audience: 'General' | 'Subscribers' | 'Agents' | 'Vendors' | 'System Users', params?: PaginationParams): Promise<PaginatedResponse<Notification>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Notification>>>(`/notifications/audience/${audience}`, { params })
    return response.data.data
  },

  // Get active notifications
  getActive: async (params?: PaginationParams): Promise<PaginatedResponse<Notification>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Notification>>>('/notifications/active', { params })
    return response.data.data
  },

  // Create new notification
  create: async (data: CreateNotificationRequest): Promise<Notification> => {
    const response = await apiClient.post<ApiResponse<Notification>>('/notifications', data)
    return response.data.data
  },

  // Update notification
  update: async (id: number, data: UpdateNotificationRequest): Promise<Notification> => {
    const response = await apiClient.put<ApiResponse<Notification>>(`/notifications/${id}`, data)
    return response.data.data
  },

  // Delete notification
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/notifications/${id}`)
  },

  // Toggle notification status
  toggleStatus: async (id: number): Promise<Notification> => {
    const response = await apiClient.patch<ApiResponse<Notification>>(`/notifications/${id}/toggle-status`)
    return response.data.data
  },

  // Send notification immediately
  send: async (id: number): Promise<{ sent: number; failed: number }> => {
    const response = await apiClient.post<ApiResponse<{ sent: number; failed: number }>>(`/notifications/${id}/send`)
    return response.data.data
  },

  // Schedule notification
  schedule: async (id: number, scheduledAt: string): Promise<Notification> => {
    const response = await apiClient.patch<ApiResponse<Notification>>(`/notifications/${id}/schedule`, { scheduledAt })
    return response.data.data
  },

  // Get notification delivery status
  getDeliveryStatus: async (id: number): Promise<{
    total: number
    sent: number
    delivered: number
    failed: number
    pending: number
  }> => {
    const response = await apiClient.get<ApiResponse<any>>(`/notifications/${id}/delivery-status`)
    return response.data.data
  },

  // Get notification statistics
  getStats: async (period?: 'today' | 'week' | 'month' | 'year'): Promise<{
    total: number
    active: number
    sent: number
    delivered: number
    failed: number
    byAudience: Array<{ audience: string; count: number }>
  }> => {
    const response = await apiClient.get<ApiResponse<any>>('/notifications/stats', { params: { period } })
    return response.data.data
  },

  // Bulk operations
  bulkDelete: async (ids: number[]): Promise<void> => {
    await apiClient.delete('/notifications/bulk-delete', { data: { ids } })
  },

  bulkToggleStatus: async (ids: number[]): Promise<Notification[]> => {
    const response = await apiClient.patch<ApiResponse<Notification[]>>('/notifications/bulk-toggle-status', { ids })
    return response.data.data
  },

  bulkSend: async (ids: number[]): Promise<{ sent: number; failed: number }> => {
    const response = await apiClient.post<ApiResponse<{ sent: number; failed: number }>>('/notifications/bulk-send', { ids })
    return response.data.data
  },

  // Search notifications
  search: async (query: string, params?: PaginationParams): Promise<PaginatedResponse<Notification>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Notification>>>('/notifications/search', {
      params: { query, ...params }
    })
    return response.data.data
  },

  // Get notification templates
  getTemplates: async (): Promise<Array<{
    id: string
    name: string
    subject: string
    message: string
    category: string
  }>> => {
    const response = await apiClient.get<ApiResponse<any>>('/notifications/templates')
    return response.data.data
  },

  // Create notification from template
  createFromTemplate: async (templateId: string, data: {
    messageFor: 'General' | 'Subscribers' | 'Agents' | 'Vendors' | 'System Users'
    variables?: Record<string, string>
  }): Promise<Notification> => {
    const response = await apiClient.post<ApiResponse<Notification>>(`/notifications/from-template/${templateId}`, data)
    return response.data.data
  },
} 