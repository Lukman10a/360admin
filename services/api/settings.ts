import apiClient from './client'
import {
  GeneralApiSettings,
  PaystackSettings,
  MonnifySettings,
  GeneralSettings,
  ContactDetails,
  ApiResponse,
} from '../types'

export const settingsApi = {
  // General API Settings
  generalApi: {
    // Get general API settings
    get: async (): Promise<GeneralApiSettings> => {
      const response = await apiClient.get<ApiResponse<GeneralApiSettings>>('/settings/general-api')
      return response.data.data
    },

    // Update general API settings
    update: async (data: Partial<GeneralApiSettings>): Promise<GeneralApiSettings> => {
      const response = await apiClient.put<ApiResponse<GeneralApiSettings>>('/settings/general-api', data)
      return response.data.data
    },

    // Test API connection
    testConnection: async (service: 'data' | 'vtu' | 'cable' | 'electricity' | 'exam'): Promise<{ success: boolean; message: string }> => {
      const response = await apiClient.post<ApiResponse<{ success: boolean; message: string }>>(`/settings/general-api/test/${service}`)
      return response.data.data
    },

    // Get API balance
    getBalance: async (service: 'data' | 'vtu'): Promise<{ balance: number; currency: string }> => {
      const response = await apiClient.get<ApiResponse<{ balance: number; currency: string }>>(`/settings/general-api/balance/${service}`)
      return response.data.data
    },
  },

  // Paystack Settings
  paystack: {
    // Get Paystack settings
    get: async (): Promise<PaystackSettings> => {
      const response = await apiClient.get<ApiResponse<PaystackSettings>>('/settings/paystack')
      return response.data.data
    },

    // Update Paystack settings
    update: async (data: Partial<PaystackSettings>): Promise<PaystackSettings> => {
      const response = await apiClient.put<ApiResponse<PaystackSettings>>('/settings/paystack', data)
      return response.data.data
    },

    // Test Paystack connection
    testConnection: async (): Promise<{ success: boolean; message: string }> => {
      const response = await apiClient.post<ApiResponse<{ success: boolean; message: string }>>('/settings/paystack/test')
      return response.data.data
    },

    // Verify webhook
    verifyWebhook: async (signature: string, payload: string): Promise<{ valid: boolean }> => {
      const response = await apiClient.post<ApiResponse<{ valid: boolean }>>('/settings/paystack/verify-webhook', { signature, payload })
      return response.data.data
    },
  },

  // Monnify Settings
  monnify: {
    // Get Monnify settings
    get: async (): Promise<MonnifySettings> => {
      const response = await apiClient.get<ApiResponse<MonnifySettings>>('/settings/monnify')
      return response.data.data
    },

    // Update Monnify settings
    update: async (data: Partial<MonnifySettings>): Promise<MonnifySettings> => {
      const response = await apiClient.put<ApiResponse<MonnifySettings>>('/settings/monnify', data)
      return response.data.data
    },

    // Test Monnify connection
    testConnection: async (): Promise<{ success: boolean; message: string }> => {
      const response = await apiClient.post<ApiResponse<{ success: boolean; message: string }>>('/settings/monnify/test')
      return response.data.data
    },

    // Create reserved account
    createReservedAccount: async (data: { customerName: string; customerEmail: string }): Promise<{ accountNumber: string; bankName: string }> => {
      const response = await apiClient.post<ApiResponse<{ accountNumber: string; bankName: string }>>('/settings/monnify/create-account', data)
      return response.data.data
    },
  },

  // General Settings
  general: {
    // Get general settings
    get: async (): Promise<GeneralSettings> => {
      const response = await apiClient.get<ApiResponse<GeneralSettings>>('/settings/general')
      return response.data.data
    },

    // Update general settings
    update: async (data: Partial<GeneralSettings>): Promise<GeneralSettings> => {
      const response = await apiClient.put<ApiResponse<GeneralSettings>>('/settings/general', data)
      return response.data.data
    },

    // Reset to defaults
    resetToDefaults: async (): Promise<GeneralSettings> => {
      const response = await apiClient.post<ApiResponse<GeneralSettings>>('/settings/general/reset')
      return response.data.data
    },
  },

  // Contact Details
  contact: {
    // Get contact details
    get: async (): Promise<ContactDetails> => {
      const response = await apiClient.get<ApiResponse<ContactDetails>>('/settings/contact')
      return response.data.data
    },

    // Update contact details
    update: async (data: Partial<ContactDetails>): Promise<ContactDetails> => {
      const response = await apiClient.put<ApiResponse<ContactDetails>>('/settings/contact', data)
      return response.data.data
    },

    // Verify social media links
    verifySocialLinks: async (): Promise<{ [key: string]: { valid: boolean; message: string } }> => {
      const response = await apiClient.post<ApiResponse<any>>('/settings/contact/verify-social-links')
      return response.data.data
    },
  },

  // System Settings
  system: {
    // Get system information
    getInfo: async (): Promise<{
      version: string
      environment: string
      uptime: number
      lastBackup: string
      diskUsage: number
      memoryUsage: number
    }> => {
      const response = await apiClient.get<ApiResponse<any>>('/settings/system/info')
      return response.data.data
    },

    // Get system logs
    getLogs: async (level?: 'error' | 'warn' | 'info' | 'debug', limit?: number): Promise<Array<{
      timestamp: string
      level: string
      message: string
      meta?: any
    }>> => {
      const response = await apiClient.get<ApiResponse<any>>('/settings/system/logs', { params: { level, limit } })
      return response.data.data
    },

    // Clear logs
    clearLogs: async (): Promise<void> => {
      await apiClient.delete('/settings/system/logs')
    },

    // Create backup
    createBackup: async (): Promise<{ filename: string; size: number; created: string }> => {
      const response = await apiClient.post<ApiResponse<any>>('/settings/system/backup')
      return response.data.data
    },

    // Get backup list
    getBackups: async (): Promise<Array<{
      filename: string
      size: number
      created: string
    }>> => {
      const response = await apiClient.get<ApiResponse<any>>('/settings/system/backups')
      return response.data.data
    },

    // Download backup
    downloadBackup: async (filename: string): Promise<Blob> => {
      const response = await apiClient.get(`/settings/system/backups/${filename}`, {
        responseType: 'blob',
      })
      return response.data
    },

    // Restore backup
    restoreBackup: async (filename: string): Promise<{ success: boolean; message: string }> => {
      const response = await apiClient.post<ApiResponse<{ success: boolean; message: string }>>(`/settings/system/restore/${filename}`)
      return response.data.data
    },

    // Update system
    update: async (): Promise<{ success: boolean; message: string; version: string }> => {
      const response = await apiClient.post<ApiResponse<any>>('/settings/system/update')
      return response.data.data
    },

    // Restart system
    restart: async (): Promise<void> => {
      await apiClient.post('/settings/system/restart')
    },
  },

  // Configuration Management
  config: {
    // Export all settings
    exportAll: async (): Promise<Blob> => {
      const response = await apiClient.get('/settings/export', {
        responseType: 'blob',
      })
      return response.data
    },

    // Import settings
    importSettings: async (file: File): Promise<{ success: boolean; message: string; imported: string[] }> => {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await apiClient.post<ApiResponse<any>>('/settings/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data.data
    },

    // Validate settings
    validate: async (): Promise<{ valid: boolean; errors: string[] }> => {
      const response = await apiClient.post<ApiResponse<{ valid: boolean; errors: string[] }>>('/settings/validate')
      return response.data.data
    },

    // Reset all settings
    resetAll: async (): Promise<void> => {
      await apiClient.post('/settings/reset-all')
    },
  },
} 