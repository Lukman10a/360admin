# API Usage Guide

## Overview

This project uses a centralized approach for API calls. The canonical way to interact with the API is through the hooks in `@/services/hooks`.

## 🚀 Quick Start (Recommended)

### 1. Import hooks from the central barrel

```typescript
import {
  useLogin,
  useTransactions,
  useSearchTransactions,
  useDataPlans,
} from "@/services/hooks";
```

### 2. Use in components

```typescript
function MyComponent() {
  const loginMutation = useLogin();
  const { data: transactions } = useTransactions();
  const { data: plans } = useDataPlans();

  const handleLogin = () => {
    loginMutation.mutate({ userName: "user", password: "pass" });
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      {/* Use data */}
    </div>
  );
}
```

## Best Practices

### ✅ Do This

- Always import from `@/services/hooks`
- Use the typed hooks for consistency
- Handle loading/error states

### ❌ Don't Do This

- Don't import directly from `axios` or `apiClient`
- Don't create custom API calls in components
- Don't bypass the hooks layer

## Available Hooks

### Authentication

- `useLogin()` - Login user
- `useRegister()` - Register new user
- `useLogout()` - Logout user
- `useUserProfile()` - Get current user profile

### Data Management

- `useTransactions()` - Get all transactions
- `useSearchTransactions(params)` - Search transactions
- `useDataPlans()` - Get data plans
- `useUsers()` - Get users

### Mutations

- `useAddDataPlan()` - Add new data plan
- `useUpdateDataPlan()` - Update data plan
- `useDeleteDataPlan()` - Delete data plan

## Error Handling

All hooks return standard React Query patterns:

```typescript
const { data, error, isLoading, isError } = useTransactions();

if (isLoading) return <div>Loading...</div>;
if (isError) return <div>Error: {error.message}</div>;
```

## Types

All types are available from `@/services/types`:

```typescript
import { Transaction, User } from "@/services/types";
```

## Migration from Legacy Code

If you see imports like:

```typescript
import { apiClient } from "@/services/api/infrastructure";
```

Replace with:

```typescript
import { useTransactions } from "@/services/hooks";
```

## Need Help?

- Check `services/examples/api-example.tsx` for working examples
- See `services/README.md` for detailed documentation

---

## Legacy ApiService Usage (For Reference)

This guide demonstrates how to use all the TypeScript types and API services for the 360 Data Admin Dashboard.

## 🚀 Quick Start

```typescript
import { ApiService, api } from "@/services/api";
import {
  LoginRequest,
  BuyDataRequest,
  NetworkId,
  NETWORK_IDS,
} from "@/services/types";

// Use the comprehensive API service
const loginResponse = await ApiService.login({
  userName: "user@example.com",
  password: "password123",
});

// Or use individual methods
const { login, buyData, getNetworkName } = ApiService;
```

## 📚 TypeScript Types Overview

### **User Authentication & Management**

```typescript
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  User,
  UpdateUserRequest,
} from "@/services/types";

// Login
const loginData: LoginRequest = {
  userName: "user@example.com",
  password: "password123",
};

// Registration
const registerData: RegisterRequest = {
  email: "user@example.com",
  password: "password123",
  passwordCheck: "password123",
  userName: "username",
  phoneNumber: "08123456789",
};

// User profile
const user: User = {
  _id: "user-id",
  email: "user@example.com",
  userName: "username",
  phoneNumber: "08123456789",
  balance: 1000,
  // ... other fields
};
```

### **Contact Management**

```typescript
import {
  Contact,
  AddContactRequest,
  UpdateContactRequest,
} from "@/services/types";

// Add contact
const newContact: AddContactRequest = {
  contactName: "John Doe",
  contactNumber: "08123456789",
  contactNetwork: "MTN",
};

// Contact object
const contact: Contact = {
  _id: "contact-id",
  userId: "user-id",
  contactName: "John Doe",
  contactNumber: "08123456789",
  contactNetwork: "MTN",
  createdAt: "2025-01-01T00:00:00.000Z",
  __v: 0,
};
```

### **Buy Services**

```typescript
import {
  BuyDataRequest,
  BuyAirtimeRequest,
  ValidateMeterRequest,
  BuyElectricityRequest,
  NetworkId,
  NETWORK_IDS,
} from "@/services/types";

// Buy data
const dataRequest: BuyDataRequest = {
  network: NETWORK_IDS.MTN, // "1"
  plan: "102", // Plan ID
  mobile_number: "08123456789",
};

// Buy airtime
const airtimeRequest: BuyAirtimeRequest = {
  mobile_number: "08123456789",
  network: 1, // MTN
  amount: 100,
};

// Validate meter
const meterRequest: ValidateMeterRequest = {
  meterNumber: "12345678901",
  meterId: "19",
  meterType: "PREPAID",
};
```

### **Data Plans**

