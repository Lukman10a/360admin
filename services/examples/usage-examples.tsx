/**
 * 360 Data Admin Dashboard - API Usage Examples
 *
 * This file demonstrates how to use the API services and React Query hooks
 * in your components. Copy these patterns to implement real API integration.
 */

// ============================================================================
// CANONICAL HOOKS USAGE (Recommended)
// ============================================================================

import {
  useLogin,
  useNetworkId,
  useNetworkName,
  useRegister,
  useSearchTransactions,
  useTransactions,
  useUserProfile,
} from "../hooks";
import { LoginRequest } from "../types";

// Example: Login component using hooks
export const LoginComponent = () => {
  const loginMutation = useLogin();

  const handleLogin = (credentials: LoginRequest) => {
    loginMutation.mutate(credentials, {
      onSuccess: (data) => {
        console.log("Login successful:", data);
        // Handle success (e.g., redirect)
      },
      onError: (error) => {
        console.error("Login failed:", error);
        // Handle error (e.g., show toast)
      },
    });
  };

  return (
    <div>
      <button
        onClick={() => handleLogin({ userName: "user", password: "pass" })}
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? "Logging in..." : "Login"}
      </button>
    </div>
  );
};

// Example: User Profile component using hooks
export const UserProfileComponent = () => {
  const { data: user, isLoading, error } = useUserProfile();

  if (isLoading) return <div>Loading user profile...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Welcome, {user?.data?.userName}</h2>
      <p>Email: {user?.data?.email}</p>
      <p>Balance: ₦{user?.data?.balance}</p>
    </div>
  );
};

// Example: Transactions component using hooks
export const TransactionsComponent = () => {
  const { data: transactions, isLoading, error } = useTransactions();

  if (isLoading) return <div>Loading transactions...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {transactions?.data?.map((transaction) => (
        <div key={transaction._id}>
          {transaction.trans_Id} - ₦{transaction.trans_amount}
        </div>
      ))}
    </div>
  );
};

// Example: Search transactions
export const SearchTransactionsComponent = () => {
  const {
    data: searchResults,
    isLoading,
    error,
  } = useSearchTransactions({
    type: "airtime",
  });

  if (isLoading) return <div>Searching...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h3>Search Results ({searchResults?.data?.transactions?.length || 0})</h3>
      {searchResults?.data?.transactions?.map((transaction) => (
        <div key={transaction._id}>
          {transaction.trans_Id} - ₦{transaction.trans_amount}
        </div>
      ))}
    </div>
  );
};

// Example: Network utilities
export const NetworkExample = () => {
  const { data: networkName } = useNetworkName("1");
  const { data: networkId } = useNetworkId("MTN");

  return (
    <div>
      <p>Network ID "1" = {networkName}</p>
      <p>Network "MTN" = ID {networkId}</p>
    </div>
  );
};

// ============================================================================
// LEGACY API USAGE (For Reference)
// ============================================================================

import { ApiService } from "../api";

// Example: Login user
export const loginExample = async () => {
  try {
    const loginData = await ApiService.login({
      userName: "admin@360data.com",
      password: "password123",
    });
    console.log("Login successful:", loginData);
    return loginData;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

// Example: Get user profile
export const getUserProfileExample = async () => {
  try {
    const userProfile = await ApiService.getUserProfile();
    console.log("User profile:", userProfile);
    return userProfile;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    throw error;
  }
};

// Example: Get all transactions
export const getTransactionsExample = async () => {
  try {
    const transactions = await ApiService.getAllTransactions();
    console.log("Transactions:", transactions);
    return transactions;
  } catch (error) {
    console.error("Failed to fetch transactions:", error);
    throw error;
  }
};

// ============================================================================
// REACT QUERY HOOKS USAGE (Recommended approach)
// ============================================================================

import { useState } from "react";

// Example: Complete Authentication Flow
export const AuthExample = () => {
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const { data: user, isLoading: userLoading } = useUserProfile();
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async (formData: {
    userName: string;
    email: string;
    password: string;
  }) => {
    try {
      if (isLogin) {
        await loginMutation.mutateAsync({
          userName: formData.userName,
          password: formData.password,
        });
        console.log("Login successful!");
      } else {
        await registerMutation.mutateAsync({
          userName: formData.userName,
          email: formData.email,
          password: formData.password,
          passwordCheck: formData.password,
          phoneNumber: "+2348000000000",
        });
        console.log("Registration successful!");
      }
    } catch (error) {
      console.error(`${isLogin ? "Login" : "Registration"} failed:`, error);
    }
  };

  if (userLoading) return <div>Loading...</div>;

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.data?.userName}!</h2>
          <p>Email: {user.data?.email}</p>
          <p>Balance: ₦{user.data?.balance}</p>
        </div>
      ) : (
        <div>
          <div>
            <button onClick={() => setIsLogin(!isLogin)}>
              Switch to {isLogin ? "Register" : "Login"}
            </button>
          </div>
          <button
            onClick={() =>
              handleAuth({
                userName: "testuser",
                email: "test@example.com",
                password: "password123",
              })
            }
            disabled={loginMutation.isPending || registerMutation.isPending}
          >
            {loginMutation.isPending || registerMutation.isPending
              ? `${isLogin ? "Logging in" : "Registering"}...`
              : isLogin
              ? "Login"
              : "Register"}
          </button>
        </div>
      )}
    </div>
  );
};

