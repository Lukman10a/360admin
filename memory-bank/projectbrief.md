# 360 Data Admin Dashboard - Project Brief

## Project Overview
This is a Next.js-based admin dashboard for "360 Data", a platform that appears to handle telecommunications services including airtime, data plans, and user management.

## Core Functionality
- **User Management**: System users, subscribers, and credit users
- **Service Management**: Airtime, data plans, and service configurations  
- **Transaction Management**: Transaction history and monitoring
- **Notification System**: Notifications and messaging
- **Settings**: API settings, site settings, and configuration
- **Dashboard**: Analytics and overview metrics

## Technology Stack
- **Frontend**: Next.js 14.1.0 with App Router
- **Styling**: Tailwind CSS 3.4.17 with shadcn/ui components
- **Language**: TypeScript 5.3.3
- **Package Manager**: PNPM
- **UI Library**: Radix UI components with shadcn/ui
- **Icons**: Lucide React
- **State Management**: React hooks (useState, etc.)

## Project Structure
```
/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
│   └── [various routes]/  # Feature pages
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── [feature components] # Custom components
├── lib/                   # Utilities
├── hooks/                 # Custom React hooks
└── [config files]        # TypeScript, Tailwind, etc.
```

## Current Issues Identified
1. **Critical Styling Issue**: Tailwind CSS is not being processed/applied
2. **PostCSS Configuration**: Potential module format mismatch
3. **Build Configuration**: Possible Next.js + Tailwind integration issues

## Key Requirements
- Modern admin dashboard interface
- Responsive design (mobile + desktop)
- Professional styling with proper theming
- User authentication and role management
- Data management capabilities
- Real-time notifications
- API integrations (Paystack, Monnify)

## Success Criteria
- All Tailwind CSS styles render correctly
- Dashboard is fully functional across all features
- Responsive design works on all device sizes
- No console errors or build issues
- Proper TypeScript integration 