/**
 * 360 Data Admin Dashboard - API Usage Examples
 * 
 * This file demonstrates how to use the API services and React Query hooks
 * in your components. Copy these patterns to implement real API integration.
 */

// ============================================================================
// BASIC API USAGE (Direct API calls)
// ============================================================================

import { api } from '../api'

// Example: Login user
export const loginExample = async () => {
  try {
    const loginData = await api.auth.login({
      email: 'admin@360data.com',
      password: 'password123'
    })
    console.log('Login successful:', loginData)
    return loginData
  } catch (error) {
    console.error('Login failed:', error)
    throw error
  }
}

// Example: Get all system users with pagination
export const getSystemUsersExample = async () => {
  try {
    const users = await api.systemUsers.getAll({
      page: 1,
      limit: 10,
      search: 'admin'
    })
    console.log('System users:', users)
    return users
  } catch (error) {
    console.error('Failed to fetch users:', error)
    throw error
  }
}

// Example: Create new subscriber
export const createSubscriberExample = async () => {
  try {
    const newSubscriber = await api.subscribers.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+2348123456789',
      password: 'password123',
      state: 'Lagos'
    })
    console.log('Subscriber created:', newSubscriber)
    return newSubscriber
  } catch (error) {
    console.error('Failed to create subscriber:', error)
    throw error
  }
}

// ============================================================================
// REACT QUERY HOOKS USAGE (Recommended approach)
// ============================================================================

import { 
  useSystemUsers, 
  useCreateSystemUser, 
  useSubscribers,
  useCreateSubscriber,
  useAuth,
  useLogin,
  useLogout
} from '../hooks'

// Example: Authentication Component
export const AuthExample = () => {
  const { user, isAuthenticated, isLoading } = useAuth()
  const loginMutation = useLogin()
  const logoutMutation = useLogout()

  const handleLogin = async (email: string, password: string) => {
    try {
      await loginMutation.mutateAsync({ email, password })
      console.log('Login successful!')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync()
      console.log('Logout successful!')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.fullName}!</p>
          <button 
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
          >
            {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      ) : (
        <div>
          <button 
            onClick={() => handleLogin('admin@360data.com', 'password123')}
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? 'Logging in...' : 'Login'}
          </button>
        </div>
      )}
    </div>
  )
}

