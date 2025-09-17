# 360 Data Admin Dashboard - Services Documentation

This directory contains comprehensive documentation for all API services, hooks, and utilities in the 360 Data Admin Dashboard.

# 📚 Documentation Index

Welcome to the 360 Admin Dashboard documentation! This index provides quick access to all project documentation organized by category.

## 🚀 Getting Started

- **[API Documentation](./api/API_DOCUMENTATION.md)** - Comprehensive guide to using the API services, hooks, and best practices
- **[Environment Setup](./getting-started/ENVIRONMENT_SETUP.md)** - Instructions for setting up the development environment
- **[Project Brief](./getting-started/projectbrief.md)** - High-level project overview and objectives
- **[API Usage Guide](./api/API_USAGE_GUIDE.md)** - Detailed guide for using the API services
- **[TanStack Query Usage](./api/TANSTACK_QUERY_USAGE.md)** - Guide for using React Query in the project

## 🏗️ Architecture & Design

- **[System Patterns](./architecture/systemPatterns.md)** - Architectural patterns and design decisions
- **[Technical Context](./architecture/techContext.md)** - Technical stack and implementation details
- **[Product Context](./architecture/productContext.md)** - Product vision and requirements
- **[Active Context](./operations/activeContext.md)** - Current development focus and progress
- **[Progress](./operations/progress.md)** - Development progress and milestones

## 🔧 Services & APIs

- **[API Alignment Summary](./architecture/API_ALIGNMENT_SUMMARY.md)** - Summary of API consolidation and alignment
- **[Organization Overview](./architecture/ORGANIZATION_OVERVIEW.md)** - Overview of the service organization structure
- **[User Store Guide](./services/USER_STORE_README.md)** - Guide for using the user store functionality
- **[Fund Transfer Guide](./services/FUND_TRANSFER_README.md)** - Guide for fund transfer operations
- **[Endpoints Verification](./api/ENDPOINTS_VERIFICATION.md)** - Verification of API endpoints

## 📋 Development Guidelines

### Code Organization

- Follow the layered architecture: Components → Hooks → ApiService → Domain Services → Infrastructure
- Use TypeScript for type safety
- Implement proper error handling and loading states

### API Usage

- Always use React Query hooks instead of direct API calls
- Handle loading and error states appropriately
- Use optimistic updates for better user experience

### Best Practices

- Keep components focused on UI logic
- Move business logic to domain services
- Use proper TypeScript types
- Implement comprehensive error handling

## 🔍 Quick Reference

### Common Tasks

#### Authentication

```typescript
import { useLogin, useUserProfile } from "@/services/hooks";

const loginMutation = useLogin();
await loginMutation.mutateAsync({ userName: "user", password: "pass" });

const { data: user } = useUserProfile();
```

#### Transactions

```typescript
import { useTransactions, useBuyData } from "@/services/hooks";

const { data: transactions } = useTransactions();
const buyDataMutation = useBuyData();
```

#### Error Handling

```typescript
const { data, error, isLoading } = useTransactions();

if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorMessage error={error} />;
```

## 📂 File Structure

```text
docs/
├── README.md                 # Documentation index (this file)
├── getting-started/
│   ├── ENVIRONMENT_SETUP.md  # Environment setup guide
│   └── projectbrief.md       # Project brief
├── architecture/
│   ├── systemPatterns.md
│   ├── techContext.md
│   ├── productContext.md
│   ├── ORGANIZATION_OVERVIEW.md
│   └── API_ALIGNMENT_SUMMARY.md
├── api/
│   ├── API_DOCUMENTATION.md
│   ├── API_USAGE_GUIDE.md
│   ├── TANSTACK_QUERY_USAGE.md
│   └── ENDPOINTS_VERIFICATION.md
├── services/
│   ├── FUND_TRANSFER_README.md
│   └── USER_STORE_README.md
├── operations/
│   ├── activeContext.md
│   └── progress.md
└── resources/
    └── Afoo.postman_collection.json
```

## 🤝 Contributing to Documentation

When adding new documentation:

1. Place files in the `docs/` directory
2. Use descriptive filenames with `.md` extension
3. Update this index file to include new documentation
4. Follow the established structure and formatting
5. Include code examples where appropriate

## 📞 Support

For questions about the codebase or documentation:

- Check the relevant documentation files first
- Review the API documentation for usage examples
- Refer to the system patterns for architectural guidance
- Consult the active context for current development status

---

**Last updated:** Current Date
