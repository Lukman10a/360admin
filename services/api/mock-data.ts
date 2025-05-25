import { 
  SystemUser, 
  Subscriber, 
  CreditUser, 
  Transaction, 
  AirtimeDiscount, 
  DataPlan,
  Notification,
  DashboardStats,
  ApiResponse,
  PaginatedResponse
} from '../types'

// Mock System Users
export const mockSystemUsers: SystemUser[] = [
  {
    id: 1,
    fullName: 'John Doe',
    username: 'johndoe',
    email: 'john@360data.com',
    role: 'Super Admin',
    status: 'Active',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    lastLogin: '2024-01-20T14:22:00Z'
  },
  {
    id: 2,
    fullName: 'Jane Smith',
    username: 'janesmith',
    email: 'jane@360data.com',
    role: 'Admin',
    status: 'Active',
    createdAt: '2024-01-16T09:15:00Z',
    updatedAt: '2024-01-16T09:15:00Z',
    lastLogin: '2024-01-19T16:45:00Z'
  }
]

// Mock Subscribers
export const mockSubscribers: Subscriber[] = [
  {
    id: 1,
    fullName: 'Alice Johnson',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice@example.com',
    phone: '+2348123456789',
    wallet: 5000,
    account: 'Subscriber',
    status: 'Active',
    state: 'Lagos',
    regDate: '2024-01-10',
    regTime: '14:30:00',
    lastActivity: '2024-01-20',
    lastActivityTime: '10:15:00'
  },
  {
    id: 2,
    fullName: 'Bob Wilson',
    firstName: 'Bob',
    lastName: 'Wilson',
    email: 'bob@example.com',
    phone: '+2348987654321',
    wallet: 12500,
    account: 'Agent',
    status: 'Active',
    state: 'Abuja',
    regDate: '2024-01-08',
    regTime: '11:20:00',
    lastActivity: '2024-01-19',
    lastActivityTime: '16:45:00'
  }
]

// Mock Credit Users
export const mockCreditUsers: CreditUser[] = [
  {
    id: 1,
    email: 'credit1@example.com',
    fullName: 'Credit User One',
    phone: '+2348111111111',
    balance: 50000,
    status: 'Active',
    createdAt: '2024-01-12T08:00:00Z',
    updatedAt: '2024-01-20T12:30:00Z'
  }
]

// Mock Transactions
export const mockTransactions: Transaction[] = [
  {
    id: 1,
    refId: 'TXN001',
    user: 'Alice Johnson',
    userType: 'Subscriber',
    phone: '+2348123456789',
    service: 'MTN Data',
    description: '1GB Data Bundle',
    amount: 300,
    status: 'Success',
    type: 'Data Bundle',
    createdAt: '2024-01-20T10:15:00Z',
    updatedAt: '2024-01-20T10:15:00Z'
  }
]

// Mock Dashboard Stats
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

// Helper function to create mock API response
export const createMockResponse = <T>(data: T, meta?: any): ApiResponse<T> => ({
  success: true,
  message: 'Success (Mock Data)',
  data,
  meta
})

// Helper function to create mock paginated response
export const createMockPaginatedResponse = <T>(
  data: T[], 
  page: number = 1, 
  limit: number = 10
): ApiResponse<PaginatedResponse<T>> => {
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedData = data.slice(startIndex, endIndex)
  
  return createMockResponse({
    data: paginatedData,
    meta: {
      total: data.length,
      page,
      limit,
      totalPages: Math.ceil(data.length / limit)
    }
  })
}

// Mock API delay simulation
export const mockDelay = (ms: number = 500): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms))

// Check if we should use mock data
export const shouldUseMockData = (): boolean => {
  return process.env.NODE_ENV === 'development' && 
         process.env.NEXT_PUBLIC_API_BASE_URL === undefined
} 