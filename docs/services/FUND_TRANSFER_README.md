# Fund Transfer API Documentation

This document describes the fund transfer functionality implemented in the 360 Data Admin Dashboard.

## Overview

The fund transfer system provides two main operations:

1. **User-to-User Transfer**: Users can transfer funds to other users using their x-auth-token
2. **Admin Transfer**: Administrators can transfer funds to users using Bearer token authentication

## API Endpoints

### 1. User Wallet Transfer

- **Endpoint**: `POST /auth/transferFund`
- **Authentication**: `x-auth-token` header
- **Description**: Allows users to transfer funds to other users
- **Use Case**: Peer-to-peer fund transfers

### 2. Admin Transfer

- **Endpoint**: `POST /admin/transferFund`
- **Authentication**: `Bearer` token in Authorization header
- **Description**: Allows administrators to transfer funds to users
- **Use Case**: Admin-initiated fund transfers, support operations

## Request Format

Both endpoints accept the same request body:

```typescript
interface TransferFundRequest {
  userName: string; // username or email of recipient
  amount: number; // amount to transfer
}
```

## Response Format

### Success Response (200 OK)

```typescript
interface TransferFundResponse {
  msg: string; // Success message
  amount: number; // Transferred amount
  receipt?: {
    // Optional receipt details
    transactionId: string;
    timestamp: string;
    fromUser: string;
    toUser: string;
    amount: number;
    status: "Success" | "Failed" | "Pending";
  };
}
```

### Error Response

```typescript
interface FundTransferError {
  msg: string; // Error message
  code?: string; // Optional error code
}
```

## Usage Examples

### Using the Service Class

```typescript
import { FundTransferService } from "@/services/api/fund-transfer";

// User-to-user transfer
const result = await FundTransferService.transferFundToUser(
  { userName: "john_doe", amount: 5000 },
  "user-auth-token"
);

// Admin transfer
const result = await FundTransferService.adminTransferFund(
  { userName: "jane_doe", amount: 10000 },
  "admin-bearer-token"
);
```

### Using the React Hook

```typescript
import { useFundTransfer } from '@/services/hooks/useFundTransfer'

function TransferComponent() {
  const {
    transferFundToUser,
    adminTransferFund,
    isLoading,
    error
  } = useFundTransfer()

  const handleUserTransfer = async () => {
    try {
      const result = await transferFundToUser(
        { userName: 'recipient', amount: 1000 },
        'user-token'
      )
      console.log('Transfer successful:', result.msg)
    } catch (err) {
      console.error('Transfer failed:', err.message)
    }
  }

  const handleAdminTransfer = async () => {
    try {
      const result = await adminTransferFund(
        { userName: 'recipient', amount: 5000 },
        'admin-token'
      )
      console.log('Admin transfer successful:', result.msg)
    } catch (err) {
      console.error('Admin transfer failed:', err.message)
    }
  }

  return (
    <div>
      {isLoading && <p>Processing transfer...</p>
    </div>
  )
}
```

### Direct API Client Usage

```typescript
import apiClient from "@/services/api/client";
import { ENDPOINTS } from "@/services/api/endpoint";

// User transfer
const userResponse = await apiClient.post(
  ENDPOINTS.FUND_TRANSFER.USER_WALLET,
  { userName: "recipient", amount: 1000 },
  {
    headers: {
      "x-auth-token": "user-token",
      "Content-Type": "application/json",
    },
  }
);

// Admin transfer
const adminResponse = await apiClient.post(
  ENDPOINTS.FUND_TRANSFER.ADMIN_TRANSFER,
  { userName: "recipient", amount: 5000 },
  {
    headers: {
      Authorization: "Bearer admin-token",
      "Content-Type": "application/json",
    },
  }
);
```

## Validation

The service includes built-in validation:

```typescript
import { validateTransferRequest } from "@/services/api/fund-transfer";

const request = { userName: "", amount: -100 };
const errors = validateTransferRequest(request);
// Returns: ['Username is required', 'Amount must be greater than 0']

const validRequest = { userName: "valid_user", amount: 1000 };
const errors = validateTransferRequest(validRequest);
// Returns: [] (no errors)
```

## Error Handling

The service handles various error scenarios:

- **Network errors**: Connection issues, timeouts
- **Authentication errors**: Invalid or expired tokens
- **Validation errors**: Invalid request data
- **Server errors**: Backend processing failures

## Security Considerations

1. **Token Validation**: Both endpoints validate authentication tokens
2. **Input Sanitization**: Request data is validated before processing
3. **Amount Limits**: Built-in validation prevents excessive transfer amounts
4. **Audit Trail**: All transfers are logged for security purposes

## Testing

To test the endpoints:

1. **User Transfer**: Use a valid user token in the `x-auth-token` header
2. **Admin Transfer**: Use a valid admin Bearer token in the Authorization header
3. **Invalid Data**: Test with invalid usernames, negative amounts, etc.
4. **Network Issues**: Test with invalid tokens or network failures

## Integration Notes

- The service integrates with the existing authentication system
- Error handling follows the established patterns in the codebase
- The React hook provides loading states and error management
- All transfers are logged through the existing interceptor system
