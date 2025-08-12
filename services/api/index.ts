// ============================================================================
// API SERVICES INDEX
// Central export point for all API services
// ============================================================================

// Infrastructure & Core
export * from './infrastructure'

// Domain Services
export * from './domain'

// Comprehensive API Service (recommended for new code)
export { ApiService } from './api-service'

// ============================================================================
// CONVENIENCE API OBJECT
// Use this for easy access to all services in one place
// ============================================================================
import { authApi } from './domain/auth'
import { systemUsersApi, subscribersApi, creditUsersApi } from './domain/users'
import { dataPlansApi, serviceStatsApi } from './domain/services'
import { transactionsApi } from './domain/transactions'
import { notificationsApi } from './domain/notifications'
import { settingsApi } from './domain/settings'
import { dashboardApi } from './domain/dashboard'
import { FundTransferService } from './domain/fund-transfer'
import { ApiService } from './api-service'

export const api = {
  // Core services
  auth: authApi,
  users: {
    system: systemUsersApi,
    subscribers: subscribersApi,
    credit: creditUsersApi,
  },
  services: {
    dataPlans: dataPlansApi,
    stats: serviceStatsApi,
  },
  transactions: transactionsApi,
  notifications: notificationsApi,
  settings: settingsApi,
  dashboard: dashboardApi,
  fundTransfer: FundTransferService,

  // Comprehensive service (includes all endpoints)
  comprehensive: ApiService,
} as const

// ============================================================================
// TYPE EXPORTS
// All TypeScript types are available here
// ============================================================================
export * from '../types' 