import apiClient from './client'
import {
  DashboardStats,
  RecentTransaction,
  ApiResponse,
} from '../types'

export const dashboardApi = {
  // Get dashboard statistics
  getStats: async (): Promise<DashboardStats> => {
    const response = await apiClient.get<ApiResponse<DashboardStats>>('/dashboard/stats')
    return response.data.data
  },

  // Get recent transactions for dashboard
  getRecentTransactions: async (limit: number = 10): Promise<RecentTransaction[]> => {
    const response = await apiClient.get<ApiResponse<RecentTransaction[]>>('/dashboard/recent-transactions', {
      params: { limit }
    })
    return response.data.data
  },

  // Get dashboard analytics
  getAnalytics: async (period?: 'today' | 'week' | 'month' | 'year'): Promise<{
    revenue: Array<{ date: string; amount: number }>
    transactions: Array<{ date: string; count: number }>
    users: Array<{ date: string; count: number }>
    services: Array<{ service: string; count: number; amount: number }>
  }> => {
    const response = await apiClient.get<ApiResponse<any>>('/dashboard/analytics', {
      params: { period }
    })
    return response.data.data
  },

  // Get service performance
  getServicePerformance: async (period?: 'today' | 'week' | 'month' | 'year'): Promise<Array<{
    service: string
    transactions: number
    revenue: number
    successRate: number
    growth: number
  }>> => {
    const response = await apiClient.get<ApiResponse<any>>('/dashboard/service-performance', {
      params: { period }
    })
    return response.data.data
  },

  // Get user activity
  getUserActivity: async (period?: 'today' | 'week' | 'month' | 'year'): Promise<{
    activeUsers: number
    newUsers: number
    returningUsers: number
    userGrowth: number
    activityByHour: Array<{ hour: number; count: number }>
  }> => {
    const response = await apiClient.get<ApiResponse<any>>('/dashboard/user-activity', {
      params: { period }
    })
    return response.data.data
  },

  // Get revenue breakdown
  getRevenueBreakdown: async (period?: 'today' | 'week' | 'month' | 'year'): Promise<{
    total: number
    byService: Array<{ service: string; amount: number; percentage: number }>
    byUserType: Array<{ userType: string; amount: number; percentage: number }>
    growth: number
  }> => {
    const response = await apiClient.get<ApiResponse<any>>('/dashboard/revenue-breakdown', {
      params: { period }
    })
    return response.data.data
  },

  // Get system health
  getSystemHealth: async (): Promise<{
    status: 'healthy' | 'warning' | 'critical'
    uptime: number
    responseTime: number
    errorRate: number
    activeConnections: number
    memoryUsage: number
    diskUsage: number
    services: Array<{
      name: string
      status: 'online' | 'offline' | 'degraded'
      responseTime: number
    }>
  }> => {
    const response = await apiClient.get<ApiResponse<any>>('/dashboard/system-health')
    return response.data.data
  },

  // Get alerts and notifications
  getAlerts: async (): Promise<Array<{
    id: number
    type: 'info' | 'warning' | 'error' | 'success'
    title: string
    message: string
    timestamp: string
    read: boolean
  }>> => {
    const response = await apiClient.get<ApiResponse<any>>('/dashboard/alerts')
    return response.data.data
  },

  // Mark alert as read
  markAlertAsRead: async (id: number): Promise<void> => {
    await apiClient.patch(`/dashboard/alerts/${id}/read`)
  },

  // Mark all alerts as read
  markAllAlertsAsRead: async (): Promise<void> => {
    await apiClient.patch('/dashboard/alerts/read-all')
  },

  // Get quick actions data
  getQuickActions: async (): Promise<Array<{
    id: string
    title: string
    description: string
    icon: string
    count?: number
    url: string
    color: string
  }>> => {
    const response = await apiClient.get<ApiResponse<any>>('/dashboard/quick-actions')
    return response.data.data
  },

  // Get top performers
  getTopPerformers: async (period?: 'today' | 'week' | 'month' | 'year'): Promise<{
    users: Array<{ id: number; name: string; transactions: number; revenue: number }>
    services: Array<{ name: string; transactions: number; revenue: number }>
    agents: Array<{ id: number; name: string; transactions: number; revenue: number }>
  }> => {
    const response = await apiClient.get<ApiResponse<any>>('/dashboard/top-performers', {
      params: { period }
    })
    return response.data.data
  },

  // Export dashboard data
  exportData: async (period?: 'today' | 'week' | 'month' | 'year', format?: 'csv' | 'excel' | 'pdf'): Promise<Blob> => {
    const response = await apiClient.get('/dashboard/export', {
      params: { period, format },
      responseType: 'blob',
    })
    return response.data
  },
} 