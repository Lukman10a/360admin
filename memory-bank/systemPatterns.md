# System Patterns

## Architecture Overview

### Next.js App Router Structure
- **App Directory**: Using Next.js 14.1.0 app directory structure
- **Server Components**: Default server-side rendering with "use client" for interactive components
- **Client Components**: Marked with "use client" directive for state management and interactivity
- **Layout System**: Hierarchical layouts with shared UI and responsive design

### Component Architecture

#### Layout Pattern
```typescript
// Root Layout (app/layout.tsx)
import "./globals.css"  // Global CSS import with Tailwind directives
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
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
1. **Layout Components**: `dashboard-layout.tsx` - Responsive sidebar + main content area
2. **Page Components**: Feature-specific dashboards with consistent structure
3. **Modal Components**: `*-modal.tsx` - Reusable dialog patterns with form handling
4. **UI Components**: shadcn/ui based components in `/ui` folder (50+ components)
5. **Feature Components**: Business logic components for each feature area

### Styling Patterns

#### Tailwind CSS Integration
- **Utility Classes**: Extensive use of Tailwind utilities for responsive design
- **Custom CSS Variables**: Defined in `globals.css` for theming and dark mode
- **Component Variants**: Using `class-variance-authority` for component variations
- **Conditional Classes**: Using `cn()` utility function for dynamic class merging

#### Example Styling Pattern
```typescript
import { cn } from "@/lib/utils"

const className = cn(
  "base-classes here",
  condition && "conditional-classes",
  variant === "primary" && "primary-variant-classes",
  "responsive-classes md:larger-screen-classes"
)
```

#### Color System & Theme
- **CSS Variables**: HSL color values in `:root` and `.dark` for theme switching
- **Semantic Colors**: Background, foreground, primary, secondary, muted, accent, destructive
- **Brand Colors**: Indigo as primary brand color (indigo-600, indigo-50, etc.)
- **Theme Support**: Light/dark mode through CSS variables and next-themes
- **Sidebar Colors**: Dedicated sidebar color variables for layout consistency

### State Management Patterns

#### Local State Management
- **useState**: For component-level state (form inputs, modal visibility, dropdowns)
- **Form State**: Using react-hook-form for complex forms (though not fully implemented)
- **Modal State**: Boolean flags for modal visibility with proper cleanup
- **List State**: Arrays for managing dynamic data (users, transactions, plans)

#### Navigation & Routing
- **usePathname**: For active navigation highlighting in sidebar
- **useRouter**: For programmatic navigation (imported but not heavily used)
- **Sidebar State**: Mobile responsive sidebar toggle with overlay
- **Link Components**: Next.js Link for client-side navigation

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
  icon: LucideIcon,
  path?: string
}

// User Pattern
{
  id: number,
  fullName: string,
  email: string,
  phone: string,
  role: string,
  status: string,
  regDate: string,
  regTime: string
}
```

#### Form Handling Patterns
- **Controlled Components**: All form inputs use controlled state
- **Form Submission**: POST requests for settings/configuration (simulated)
- **Validation**: Basic HTML5 validation with required fields
- **Success Feedback**: Success message components after form submission

### UI Component Patterns

#### Modal Pattern
```typescript
export default function FeatureModal({ isOpen, onClose, onSubmit }) {
  const modalRef = useRef<HTMLDivElement>(null)
  
  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div ref={modalRef} className="bg-white rounded-xl w-full max-w-lg shadow-2xl">
        {/* Modal content */}
      </div>
    </div>
  )
}
```

#### Form Pattern
```typescript
const [formData, setFormData] = useState({
  field1: "",
  field2: ""
})

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  onSubmit(formData)
  // Reset form
  setFormData({ field1: "", field2: "" })
  onClose()
}
```

#### Table Pattern
- **Responsive Tables**: Mobile-friendly with horizontal scroll
- **Action Buttons**: Edit and delete buttons with icon indicators
- **Status Indicators**: Color-coded badges for different states
- **Pagination**: Basic pagination controls (UI only)

### Responsive Design Patterns

#### Mobile-First Approach
- **Breakpoints**: `md:` (768px+), `lg:` (1024px+) prefixes for larger screens
- **Mobile Navigation**: Collapsible sidebar with overlay and hamburger menu
- **Flexible Layouts**: Grid and flexbox patterns that adapt to screen size
- **Typography**: Responsive text sizing (`text-xl md:text-2xl`)

