# TanStack Query Usage Guide

This guide demonstrates how to use all the TanStack Query hooks for the 360 Data Admin Dashboard API services.

## 🚀 Quick Start

```typescript
import { 
  useUserProfile, 
  useLogin, 
  useDataPlans,
  useTransactions 
} from '@/services/hooks'

// Use in your component
function MyComponent() {
  const { data: user, isLoading } = useUserProfile()
  const loginMutation = useLogin()
  
  if (isLoading) return <div>Loading...</div>
  
  return <div>Welcome, {user?.data?.userName}!</div>
}
```

## 📚 Hook Categories

### **1. Authentication Hooks** (`useAuth.ts`)
- User login, registration, and profile management
- Password operations and account management
- Authentication state and guards

### **2. Comprehensive API Hooks** (`useApiQueries.ts`)
- All API endpoints with TanStack Query
- Automatic caching and invalidation
- Optimistic updates and error handling

### **3. Specialized Data Plan Hooks** (`useDataPlans.ts`)
- Advanced data plan filtering and management
- Statistics and analytics
- Optimistic updates for better UX

## 🔐 Authentication Hooks

### **User Profile**
```typescript
import { useUserProfile, useAuthStatus } from '@/services/hooks'

function UserProfile() {
  const { data: profile, isLoading, error } = useUserProfile()
  const { isAuthenticated, user } = useAuthStatus()
  
  if (isLoading) return <div>Loading profile...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return (
    <div>
      <h1>Welcome, {user?.userName}!</h1>
      <p>Balance: ₦{user?.balance}</p>
    </div>
  )
}
```

### **Login & Registration**
```typescript
import { useLogin, useRegister } from '@/services/hooks'

function LoginForm() {
  const loginMutation = useLogin({
    onSuccess: (data) => {
      console.log('Login successful:', data.msg)
      // Redirect or update UI
    },
    onError: (error) => {
      console.error('Login failed:', error.message)
    }
  })
  
  const handleSubmit = (credentials: LoginRequest) => {
    loginMutation.mutate(credentials)
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button 
        type="submit" 
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}
```

### **Authentication Guards**
```typescript
import { useRequireAuth, useOptionalAuth } from '@/services/hooks'

// Require authentication
function ProtectedComponent() {
  const { isAuthenticated, isLoading, requireAuth } = useRequireAuth('/login')
  
  if (isLoading) return <div>Checking auth...</div>
  if (requireAuth) return <div>Please log in</div>
  
  return <div>Protected content here</div>
}

// Optional authentication
function PublicComponent() {
  const { isAuthenticated, user, isReady } = useOptionalAuth()
  
  if (!isReady) return <div>Loading...</div>
  
  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome back, {user?.userName}!</p>
      ) : (
        <p>Please log in for personalized experience</p>
      )}
    </div>
  )
}
```

## 📊 Data Plan Hooks

### **Basic Data Plan Queries**
```typescript
import { 
  useDataPlans, 
  useDataPlansByNetwork,
  useAvailableDataPlans 
} from '@/services/hooks'

function DataPlansList() {
  // Get all plans
  const { data: allPlans, isLoading: allLoading } = useDataPlans()
  
  // Get MTN plans only
  const { data: mtnPlans, isLoading: mtnLoading } = useDataPlansByNetwork('1')
  
  // Get only available plans
  const { data: availablePlans } = useAvailableDataPlans()
  
  if (allLoading || mtnLoading) return <div>Loading plans...</div>
  
  return (
    <div>
      <h2>All Plans ({allPlans?.data?.length})</h2>
      <h3>MTN Plans ({mtnPlans?.data?.length})</h3>
      <h3>Available Plans ({availablePlans?.data?.length})</h3>
    </div>
  )
}
```

### **Advanced Filtering**
```typescript
import { 
  useDataPlansByType,
  useDataPlansByPriceRange,
  useDataPlansByValidity 
} from '@/services/hooks'

function FilteredPlans() {
  // Get SME plans
  const { data: smePlans } = useDataPlansByType('SME')
  
  // Get plans under ₦500
  const { data: affordablePlans } = useDataPlansByPriceRange(0, 500)
  
  // Get 30-day plans
  const { data: monthlyPlans } = useDataPlansByValidity('30')
  
  return (
    <div>
      <h3>SME Plans: {smePlans?.data?.length}</h3>
      <h3>Under ₦500: {affordablePlans?.data?.length}</h3>
      <h3>30-Day Plans: {monthlyPlans?.data?.length}</h3>
    </div>
  )
}
```

