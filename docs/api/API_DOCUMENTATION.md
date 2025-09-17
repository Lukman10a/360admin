# 360 Admin Dashboard - API Documentation

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Architecture Overview](#architecture-overview)
- [API Services](#api-services)
- [React Query Hooks](#react-query-hooks)
- [Environment Setup](#environment-setup)
- [Usage Examples](#usage-examples)
- [Error Handling](#error-handling)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## 🚀 Quick Start

### 1. Environment Setup

Create a `.env.local` file in your project root:

```bash
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com/api
NEXT_PUBLIC_API_TIMEOUT=30000

# Optional: Enable mock data for development
NEXT_PUBLIC_USE_MOCK_DATA=true
```

### 2. Basic Usage

```tsx
import { useLogin, useUserProfile, useTransactions } from "@/services/hooks";

// Login Component
const LoginForm = () => {
  const loginMutation = useLogin();

  const handleLogin = async (credentials) => {
    try {
      await loginMutation.mutateAsync(credentials);
      console.log("Login successful!");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <button
      onClick={() => handleLogin({ userName: "user", password: "pass" })}
      disabled={loginMutation.isPending}
    >
      {loginMutation.isPending ? "Logging in..." : "Login"}
    </button>
  );
};

// User Profile Component
const UserProfile = () => {
  const { data: user, isLoading, error } = useUserProfile();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Welcome, {user?.data?.userName}</h2>
      <p>Balance: ₦{user?.data?.balance}</p>
    </div>
  );
};
```

## 🏗️ Architecture Overview

### Layered Architecture

```
┌─────────────────┐
│   Components    │  ← React Components
├─────────────────┤
│     Hooks       │  ← React Query Hooks
├─────────────────┤
│   ApiService    │  ← Main API Interface
├─────────────────┤
│  Domain Services│  ← Business Logic
├─────────────────┤
│ Infrastructure  │  ← HTTP Client, Endpoints
└─────────────────┘
```

### Key Principles

- **Separation of Concerns**: Each layer has a specific responsibility
- **Mock Data Support**: Automatic fallback to mock data in development
- **Type Safety**: Full TypeScript support with proper interfaces
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Caching**: Intelligent caching with React Query
- **Optimistic Updates**: Support for optimistic UI updates

## 🔧 API Services

### Authentication Service

```typescript
import { authApi } from "@/services/api/domain/auth";

// Login
const loginResponse = await authApi.login({
  userName: "admin",
  password: "password123",
});

// Get Profile
const profile = await authApi.getProfile();

// Update User
const updatedUser = await authApi.updateUser("userId", {
  email: "newemail@example.com",
});
```

### Transaction Services

```typescript
import {
  transactionsApi,
  fundTransferApi,
} from "@/services/api/domain/transactions";

// Get All Transactions
const transactions = await transactionsApi.getAll();

// Search Transactions
const searchResults = await transactionsApi.search({
  type: "airtime",
  phoneNumber: "08012345678",
});

// Transfer Funds
const transferResult = await fundTransferApi.transfer({
  userName: "recipient",
  amount: 1000,
});
```

### Buy Services

```typescript
import { buyServicesApi, dataPlansApi } from "@/services/api/domain/services";

// Buy Data
const dataPurchase = await buyServicesApi.buyData({
  network: "1",
  plan: "planId",
  mobile_number: "08012345678",
});

// Buy Airtime
const airtimePurchase = await buyServicesApi.buyAirtime({
  mobile_number: "08012345678",
  network: 1,
  amount: 500,
});

// Get Data Plans
const dataPlans = await dataPlansApi.getAll();
```

### Contact Management

```typescript
import { contactsApi } from "@/services/api/domain/contacts";

// Add Contact
const newContact = await contactsApi.add({
  contactName: "John Doe",
  contactNumber: "08012345678",
  contactNetwork: "MTN",
});

// Get All Contacts
const contacts = await contactsApi.getAll();

// Update Contact
const updatedContact = await contactsApi.update("contactId", {
  contactName: "Jane Doe",
});
```

### Admin Operations

```typescript
import { adminApi } from "@/services/api/domain/admin";

// Generate Coupons
const couponResult = await adminApi.generateCoupon({
  amount: 100,
  quantity: 10,
});

// Process Refund
const refundResult = await adminApi.processRefund("transactionId", {
  amount: 500,
  reason: "Customer request",
});
```

### Price Management

```typescript
import { pricesApi } from "@/services/api/domain/prices";

// Get All Prices
const prices = await pricesApi.getAll();

// Get Prices by Network
const networkPrices = await pricesApi.getByNetwork("MTN");

// Get Airtime Prices
const airtimePrices = await pricesApi.getAirtimePrices();
```

## 🎣 React Query Hooks

### Authentication Hooks

```tsx
import {
  useLogin,
  useRegister,
  useUserProfile,
  useUpdateUser,
  useDeleteUser,
  useChangePassword,
} from "@/services/hooks";

// Login
const loginMutation = useLogin();
await loginMutation.mutateAsync({ userName: "user", password: "pass" });

// Get Profile
const { data: user, isLoading } = useUserProfile();

// Update User
const updateMutation = useUpdateUser();
await updateMutation.mutateAsync({
  id: "userId",
  request: { email: "new@example.com" },
});
```

### Transaction Hooks

```tsx
import {
  useTransactions,
  useSearchTransactions,
  useTransferFundToUser,
  useBuyData,
  useBuyAirtime,
} from "@/services/hooks";

// Get Transactions
const { data: transactions, isLoading, refetch } = useTransactions();

// Search Transactions
const { data: searchResults } = useSearchTransactions({
  type: "airtime",
  phoneNumber: "08012345678",
});

// Buy Data
const buyDataMutation = useBuyData();
await buyDataMutation.mutateAsync({
  network: "1",
  plan: "planId",
  mobile_number: "08012345678",
});
```

### Contact Hooks

```tsx
import {
  useContacts,
  useAddContact,
  useUpdateContact,
  useDeleteContact,
} from "@/services/hooks";

// Get Contacts
const { data: contacts } = useContacts();

// Add Contact
const addContactMutation = useAddContact();
await addContactMutation.mutateAsync({
  contactName: "John Doe",
  contactNumber: "08012345678",
  contactNetwork: "MTN",
});
```

### Utility Hooks

```tsx
import { useNetworkName, useNetworkId } from "@/services/hooks";

// Network Conversions
const { data: networkName } = useNetworkName("1"); // Returns 'MTN'
const { data: networkId } = useNetworkId("MTN"); // Returns '1'
```

## ⚙️ Environment Setup

### Required Environment Variables

```bash
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com/api
NEXT_PUBLIC_API_TIMEOUT=30000

# Development Options
NEXT_PUBLIC_USE_MOCK_DATA=true  # Enable mock data fallback
NEXT_PUBLIC_DEBUG_API=true      # Enable API debug logging
```

### Development vs Production

```typescript
// Automatic mock data detection
const shouldUseMockData = () => {
  return (
    process.env.NODE_ENV === "development" ||
    process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true"
  );
};
```

### API Client Configuration

The API client automatically:

- Handles authentication tokens
- Manages request/response interceptors
- Provides automatic retry logic
- Supports mock data fallbacks
- Includes proper error handling

## 📝 Usage Examples

### Complete Authentication Flow

```tsx
import { useState } from "react";
import { useLogin, useRegister, useUserProfile } from "@/services/hooks";

const AuthComponent = () => {
  const [isLogin, setIsLogin] = useState(true);
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const { data: user } = useUserProfile();

  const handleAuth = async (formData) => {
    try {
      if (isLogin) {
        await loginMutation.mutateAsync(formData);
      } else {
        await registerMutation.mutateAsync({
          ...formData,
          passwordCheck: formData.password,
          phoneNumber: "+2348000000000",
        });
      }
    } catch (error) {
      console.error("Auth failed:", error);
    }
  };

  if (user) {
    return <div>Welcome, {user.data.userName}!</div>;
  }

  return (
    <div>
      <button onClick={() => setIsLogin(!isLogin)}>
        Switch to {isLogin ? "Register" : "Login"}
      </button>
      <button
        onClick={() =>
          handleAuth({
            userName: "testuser",
            password: "password123",
          })
        }
        disabled={loginMutation.isPending || registerMutation.isPending}
      >
        {isLogin ? "Login" : "Register"}
      </button>
    </div>
  );
};
```

### Transaction Management

```tsx
import { useTransactions, useSearchTransactions } from "@/services/hooks";

const TransactionsComponent = () => {
  const { data: transactions, isLoading, refetch } = useTransactions();
  const { data: searchResults } = useSearchTransactions({
    type: "data",
  });

  if (isLoading) return <div>Loading transactions...</div>;

  return (
    <div>
      <button onClick={refetch}>Refresh</button>

      <h3>All Transactions ({transactions?.data?.length})</h3>
      {transactions?.data?.map((tx) => (
        <div key={tx._id}>
          {tx.trans_Id} - ₦{tx.trans_amount}
        </div>
      ))}

      <h3>Data Transactions ({searchResults?.data?.transactions?.length})</h3>
      {searchResults?.data?.transactions?.map((tx) => (
        <div key={tx._id}>
          {tx.trans_Id} - ₦{tx.trans_amount}
        </div>
      ))}
    </div>
  );
};
```

## 🚨 Error Handling

### Hook Error Handling

```tsx
const MyComponent = () => {
  const { data, error, isLoading } = useTransactions();

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    // Handle different error types
    if (error.response?.status === 401) {
      return <div>Please login to continue</div>;
    }
    if (error.response?.status === 403) {
      return <div>You don't have permission</div>;
    }
    return <div>Error: {error.message}</div>;
  }

  return <div>Data loaded successfully</div>;
};
```

### Mutation Error Handling

```tsx
const LoginComponent = () => {
  const loginMutation = useLogin();

  const handleLogin = async (credentials) => {
    try {
      await loginMutation.mutateAsync(credentials);
      // Success - redirect or show success message
    } catch (error) {
      // Handle specific error types
      if (error.response?.status === 400) {
        alert("Invalid credentials");
      } else if (error.response?.status === 429) {
        alert("Too many attempts. Please try again later.");
      } else {
        alert("Login failed. Please try again.");
      }
    }
  };

  return <button onClick={() => handleLogin(credentials)}>Login</button>;
};
```

### Global Error Boundary

```tsx
// In your _app.tsx or layout
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
    mutations: {
      retry: false, // Don't retry mutations by default
    },
  },
});
```

## ✅ Best Practices

### 1. Use Hooks Over Direct API Calls

```tsx
// ✅ Good - Uses React Query hooks
const { data: user, isLoading } = useUserProfile();

// ❌ Bad - Direct API calls in components
const [user, setUser] = useState(null);
useEffect(() => {
  ApiService.getUserProfile().then(setUser);
}, []);
```

### 2. Handle Loading and Error States

```tsx
// ✅ Good - Proper loading and error handling
const MyComponent = () => {
  const { data, isLoading, error } = useTransactions();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return <TransactionList transactions={data} />;
};
```

### 3. Use Optimistic Updates for Better UX

```tsx
// ✅ Good - Optimistic updates
const updateUserMutation = useUpdateUser();

const handleUpdate = async (userData) => {
  // Optimistically update UI
  queryClient.setQueryData(["user", userId], userData);

  try {
    await updateUserMutation.mutateAsync({
      id: userId,
      request: userData,
    });
  } catch (error) {
    // Revert optimistic update on error
    queryClient.invalidateQueries(["user", userId]);
  }
};
```

### 4. Cache Management

```tsx
// ✅ Good - Proper cache invalidation
const createUserMutation = useCreateSystemUser();

await createUserMutation.mutateAsync(userData);
// Cache is automatically invalidated due to mutation configuration

// Manual cache management when needed
queryClient.invalidateQueries({ queryKey: ["users"] });
queryClient.removeQueries({ queryKey: ["user", userId] });
```

### 5. Type Safety

```tsx
// ✅ Good - Use proper TypeScript types
import { LoginRequest, User } from "@/services/types";

const loginMutation = useLogin();
const credentials: LoginRequest = {
  userName: "user",
  password: "pass",
};

await loginMutation.mutateAsync(credentials);
```

## 🔍 Troubleshooting

### Common Issues

#### 1. Authentication Issues

```typescript
// Check if token is set
const token = localStorage.getItem("authToken");
console.log("Auth token:", token);

// Manually refresh authentication
queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
```

#### 2. Cache Issues

```typescript
// Clear all cache
queryClient.clear();

// Clear specific queries
queryClient.removeQueries({ queryKey: ["transactions"] });

// Reset query client
const newQueryClient = new QueryClient();
```

#### 3. Network Issues

```typescript
// Check API endpoint configuration
console.log("API Base URL:", process.env.NEXT_PUBLIC_API_BASE_URL);

// Test API connectivity
fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/health`)
  .then((response) => console.log("API Status:", response.status))
  .catch((error) => console.error("API Error:", error));
```

#### 4. Mock Data Issues

```typescript
// Force mock data usage
localStorage.setItem("useMockData", "true");

// Check mock data status
const usingMock = shouldUseMockData();
console.log("Using mock data:", usingMock);
```

### Debug Tools

#### React Query DevTools

```tsx
// In your _app.tsx
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

#### API Debug Logging

```typescript
// Enable debug logging
localStorage.setItem("debugAPI", "true");

// Check network tab in browser dev tools
// Look for API calls and responses
```

### Performance Optimization

#### 1. Query Optimization

```typescript
// Use appropriate staleTime
const { data } = useQuery({
  queryKey: ["transactions"],
  queryFn: () => ApiService.getAllTransactions(),
  staleTime: 5 * 60 * 1000, // 5 minutes
  gcTime: 10 * 60 * 1000, // 10 minutes
});
```

#### 2. Background Refetching

```typescript
// Enable background refetching
const { data } = useQuery({
  queryKey: ["userProfile"],
  queryFn: () => ApiService.getUserProfile(),
  refetchOnWindowFocus: true,
  refetchOnReconnect: true,
});
```

#### 3. Pagination

```typescript
// Use pagination for large datasets
const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ["transactions"],
  queryFn: ({ pageParam = 1 }) =>
    ApiService.getAllTransactions({ page: pageParam }),
  getNextPageParam: (lastPage) => lastPage.nextPage,
});
```

## 📚 Additional Resources

- [React Query Documentation](https://tanstack.com/query)
- [Axios Documentation](https://axios-http.com/docs/intro)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)

## 🤝 Contributing

When adding new API endpoints:

1. Add types to `services/types/`
2. Create domain service in `services/api/domain/`
3. Add to `ApiService` class
4. Create React Query hooks in `services/hooks/`
5. Update this documentation
6. Add usage examples

## 📄 License

This documentation is part of the 360 Admin Dashboard project.