```typescript
import { DataPlanPrice, AddDataPlanRequest } from "@/services/types";

// Add data plan
const newPlan: AddDataPlanRequest = {
  planNetwork: "MTN",
  planName: "MTN-SME-1GB",
  planType: "SME",
  planValidity: "30 Days",
  planId: 99999,
  resellerPrice: 250,
  smartEarnerPrice: 280,
  apiPrice: 245,
  planCostPrice: 230,
  partnerPrice: 240,
  planVolumeRatio: 1,
};

// Data plan price
const planPrice: DataPlanPrice = {
  isAvailable: true,
  _id: "plan-id",
  id: 102,
  dataplan_id: "102",
  plan_network: "MTN",
  plan_type: "SME",
  month_validate: "30 days SME",
  plan: "1GB",
  my_price: "225",
  resellerPrice: "215",
  apiPrice: "215",
  planCostPrice: 0,
  __v: 0,
  volumeRatio: 1,
};
```

### **Transactions**

```typescript
import { Transaction, TransactionSearchParams } from "@/services/types";

// Search parameters
const searchParams: TransactionSearchParams = {
  type: "airtime",
  phoneNumber: "08123456789",
  status: "success",
};

// Transaction object
const transaction: Transaction = {
  _id: "transaction-id",
  trans_Id: "trans-123",
  trans_By: "user-id",
  trans_UserName: "username",
  trans_Type: "airtime",
  trans_Network: "MTN 100",
  phone_number: "08123456789",
  trans_amount: 99,
  trans_profit: 0,
  trans_volume_ratio: 0,
  balance_Before: 1000,
  balance_After: 901,
  trans_Date: "Thu Apr 10 2025 11:46:46 AM",
  trans_Status: "success",
  createdAt: "2025-04-10T10:46:46.618Z",
  __v: 0,
};
```

### **Fund Transfer**

```typescript
import { TransferFundRequest, TransferFundResponse } from "@/services/types";

// Transfer request
const transferRequest: TransferFundRequest = {
  userName: "recipient_username",
  amount: 1000,
};

// Transfer response
const transferResponse: TransferFundResponse = {
  msg: "Transfer successful",
  amount: 1000,
  receipt: {
    transactionId: "trans-123",
    timestamp: "2025-01-01T00:00:00.000Z",
    fromUser: "sender_username",
    toUser: "recipient_username",
    amount: 1000,
    status: "Success",
  },
};
```

## 🔧 API Service Usage

### **User Operations**

```typescript
import { ApiService } from "@/services/api";

// Authentication
const loginResponse = await ApiService.login({
  userName: "user@example.com",
  password: "password123",
});

const registerResponse = await ApiService.register({
  email: "user@example.com",
  password: "password123",
  passwordCheck: "password123",
  userName: "username",
  phoneNumber: "08123456789",
});

// Profile management
const profile = await ApiService.getUserProfile();
const updateResponse = await ApiService.updateUser("user-id", {
  email: "newemail@example.com",
});

// Password operations
await ApiService.requestPasswordReset({ email: "user@example.com" });
await ApiService.resetPassword({
  token: "reset-token",
  userId: "user-id",
  newPassword: "newpassword",
  newPasswordCheck: "newpassword",
});
```

### **Contact Operations**

```typescript
// CRUD operations
const addResponse = await ApiService.addContact({
  contactName: "John Doe",
  contactNumber: "08123456789",
  contactNetwork: "MTN",
});

const contacts = await ApiService.getContacts();
const updateResponse = await ApiService.updateContact("contact-id", {
  contactName: "Jane Doe",
});

await ApiService.deleteContact("contact-id");
```

### **Buy Services**

```typescript
// Data and airtime
const dataResponse = await ApiService.buyData({
  network: "1", // MTN
  plan: "102",
  mobile_number: "08123456789",
});

const airtimeResponse = await ApiService.buyAirtime({
  mobile_number: "08123456789",
  network: 1,
  amount: 100,
});

// Electricity
const meterValidation = await ApiService.validateMeter({
  meterNumber: "12345678901",
  meterId: "19",
  meterType: "PREPAID",
});

const electricityResponse = await ApiService.buyElectricity({
  meterId: "19",
  meterNumber: "12345678901",
  amount: "1000",
  meterType: "PREPAID",
});

// Get available discos
const discos = await ApiService.getDiscos();
```

### **Data Plan Management**

```typescript
// Get plans and prices
const mtnPlans = await ApiService.getDataPlanPrices("1"); // MTN
const allPlans = await ApiService.getDataPlans();

// Manage plans
const addResponse = await ApiService.addDataPlan({
  planNetwork: "MTN",
  planName: "MTN-SME-1GB",
  planType: "SME",
  planValidity: "30 Days",
  planId: 99999,
  resellerPrice: 250,
  smartEarnerPrice: 280,
  apiPrice: 245,
  planCostPrice: 230,
  partnerPrice: 240,
  planVolumeRatio: 1,
});

await ApiService.updateDataPlan({
  _id: "plan-id",
  // ... other fields
});

await ApiService.deleteDataPlan("plan-id");
```

### **Transaction Management**