### **Data Plan Management**
```typescript
import { 
  useAddDataPlan, 
  useUpdateDataPlan, 
  useDeleteDataPlan 
} from '@/services/hooks'

function DataPlanManager() {
  const addMutation = useAddDataPlan()
  const updateMutation = useUpdateDataPlan()
  const deleteMutation = useDeleteDataPlan()
  
  const handleAdd = (planData: AddDataPlanRequest) => {
    addMutation.mutate(planData, {
      onSuccess: () => {
        console.log('Plan added successfully!')
      }
    })
  }
  
  const handleUpdate = (id: string, updates: UpdateDataPlanRequest) => {
    updateMutation.mutate({ id, request: updates }, {
      onSuccess: () => {
        console.log('Plan updated successfully!')
      }
    })
  }
  
  const handleDelete = (id: string) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        console.log('Plan deleted successfully!')
      }
    })
  }
  
  return (
    <div>
      <button 
        onClick={() => handleAdd(samplePlan)}
        disabled={addMutation.isPending}
      >
        {addMutation.isPending ? 'Adding...' : 'Add Plan'}
      </button>
      
      <button 
        onClick={() => handleUpdate('plan-id', updates)}
        disabled={updateMutation.isPending}
      >
        {updateMutation.isPending ? 'Updating...' : 'Update Plan'}
      </button>
      
      <button 
        onClick={() => handleDelete('plan-id')}
        disabled={deleteMutation.isPending}
      >
        {deleteMutation.isPending ? 'Deleting...' : 'Delete Plan'}
      </button>
    </div>
  )
}
```

### **Data Plan Statistics**
```typescript
import { useDataPlanStats } from '@/services/hooks'

function DataPlanStats() {
  const { stats, isLoading } = useDataPlanStats('1') // MTN stats
  
  if (isLoading) return <div>Loading stats...</div>
  
  return (
    <div>
      <h3>Data Plan Statistics</h3>
      <p>Total Plans: {stats.total}</p>
      <p>Available: {stats.available}</p>
      <p>Unavailable: {stats.unavailable}</p>
      
      <h4>By Type:</h4>
      {Object.entries(stats.byType).map(([type, count]) => (
        <p key={type}>{type}: {count}</p>
      ))}
      
      <h4>Price Ranges:</h4>
      <p>Under ₦100: {stats.priceRanges.under100}</p>
      <p>Under ₦500: {stats.priceRanges.under500}</p>
      <p>Under ₦1000: {stats.priceRanges.under1000}</p>
      <p>Over ₦1000: {stats.priceRanges.over1000}</p>
    </div>
  )
}
```

## 🛒 Buy Services Hooks

### **Data & Airtime Purchases**
```typescript
import { useBuyData, useBuyAirtime } from '@/services/hooks'

function BuyServices() {
  const buyDataMutation = useBuyData()
  const buyAirtimeMutation = useBuyAirtime()
  
  const handleBuyData = (request: BuyDataRequest) => {
    buyDataMutation.mutate(request, {
      onSuccess: (response) => {
        console.log('Data purchased:', response.msg)
        // Show success message or redirect
      },
      onError: (error) => {
        console.error('Purchase failed:', error.message)
        // Show error message
      }
    })
  }
  
  const handleBuyAirtime = (request: BuyAirtimeRequest) => {
    buyAirtimeMutation.mutate(request, {
      onSuccess: (response) => {
        console.log('Airtime purchased:', response.msg)
      }
    })
  }
  
  return (
    <div>
      <button 
        onClick={() => handleBuyData(dataRequest)}
        disabled={buyDataMutation.isPending}
      >
        {buyDataMutation.isPending ? 'Processing...' : 'Buy Data'}
      </button>
      
      <button 
        onClick={() => handleBuyAirtime(airtimeRequest)}
        disabled={buyAirtimeMutation.isPending}
      >
        {buyAirtimeMutation.isPending ? 'Processing...' : 'Buy Airtime'}
      </button>
    </div>
  )
}
```

### **Electricity Services**
```typescript
import { 
  useValidateMeter, 
  useBuyElectricity,
  useDiscos 
} from '@/services/hooks'

function ElectricityServices() {
  const { data: discos } = useDiscos()
  const validateMutation = useValidateMeter(meterRequest)
  const buyElectricityMutation = useBuyElectricity()
  
  return (
    <div>
      <h3>Available Discos:</h3>
      {discos?.discos?.map(disco => (
        <div key={disco.id}>
          {disco.name} ({disco.code})
        </div>
      ))}
      
      <button 
        onClick={() => validateMutation.refetch()}
        disabled={validateMutation.isLoading}
      >
        Validate Meter
      </button>
      
      {validateMutation.data && (
        <div>
          <p>Customer: {validateMutation.data.name}</p>
          <p>Address: {validateMutation.data.address}</p>
        </div>
      )}
    </div>
  )
}
```

