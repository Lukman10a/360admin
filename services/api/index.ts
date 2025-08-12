// Import all APIs first
import { authApi } from './auth'
import { systemUsersApi, subscribersApi, creditUsersApi } from './users'
import { airtimeDiscountsApi, dataPlansApi, serviceStatsApi } from './services'
import { transactionsApi } from './transactions'
import { notificationsApi } from './notifications'
import { settingsApi } from './settings'
import { dashboardApi } from './dashboard'
import { FundTransferService } from './fund-transfer'
import { ApiService } from './api-service'

// Export API client and utilities
export { default as apiClient, setAuthToken, getAuthToken, isApiConfigured } from './client'

// Export all API services
export { authApi } from './auth'
export { systemUsersApi, subscribersApi, creditUsersApi } from './users'
export { airtimeDiscountsApi, dataPlansApi, serviceStatsApi } from './services'
export { transactionsApi } from './transactions'
export { notificationsApi } from './notifications'
export { settingsApi } from './settings'
export { dashboardApi } from './dashboard'
export { FundTransferService } from './fund-transfer'
export { ApiService } from './api-service'

// Export all types
export * from '../types'

// Export mock data utilities
export { shouldUseMockData, createMockResponse, createMockPaginatedResponse } from './mock-data'

// Convenience object for all APIs
export const api = {
  auth: authApi,
  systemUsers: systemUsersApi,
  subscribers: subscribersApi,
  creditUsers: creditUsersApi,
  airtimeDiscounts: airtimeDiscountsApi,
  dataPlans: dataPlansApi,
  serviceStats: serviceStatsApi,
  transactions: transactionsApi,
  notifications: notificationsApi,
  settings: settingsApi,
  dashboard: dashboardApi,
  fundTransfer: FundTransferService,
  comprehensive: ApiService,
} 