```typescript
// Get all transactions
const allTransactions = await ApiService.getAllTransactions();

// Search with filters
const searchResults = await ApiService.searchTransactions({
  type: "airtime",
  phoneNumber: "08123456789",
  status: "success",
});
```

### **Fund Transfer**

```typescript
// User-to-user transfer
const userTransfer = await ApiService.transferFundToUser(
  { userName: "recipient", amount: 1000 },
  "user-auth-token"
);

// Admin transfer
const adminTransfer = await ApiService.adminTransferFund(
  { userName: "recipient", amount: 5000 },
  "admin-bearer-token"
);
```

### **Admin Operations**

```typescript
// Generate coupons
const couponResponse = await ApiService.generateCoupon({
  amount: 1000,
  quantity: 10,
  expiryDate: "2025-12-31",
});

// Process refunds
const refundResponse = await ApiService.processRefund("transaction-id", {
  reason: "Customer request",
  amount: 1000,
});
```

### **Prices**

```typescript
// Get all prices
const prices = await ApiService.getPrices();

// Get prices for specific network
const networkPrices = await ApiService.getPrices({ network: "1" });
```

## 🛠️ Utility Methods

```typescript
// Network utilities
const networkName = ApiService.getNetworkName("1"); // Returns 'MTN'
const networkId = ApiService.getNetworkId("MTN"); // Returns '1'

// Formatting utilities
const formattedAmount = ApiService.formatCurrency(1000); // Returns '₦1,000.00'
const formattedDate = ApiService.formatDate("2025-01-01T00:00:00.000Z"); // Returns formatted date
```

## 🔐 Authentication

### **User Authentication (x-auth-token)**

```typescript
// Most endpoints require x-auth-token header
// This is automatically handled by the API client when you call setAuthToken()

import { setAuthToken } from "@/services/api";

// Set token after login
setAuthToken(loginResponse.token);

// Now all API calls will include the token automatically
const profile = await ApiService.getUserProfile();
```

### **Admin Authentication (Bearer Token)**

```typescript
// Admin endpoints require Bearer token
// Pass the token directly to admin methods

const adminTransfer = await ApiService.adminTransferFund(
  { userName: "recipient", amount: 5000 },
  "admin-bearer-token"
);
```

## 📱 Network Constants

```typescript
import { NETWORK_IDS, NETWORK_NAMES } from "@/services/types";

// Use constants instead of magic numbers
const mtnId = NETWORK_IDS.MTN; // "1"
const gloId = NETWORK_IDS.GLO; // "2"
const airtelId = NETWORK_IDS.AIRTEL; // "3"
const nineMobileId = NETWORK_IDS["9MOBILE"]; // "4"

// Get network name from ID
const networkName = NETWORK_NAMES["1"]; // "MTN"
```

## 🚨 Error Handling

```typescript
try {
  const response = await ApiService.buyData({
    network: "1",
    plan: "102",
    mobile_number: "08123456789",
  });
  console.log("Success:", response.msg);
} catch (error: any) {
  if (error.response?.data) {
    console.error("API Error:", error.response.data.msg);
  } else {
    console.error("Network Error:", error.message);
  }
}
```

## 📋 Response Types

All API responses follow a consistent pattern:

```typescript
interface ApiSuccessResponse<T> {
  status: number;
  status_code: string;
  data: T;
  msg: string;
}

interface ApiErrorResponse {
  status: number;
  status_code: string;
  error: string;
  msg: string;
}
```

## 🔄 Pagination

For endpoints that support pagination:

```typescript
interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
```

## 📝 Best Practices

1. **Always use TypeScript types** for better development experience
2. **Use network constants** instead of magic numbers
3. **Handle errors properly** with try-catch blocks
4. **Use utility methods** for formatting and conversions
5. **Set authentication tokens** before making authenticated calls
6. **Validate request data** before sending to API
7. **Use the comprehensive ApiService** for consistent API calls

## 🎯 Example: Complete User Flow

```typescript
import { ApiService, setAuthToken } from "@/services/api";

async function completeUserFlow() {
  try {
    // 1. Login
    const loginResponse = await ApiService.login({
      userName: "user@example.com",
      password: "password123",
    });

    // 2. Set authentication token
    setAuthToken(loginResponse.token);

    // 3. Get user profile
    const profile = await ApiService.getUserProfile();

    // 4. Add contact
    await ApiService.addContact({
      contactName: "John Doe",
      contactNumber: "08123456789",
      contactNetwork: "MTN",
    });

    // 5. Buy airtime
    const airtimeResponse = await ApiService.buyAirtime({
      mobile_number: "08123456789",
      network: 1, // MTN
      amount: 100,
    });

    // 6. Check transaction
    const transactions = await ApiService.searchTransactions({
      type: "airtime",
      phoneNumber: "08123456789",
    });

    console.log("Flow completed successfully!");
  } catch (error: any) {
    console.error("Error in user flow:", error.message);
  }
}
```

This comprehensive guide covers all the TypeScript types and API services available in the 360 Data Admin Dashboard. Use these examples to build robust, type-safe applications with proper error handling and authentication.
