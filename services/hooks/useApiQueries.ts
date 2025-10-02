import { useHydrated, useIsAuthenticated } from "@/stores/user-store";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { ApiService } from "../api/api-service";
import { setAuthToken } from "../api/infrastructure/client";
import {
  // Contact types
  AddContactRequest,
  AddContactResponse,
  AddDataPlanRequest,
  AddDataPlanResponse,
  // Common types
  ApiSuccessResponse,
  BuyAirtimeRequest,
  BuyAirtimeResponse,
  // Buy service types
  BuyDataRequest,
  BuyDataResponse,
  BuyElectricityRequest,
  BuyElectricityResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
  DataPlanPrice,
  DeleteContactResponse,
  DeleteDataPlanResponse,
  DeleteUserResponse,
  // Admin types
  GenerateCouponRequest,
  GenerateCouponResponse,
  GetContactsResponse,
  // Data plan types
  GetDataPlanPricesResponse,
  GetDiscosResponse,
  // Price types
  GetPricesRequest,
  GetPricesResponse,
  GetTransactionsResponse,
  GetUsersResponse,
  // User types
  LoginRequest,
  LoginResponse,
  NetworkId,
  RefundRequest,
  RefundResponse,
  RegisterRequest,
  RegisterResponse,
  RequestPasswordResetRequest,
  RequestPasswordResetResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  SearchTransactionsResponse,
  // Transaction types
  TransactionSearchParams,
  // Fund transfer types
  TransferFundRequest,
  TransferFundResponse,
  UpdateContactRequest,
  UpdateContactResponse,
  UpdateDataPlanRequest,
  UpdateDataPlanResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  UpgradeUserResponse,
  ValidateMeterRequest,
  ValidateMeterResponse,
} from "../types";

// ============================================================================
// QUERY KEYS
// ============================================================================

export const queryKeys = {
  // User queries
  user: {
    profile: ["user", "profile"] as const,
    all: ["users"] as const,
    byId: (id: string) => ["user", id] as const,
  },

  // Contact queries
  contacts: {
    all: ["contacts"] as const,
    byId: (id: string) => ["contact", id] as const,
  },

  // Data plan queries
  dataPlans: {
    all: ["dataPlans"] as const,
    byNetwork: (network: NetworkId) =>
      ["dataPlans", "network", network] as const,
    byId: (id: string) => ["dataPlan", id] as const,
  },

  // Transaction queries
  transactions: {
    all: ["transactions"] as const,
    search: (params: TransactionSearchParams) =>
      ["transactions", "search", params] as const,
  },

  // Disco queries
  discos: {
    all: ["discos"] as const,
  },

  // Price queries
  prices: {
    all: ["prices"] as const,
    byNetwork: (network?: string) => ["prices", "network", network] as const,
  },
} as const;

// ============================================================================
// USER AUTHENTICATION & MANAGEMENT HOOKS
// ============================================================================

// User Profile Query
export const useUserProfile = (
  options?: UseQueryOptions<ApiSuccessResponse<any>>
) => {
  const isAuthenticated = useIsAuthenticated();
  const hydrated = useHydrated();
  return useQuery({
    queryKey: queryKeys.user.profile,
    queryFn: () => ApiService.getUserProfile(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: typeof window !== "undefined" && isAuthenticated && hydrated,
    ...options,
  });
};

// Get All Users Query (Admin only)
export const useUsers = (
  params?: { page?: number; limit?: number; search?: string },
  options?: UseQueryOptions<GetUsersResponse>
) => {
  const isAuthenticated = useIsAuthenticated();
  const hydrated = useHydrated();
  return useQuery({
    queryKey: [...queryKeys.user.all, params],
    queryFn: () => ApiService.getAllUsers(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    enabled: typeof window !== "undefined" && isAuthenticated && hydrated,
    ...options,
  });
};

// User Login Mutation
export const useLogin = (
  options?: UseMutationOptions<LoginResponse, Error, LoginRequest>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: LoginRequest) => ApiService.login(request),
    onSuccess: (data) => {
      // Set auth token using the proper function
      setAuthToken(data.token);

      // Invalidate user profile to refetch with new token
      queryClient.invalidateQueries({ queryKey: queryKeys.user.profile });
    },
    ...options,
  });
};

// User Registration Mutation
export const useRegister = (
  options?: UseMutationOptions<RegisterResponse, Error, RegisterRequest>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: RegisterRequest) => ApiService.register(request),
    onSuccess: (data) => {
      // Set auth token using the proper function
      setAuthToken(data.token);

      // Invalidate user profile to refetch with new token
      queryClient.invalidateQueries({ queryKey: queryKeys.user.profile });
    },
    ...options,
  });
};