#### Grid Patterns
```css
/* Services grid - responsive columns */
grid-cols-4 gap-2 md:gap-4

/* Cards grid - stacked to side-by-side */
grid-cols-1 md:grid-cols-3 gap-6

/* Form grid - single to double column */
grid-cols-1 md:grid-cols-2 gap-4

/* Table responsive - hide columns on mobile */
hidden md:table-cell
```

#### Sidebar Responsive Pattern
```typescript
// Mobile: Fixed overlay sidebar
className={`fixed inset-y-0 left-0 z-40 w-64 bg-white transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen ${
  sidebarOpen ? "translate-x-0" : "-translate-x-full"
}`}
```

### File Organization Patterns

#### Component Naming Conventions
- **Feature Components**: `feature-name.tsx` (kebab-case)
- **Modal Components**: `add-feature-modal.tsx` (action-feature-modal)
- **Layout Components**: `dashboard-layout.tsx`
- **UI Components**: Generic reusable components in `/ui`

#### Import Patterns
```typescript
// External libraries first
import React from "react"
import { useState, useRef, useEffect } from "react"

// Next.js imports
import Link from "next/link"
import Image from "next/image"

// Third-party UI
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"

// Icons
import { Plus, Edit, Trash, Search } from "lucide-react"

// Internal components
import FeatureComponent from "@/components/feature-component"
```

#### Route Structure Pattern
```
app/
├── page.tsx                    # Dashboard home
├── system-users/page.tsx       # System users management
├── subscribers/page.tsx        # Subscriber management
├── credit-users/page.tsx       # Credit users management
├── services/
│   ├── page.tsx               # Services overview
│   ├── airtime/page.tsx       # Airtime discount management
│   └── data/page.tsx          # Data plans management
├── transactions/page.tsx       # Transaction history
├── notifications-management/page.tsx  # Notification management
├── api-settings/page.tsx       # API configuration
└── settings/page.tsx           # Site settings
```

## Component Communication Patterns

### Parent-Child Communication
- **Props Down**: Data and callbacks passed down to children
- **Events Up**: Child components call parent callbacks for state updates
- **Modal Communication**: Parent controls modal state, child handles form submission

### State Lifting Pattern
```typescript
// Parent component manages state
const [items, setItems] = useState([])
const [isModalOpen, setIsModalOpen] = useState(false)

const handleAddItem = (newItem) => {
  setItems([...items, newItem])
  setIsModalOpen(false)
}

// Pass to children
<ItemList items={items} />
<AddItemModal 
  isOpen={isModalOpen} 
  onClose={() => setIsModalOpen(false)}
  onAddItem={handleAddItem} 
/>
```

## Performance Patterns

### Optimization Strategies
- **Next.js Image**: Using Next.js Image component for optimization
- **Dynamic Imports**: Ready for code splitting (not currently implemented)
- **Tailwind Purging**: Optimized content paths for smaller CSS bundles
- **Component Memoization**: Opportunities for React.memo (not currently used)

### Bundle Optimization
- **Tree Shaking**: ES modules for optimal bundle size
- **Icon Optimization**: Lucide React for tree-shakeable icons
- **CSS Variables**: Efficient theming without duplicate styles

## Known Anti-Patterns & Technical Debt

### Current Issues
1. **Form Validation**: Basic HTML5 validation instead of Zod schemas
2. **Error Handling**: No error boundaries or comprehensive error states
3. **Loading States**: Missing loading indicators for async operations
4. **Data Fetching**: All data is mocked, no real API integration
5. **State Management**: No global state management for complex data

### Areas for Improvement
1. **Type Safety**: More comprehensive TypeScript interfaces
2. **Testing**: No test suite implemented
3. **Accessibility**: Could benefit from more ARIA attributes
4. **Performance**: No memoization or optimization for re-renders
5. **Security**: No authentication or authorization implementation

## Best Practices Being Followed
1. **TypeScript**: Full type safety across components
2. **Component Reusability**: shadcn/ui pattern for consistent UI
3. **Accessibility**: Radix UI primitives provide good accessibility foundation
4. **Performance**: Next.js optimizations and efficient CSS
5. **Code Organization**: Clear separation of concerns and consistent structure
6. **Responsive Design**: Mobile-first approach with proper breakpoints 