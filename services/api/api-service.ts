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
  User,
  ValidateMeterRequest,
  ValidateMeterResponse,
} from "../types/";
import { adminApi } from "./domain/admin";
import { authApi } from "./domain/auth";
import { contactsApi } from "./domain/contacts";
import { pricesApi } from "./domain/prices";
import { buyServicesApi, dataPlansApi } from "./domain/services";
import { fundTransferApi, transactionsApi } from "./domain/transactions";

/**
 * Comprehensive API Service Class
 * Delegates to enhanced domain services with robust error handling and mock fallbacks
 */
export class ApiService {
  // ============================================================================
  // USER AUTHENTICATION & MANAGEMENT
  // ============================================================================

  /**
   * User login
   */
  static async login(request: LoginRequest): Promise<LoginResponse> {
    return authApi.login(request);
  }

  /**
   * User registration
   */
  static async register(request: RegisterRequest): Promise<RegisterResponse> {
    return authApi.register(request);
  }

  /**
   * Get user profile
   */
  static async getUserProfile(): Promise<ApiSuccessResponse<User>> {
    const user = await authApi.getProfile();
    return {
      status: 200,
      status_code: "OK",
      data: user,
      msg: "Profile retrieved successfully",
    };
  }

  /**
   * Update user profile
   */
  static async updateUser(
    id: string,
    request: UpdateUserRequest
  ): Promise<UpdateUserResponse> {
    return authApi.updateUser(id, request);
  }

  /**
   * Delete user
   */
  static async deleteUser(id: string): Promise<DeleteUserResponse> {
    return authApi.deleteUser(id);
  }

  /**
   * Upgrade user
   */
  static async upgradeUser(): Promise<UpgradeUserResponse> {
    return authApi.upgradeUser();
  }

  /**
   * Request password reset
   */
  static async requestPasswordReset(
    request: RequestPasswordResetRequest
  ): Promise<RequestPasswordResetResponse> {
    return authApi.requestPasswordReset(request);
  }

  /**
   * Reset password
   */
  static async resetPassword(
    request: ResetPasswordRequest
  ): Promise<ResetPasswordResponse> {
    return authApi.resetPassword(request);
  }

  /**
   * Change password
   */
  static async changePassword(
    request: ChangePasswordRequest
  ): Promise<ChangePasswordResponse> {
    return authApi.changePassword(request);
  }

  /**
   * Get all users (admin only)
   */
  static async getAllUsers(): Promise<GetUsersResponse> {
    return authApi.getAllUsers();
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
    return contactsApi.add(request);
  }

  /**
   * Get all contacts
   */
  static async getContacts(): Promise<GetContactsResponse> {
    return contactsApi.getAll();
  }

  /**
   * Update contact
   */
  static async updateContact(
    id: string,
    request: UpdateContactRequest
  ): Promise<UpdateContactResponse> {
    return contactsApi.update(id, request);
  }

  /**
   * Delete contact
   */
  static async deleteContact(id: string): Promise<DeleteContactResponse> {
    return contactsApi.delete(id);
  }

  // ============================================================================
  // BUY SERVICES
  // ============================================================================

  /**
   * Buy data
   */
  static async buyData(request: BuyDataRequest): Promise<BuyDataResponse> {
    return buyServicesApi.buyData(request);
  }

  /**
   * Buy airtime
   */
  static async buyAirtime(
    request: BuyAirtimeRequest
  ): Promise<BuyAirtimeResponse> {
    return buyServicesApi.buyAirtime(request);
  }

  /**
   * Validate electricity meter
   */
  static async validateMeter(
    request: ValidateMeterRequest
  ): Promise<ValidateMeterResponse> {
    return buyServicesApi.validateMeter(request);
  }

  /**
   * Buy electricity token
   */
  static async buyElectricity(
    request: BuyElectricityRequest
  ): Promise<BuyElectricityResponse> {
    return buyServicesApi.buyElectricity(request);
  }

  /**
   * Get available discos
   */
  static async getDiscos(): Promise<GetDiscosResponse> {
    return buyServicesApi.getDiscos();
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
    return dataPlansApi.getPricesByNetwork(network);
  }

  /**
   * Get all data plans
   */
  static async getDataPlans(filters?: {
    plan_type?: string;
    network?: string;
  }): Promise<DataPlanPrice[]> {
    return dataPlansApi.getAll(filters);
  }

  /**
   * Add new data plan
   */
  static async addDataPlan(
    request: AddDataPlanRequest
  ): Promise<AddDataPlanResponse> {
    return dataPlansApi.add(request);
  }

  /**
   * Update data plan
   */
  static async updateDataPlan(
    request: UpdateDataPlanRequest
  ): Promise<UpdateDataPlanResponse> {
    return dataPlansApi.update(request);
  }

  /**
   * Delete data plan
   */
  static async deleteDataPlan(planId: string): Promise<DeleteDataPlanResponse> {
    return dataPlansApi.delete(planId);
  }

  // ============================================================================
  // TRANSACTIONS
  // ============================================================================

  /**
   * Get all transactions
   */
  static async getAllTransactions(): Promise<GetTransactionsResponse> {
    return transactionsApi.getAll();
  }

  /**
   * Search transactions with filters
   */
  static async searchTransactions(
    params: TransactionSearchParams
  ): Promise<SearchTransactionsResponse> {
    return transactionsApi.search(params);
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
    // Note: Token handling is managed by the HTTP client interceptors
    return fundTransferApi.transfer(request);
  }

  /**
   * Admin transfer funds to user
   */
  static async adminTransferFund(
    request: TransferFundRequest,
    adminToken: string
  ): Promise<TransferFundResponse> {
    // Note: Token handling is managed by the HTTP client interceptors
    return fundTransferApi.adminTransfer(request);
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
    return adminApi.generateCoupon(request);
  }

  /**
   * Process refund
   */
  static async processRefund(
    transactionId: string,
    request: RefundRequest
  ): Promise<RefundResponse> {
    return adminApi.processRefund(transactionId, request);
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
    return pricesApi.getAll(request);
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
} = ApiService;