// Example: Transactions Management Component
export const TransactionsExample = () => {
  const { data: transactions, isLoading, error, refetch } = useTransactions();
  const { data: searchResults } = useSearchTransactions({ type: "data" });

  if (isLoading) return <div>Loading transactions...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2>All Transactions ({transactions?.data?.length || 0})</h2>
        <button onClick={() => refetch()}>Refresh</button>
      </div>

      <div className="mb-6">
        <h3>
          Data Transactions ({searchResults?.data?.transactions?.length || 0})
        </h3>
        {searchResults?.data?.transactions?.slice(0, 5).map((transaction) => (
          <div key={transaction._id} className="border p-2 mb-2">
            <span>{transaction.trans_Id}</span> -{" "}
            <span>₦{transaction.trans_amount}</span>
          </div>
        ))}
      </div>

      <div>
        <h3>Recent Transactions</h3>
        {transactions?.data?.slice(0, 10).map((transaction) => (
          <div key={transaction._id} className="border p-2 mb-2">
            <div className="flex justify-between">
              <span>{transaction.trans_Id}</span>
              <span>₦{transaction.trans_amount}</span>
            </div>
            <div className="text-sm text-gray-600">
              {transaction.trans_Type} - {transaction.trans_Network}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// ADVANCED USAGE PATTERNS
// ============================================================================

// Example: Error Handling with API Calls
export const ErrorHandlingExample = () => {
  const loginMutation = useLogin();

  const handleLoginWithErrorHandling = async () => {
    try {
      await loginMutation.mutateAsync({
        userName: "testuser",
        password: "password123",
      });

      // Success notification
      console.log("✅ Login successful!");
    } catch (error: any) {
      // Error handling based on status code
      if (error?.response?.status === 401) {
        console.error("❌ Invalid credentials");
      } else if (error?.response?.status === 400) {
        console.error("❌ Invalid login data");
      } else {
        console.error("❌ Login failed:", error.message);
      }
    }
  };

  return (
    <button
      onClick={handleLoginWithErrorHandling}
      disabled={loginMutation.isPending}
    >
      {loginMutation.isPending ? "Logging in..." : "Login with Error Handling"}
    </button>
  );
};

// Example: Network Utilities
export const NetworkUtilitiesExample = () => {
  const { data: networkName } = useNetworkName("1");
  const { data: networkId } = useNetworkId("MTN");

  return (
    <div>
      <h3>Network Utilities</h3>
      <p>Network ID "1" = {networkName || "Loading..."}</p>
      <p>Network "MTN" = ID {networkId || "Loading..."}</p>
      <p>Format Currency: {ApiService.formatCurrency(1500)}</p>
      <p>Format Date: {ApiService.formatDate("2025-01-15T10:30:00Z")}</p>
    </div>
  );
};

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
};

// Example: Custom Hook for Transaction Management
export const useTransactionManagement = () => {
  const { data: transactions, refetch } = useTransactions();
  const { data: searchResults } = useSearchTransactions({ type: "airtime" });

  const totalTransactions = transactions?.data?.length || 0;
  const airtimeTransactions = searchResults?.data?.transactions?.length || 0;

  const refreshData = () => {
    refetch();
  };

  return {
    totalTransactions,
    airtimeTransactions,
    transactions: transactions?.data || [],
    airtimeTransactionsList: searchResults?.data?.transactions || [],
    refreshData,
  };
};

// ============================================================================
// MIGRATION GUIDE: From Mock Data to Real API
// ============================================================================

/*
STEP 1: Replace mock data arrays with API hooks

// Before (with mock data):
const [transactions, setTransactions] = useState(mockTransactions)

// After (with API):
const { data: transactions, isLoading, error } = useTransactions()

STEP 2: Replace form submissions with mutations

// Before:
const handleLogin = (formData) => {
  // Mock login logic
  setUser({ ...formData, id: Date.now() })
  setIsLoggedIn(true)
}

// After:
const loginMutation = useLogin()
const handleLogin = async (formData) => {
  try {
    await loginMutation.mutateAsync(formData)
    // User state automatically updated via React Query
  } catch (error) {
    console.error('Login failed:', error)
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

AVAILABLE HOOKS:
- useLogin() - User authentication
- useRegister() - User registration
- useUserProfile() - Get current user profile
- useTransactions() - Get all transactions
- useSearchTransactions(params) - Search transactions with filters
- useNetworkName(networkId) - Convert network ID to name
- useNetworkId(networkName) - Convert network name to ID

AVAILABLE API METHODS:
- ApiService.login(request)
- ApiService.register(request)
- ApiService.getUserProfile()
- ApiService.getAllTransactions()
- ApiService.searchTransactions(params)
- ApiService.formatCurrency(amount)
- ApiService.formatDate(dateString)
- ApiService.getNetworkName(networkId)
- ApiService.getNetworkId(networkName)
*/
