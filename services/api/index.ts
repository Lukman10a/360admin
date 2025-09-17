// ============================================================================
// API SERVICES INDEX
// Central export point for all API services
// ============================================================================

// Infrastructure & Core
export * from "./infrastructure";

// Domain Services
export * from "./domain";

// Comprehensive API Service (recommended for new code)
export { ApiService } from "./api-service";

// ============================================================================
// CONVENIENCE API OBJECT
// Use this for easy access to all services in one place
// ============================================================================
import { ApiService } from "./api-service";
import { authApi } from "./domain/auth";
import { dashboardApi } from "./domain/dashboard";
import { FundTransferService } from "./domain/fund-transfer";
import { notificationsApi } from "./domain/notifications";
import { buyServicesApi, dataPlansApi } from "./domain/services";
import { settingsApi } from "./domain/settings";
import { transactionsApi } from "./domain/transactions";
import { creditUsersApi, subscribersApi, systemUsersApi } from "./domain/users";

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
    stats: buyServicesApi,
  },
  transactions: transactionsApi,
  notifications: notificationsApi,
  settings: settingsApi,
  dashboard: dashboardApi,
  fundTransfer: FundTransferService,

  // Comprehensive service (includes all endpoints)
  comprehensive: ApiService,
} as const;

// ============================================================================
// TYPE EXPORTS
// All TypeScript types are available here
// ============================================================================
export * from "../types";
