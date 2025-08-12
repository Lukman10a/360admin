// Base API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data: T
  meta?: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface ApiError {
  success: false
  message: string
  errors?: Record<string, string[]>
  code?: string
}

// Authentication Types
export interface LoginRequest {
  userName: string
  password: string
}

export interface LoginResponse {
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
  referrals: any[]
  accountNumbers: any[]
  specialPrices: any[]
  createdAt: string
  updatedAt: string
  __v: number
}

// System Users Types
export interface SystemUser {
  id: number
  fullName: string
  username: string
  email: string
  role: 'Super Admin' | 'Admin'
  status: 'Active' | 'Inactive'
  createdAt: string
  updatedAt: string
  lastLogin?: string
}

export interface CreateSystemUserRequest {
  fullName: string
  username: string
  email: string
  password: string
  role: 'Super Admin' | 'Admin'
}

export interface UpdateSystemUserRequest {
  fullName?: string
  username?: string
  email?: string
  role?: 'Super Admin' | 'Admin'
  status?: 'Active' | 'Inactive'
}

// Subscribers Types
export interface Subscriber {
  id: number
  fullName: string
  firstName: string
  lastName: string
  email: string
  phone: string
  wallet: number
  account: 'Subscriber' | 'Agent' | 'Vendor'
  status: 'Active' | 'Inactive' | 'Suspended'
  state: string
  regDate: string
  regTime: string
  lastActivity: string
  lastActivityTime: string
}

export interface CreateSubscriberRequest {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  state: string
}

export interface UpdateSubscriberRequest {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  state?: string
  status?: 'Active' | 'Inactive' | 'Suspended'
}

// Credit Users Types
export interface CreditUser {
  id: number
  email: string
  fullName: string
  phone: string
  balance: number
  status: 'Active' | 'Inactive'
  createdAt: string
  updatedAt: string
}

export interface CreditUserAction {
  email: string
  action: 'credit' | 'debit'
  amount: number
  reason: string
}

// Transaction Types
export interface Transaction {
  id: number
  refId: string
  user: string
  userType: 'Subscriber' | 'Agent' | 'Vendor' | 'System User'
  phone: string
  service: string
  description: string
  amount: number
  status: 'Success' | 'Failed' | 'Pending' | 'Processing'
  type: 'Airtime TopUp' | 'Data Bundle' | 'Electricity' | 'Wallet Credit' | 'Airtime Conversion'
  createdAt: string
  updatedAt: string
}

export interface TransactionFilters {
  dateFrom?: string
  dateTo?: string
  status?: string
  type?: string
  userType?: string
  search?: string
  page?: number
  limit?: number
}

// Service Types
export interface AirtimeDiscount {
  id: number
  network: 'MTN' | 'Glo' | 'Airtel' | '9mobile'
  userDiscount: number
  agentDiscount: number
  vendorDiscount: number
  status: 'Active' | 'Inactive'
  createdAt: string
  updatedAt: string
}

export interface CreateAirtimeDiscountRequest {
  network: 'MTN' | 'Glo' | 'Airtel' | '9mobile'
  userDiscount: number
  agentDiscount: number
  vendorDiscount: number
}

export interface UpdateAirtimeDiscountRequest {
  userDiscount?: number
  agentDiscount?: number
  vendorDiscount?: number
  status?: 'Active' | 'Inactive'
}

export interface DataPlan {
  id: number
  network: 'MTN' | 'Glo' | 'Airtel' | '9mobile'
  name: string
  dataType: 'Gifting' | 'SME' | 'Corporate' | 'Direct'
  planId: string
  duration: number // in days
  buyingPrice: number
  userPrice: number
  agentPrice: number
  vendorPrice: number
  status: 'Active' | 'Inactive'
  createdAt: string
  updatedAt: string
}

export interface CreateDataPlanRequest {
  network: 'MTN' | 'Glo' | 'Airtel' | '9mobile'
  name: string
  dataType: 'Gifting' | 'SME' | 'Corporate' | 'Direct'
  planId: string
  duration: number
  buyingPrice: number
  userPrice: number
  agentPrice: number
  vendorPrice: number
}

export interface UpdateDataPlanRequest {
  name?: string
  dataType?: 'Gifting' | 'SME' | 'Corporate' | 'Direct'
  planId?: string
  duration?: number
  buyingPrice?: number
  userPrice?: number
  agentPrice?: number
  vendorPrice?: number
  status?: 'Active' | 'Inactive'
}

// Notification Types
export interface Notification {
  id: number
  subject: string
  message: string
  for: 'General' | 'Subscribers' | 'Agents' | 'Vendors' | 'System Users'
  status: 'Active' | 'Inactive'
  createdAt: string
  updatedAt: string
}

export interface CreateNotificationRequest {
  subject: string
  message: string
  messageFor: 'General' | 'Subscribers' | 'Agents' | 'Vendors' | 'System Users'
}

export interface UpdateNotificationRequest {
  subject?: string
  message?: string
  messageFor?: 'General' | 'Subscribers' | 'Agents' | 'Vendors' | 'System Users'
  status?: 'Active' | 'Inactive'
}

// Settings Types
export interface GeneralApiSettings {
  dataApiKey: string
  dataApiUrl: string
  dataBalanceCheckUrl: string
  dataFundAccount: string
  vtuApiKey: string
  vtuApiUrl: string
  vtuBalanceCheckUrl: string
  vtuFundAccount: string
  cableTvApiKey: string
  cableTvIucVerificationUrl: string
  electricityMeterApiKey: string
  electricityMeterVerificationUrl: string
  electricityApiUrl: string
  examApiKey: string
  electricityCheckerApiUrl: string
}

export interface PaystackSettings {
  publicKey: string
  secretKey: string
  baseUrl: string
  webhookUrl: string
  webhookSecret: string
  callbackUrl: string
  currency: string
  merchantEmail: string
}

export interface MonnifySettings {
  apiKey: string
  secretKey: string
  contractCode: string
  baseUrl: string
  reservedAccountName: string
  webhookUrl: string
  callbackUrl: string
  redirectUrl: string
}

export interface GeneralSettings {
  websiteName: string
  websiteUrl: string
  apiDocLink: string
  agentUpgradeFee: number
  vendorUpgradeFee: number
  walletTransferCharges: number
  referralAccountUpgrade: number
  referralAirtimePurchase: number
  referralDataPurchase: number
  referralCableTV: number
  referralWalletFunding: number
  referralExamPin: number
  referralElectricityFee: number
}

export interface ContactDetails {
  phoneNumber: string
  email: string
  whatsappLink: string
  instagramLink: string
  facebookLink: string
  twitterLink: string
  telegramUsername: string
}

// Dashboard Types
export interface DashboardStats {
  totalUsers: number
  totalSubscribers: number
  totalTransactions: number
  totalRevenue: number
  todayTransactions: number
  todayRevenue: number
  pendingTransactions: number
  activeServices: number
}

export interface RecentTransaction {
  id: number
  type: string
  description: string
  amount: number
  time: string
  status: 'Success' | 'Failed' | 'Pending'
}

// Fund Transfer Types
export interface TransferFundRequest {
  userName: string // username or email
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

// Pagination Types
export interface PaginationParams {
  page?: number
  limit?: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
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

// Export all API endpoint types
export * from './api-endpoints' 