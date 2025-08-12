// ============================================================================
// API ENDPOINT TYPES
// Comprehensive TypeScript types for all API endpoints
// ============================================================================

// ============================================================================
// USER AUTHENTICATION & MANAGEMENT
// ============================================================================

export interface LoginRequest {
  userName: string // Can be email or username
  password: string
}

export interface LoginResponse {
  status: number
  status_code: string
  token: string
  data: User
  msg: string
}

export interface RegisterRequest {
  email: string
  password: string
  passwordCheck: string
  userName: string
  referredBy?: string
  phoneNumber: string
}

export interface RegisterResponse {
  status: number
  status_code: string
  token: string
  data: User
  msg: string
}

export interface User {
  _id: string
  email: string
  userName: string
  phoneNumber: string
  balance: number
  apiToken: string
  userType: string
  isPartner: boolean
  isSpecial: boolean
  fullName: string
  bvn: string
  nin: string
  referredBy: string
  referrals: any[]
  accountNumbers: AccountNumber[]
  specialPrices: any[]
  createdAt: string
  updatedAt: string
  __v: number
}

export interface AccountNumber {
  accountNumber: string
  bankName: string
}

export interface UpdateUserRequest {
  email?: string
  userName?: string
  referredBy?: string
  phoneNumber?: string
  fullName?: string
  bvn?: string
  nin?: string
}

export interface UpdateUserResponse {
  msg: string
}

export interface DeleteUserResponse {
  msg: string
}

export interface UpgradeUserResponse {
  msg: string
}

export interface RequestPasswordResetRequest {
  email: string
}

export interface RequestPasswordResetResponse {
  msg: string
}

export interface ResetPasswordRequest {
  token: string
  userId: string
  newPassword: string
  newPasswordCheck: string
}

export interface ResetPasswordResponse {
  msg: string
}

export interface ChangePasswordRequest {
  oldPassword: string
  newPassword: string
  newPasswordCheck: string
}

export interface ChangePasswordResponse {
  msg: string
}

// ============================================================================
// CONTACT MANAGEMENT
// ============================================================================

export interface Contact {
  _id: string
  userId: string
  contactName: string
  contactNumber: string
  contactNetwork: 'MTN' | 'GLO' | 'AIRTEL' | '9MOBILE'
  createdAt: string
  __v: number
}

export interface AddContactRequest {
  contactName: string
  contactNumber: string
  contactNetwork: 'MTN' | 'GLO' | 'AIRTEL' | '9MOBILE'
}

export interface AddContactResponse {
  msg: string
}

export interface UpdateContactRequest {
  contactName?: string
  contactNumber?: string
  contactNetwork?: 'MTN' | 'GLO' | 'AIRTEL' | '9MOBILE'
}

export interface UpdateContactResponse {
  msg: string
}

export interface DeleteContactResponse {
  msg: string
}

export interface GetContactsResponse {
  msg: string
  contactList: Contact[]
}

// ============================================================================
// BUY SERVICES
// ============================================================================

export interface BuyDataRequest {
  network: string // "1" = MTN, "2" = GLO, "3" = AIRTEL, "4" = 9MOBILE
  plan: string // Plan ID
  mobile_number: string
}

export interface BuyDataResponse {
  status_code: string
  msg: string
  data: DataTransaction
}

export interface DataTransaction {
  trans_Id: string
  trans_By: string
  trans_UserName: string
  trans_Type: 'data'
  trans_Network: string
  phone_number: string
  trans_amount: number
  trans_profit: number
  trans_volume_ratio: number
  balance_Before: number
  balance_After: number
  trans_Date: string
  trans_Status: 'success' | 'failed' | 'pending'
  apiResponseId?: string
  apiResponse?: string
  createdAt: string
  _id: string
  __v: number
}

export interface BuyAirtimeRequest {
  mobile_number: string
  network: number // 1 = MTN, 2 = GLO, 3 = AIRTEL, 4 = 9MOBILE
  amount: number
}

export interface BuyAirtimeResponse {
  status: number
  status_code: string
  msg: string
  data: AirtimeTransaction
}

export interface AirtimeTransaction {
  trans_Id: string
  trans_By: string
  trans_UserName: string
  trans_Type: 'airtime'
  trans_Network: string
  phone_number: string
  trans_amount: number
  trans_profit: number
  trans_volume_ratio: number
  balance_Before: number
  balance_After: number
  trans_Date: string
  trans_Status: 'success' | 'failed' | 'pending'
  apiResponseId?: string
  apiResponse?: string
  createdAt: string
  _id: string
  __v: number
}

export interface ValidateMeterRequest {
  meterNumber: string
  meterId: string
  meterType: 'PREPAID' | 'POSTPAID'
}

export interface ValidateMeterResponse {
  invalid: boolean
  name: string
  address: string
}

export interface BuyElectricityRequest {
  meterId: string
  meterNumber: string
  amount: string
  meterType: 'PREPAID' | 'POSTPAID'
}

export interface BuyElectricityResponse {
  status: number
  status_code: string
  msg: string
  data: ElectricityTransaction
}

