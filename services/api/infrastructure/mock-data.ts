import { 
  SystemUser, 
  Subscriber, 
  CreditUser, 
  Transaction, 
  DataPlan,
  DashboardStats,
  PaginatedResponse
} from '../../types'
import { User } from '../../types/api-endpoints'

// Mock System Users - aligned with SystemUser interface
export const mockSystemUsers: SystemUser[] = [
  {
    _id: '1',
    userName: 'johndoe',
    email: 'john@360data.com',
    phoneNumber: '+2348012345678',
    role: 'Super Admin',
    status: 'Active',
    walletBalance: 10000,
    referralCode: 'JOHN001',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    permissions: ['all'],
    lastLogin: '2024-01-20T14:22:00Z',
    loginAttempts: 0,
    isLocked: false
  },
  {
    _id: '2',
    userName: 'janesmith',
    email: 'jane@360data.com',
    phoneNumber: '+2348023456789',
    role: 'Admin',
    status: 'Active',
    walletBalance: 5000,
    referralCode: 'JANE002',
    createdAt: '2024-01-16T09:15:00Z',
    updatedAt: '2024-01-16T09:15:00Z',
    permissions: ['users', 'transactions', 'settings'],
    lastLogin: '2024-01-19T16:45:00Z',
    loginAttempts: 0,
    isLocked: false
  }
]

// Mock Subscribers - aligned with Subscriber interface
export const mockSubscribers: Subscriber[] = [
  {
    _id: '1',
    userName: 'alicejohnson',
    email: 'alice@example.com',
    phoneNumber: '+2348123456789',
    role: 'User',
    status: 'Active',
    walletBalance: 5000,
    referralCode: 'ALICE001',
    createdAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-20T10:15:00Z',
    subscriptionType: 'Basic',
    subscriptionStatus: 'Active',
    subscriptionExpiry: '2025-01-10T14:30:00Z'
  },
  {
    _id: '2',
    userName: 'bobwilson',
    email: 'bob@example.com',
    phoneNumber: '+2348987654321',
    role: 'Agent',
    status: 'Active',
    walletBalance: 12500,
    referralCode: 'BOB002',
    createdAt: '2024-01-08T11:20:00Z',
    updatedAt: '2024-01-19T16:45:00Z',
    subscriptionType: 'Premium',
    subscriptionStatus: 'Active',
    subscriptionExpiry: '2025-01-08T11:20:00Z'
  }
]

// Mock Credit Users - aligned with CreditUser interface
export const mockCreditUsers: CreditUser[] = [
  {
    _id: '1',
    userName: 'credituser1',
    email: 'credit1@example.com',
    phoneNumber: '+2348111111111',
    role: 'User',
    status: 'Active',
    walletBalance: 50000,
    referralCode: 'CREDIT001',
    createdAt: '2024-01-12T08:00:00Z',
    updatedAt: '2024-01-20T12:30:00Z',
    creditLimit: 100000,
    creditUsed: 25000,
    creditExpiry: '2025-01-12T08:00:00Z',
    paymentHistory: [
      {
        amount: 25000,
        date: '2024-01-20T12:30:00Z',
        status: 'Success',
        reference: 'PAY001'
      }
    ]
  }
]

// Mock Transactions - aligned with Transaction interface
export const mockTransactions: Transaction[] = [
  {
    _id: '1',
    transactionId: 'TXN001',
    type: 'Data',
    description: '1GB Data Bundle - MTN',
    amount: 300,
    status: 'Success',
    userId: '1',
    userName: 'Alice Johnson',
    network: 'MTN',
    phoneNumber: '+2348123456789',
    planName: '1GB Data Bundle',
    receipt: {
      transactionId: 'TXN001',
      timestamp: '2024-01-20T10:15:00Z',
      reference: 'REF001',
      status: 'Success'
    },
    createdAt: '2024-01-20T10:15:00Z',
    updatedAt: '2024-01-20T10:15:00Z'
  }
]

// Mock Data Plans - aligned with DataPlan interface
export const mockDataPlans: DataPlan[] = [
  {
    _id: '1',
    planName: '1GB Basic',
    planNetwork: 'MTN',
    planType: 'Gifting',
    planSize: '1GB',
    planValidity: '30 Days',
    userPrice: 300,
    agentPrice: 280,
    vendorPrice: 260,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
]

// Mock Dashboard Stats - aligned with DashboardStats interface
export const mockDashboardStats: DashboardStats = {
  totalUsers: 1250,
  totalSubscribers: 1200,
  totalTransactions: 5680,
  totalRevenue: 2450000,
  todayTransactions: 45,
  todayRevenue: 15600,
  pendingTransactions: 8,
  activeServices: 12
}

// Helper function to create mock paginated response
export const createMockPaginatedResponse = <T>(
  data: T[], 
  page: number = 1, 
  limit: number = 10
): PaginatedResponse<T> => {
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedData = data.slice(startIndex, endIndex)
  
  return {
    data: paginatedData,
    meta: {
      total: data.length,
      page,
      limit,
      totalPages: Math.ceil(data.length / limit)
    }
  }
}

// Mock API delay simulation
export const mockDelay = (ms: number = 500): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms))

// Mock Auth Data - aligned with LoginResponse interface
export const mockAuthUser: User = {
  _id: "67a5f0c5608e11b05dc7fc1e",
  email: "testing@gmail.com",
  userName: "testing",
  phoneNumber: "08108126121",
  balance: 0,
  apiToken: "VLedYaK9267dRcYZPTIMBdRaeY9etF",
  userType: "smart earner",
  isPartner: false,
  isSpecial: false,
  fullName: "Test User",
  bvn: "",
  nin: "",
  referredBy: "",
  referrals: [],
  accountNumbers: [],
  specialPrices: [],
  createdAt: "2025-02-07T11:38:45.576Z",
  updatedAt: "2025-02-07T11:38:45.577Z",
  __v: 0
}

export const mockLoginResponse = {
  status: 200,
  status_code: "OK",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2E1ZjBjNTYwOGUxMWIwNWRjN2ZjMWUiLCJ1c2VyVHlwZSI6InNtYXJ0IGVhcm5lciIsImlhdCI6MTc0MzM0MzUyOCwiZXhwIjoxNzQzNDI5OTI4fQ.gQTbG0lVJNrj3iemqih8yTyJIW0-C26p-49z-Kl3KnM",
  data: mockAuthUser,
  msg: "Login successful"
}

// Check if we should use mock data
export const shouldUseMockData = (): boolean => {
  return process.env.NODE_ENV === 'development' && 
         process.env.NEXT_PUBLIC_API_BASE_URL === undefined
} 