## 📋 Transaction Hooks

### **Transaction Queries**
```typescript
import { useTransactions, useSearchTransactions } from '@/services/hooks'

function TransactionHistory() {
  // Get all transactions
  const { data: allTransactions, isLoading } = useTransactions()
  
  // Search with filters
  const { data: searchResults, isLoading: searchLoading } = useSearchTransactions({
    type: 'airtime',
    status: 'success'
  })
  
  if (isLoading || searchLoading) return <div>Loading transactions...</div>
  
  return (
    <div>
      <h3>All Transactions: {allTransactions?.data?.length}</h3>
      <h3>Search Results: {searchResults?.data?.length}</h3>
      
      {searchResults?.data?.map(transaction => (
        <div key={transaction._id}>
          {transaction.trans_Type}: {transaction.trans_amount}
        </div>
      ))}
    </div>
  )
}
```

## 💰 Fund Transfer Hooks

### **User & Admin Transfers**
```typescript
import { 
  useTransferFundToUser, 
  useAdminTransferFund 
} from '@/services/hooks'

function FundTransfer() {
  const userTransferMutation = useTransferFundToUser()
  const adminTransferMutation = useAdminTransferFund()
  
  const handleUserTransfer = (request: TransferFundRequest) => {
    userTransferMutation.mutate({
      request,
      userToken: 'user-auth-token'
    }, {
      onSuccess: (response) => {
        console.log('Transfer successful:', response.msg)
      }
    })
  }
  
  const handleAdminTransfer = (request: TransferFundRequest) => {
    adminTransferMutation.mutate({
      request,
      adminToken: 'admin-bearer-token'
    })
  }
  
  return (
    <div>
      <button 
        onClick={() => handleUserTransfer(transferRequest)}
        disabled={userTransferMutation.isPending}
      >
        {userTransferMutation.isPending ? 'Processing...' : 'Transfer to User'}
      </button>
      
      <button 
        onClick={() => handleAdminTransfer(transferRequest)}
        disabled={adminTransferMutation.isPending}
      >
        {adminTransferMutation.isPending ? 'Processing...' : 'Admin Transfer'}
      </button>
    </div>
  )
}
```

## 🔧 Utility Hooks

### **Network Utilities**
```typescript
import { useNetworkName, useNetworkId } from '@/services/hooks'

function NetworkInfo() {
  const { data: networkNames } = useNetworkName('1')
  const { data: networkId } = useNetworkId('MTN')
  
  return (
    <div>
      <p>Network ID 1: {networkNames}</p>
      <p>MTN Network ID: {networkId}</p>
    </div>
  )
}
```

### **Bulk Operations**
```typescript
import { useBulkInvalidate, useBulkInvalidateDataPlans } from '@/services/hooks'

function CacheManager() {
  const bulkInvalidate = useBulkInvalidate()
  const dataPlanInvalidate = useBulkInvalidateDataPlans()
  
  return (
    <div>
      <button onClick={bulkInvalidate.invalidateAll}>
        Invalidate All Queries
      </button>
      
      <button onClick={bulkInvalidate.invalidateUserData}>
        Invalidate User Data
      </button>
      
      <button onClick={dataPlanInvalidate.invalidateAll}>
        Invalidate Data Plans
      </button>
      
      <button onClick={() => dataPlanInvalidate.invalidateByNetwork('1')}>
        Invalidate MTN Plans
      </button>
    </div>
  )
}
```

### **Optimistic Updates**
```typescript
import { useOptimisticUpdateDataPlan } from '@/services/hooks'

function OptimisticDataPlan() {
  const { optimisticUpdate, rollbackUpdate } = useOptimisticUpdateDataPlan()
  
  const handleUpdate = (id: string, updates: Partial<UpdateDataPlanRequest>) => {
    try {
      // Apply optimistic update
      optimisticUpdate(id, updates)
      
      // Make API call
      updateDataPlan({ id, request: updates as UpdateDataPlanRequest })
        .then(() => {
          console.log('Update successful')
        })
        .catch(() => {
          // Rollback on error
          rollbackUpdate(id)
        })
    } catch (error) {
      rollbackUpdate(id)
    }
  }
  
  return (
    <button onClick={() => handleUpdate('plan-id', { planName: 'New Name' })}>
      Update Plan Name
    </button>
  )
}
```