// Update User Mutation
export const useUpdateUser = (
  options?: UseMutationOptions<
    UpdateUserResponse,
    Error,
    { id: string; request: UpdateUserRequest }
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, request }: { id: string; request: UpdateUserRequest }) =>
      ApiService.updateUser(id, request),
    onSuccess: (_, { id }) => {
      // Invalidate user profile and specific user
      queryClient.invalidateQueries({ queryKey: queryKeys.user.profile });
      queryClient.invalidateQueries({ queryKey: queryKeys.user.byId(id) });
    },
    ...options,
  });
};

// Delete User Mutation
export const useDeleteUser = (
  options?: UseMutationOptions<DeleteUserResponse, Error, string>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ApiService.deleteUser(id),
    onSuccess: (_, id) => {
      // Remove user from cache
      queryClient.removeQueries({ queryKey: queryKeys.user.byId(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.user.all });
    },
    ...options,
  });
};

// Upgrade User Mutation
export const useUpgradeUser = (
  options?: UseMutationOptions<UpgradeUserResponse, Error, void>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => ApiService.upgradeUser(),
    onSuccess: () => {
      // Invalidate user profile
      queryClient.invalidateQueries({ queryKey: queryKeys.user.profile });
    },
    ...options,
  });
};

// Request Password Reset Mutation
export const useRequestPasswordReset = (
  options?: UseMutationOptions<
    RequestPasswordResetResponse,
    Error,
    RequestPasswordResetRequest
  >
) => {
  return useMutation({
    mutationFn: (request: RequestPasswordResetRequest) =>
      ApiService.requestPasswordReset(request),
    ...options,
  });
};

// Reset Password Mutation
export const useResetPassword = (
  options?: UseMutationOptions<
    ResetPasswordResponse,
    Error,
    ResetPasswordRequest
  >
) => {
  return useMutation({
    mutationFn: (request: ResetPasswordRequest) =>
      ApiService.resetPassword(request),
    ...options,
  });
};

// Change Password Mutation
export const useChangePassword = (
  options?: UseMutationOptions<
    ChangePasswordResponse,
    Error,
    ChangePasswordRequest
  >
) => {
  return useMutation({
    mutationFn: (request: ChangePasswordRequest) =>
      ApiService.changePassword(request),
    ...options,
  });
};

// ============================================================================
// CONTACT MANAGEMENT HOOKS
// ============================================================================

// Get All Contacts Query
export const useContacts = (options?: UseQueryOptions<GetContactsResponse>) => {
  return useQuery({
    queryKey: queryKeys.contacts.all,
    queryFn: () => ApiService.getContacts(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

// Add Contact Mutation
export const useAddContact = (
  options?: UseMutationOptions<AddContactResponse, Error, AddContactRequest>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: AddContactRequest) => ApiService.addContact(request),
    onSuccess: () => {
      // Invalidate contacts list
      queryClient.invalidateQueries({ queryKey: queryKeys.contacts.all });
    },
    ...options,
  });
};

// Update Contact Mutation
export const useUpdateContact = (
  options?: UseMutationOptions<
    UpdateContactResponse,
    Error,
    { id: string; request: UpdateContactRequest }
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      request,
    }: {
      id: string;
      request: UpdateContactRequest;
    }) => ApiService.updateContact(id, request),
    onSuccess: (_, { id }) => {
      // Invalidate contacts list and specific contact
      queryClient.invalidateQueries({ queryKey: queryKeys.contacts.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.contacts.byId(id) });
    },
    ...options,
  });
};

// Delete Contact Mutation
export const useDeleteContact = (
  options?: UseMutationOptions<DeleteContactResponse, Error, string>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ApiService.deleteContact(id),
    onSuccess: (_, id) => {
      // Remove contact from cache
      queryClient.removeQueries({ queryKey: queryKeys.contacts.byId(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.contacts.all });
    },
    ...options,
  });
};

// ============================================================================
// BUY SERVICES HOOKS
// ============================================================================

// Buy Data Mutation
export const useBuyData = (
  options?: UseMutationOptions<BuyDataResponse, Error, BuyDataRequest>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: BuyDataRequest) => ApiService.buyData(request),
    onSuccess: () => {
      // Invalidate transactions and user profile (balance change)
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.user.profile });
    },
    ...options,
  });
};

// Buy Airtime Mutation
export const useBuyAirtime = (
  options?: UseMutationOptions<BuyAirtimeResponse, Error, BuyAirtimeRequest>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: BuyAirtimeRequest) => ApiService.buyAirtime(request),
    onSuccess: () => {
      // Invalidate transactions and user profile (balance change)
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.user.profile });
    },
    ...options,
  });
};

