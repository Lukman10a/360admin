// ============================================================================
// REACT HOOKS INDEX
// Central export point for all custom React hooks
// ============================================================================

// ============================================================================
// AUTHENTICATION & USER MANAGEMENT
// ============================================================================
export * from "./useAuth"; // All auth hooks including useUserProfile, useLogin, useLogout
export * from "./useUsers"; // User CRUD operations, management

// ============================================================================
// API DATA HOOKS (TanStack Query)
// ============================================================================
// Export specific hooks from useApiQueries to avoid conflicts with useAuth
export {
  // Query keys
  queryKeys,
  useAddContact,
  useAddDataPlan,
  useAdminTransferFund,
  // Bulk operations
  useBulkInvalidate,
  useBuyAirtime,
  // Buy service hooks
  useBuyData,
  useBuyElectricity,
  useChangePassword,
  // Contact hooks
  useContacts,
  // Data plan hooks
  useDataPlanPrices,
  useDataPlans,
  useDeleteContact,
  useDeleteDataPlan,
  useDeleteUser,
  useDiscos,
  // Admin hooks
  useGenerateCoupon,
  useNetworkId,
  // Utility hooks
  useNetworkName,
  useOptimisticUpdateContact,
  // Optimistic updates
  useOptimisticUpdateUser,
  // Price hooks
  usePrices,
  useProcessRefund,
  useRequestPasswordReset,
  useResetPassword,
  useSearchTransactions,
  // Transaction hooks
  useTransactions,
  // Fund transfer hooks
  useTransferFundToUser,
  useUpdateContact,
  useUpdateDataPlan,
  useUpdateUser,
  useUpgradeUser,
  // User hooks
  useUserProfile,
  useUsers,
  useValidateMeter,
} from "./useApiQueries";

export * from "./useFundTransfer"; // Fund transfer operations

// ============================================================================
// REACT QUERY UTILITIES
// Re-export core React Query hooks for convenience
// ============================================================================
export {
  useInfiniteQuery,
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

// ============================================================================
// HOOK CATEGORIES FOR EASY IMPORTS
// ============================================================================

// Authentication & User Management
export const authHooks = {
  useAuth: () => import("./useAuth").then((m) => m),
  useUsers: () => import("./useUsers").then((m) => m),
};

// Data Fetching & Management
export const dataHooks = {
  useApiQueries: () => import("./useApiQueries").then((m) => m),
  useDataPlans: () => import("./useDataPlans").then((m) => m),
  useFundTransfer: () => import("./useFundTransfer").then((m) => m),
};

// All hooks in one object
export const allHooks = {
  ...authHooks,
  ...dataHooks,
};