## ⚡ Performance Features

### **Automatic Caching**
- **Stale Time**: Data is considered fresh for 1-10 minutes
- **Garbage Collection**: Old data is automatically cleaned up
- **Background Updates**: Data refreshes in the background

### **Smart Invalidation**
- **Related Queries**: Updating a plan invalidates related queries
- **Selective Invalidation**: Only invalidate what's necessary
- **Optimistic Updates**: UI updates immediately, rolls back on error

### **Query Optimization**
- **Deduplication**: Multiple components requesting same data share one request
- **Prefetching**: Preload data before it's needed
- **Parallel Queries**: Multiple queries run simultaneously

## 🚨 Error Handling

### **Global Error Handling**
```typescript
import { useAuthError, useSetAuthError } from '@/services/hooks'

function ErrorBoundary() {
  const { data: authError } = useAuthError()
  const { setError, clearError } = useSetAuthError()
  
  useEffect(() => {
    if (authError) {
      // Show error toast or modal
      showErrorToast(authError)
      clearError()
    }
  }, [authError, clearError])
  
  return null
}
```

### **Individual Error Handling**
```typescript
function DataPlansWithErrorHandling() {
  const { data: plans, error, isLoading } = useDataPlans({
    onError: (error) => {
      console.error('Failed to fetch data plans:', error)
      // Show user-friendly error message
    }
  })
  
  if (error) {
    return (
      <div className="error">
        <p>Failed to load data plans</p>
        <button onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    )
  }
  
  // Render plans...
}
```

## 📱 Best Practices

### **1. Use Appropriate Hooks**
- Use specialized hooks for specific features
- Use comprehensive hooks for general operations
- Combine hooks for complex scenarios

### **2. Handle Loading States**
```typescript
function LoadingStates() {
  const { data, isLoading, isError, error } = useDataPlans()
  
  if (isLoading) return <Spinner />
  if (isError) return <ErrorMessage error={error} />
  if (!data) return <EmptyState />
  
  return <DataPlansList plans={data.data} />
}
```

### **3. Optimize Re-renders**
```typescript
function OptimizedComponent() {
  // Only re-render when data changes
  const { data: user } = useUserProfile({
    select: (data) => data?.data?.userName
  })
  
  // Memoize expensive operations
  const expensiveValue = useMemo(() => {
    return computeExpensiveValue(user)
  }, [user])
  
  return <div>{expensiveValue}</div>
}
```

### **4. Handle Mutations Properly**
```typescript
function ProperMutationHandling() {
  const mutation = useAddDataPlan({
    onMutate: (variables) => {
      // Optimistic update
      return { previousData: getPreviousData() }
    },
    onError: (error, variables, context) => {
      // Rollback optimistic update
      if (context?.previousData) {
        setData(context.previousData)
      }
    },
    onSettled: () => {
      // Always refetch after mutation
      queryClient.invalidateQueries({ queryKey: ['dataPlans'] })
    }
  })
  
  return <button onClick={() => mutation.mutate(data)}>
    Add Plan
  </button>
}
```

## 🎯 Advanced Patterns

### **Infinite Queries**
```typescript
import { useInfiniteQuery } from '@tanstack/react-query'

function InfiniteDataPlans() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['dataPlans', 'infinite'],
    queryFn: ({ pageParam = 0 }) => fetchDataPlans(pageParam),
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  })
  
  return (
    <div>
      {data?.pages.map((page, i) => (
        <div key={i}>
          {page.data.map(plan => (
            <DataPlanCard key={plan._id} plan={plan} />
          ))}
        </div>
      ))}
      
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Loading more...' : 'Load More'}
        </button>
      )}
    </div>
  )
}
```

### **Suspense Mode**
```typescript
import { Suspense } from 'react'

function SuspenseDataPlans() {
  return (
    <Suspense fallback={<Spinner />}>
      <DataPlansList />
    </Suspense>
  )
}

function DataPlansList() {
  const { data } = useDataPlans({
    suspense: true // Enable Suspense mode
  })
  
  return <div>{/* Render plans */}</div>
}
```

This comprehensive guide covers all the TanStack Query hooks available in the 360 Data Admin Dashboard. Use these patterns to build performant, user-friendly applications with automatic caching, background updates, and excellent error handling.
