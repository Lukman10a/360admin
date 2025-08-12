# 360 Data Admin Dashboard - Services Documentation

This directory contains comprehensive documentation for all API services, hooks, and utilities in the 360 Data Admin Dashboard.

## 📚 Documentation Index

### 🚀 API Services
- **[API Usage Guide](./API_USAGE_GUIDE.md)** - Complete guide to using the ApiService class
- **[Endpoints Verification](./ENDPOINTS_VERIFICATION.md)** - Verification report of all API endpoints
- **[Fund Transfer API](./FUND_TRANSFER_README.md)** - Fund transfer functionality documentation

### ⚛️ React Hooks
- **[TanStack Query Usage](./TANSTACK_QUERY_USAGE.md)** - Complete guide to using all React Query hooks

### 🔧 Development & Architecture
- **[Services README](../README.md)** - Main services overview and setup

## 🏗️ Architecture Overview

The services layer is organized into three main categories:

### 1. **API Services** (`../api/`)
- **Core Infrastructure**: `client.ts`, `interceptors.ts`, `endpoint.ts`
- **Domain Services**: `auth.ts`, `users.ts`, `services.ts`, `transactions.ts`, etc.
- **Comprehensive Service**: `api-service.ts` - Single class for all endpoints
- **Specialized Services**: `fund-transfer.ts` - Domain-specific functionality

### 2. **React Hooks** (`../hooks/`)
- **Authentication**: `useAuth.ts` - Login, profile, password management
- **User Management**: `useUsers.ts` - User CRUD operations
- **Data Fetching**: `useApiQueries.ts` - General API endpoints
- **Specialized**: `useDataPlans.ts`, `useFundTransfer.ts` - Domain-specific hooks

### 3. **TypeScript Types** (`../types/`)
- **Core Types**: `index.ts` - Business logic types
- **API Types**: `api-endpoints.ts` - Complete API request/response types

## 🎯 Quick Start

### Using API Services
```typescript
import { ApiService, api } from '@/services/api'

// Comprehensive service (recommended)
const user = await ApiService.getUserProfile()

// Domain-specific services
const users = await api.users.system.getAll()
```

### Using React Hooks
```typescript
import { useUserProfile, useDataPlans } from '@/services/hooks'

function MyComponent() {
  const { data: user } = useUserProfile()
  const { data: plans } = useDataPlans()
  
  return <div>Welcome, {user?.data?.userName}!</div>
}
```

## 🔄 Migration Guide

### From Old Services to New Structure

**Before (Old Pattern):**
```typescript
import { authApi } from '@/services/api'
const user = await authApi.getProfile()
```

**After (New Pattern):**
```typescript
import { ApiService } from '@/services/api'
const user = await ApiService.getUserProfile()
```

**Or use the convenience object:**
```typescript
import { api } from '@/services/api'
const user = await api.auth.getProfile()
```

## 📖 Best Practices

1. **Use ApiService for new code** - It provides type safety and consistency
2. **Use domain-specific services** for existing functionality that needs to be maintained
3. **Use React Query hooks** for data fetching in components
4. **Import types from the main index** - All types are available at `@/services/types`

## 🐛 Troubleshooting

### Common Issues

1. **Type Errors**: Ensure you're importing from the correct type files
2. **API Errors**: Check the interceptors for proper error handling
3. **Hook Issues**: Verify TanStack Query is properly configured

### Getting Help

- Check the specific documentation files for detailed usage examples
- Review the API endpoints verification for endpoint accuracy
- Use the comprehensive usage guides for complex scenarios

## 🔗 Related Files

- **Main Services**: `../api/index.ts` - Central export point
- **Main Hooks**: `../hooks/index.ts` - Central export point  
- **Main Types**: `../types/index.ts` - Central export point
- **Project Root**: `../../README.md` - Project overview
