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
  DeleteContactResponse,
  DeleteDataPlanResponse,
  DeleteUserResponse,
  // Admin types
  GenerateCouponRequest,
  GenerateCouponResponse,
  GetContactsResponse,
  // Data plan types
  GetDataPlanPricesResponse,
  GetDataPlansResponse,
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
  User,
  ValidateMeterRequest,
  ValidateMeterResponse,
} from "../types/";
import apiClient from "./infrastructure/client";
import { ENDPOINTS } from "./infrastructure/endpoint";

/**
 * Comprehensive API Service Class
 * Implements all endpoints with proper TypeScript types
 */
export class ApiService {
  // ============================================================================
  // USER AUTHENTICATION & MANAGEMENT
  // ============================================================================

  /**
   * User login
   */
  static async login(request: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      ENDPOINTS.USER.LOGIN,
      request
    );
    return response.data;
  }

  /**
   * User registration
   */
  static async register(request: RegisterRequest): Promise<RegisterResponse> {
    const response = await apiClient.post<RegisterResponse>(
      ENDPOINTS.USER.SIGNUP,
      request
    );
    return response.data;
  }

  /**
   * Get user profile
   */
  static async getUserProfile(): Promise<ApiSuccessResponse<User>> {
    const response = await apiClient.get<ApiSuccessResponse<User>>(
      ENDPOINTS.USER.PROFILE
    );
    return response.data;
  }

  /**
   * Update user profile
   */
  static async updateUser(
    id: string,
    request: UpdateUserRequest
  ): Promise<UpdateUserResponse> {
    const response = await apiClient.patch<UpdateUserResponse>(
      ENDPOINTS.USER.UPDATE_PROFILE(id),
      request
    );
    return response.data;
  }

  /**
   * Delete user
   */
  static async deleteUser(id: string): Promise<DeleteUserResponse> {
    const response = await apiClient.get<DeleteUserResponse>(
      ENDPOINTS.USER.DELETE_USER(id)
    );
    return response.data;
  }

  /**
   * Upgrade user
   */
  static async upgradeUser(): Promise<UpgradeUserResponse> {
    const response = await apiClient.get<UpgradeUserResponse>(
      ENDPOINTS.USER.UPGRADE
    );
    return response.data;
  }

  /**
   * Request password reset
   */
  static async requestPasswordReset(
    request: RequestPasswordResetRequest
  ): Promise<RequestPasswordResetResponse> {
    const response = await apiClient.post<RequestPasswordResetResponse>(
      ENDPOINTS.USER.REQUEST_PASSWORD_RESET,
      request
    );
    return response.data;
  }

  /**
   * Reset password
   */
  static async resetPassword(
    request: ResetPasswordRequest
  ): Promise<ResetPasswordResponse> {
    const response = await apiClient.post<ResetPasswordResponse>(
      ENDPOINTS.USER.PASSWORD_RESET,
      request
    );
    return response.data;
  }

  /**
   * Change password
   */
  static async changePassword(
    request: ChangePasswordRequest
  ): Promise<ChangePasswordResponse> {
    const response = await apiClient.post<ChangePasswordResponse>(
      ENDPOINTS.USER.CHANGE_PASSWORD,
      request
    );
    return response.data;
  }

  /**
   * Get all users (admin only)
   */
  static async getAllUsers(): Promise<GetUsersResponse> {
    const response = await apiClient.get<GetUsersResponse>(
      ENDPOINTS.USER.GET_ALL_USERS
    );
    return response.data;
  }

  // ============================================================================
  // CONTACT MANAGEMENT
  // ============================================================================

  /**
   * Add new contact
   */
  static async addContact(
    request: AddContactRequest
  ): Promise<AddContactResponse> {
    const response = await apiClient.post<AddContactResponse>(
      ENDPOINTS.CONTACT.ADD,
      request
    );
    return response.data;
  }

  /**
   * Get all contacts
   */
  static async getContacts(): Promise<GetContactsResponse> {
    const response = await apiClient.get<GetContactsResponse>(
      ENDPOINTS.CONTACT.GET_ALL
    );
    return response.data;
  }

  /**
   * Update contact
   */
  static async updateContact(
    id: string,
    request: UpdateContactRequest
  ): Promise<UpdateContactResponse> {
    const response = await apiClient.patch<UpdateContactResponse>(
      ENDPOINTS.CONTACT.UPDATE(id),
      request
    );
    return response.data;
  }

  /**
   * Delete contact
   */
  static async deleteContact(id: string): Promise<DeleteContactResponse> {
    const response = await apiClient.delete<DeleteContactResponse>(
      ENDPOINTS.CONTACT.DELETE(id)
    );
    return response.data;
  }

  // ============================================================================
  // BUY SERVICES
  // ============================================================================

  /**
   * Buy data
   */
  static async buyData(request: BuyDataRequest): Promise<BuyDataResponse> {
    const response = await apiClient.post<BuyDataResponse>(
      ENDPOINTS.BUY.DATA,
      request
    );
    return response.data;
  }

  /**
   * Buy airtime
   */
  static async buyAirtime(
    request: BuyAirtimeRequest
  ): Promise<BuyAirtimeResponse> {
    const response = await apiClient.post<BuyAirtimeResponse>(
      ENDPOINTS.BUY.AIRTIME,
      request
    );
    return response.data;
  }

  /**
   * Validate electricity meter
   */
  static async validateMeter(
    request: ValidateMeterRequest
  ): Promise<ValidateMeterResponse> {
    const response = await apiClient.post<ValidateMeterResponse>(
      ENDPOINTS.BUY.VALIDATE_METER,
      request
    );
    return response.data;
  }

  /**
   * Buy electricity token
   */
  static async buyElectricity(
    request: BuyElectricityRequest
  ): Promise<BuyElectricityResponse> {
    const response = await apiClient.post<BuyElectricityResponse>(
      ENDPOINTS.BUY.ELECTRICITY,
      request
    );
    return response.data;
  }

  /**
   * Get available discos
   */
  static async getDiscos(): Promise<GetDiscosResponse> {
    const response = await apiClient.get<GetDiscosResponse>(
      ENDPOINTS.BUY.GET_DISCOS
    );
    return response.data;
  }

  // ============================================================================
  // DATA PLANS MANAGEMENT
  // ============================================================================

  /**
   * Get data plan prices for a network
   */
  static async getDataPlanPrices(
    network: NetworkId
  ): Promise<GetDataPlanPricesResponse> {
    const response = await apiClient.get<GetDataPlanPricesResponse>(
      ENDPOINTS.PLANS.PRICES(network)
    );
    return response.data;
  }

  /**
   * Get all data plans
   */
  static async getDataPlans(): Promise<GetDataPlansResponse> {
    const response = await apiClient.get<GetDataPlansResponse>(
      ENDPOINTS.PLANS.GET_ALL()
    );
    return response.data;
  }

  /**
   * Add new data plan
   */
  static async addDataPlan(
    request: AddDataPlanRequest
  ): Promise<AddDataPlanResponse> {
    const response = await apiClient.post<AddDataPlanResponse>(
      ENDPOINTS.PLANS.ADD,
      request
    );
    return response.data;
  }

  /**
   * Update data plan
   */
  static async updateDataPlan(
    request: UpdateDataPlanRequest
  ): Promise<UpdateDataPlanResponse> {
    const response = await apiClient.patch<UpdateDataPlanResponse>(
      ENDPOINTS.PLANS.UPDATE,
      request
    );
    return response.data;
  }

  /**
   * Delete data plan
   */
  static async deleteDataPlan(planId: string): Promise<DeleteDataPlanResponse> {
    const response = await apiClient.delete<DeleteDataPlanResponse>(
      ENDPOINTS.PLANS.DELETE(planId)
    );
    return response.data;
  }

  // ============================================================================
  // TRANSACTIONS
  // ============================================================================

  /**
   * Get all transactions
   */
  static async getAllTransactions(): Promise<GetTransactionsResponse> {
    const response = await apiClient.get<GetTransactionsResponse>(
      ENDPOINTS.TRANSACTIONS.GET_ALL
    );
    return response.data;
  }

  /**
   * Search transactions with filters
   */
  static async searchTransactions(
    params: TransactionSearchParams
  ): Promise<SearchTransactionsResponse> {
    const queryString = new URLSearchParams();

    if (params.type) queryString.append("type", params.type);
    if (params.phoneNumber)
      queryString.append("phoneNumber", params.phoneNumber);
    if (params.transactionId)
      queryString.append("transactionId", params.transactionId);
    if (params.userName) queryString.append("userName", params.userName);
    if (params.status) queryString.append("status", params.status);

    const url = `${ENDPOINTS.TRANSACTIONS.SEARCH}${
      queryString.toString() ? `?${queryString.toString()}` : ""
    }`;
    const response = await apiClient.get<SearchTransactionsResponse>(url);
    return response.data;
  }

  // ============================================================================
  // FUND TRANSFER
  // ============================================================================

  /**
   * Transfer funds to user (user-to-user)
   */
  static async transferFundToUser(
    request: TransferFundRequest,
    userToken: string
  ): Promise<TransferFundResponse> {
    const response = await apiClient.post<TransferFundResponse>(
      ENDPOINTS.FUND_TRANSFER.USER_WALLET,
      request,
      {
        headers: {
          "x-auth-token": userToken,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  }

  /**
   * Admin transfer funds to user
   */
  static async adminTransferFund(
    request: TransferFundRequest,
    adminToken: string
  ): Promise<TransferFundResponse> {
    const response = await apiClient.post<TransferFundResponse>(
      ENDPOINTS.FUND_TRANSFER.ADMIN_TRANSFER,
      request,
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  }

  // ============================================================================
  // ADMIN OPERATIONS
  // ============================================================================

  /**
   * Generate admin coupons
   */
  static async generateCoupon(
    request: GenerateCouponRequest
  ): Promise<GenerateCouponResponse> {
    const response = await apiClient.post<GenerateCouponResponse>(
      ENDPOINTS.ADMIN.GENERATE_COUPON,
      request
    );
    return response.data;
  }

  /**
   * Process refund
   */
  static async processRefund(
    transactionId: string,
    request: RefundRequest
  ): Promise<RefundResponse> {
    const response = await apiClient.post<RefundResponse>(
      ENDPOINTS.ADMIN.REFUND(transactionId),
      request
    );
    return response.data;
  }

  // ============================================================================
  // PRICES
  // ============================================================================

  /**
   * Get all prices
   */
  static async getPrices(
    request?: GetPricesRequest
  ): Promise<GetPricesResponse> {
    const response = await apiClient.post<GetPricesResponse>(
      ENDPOINTS.PRICES.GET_ALL,
      request || {}
    );
    return response.data;
  }

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================

  /**
   * Get network name from ID
   */
  static getNetworkName(networkId: NetworkId): string {
    const networkNames = {
      "1": "MTN",
      "2": "GLO",
      "3": "AIRTEL",
      "4": "9MOBILE",
    };
    return networkNames[networkId] || "Unknown";
  }

  /**
   * Get network ID from name
   */
  static getNetworkId(networkName: string): NetworkId | null {
    const networkIds = {
      MTN: "1",
      GLO: "2",
      AIRTEL: "3",
      "9MOBILE": "4",
    };
    return (
      (networkIds[
        networkName.toUpperCase() as keyof typeof networkIds
      ] as NetworkId) || null
    );
  }

  /**
   * Format amount to currency
   */
  static formatCurrency(amount: number): string {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  }

  /**
   * Format date string
   */
  static formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("en-NG", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
}

// Export individual methods for convenience
export const {
  // User methods
  login,
  register,
  getUserProfile,
  updateUser,
  deleteUser,
  upgradeUser,
  requestPasswordReset,
  resetPassword,
  changePassword,
  getAllUsers,

  // Contact methods
  addContact,
  getContacts,
  updateContact,
  deleteContact,

  // Buy service methods
  buyData,
  buyAirtime,
  validateMeter,
  buyElectricity,
  getDiscos,

  // Data plan methods
  getDataPlanPrices,
  getDataPlans,
  addDataPlan,
  updateDataPlan,
  deleteDataPlan,

  // Transaction methods
  getAllTransactions,
  searchTransactions,

  // Fund transfer methods
  transferFundToUser,
  adminTransferFund,

  // Admin methods
  generateCoupon,
  processRefund,

  // Price methods
  getPrices,

  // Utility methods
  getNetworkName,
  getNetworkId,
  formatCurrency,
  formatDate,
} = ApiService;
