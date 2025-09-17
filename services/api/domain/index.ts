// ============================================================================
// DOMAIN SERVICES INDEX
// All business domain-specific API services
// ============================================================================

// Authentication & User Management
export { authApi } from "./auth";
export { contactsApi } from "./contacts";
export { creditUsersApi, subscribersApi, systemUsersApi } from "./users";

// Business Services
export { buyServicesApi, dataPlansApi } from "./services";

// Transactions & Notifications
export { notificationsApi } from "./notifications";
export { transactionsApi } from "./transactions";

// Admin & System Operations
export { adminApi } from "./admin";
export { pricesApi } from "./prices";

// System & Configuration
export { dashboardApi } from "./dashboard";
export { settingsApi } from "./settings";

// Specialized Services
export { FundTransferService } from "./fund-transfer";