// Validate Meter Query
export const useValidateMeter = (
  request: ValidateMeterRequest,
  options?: UseQueryOptions<ValidateMeterResponse>
) => {
  return useQuery({
    queryKey: ["validateMeter", request],
    queryFn: () => ApiService.validateMeter(request),
    enabled: !!request.meterNumber && !!request.meterId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    ...options,
  });
};

// Buy Electricity Mutation
export const useBuyElectricity = (
  options?: UseMutationOptions<
    BuyElectricityResponse,
    Error,
    BuyElectricityRequest
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: BuyElectricityRequest) =>
      ApiService.buyElectricity(request),
    onSuccess: () => {
      // Invalidate transactions and user profile (balance change)
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.user.profile });
    },
    ...options,
  });
};

// Get Discos Query
export const useDiscos = (options?: UseQueryOptions<GetDiscosResponse>) => {
  return useQuery({
    queryKey: queryKeys.discos.all,
    queryFn: () => ApiService.getDiscos(),
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
    ...options,
  });
};

// ============================================================================
// DATA PLANS MANAGEMENT HOOKS
// ============================================================================

// Get Data Plan Prices by Network Query
export const useDataPlanPrices = (
  network: NetworkId,
  options?: UseQueryOptions<GetDataPlanPricesResponse>
) => {
  return useQuery({
    queryKey: queryKeys.dataPlans.byNetwork(network),
    queryFn: () => ApiService.getDataPlanPrices(network),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    ...options,
  });
};

// Get All Data Plans Query
export const useDataPlans = (
  filters?: { plan_type?: string; network?: string },
  options?: UseQueryOptions<DataPlanPrice[]>
) => {
  return useQuery({
    queryKey: queryKeys.dataPlans.all,
    queryFn: () => ApiService.getDataPlans(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    ...options,
  });
};

// Add Data Plan Mutation
export const useAddDataPlan = (
  options?: UseMutationOptions<AddDataPlanResponse, Error, AddDataPlanRequest>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: AddDataPlanRequest) =>
      ApiService.addDataPlan(request),
    onSuccess: (_, request) => {
      // Invalidate data plans and specific network plans
      queryClient.invalidateQueries({ queryKey: queryKeys.dataPlans.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.dataPlans.byNetwork(
          request.planNetwork as NetworkId
        ),
      });
    },
    ...options,
  });
};

// Update Data Plan Mutation
export const useUpdateDataPlan = (
  options?: UseMutationOptions<
    UpdateDataPlanResponse,
    Error,
    UpdateDataPlanRequest
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: UpdateDataPlanRequest) =>
      ApiService.updateDataPlan(request),
    onSuccess: (_, request) => {
      // Invalidate data plans and specific network plans
      queryClient.invalidateQueries({ queryKey: queryKeys.dataPlans.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.dataPlans.byNetwork(
          request.planNetwork as NetworkId
        ),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.dataPlans.byId(request._id),
      });
    },
    ...options,
  });
};

// Delete Data Plan Mutation
export const useDeleteDataPlan = (
  options?: UseMutationOptions<DeleteDataPlanResponse, Error, string>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (planId: string) => ApiService.deleteDataPlan(planId),
    onSuccess: (_, planId) => {
      // Remove plan from cache and invalidate lists
      queryClient.removeQueries({ queryKey: queryKeys.dataPlans.byId(planId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.dataPlans.all });
    },
    ...options,
  });
};

// ============================================================================
// TRANSACTION HOOKS
// ============================================================================

// Get All Transactions Query
export const useTransactions = (
  options?: UseQueryOptions<GetTransactionsResponse>
) => {
  return useQuery({
    queryKey: queryKeys.transactions.all,
    queryFn: () => ApiService.getAllTransactions(),
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

// Search Transactions Query
export const useSearchTransactions = (
  params: TransactionSearchParams,
  options?: UseQueryOptions<SearchTransactionsResponse>
) => {
  return useQuery({
    queryKey: queryKeys.transactions.search(params),
    queryFn: () => ApiService.searchTransactions(params),
    enabled: Object.keys(params).length > 0,
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

// ============================================================================
// FUND TRANSFER HOOKS
// ============================================================================

// Transfer Fund to User Mutation
export const useTransferFundToUser = (
  options?: UseMutationOptions<
    TransferFundResponse,
    Error,
    { request: TransferFundRequest; userToken: string }
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      request,
      userToken,
    }: {
      request: TransferFundRequest;
      userToken: string;
    }) => ApiService.transferFundToUser(request, userToken),
    onSuccess: () => {
      // Invalidate transactions and user profile (balance change)
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.user.profile });
    },
    ...options,
  });
};

