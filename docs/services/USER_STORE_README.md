# User Management with Zustand

This project now uses Zustand for global state management of user authentication and data.

## ✅ What's Fixed

### 1. **Authentication Flow Issues**

- Fixed the "Checking authentication..." infinite loop
- Auth wrapper now properly checks Zustand store for user data
- Authentication state is correctly initialized from persisted data

### 2. **Consolidated API Hooks**

- All API hooks are now centralized in `useApiQueries.ts`
- Consistent TypeScript types from `api-endpoints.ts`
- Proper integration with Zustand store for user management

### 3. **Type Safety**

- All components use types from `api-endpoints.ts`
- Consistent User type across the application
- Proper type checking for all API responses

## 🎯 Key Features

- **Persistent Sessions**: User data is automatically saved to localStorage and restored on app reload
- **Type-Safe**: Full TypeScript support with proper type definitions
- **Easy to Use**: Simple hooks for accessing user data throughout the app
- **Automatic Sync**: Login/logout automatically updates the global state

## 📖 Usage Examples

### Basic User Data Access

```typescript
import {
  useUser,
  useUserName,
  useUserEmail,
  useUserBalance,
} from "@/stores/user-store";

function MyComponent() {
  const user = useUser(); // Get full user object
  const userName = useUserName(); // Get just the username
  const userEmail = useUserEmail(); // Get just the email
  const userBalance = useUserBalance(); // Get just the balance

  return (
    <div>
      <h1>Welcome, {userName}!</h1>
      <p>Email: {userEmail}</p>
      <p>Balance: ₦{userBalance}</p>
    </div>
  );
}
```

### Authentication State

```typescript
import {
  useIsAuthenticated,
  useAuthLoading,
  useAuthError,
} from "@/stores/user-store";

function AuthComponent() {
  const isAuthenticated = useIsAuthenticated();
  const isLoading = useAuthLoading();
  const error = useAuthError();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Please log in</div>;
  if (error) return <div>Error: {error}</div>;

  return <div>Welcome back!</div>;
}
```

### API Hooks Usage

```typescript
import {
  useTransactions,
  useDataPlans,
  useBuyData,
  useLogin,
} from "@/services/hooks/useApiQueries";

function Dashboard() {
  const { data: transactions } = useTransactions();
  const { data: dataPlans } = useDataPlans();
  const buyDataMutation = useBuyData();

  // Use the hooks as needed
}
```

## 🔧 Architecture

### Store Structure

The user store contains:

- `user`: Complete user object (or null if not authenticated)
- `isAuthenticated`: Boolean indicating authentication status
- `isLoading`: Boolean for loading states
- `error`: Error message string (or null)

### Hook Organization

- **Authentication**: `useAuth.ts` - Login, logout, user profile
- **API Queries**: `useApiQueries.ts` - All data fetching hooks
- **User Store**: `user-store.ts` - Global user state management

## 🚀 Getting Started

1. **Login Flow**: User logs in → Token saved → User data stored in Zustand
2. **App Load**: Check token → Load user data from store → Authenticate user
3. **Navigation**: Protected routes check authentication state
4. **Logout**: Clear token and user data → Redirect to login

## 📁 File Structure

```
services/
├── hooks/
│   ├── useAuth.ts          # Authentication hooks
│   ├── useApiQueries.ts    # All API data hooks
│   └── index.ts           # Centralized exports
├── types/
│   ├── api-endpoints.ts   # API type definitions
│   └── index.ts          # Type exports
└── stores/
    └── user-store.ts      # Zustand user store
```

## 🔄 Migration Notes

- All components now use `useApiQueries` for data fetching
- User data comes from Zustand store, not API hooks
- Authentication state is managed globally
- Types are consistent across the application

This setup provides a robust, type-safe, and maintainable architecture for user management and API interactions.
