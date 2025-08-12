// ============================================================================
// REACT HOOKS INDEX
// Central export point for all custom React hooks
// ============================================================================

// ============================================================================
// AUTHENTICATION & USER MANAGEMENT
// ============================================================================
export { useLogout } from './useAuth'  // Only export useLogout from useAuth
export * from './useUsers'     // User CRUD operations, management

// ============================================================================
// API DATA HOOKS (TanStack Query)
// ============================================================================
export * from './useApiQueries'    // General API endpoints (comprehensive)
export * from './useFundTransfer'  // Fund transfer operations

// ============================================================================
// REACT QUERY UTILITIES
// Re-export core React Query hooks for convenience
// ============================================================================
export { 
  useQuery, 
  useMutation, 
  useQueryClient,
  useInfiniteQuery,
  useQueries
} from '@tanstack/react-query'

// ============================================================================
// HOOK CATEGORIES FOR EASY IMPORTS
// ============================================================================

// Authentication & User Management
export const authHooks = {
  useAuth: () => import('./useAuth').then(m => m),
  useUsers: () => import('./useUsers').then(m => m),
}

// Data Fetching & Management
export const dataHooks = {
  useApiQueries: () => import('./useApiQueries').then(m => m),
  useDataPlans: () => import('./useDataPlans').then(m => m),
  useFundTransfer: () => import('./useFundTransfer').then(m => m),
}

// All hooks in one object
export const allHooks = {
  ...authHooks,
  ...dataHooks,
} 