// Admin Transfer Fund Mutation
export const useAdminTransferFund = (
  options?: UseMutationOptions<
    TransferFundResponse,
    Error,
    { request: TransferFundRequest; adminToken: string }
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      request,
      adminToken,
    }: {
      request: TransferFundRequest;
      adminToken: string;
    }) => ApiService.adminTransferFund(request, adminToken),
    onSuccess: () => {
      // Invalidate transactions
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all });
    },
    ...options,
  });
};

// ============================================================================
// ADMIN OPERATIONS HOOKS
// ============================================================================

// Generate Coupon Mutation
export const useGenerateCoupon = (
  options?: UseMutationOptions<
    GenerateCouponResponse,
    Error,
    GenerateCouponRequest
  >
) => {
  return useMutation({
    mutationFn: (request: GenerateCouponRequest) =>
      ApiService.generateCoupon(request),
    ...options,
  });
};

// Process Refund Mutation
export const useProcessRefund = (
  options?: UseMutationOptions<
    RefundResponse,
    Error,
    { transactionId: string; request: RefundRequest }
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      transactionId,
      request,
    }: {
      transactionId: string;
      request: RefundRequest;
    }) => ApiService.processRefund(transactionId, request),
    onSuccess: () => {
      // Invalidate transactions
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all });
    },
    ...options,
  });
};

// ============================================================================
// PRICE HOOKS
// ============================================================================

// Get Prices Query
export const usePrices = (
  request?: GetPricesRequest,
  options?: UseQueryOptions<GetPricesResponse>
) => {
  return useQuery({
    queryKey: queryKeys.prices.byNetwork(request?.network),
    queryFn: () => ApiService.getPrices(request),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    ...options,
  });
};

// ============================================================================
// UTILITY HOOKS
// ============================================================================

// Network Name Query (for display purposes)
export const useNetworkName = (networkId: NetworkId) => {
  return useQuery({
    queryKey: ["networkName", networkId],
    queryFn: () => Promise.resolve(ApiService.getNetworkName(networkId)),
    staleTime: Infinity, // Never stale
    gcTime: Infinity, // Never garbage collected
    enabled: !!networkId,
  });
};

// Network ID Query (for conversion purposes)
export const useNetworkId = (networkName: string) => {
  return useQuery({
    queryKey: ["networkId", networkName],
    queryFn: () => Promise.resolve(ApiService.getNetworkId(networkName)),
    staleTime: Infinity, // Never stale
    gcTime: Infinity, // Never garbage collected
    enabled: !!networkName,
  });
};

// ============================================================================
// BULK OPERATIONS HOOKS
// ============================================================================

// Bulk Invalidate Queries Hook
export const useBulkInvalidate = () => {
  const queryClient = useQueryClient();

  const invalidateAll = () => {
    queryClient.invalidateQueries();
  };

  const invalidateUserData = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.user.profile });
    queryClient.invalidateQueries({ queryKey: queryKeys.contacts.all });
    queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all });
  };

  const invalidateServiceData = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.dataPlans.all });
    queryClient.invalidateQueries({ queryKey: queryKeys.prices.all });
    queryClient.invalidateQueries({ queryKey: queryKeys.discos.all });
  };

  return {
    invalidateAll,
    invalidateUserData,
    invalidateServiceData,
  };
};

// ============================================================================
// OPTIMISTIC UPDATES HOOKS
// ============================================================================

// Optimistic Update User Hook
export const useOptimisticUpdateUser = () => {
  const queryClient = useQueryClient();

  const optimisticUpdate = (id: string, updates: UpdateUserRequest) => {
    queryClient.setQueryData(queryKeys.user.byId(id), (old: any) => ({
      ...old,
      ...updates,
    }));
  };

  const rollbackUpdate = (id: string) => {
    queryClient.invalidateQueries({ queryKey: queryKeys.user.byId(id) });
  };

  return {
    optimisticUpdate,
    rollbackUpdate,
  };
};

// Optimistic Update Contact Hook
export const useOptimisticUpdateContact = () => {
  const queryClient = useQueryClient();

  const optimisticUpdate = (id: string, updates: UpdateContactRequest) => {
    queryClient.setQueryData(queryKeys.contacts.byId(id), (old: any) => ({
      ...old,
      ...updates,
    }));
  };

  const rollbackUpdate = (id: string) => {
    queryClient.invalidateQueries({ queryKey: queryKeys.contacts.byId(id) });
  };

  return {
    optimisticUpdate,
    rollbackUpdate,
  };
};