// Example: System Users Management Component
export const SystemUsersExample = () => {
  const { data: users, isLoading, error } = useSystemUsers({ page: 1, limit: 10 })
  const createUserMutation = useCreateSystemUser()

  const handleCreateUser = async () => {
    try {
      await createUserMutation.mutateAsync({
        fullName: 'New Admin',
        username: 'newadmin',
        email: 'newadmin@360data.com',
        password: 'password123',
        role: 'Admin'
      })
      console.log('User created successfully!')
    } catch (error) {
      console.error('Failed to create user:', error)
    }
  }

  if (isLoading) return <div>Loading users...</div>
  if (error) return <div>Error loading users: {error.message}</div>

  return (
    <div>
      <h2>System Users ({users?.meta.total})</h2>
      
      <button 
        onClick={handleCreateUser}
        disabled={createUserMutation.isPending}
      >
        {createUserMutation.isPending ? 'Creating...' : 'Create User'}
      </button>

      <div>
        {users?.data.map(user => (
          <div key={user.id}>
            <h3>{user.fullName}</h3>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <p>Status: {user.status}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div>
        Page {users?.meta.page} of {users?.meta.totalPages}
      </div>
    </div>
  )
}

// Example: Subscribers Management Component
export const SubscribersExample = () => {
  const { data: subscribers, isLoading, error, refetch } = useSubscribers({ 
    page: 1, 
    limit: 20 
  })
  const createSubscriberMutation = useCreateSubscriber()

  const handleCreateSubscriber = async () => {
    try {
      await createSubscriberMutation.mutateAsync({
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '+2348987654321',
        password: 'password123',
        state: 'Abuja'
      })
      console.log('Subscriber created successfully!')
      // Data will automatically refetch due to React Query cache invalidation
    } catch (error) {
      console.error('Failed to create subscriber:', error)
    }
  }

  const handleRefresh = () => {
    refetch()
  }

  if (isLoading) return <div>Loading subscribers...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2>Subscribers ({subscribers?.meta.total})</h2>
        <div>
          <button onClick={handleRefresh} className="mr-2">
            Refresh
          </button>
          <button 
            onClick={handleCreateSubscriber}
            disabled={createSubscriberMutation.isPending}
          >
            {createSubscriberMutation.isPending ? 'Creating...' : 'Add Subscriber'}
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {subscribers?.data.map(subscriber => (
          <div key={subscriber.id} className="border p-4 rounded">
            <h3>{subscriber.fullName}</h3>
            <p>Email: {subscriber.email}</p>
            <p>Phone: {subscriber.phone}</p>
            <p>Account: {subscriber.account}</p>
            <p>Wallet: ₦{subscriber.wallet.toLocaleString()}</p>
            <p>Status: {subscriber.status}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================================================
// ADVANCED USAGE PATTERNS
// ============================================================================

// Example: Error Handling with Toast Notifications
export const ErrorHandlingExample = () => {
  const createUserMutation = useCreateSystemUser()

  const handleCreateUserWithErrorHandling = async () => {
    try {
      await createUserMutation.mutateAsync({
        fullName: 'Test User',
        username: 'testuser',
        email: 'test@360data.com',
        password: 'password123',
        role: 'Admin'
      })
      
      // Success notification
      console.log('✅ User created successfully!')
      
    } catch (error: any) {
      // Error handling based on status code
      if (error?.response?.status === 409) {
        console.error('❌ User already exists')
      } else if (error?.response?.status === 400) {
        console.error('❌ Invalid user data')
      } else {
        console.error('❌ Failed to create user:', error.message)
      }
    }
  }

  return (
    <button onClick={handleCreateUserWithErrorHandling}>
      Create User with Error Handling
    </button>
  )
}

// Example: Optimistic Updates
export const OptimisticUpdateExample = () => {
  const { data: users } = useSystemUsers()
  const updateUserMutation = useCreateSystemUser()

  const handleOptimisticUpdate = async (userId: number) => {
    // This would be implemented with React Query's optimistic updates
    // See React Query documentation for detailed implementation
    console.log('Implementing optimistic update for user:', userId)
  }

  return (
    <div>
      {users?.data.map(user => (
        <div key={user.id}>
          <span>{user.fullName}</span>
          <button onClick={() => handleOptimisticUpdate(user.id)}>
            Update
          </button>
        </div>
      ))}
    </div>
  )
}

// ============================================================================
// CONFIGURATION EXAMPLES
// ============================================================================

// Example: Environment Configuration
export const configExample = {
  // Add to your .env.local file:
  // NEXT_PUBLIC_API_BASE_URL=https://api.360data.com/v1
  // NEXT_PUBLIC_API_TIMEOUT=30000

  // The API client will automatically use these values
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  apiTimeout: process.env.NEXT_PUBLIC_API_TIMEOUT,
}

// Example: Custom Hook for Specific Business Logic
export const useUserManagement = () => {
  const { data: systemUsers } = useSystemUsers()
  const { data: subscribers } = useSubscribers()
  const createUser = useCreateSystemUser()
  const createSubscriber = useCreateSubscriber()

  const totalUsers = (systemUsers?.meta.total || 0) + (subscribers?.meta.total || 0)
  
  const createUserWithRole = async (userData: any, role: 'system' | 'subscriber') => {
    if (role === 'system') {
      return await createUser.mutateAsync(userData)
    } else {
      return await createSubscriber.mutateAsync(userData)
    }
  }

  return {
    totalUsers,
    systemUsers: systemUsers?.data || [],
    subscribers: subscribers?.data || [],
    createUserWithRole,
    isLoading: createUser.isPending || createSubscriber.isPending,
  }
}

// ============================================================================
// MIGRATION GUIDE: From Mock Data to Real API
// ============================================================================

/*
STEP 1: Replace mock data arrays with API hooks

// Before (with mock data):
const [users, setUsers] = useState(mockUsers)

// After (with API):
const { data: users, isLoading, error } = useSystemUsers()

STEP 2: Replace form submissions with mutations

// Before:
const handleSubmit = (formData) => {
  setUsers([...users, { ...formData, id: Date.now() }])
  setIsModalOpen(false)
}

// After:
const createUserMutation = useCreateSystemUser()
const handleSubmit = async (formData) => {
  try {
    await createUserMutation.mutateAsync(formData)
    setIsModalOpen(false)
    // Data automatically updates due to cache invalidation
  } catch (error) {
    console.error('Failed to create user:', error)
  }
}

STEP 3: Add loading and error states

// Add to your components:
if (isLoading) return <LoadingSpinner />
if (error) return <ErrorMessage error={error} />

STEP 4: Update environment variables

// Add to .env.local:
NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com/api

STEP 5: Test with real backend

// Start with a single component, then gradually migrate others
// Use React Query DevTools to debug API calls
*/ 