export interface ElectricityTransaction {
  trans_Id: string
  trans_By: string
  trans_Type: 'electricity'
  trans_Network: string
  phone_number: string
  trans_amount: number
  trans_profit: number
  trans_volume_ratio: number
  balance_Before: number
  balance_After: number
  trans_Date: string
  trans_Status: 'success' | 'failed' | 'pending'
  createdAt: string
  _id: string
  __v: number
}

export interface Disco {
  id: string
  name: string
  code: string
}

export interface GetDiscosResponse {
  discos: Disco[]
}

// ============================================================================
// DATA PLANS MANAGEMENT
// ============================================================================

export interface DataPlanPrice {
  isAvailable: boolean
  _id: string
  id: number
  dataplan_id: string
  plan_network: string
  plan_type: string
  month_validate: string
  plan: string
  my_price: string
  resellerPrice: string
  apiPrice: string
  planCostPrice: number
  __v: number
  volumeRatio: number
}

export interface GetDataPlanPricesResponse {
  status: number
  status_code: string
  data: DataPlanPrice[]
  msg: string
}

export interface AddDataPlanRequest {
  planNetwork: string
  planName: string
  planType: string
  planValidity: string
  planId: number
  resellerPrice: number
  smartEarnerPrice: number
  apiPrice: number
  planCostPrice: number
  partnerPrice: number
  planVolumeRatio: number
}

export interface AddDataPlanResponse {
  status: number
  status_code: string
  msg: string
}

export interface UpdateDataPlanRequest extends AddDataPlanRequest {
  _id: string
}

export interface UpdateDataPlanResponse {
  status: number
  status_code: string
  msg: string
}

export interface DeleteDataPlanResponse {
  status: number
  status_code: string
  msg: string
}

export interface GetDataPlansResponse {
  status: number
  status_code: string
  data: DataPlanPrice[]
  msg: string
}

// ============================================================================
// TRANSACTIONS
// ============================================================================

export interface TransactionSearchParams {
  type?: string
  phoneNumber?: string
  transactionId?: string
  userName?: string
  status?: string
}

export interface Transaction {
  _id: string
  trans_Id: string
  trans_By: string
  trans_UserName?: string
  trans_Type: 'data' | 'airtime' | 'electricity' | 'wallet'
  trans_Network: string
  phone_number: string
  trans_amount: number
  trans_profit: number
  trans_volume_ratio: number
  balance_Before: number
  balance_After: number
  trans_Date: string
  trans_Status: 'success' | 'failed' | 'pending'
  apiResponseId?: string
  apiResponse?: string
  createdAt: string
  __v: number
}

export interface GetTransactionsResponse {
  status: number
  status_code: string
  data: Transaction[]
  msg: string
}

export interface SearchTransactionsResponse {
  status: number
  status_code: string
  data: Transaction[]
  msg: string
}

// ============================================================================
// FUND TRANSFER
// ============================================================================

export interface TransferFundRequest {
  userName: string // username or email of recipient
  amount: number
}

export interface TransferFundResponse {
  msg: string
  amount: number
  receipt?: {
    transactionId: string
    timestamp: string
    fromUser: string
    toUser: string
    amount: number
    status: 'Success' | 'Failed' | 'Pending'
  }
}

export interface FundTransferError {
  msg: string
  code?: string
}

// ============================================================================
// ADMIN OPERATIONS
// ============================================================================

export interface GenerateCouponRequest {
  // Add coupon generation parameters as needed
  amount?: number
  quantity?: number
  expiryDate?: string
}

export interface GenerateCouponResponse {
  status: number
  status_code: string
  msg: string
  data?: {
    coupons: string[]
    expiryDate: string
  }
}

export interface RefundRequest {
  // Add refund parameters as needed
  reason?: string
  amount?: number
}

export interface RefundResponse {
  status: number
  status_code: string
  msg: string
  data?: {
    refundId: string
    transactionId: string
    amount: number
    status: string
  }
}

// ============================================================================
// PRICES
// ============================================================================

export interface GetPricesRequest {
  network?: string
}

export interface GetPricesResponse {
  status: number
  status_code: string
  data: any[] // Define specific price structure as needed
  msg: string
}

// ============================================================================
// COMMON RESPONSE TYPES
// ============================================================================

export interface ApiSuccessResponse<T = any> {
  status: number
  status_code: string
  data: T
  msg: string
}

export interface ApiErrorResponse {
  status: number
  status_code: string
  error: string
  msg: string
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

// ============================================================================
// NETWORK CONSTANTS
// ============================================================================

export const NETWORK_IDS = {
  MTN: '1',
  GLO: '2',
  AIRTEL: '3',
  '9MOBILE': '4'
} as const

export type NetworkId = typeof NETWORK_IDS[keyof typeof NETWORK_IDS]

export const NETWORK_NAMES = {
  '1': 'MTN',
  '2': 'GLO',
  '3': 'AIRTEL',
  '4': '9MOBILE'
} as const

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT'

export interface ApiEndpoint {
  method: HttpMethod
  url: string
  description?: string
  requiresAuth?: boolean
  authType?: 'x-auth-token' | 'Bearer'
}

export interface EndpointConfig {
  [key: string]: {
    [key: string]: string | ((...args: any[]) => string)
  }
}
