# User Management with Zustand

This project now uses Zustand for global state management of user authentication and data.

## Features

- **Persistent User State**: User data is automatically saved to localStorage and restored on app reload
- **Type-Safe**: Full TypeScript support with proper type definitions
- **Easy to Use**: Simple hooks for accessing user data throughout the app
- **Automatic Sync**: Login/logout automatically updates the global state

## Usage

### Basic User Data Access

```tsx
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

```tsx
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

### User Actions

```tsx
import { useUserActions } from "@/stores/user-store";

function ProfileComponent() {
  const { updateUser, logout } = useUserActions();

  const handleUpdateProfile = () => {
    updateUser({ fullName: "New Name" });
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <button onClick={handleUpdateProfile}>Update Profile</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
```

### Using the UserInfo Component

```tsx
import UserInfo from "@/components/user-info";

function Header() {
  return (
    <header>
      <UserInfo />
    </header>
  );
}
```

## Store Structure

The user store contains:

- `user`: Complete user object (or null if not authenticated)
- `isAuthenticated`: Boolean indicating authentication status
- `isLoading`: Boolean for loading states
- `error`: Error message string (or null)

## Automatic Persistence

User data is automatically:

- Saved to localStorage when user logs in
- Restored from localStorage when app starts
- Cleared from localStorage when user logs out

## Integration with Auth Hooks

The existing auth hooks (`useLogin`, `useLogout`, etc.) automatically update the Zustand store, so you don't need to manually manage state in most cases.

## Type Safety

All user data is fully typed using the `User` interface from `@/services/types/api-endpoints`. The store provides type-safe access to all user properties.
