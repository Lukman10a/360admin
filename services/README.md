# 360 Data Admin Dashboard - API Services

This directory contains a complete API integration setup using Axios and TanStack Query (React Query) for the 360 Data Admin Dashboard.

## 📁 Structure

```
services/
├── api/                    # API service functions
│   ├── client.ts          # Axios client configuration
│   ├── auth.ts            # Authentication APIs
│   ├── users.ts           # User management APIs
│   ├── services.ts        # Service management APIs
│   ├── transactions.ts    # Transaction APIs
│   ├── notifications.ts   # Notification APIs
│   ├── settings.ts        # Settings APIs
│   ├── dashboard.ts       # Dashboard APIs
│   └── index.ts           # Main API exports
├── hooks/                 # React Query hooks
│   ├── useAuth.ts         # Authentication hooks
│   ├── useUsers.ts        # User management hooks
│   └── index.ts           # Hook exports
├── types/                 # TypeScript types
│   └── index.ts           # All API types
└── README.md              # This file
```

## 🚀 Quick Start

### 1. Environment Setup

Add to your `.env.local` file:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
```

### 2. Basic Usage (Recommended)

```typescript
// Import hooks from the central barrel (canonical way)
import {
  useLogin,
  useTransactions,
  useSearchTransactions,
  useDataPlans,
} from "@/services/hooks";

// Use in components
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

### Legacy Direct API Usage

```typescript
// Import the API services
import { api } from "@/services/api";

// Or import specific hooks
import { useSystemUsers, useCreateSystemUser } from "@/services/hooks";

// Direct API call
const users = await api.systemUsers.getAll({ page: 1, limit: 10 });

// Using React Query hooks (recommended)
const {
  data: users,
  isLoading,
  error,
} = useSystemUsers({ page: 1, limit: 10 });
```

## 🔧 API Services

### Authentication

```typescript
import { api } from "@/services/api";

// Login
const loginData = await api.auth.login({
  email: "admin@360data.com",
  password: "password123",
});

// Get profile
const profile = await api.auth.getProfile();

// Logout
await api.auth.logout();
```

### User Management

```typescript
// System Users
const systemUsers = await api.systemUsers.getAll({ page: 1, limit: 10 });
const newUser = await api.systemUsers.create({
  fullName: "John Doe",
  username: "johndoe",
  email: "john@360data.com",
  password: "password123",
  role: "Admin",
});

// Subscribers
const subscribers = await api.subscribers.getAll();
const newSubscriber = await api.subscribers.create({
  firstName: "Jane",
  lastName: "Smith",
  email: "jane@example.com",
  phone: "+2348123456789",
  password: "password123",
  state: "Lagos",
});

// Credit Users
const creditUsers = await api.creditUsers.getAll();
await api.creditUsers.updateBalance({
  email: "user@example.com",
  action: "credit",
  amount: 1000,
  reason: "Wallet funding",
});
```

## 🎣 React Query Hooks

### Authentication Hooks

```typescript
import { useAuth, useLogin, useLogout } from "@/services/hooks";

function AuthComponent() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  const handleLogin = async () => {
    try {
      await loginMutation.mutateAsync({
        email: "admin@360data.com",
        password: "password123",
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.fullName}!</p>
          <button onClick={() => logoutMutation.mutate()}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

### User Management Hooks

```typescript
import {
  useSystemUsers,
  useCreateSystemUser,
  useUpdateSystemUser,
  useDeleteSystemUser,
} from "@/services/hooks";

function SystemUsersComponent() {
  const {
    data: users,
    isLoading,
    error,
  } = useSystemUsers({ page: 1, limit: 10 });
  const createUserMutation = useCreateSystemUser();
  const updateUserMutation = useUpdateSystemUser();
  const deleteUserMutation = useDeleteSystemUser();

  const handleCreateUser = async () => {
    try {
      await createUserMutation.mutateAsync({
        fullName: "New User",
        username: "newuser",
        email: "newuser@360data.com",
        password: "password123",
        role: "Admin",
      });
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  const handleUpdateUser = async (id: number) => {
    try {
      await updateUserMutation.mutateAsync({
        id,
        data: { fullName: "Updated Name" },
      });
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUserMutation.mutateAsync(id);
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={handleCreateUser}>Create User</button>
      {users?.data.map((user) => (
        <div key={user.id}>
          <h3>{user.fullName}</h3>
          <button onClick={() => handleUpdateUser(user.id)}>Update</button>
          <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
```

## 🔄 Migration from Mock Data

### Step 1: Replace useState with useQuery

```typescript
// Before (mock data)
const [users, setUsers] = useState(mockUsers);

// After (real API)
const { data: users, isLoading, error } = useSystemUsers();
```

### Step 2: Replace form submissions with mutations

```typescript
// Before
const handleSubmit = (formData) => {
  setUsers([...users, { ...formData, id: Date.now() }]);
  setIsModalOpen(false);
};

// After
const createUserMutation = useCreateSystemUser();
const handleSubmit = async (formData) => {
  try {
    await createUserMutation.mutateAsync(formData);
    setIsModalOpen(false);
  } catch (error) {
    console.error("Failed to create user:", error);
  }
};
```

### Step 3: Add loading and error states

```typescript
if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorMessage error={error} />;
```

## 🛠️ Configuration

### API Client Configuration

The API client is configured in `services/api/client.ts` with:

- Automatic authentication token handling
- Request/response interceptors
- Error handling
- Development logging
- Timeout configuration

### React Query Configuration

The Query Provider is configured in `providers/query-provider.tsx` with:

- Automatic retries
- Stale time configuration
- Cache management
- Development tools

## 🔐 Authentication

The authentication system automatically:

- Stores JWT tokens in localStorage
- Adds Authorization headers to requests
- Handles token refresh
- Clears tokens on logout/401 errors

## 📊 Error Handling

The system includes comprehensive error handling:

- Network errors
- HTTP status codes
- Validation errors
- Authentication errors

## 🧪 Development Tools

In development mode, you get:

- React Query DevTools
- API request/response logging
- Error details in console

## 📝 TypeScript Support

All APIs are fully typed with:

- Request/response interfaces
- Error types
- Hook return types
- Generic pagination types

## 🚀 Production Ready

The setup includes:

- Environment variable configuration
- Error boundaries
- Loading states
- Optimistic updates
- Cache invalidation
- Retry logic

## 📖 Examples

See the `examples/` directory for complete usage examples including:

- Authentication flows
- CRUD operations
- Error handling
- Optimistic updates
- Custom hooks

## 🔧 Customization

You can customize:

- API base URL via environment variables
- Request/response interceptors
- Error handling logic
- Cache configuration
- Retry policies

This setup provides a robust foundation for API integration while maintaining the existing UI and functionality of your dashboard.
