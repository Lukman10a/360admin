# System Patterns

## Architecture Overview

### Next.js App Router Structure
- **App Directory**: Using Next.js 13+ app directory structure
- **Server Components**: Default server-side rendering
- **Client Components**: Marked with "use client" directive
- **Layout System**: Hierarchical layouts with shared UI

### Component Architecture

#### Layout Pattern
```typescript
// Root Layout (app/layout.tsx)
import "./globals.css"  // Global CSS import
export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}

// Page Component (app/page.tsx)
import DashboardLayout from "@/components/dashboard-layout"
import Dashboard from "@/components/dashboard"

export default function Home() {
  return (
    <DashboardLayout>
      <Dashboard />
    </DashboardLayout>
  )
}
```

#### Component Structure Patterns
1. **Layout Components**: `dashboard-layout.tsx` - Sidebar + main content
2. **Page Components**: Feature-specific dashboards
3. **Modal Components**: `*-modal.tsx` - Reusable dialog patterns
4. **UI Components**: shadcn/ui based components in `/ui` folder

### Styling Patterns

#### Tailwind CSS Integration
- **Utility Classes**: Extensive use of Tailwind utilities
- **Custom CSS Variables**: Defined in `globals.css` for theming
- **Component Variants**: Using `class-variance-authority`
- **Conditional Classes**: Using `cn()` utility function

#### Example Styling Pattern
```typescript
const className = cn(
  "base-classes here",
  condition && "conditional-classes",
  variant === "primary" && "primary-variant-classes"
)
```

#### Color System
- **CSS Variables**: HSL color values in `:root` and `.dark`
- **Semantic Colors**: Background, foreground, primary, secondary, etc.
- **Brand Colors**: Indigo as primary brand color
- **Theme Support**: Light/dark mode through CSS variables

### State Management Patterns

#### Local State
- **useState**: For component-level state
- **Form State**: Using react-hook-form for forms
- **Modal State**: Boolean flags for modal visibility

#### Navigation State
- **usePathname**: For active navigation highlighting
- **useRouter**: For programmatic navigation
- **Sidebar State**: Mobile responsive sidebar toggle

### Data Patterns

#### Mock Data Structure
```typescript
// Transaction Pattern
{
  id: number,
  type: string,
  description: string,
  amount: number,
  time: string,
  icon: LucideIcon
}

// Service Pattern  
{
  id: number,
  name: string,
  fullName: string,
  icon: LucideIcon
}
```

#### API Integration Patterns
- **Form Submission**: POST requests for settings/configuration
- **Data Fetching**: Prepared for API integration (currently mock data)
- **Error Handling**: Basic error states in components

### UI Component Patterns

#### Modal Pattern
```typescript
export default function FeatureModal({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {/* Modal content */}
      </DialogContent>
    </Dialog>
  )
}
```

#### Form Pattern
```typescript
const form = useForm({
  resolver: zodResolver(formSchema),
  defaultValues: {}
})

// Form with validation and submission
```

#### Table Pattern
- Responsive tables with mobile-friendly layouts
- Action buttons for CRUD operations
- Status indicators and badges

### Responsive Design Patterns

#### Mobile-First Approach
- **Breakpoints**: `md:`, `lg:` prefixes for larger screens
- **Mobile Navigation**: Collapsible sidebar with overlay
- **Flexible Layouts**: Grid and flexbox patterns
- **Typography**: Responsive text sizing

#### Grid Patterns
```css
/* Services grid */
grid-cols-4 gap-2 md:gap-4

/* Cards grid */  
grid-cols-1 md:grid-cols-3 gap-6

/* Table responsive */
hidden md:table-cell
```

### File Organization Patterns

#### Component Naming
- **Feature Components**: `feature-name.tsx`
- **Modal Components**: `add-feature-modal.tsx`
- **Layout Components**: `feature-layout.tsx`
- **UI Components**: Generic reusable components

#### Import Patterns
```typescript
// External libraries first
import React from "react"
import { useState } from "react"

// Next.js imports
import Link from "next/link"
import Image from "next/image"

// Third-party UI
import { Button } from "@/components/ui/button"

// Internal components
import FeatureComponent from "@/components/feature-component"
```

## Known Anti-Patterns

### Current Issues
1. **CSS Processing**: Tailwind not being processed correctly
2. **Mixed Syntax**: PostCSS config format inconsistency
3. **Build Errors**: ESLint and TypeScript errors ignored
4. **Dependency Versions**: Mixed Radix UI versions

### Best Practices Being Followed
1. **TypeScript**: Full type safety
2. **Component Reusability**: shadcn/ui pattern
3. **Accessibility**: Radix UI primitives
4. **Performance**: Next.js optimizations 