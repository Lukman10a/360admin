import apiClient from '../infrastructure/client'
import { ENDPOINTS } from '../infrastructure/endpoint'
import { shouldUseMockData, mockDelay } from '../infrastructure/mock-data'

// Note: The actual API only supports user authentication and profile management
// Admin user management (system users, subscribers, credit users) is not supported
// These services are kept for UI compatibility but will need to be implemented
// when the actual admin API endpoints are available

// System Users API - Not supported by actual API
export const systemUsersApi = {
  // Placeholder - actual API doesn't support this
  getAll: async (params?: any): Promise<any> => {
    throw new Error('System user management not supported by current API')
  },
  getById: async (id: number): Promise<any> => {
    throw new Error('System user management not supported by current API')
  },
  create: async (data: any): Promise<any> => {
    throw new Error('System user management not supported by current API')
  },
  update: async (id: number, data: any): Promise<any> => {
    throw new Error('System user management not supported by current API')
  },
  delete: async (id: number): Promise<any> => {
    throw new Error('System user management not supported by current API')
  },
  toggleStatus: async (id: number): Promise<any> => {
    throw new Error('System user management not supported by current API')
  },
}

// Subscribers API - Not supported by actual API
export const subscribersApi = {
  // Placeholder - actual API doesn't support this
  getAll: async (params?: any): Promise<any> => {
    throw new Error('Subscriber management not supported by current API')
  },
  getById: async (id: number): Promise<any> => {
    throw new Error('Subscriber management not supported by current API')
  },
  create: async (data: any): Promise<any> => {
    throw new Error('Subscriber management not supported by current API')
  },
  update: async (id: number, data: any): Promise<any> => {
    throw new Error('Subscriber management not supported by current API')
  },
  delete: async (id: number): Promise<any> => {
    throw new Error('Subscriber management not supported by current API')
  },
  toggleStatus: async (id: number): Promise<any> => {
    throw new Error('Subscriber management not supported by current API')
  },
  upgradeAccount: async (id: number, accountType: string): Promise<any> => {
    throw new Error('Subscriber management not supported by current API')
  },
  updateWallet: async (id: number, data: any): Promise<any> => {
    throw new Error('Subscriber management not supported by current API')
  },
}

// Credit Users API - Not supported by current API
export const creditUsersApi = {
  // Placeholder - actual API doesn't support this
  getAll: async (params?: any): Promise<any> => {
    throw new Error('Credit user management not supported by current API')
  },
  getById: async (id: number): Promise<any> => {
    throw new Error('Credit user management not supported by current API')
  },
  create: async (data: any): Promise<any> => {
    throw new Error('Credit user management not supported by current API')
  },
  update: async (id: number, data: any): Promise<any> => {
    throw new Error('Credit user management not supported by current API')
  },
  delete: async (id: number): Promise<any> => {
    throw new Error('Credit user management not supported by current API')
  },
  toggleStatus: async (id: number): Promise<any> => {
    throw new Error('Credit user management not supported by current API')
  },
  getByEmail: async (email: string): Promise<any> => {
    throw new Error('Credit user management not supported by current API')
  },
  updateBalance: async (data: any): Promise<any> => {
    throw new Error('Credit user management not supported by current API')
  },
  getBalanceHistory: async (id: number, params?: any): Promise<any> => {
    throw new Error('Credit user management not supported by current API')
  },
  creditAccount: async (): Promise<any> => {
    throw new Error('Credit user management not supported by current API')
  },
  debitAccount: async (): Promise<any> => {
    throw new Error('Credit user management not supported by current API')
  },
  getBalance: async (): Promise<any> => {
    throw new Error('Credit user management not supported by current API')
  },
  updateCreditLimit: async (): Promise<any> => {
    throw new Error('Credit user management not supported by current API')
  },
} 