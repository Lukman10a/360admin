// ============================================================================
// TYPES INDEX
// Central export point for all TypeScript types
// ============================================================================

// ============================================================================
// CORE BUSINESS TYPES
// ============================================================================

// User Management Types
export interface User {
  _id: string
  userName: string
  email: string
  phoneNumber: string
  role: 'Super Admin' | 'Admin' | 'User' | 'Agent' | 'Vendor'
  status: 'Active' | 'Inactive' | 'Suspended'
  walletBalance: number
  referralCode: string
  referredBy?: string
  createdAt: string
  updatedAt: string
}

export interface SystemUser extends User {
  permissions: string[]
  lastLogin: string
  loginAttempts: number
  isLocked: boolean
}

export interface Subscriber extends User {
  subscriptionType: 'Basic' | 'Premium' | 'Enterprise'
  subscriptionStatus: 'Active' | 'Expired' | 'Cancelled'
  subscriptionExpiry: string
}

export interface CreditUser extends User {
  creditLimit: number
  creditUsed: number
  creditExpiry: string
  paymentHistory: PaymentRecord[]
}

// ============================================================================
// SERVICE & TRANSACTION TYPES
// ============================================================================

export interface DataPlan {
  _id: string
  planName: string
  planNetwork: 'MTN' | 'GLO' | 'AIRTEL' | '9MOBILE'
  planType: 'Gifting' | 'SME' | 'Corporate' | 'Direct'
  planSize: string
  planValidity: string
  userPrice: number
  agentPrice: number
  vendorPrice: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Transaction {
  _id: string
  transactionId: string
  type: 'Airtime' | 'Data' | 'Electricity' | 'CableTV' | 'Transfer' | 'Funding'
  description: string
  amount: number
  status: 'Success' | 'Failed' | 'Pending'
  userId: string
  userName: string
  network?: string
  phoneNumber?: string
  meterNumber?: string
  discoName?: string
  cableProvider?: string
  smartCardNumber?: string
  planName?: string
  receipt?: {
    transactionId: string
    timestamp: string
    reference: string
    status: 'Success' | 'Failed' | 'Pending'
  }
  createdAt: string
  updatedAt: string
}

// ============================================================================
// SETTINGS & CONFIGURATION TYPES
// ============================================================================

export interface ApiSettings {
  paystackSecretKey: string
  paystackPublicKey: string
  monnifyContractCode: string
  monnifyBaseUrl: string
  monnifyReservedAccountName: string
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

// ============================================================================
// DASHBOARD & ANALYTICS TYPES
// ============================================================================

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

// ============================================================================
// UTILITY & COMMON TYPES
// ============================================================================

export interface PaymentRecord {
  amount: number
  date: string
  status: 'Success' | 'Failed' | 'Pending'
  reference: string
}

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

// ============================================================================
// API ENDPOINT TYPES
// All comprehensive API types are exported from here
// ============================================================================
export * from './api-endpoints' 