# Technical Context

## Technology Stack Details

### Core Framework
- **Next.js 14.1.0**: App Router, Server Components, TypeScript support
- **React 18.3.1**: Latest stable version with concurrent features
- **TypeScript 5.3.3**: Full type safety across the application

### Styling & UI
- **Tailwind CSS 3.4.17**: Utility-first CSS framework
- **shadcn/ui**: Pre-built accessible components
- **Radix UI**: Underlying primitive components
- **Lucide React**: Icon library
- **next-themes**: Dark/light mode support

### Development Tools
- **PNPM**: Fast, disk space efficient package manager
- **PostCSS**: CSS processing with autoprefixer
- **ESLint**: Code linting (disabled during builds)
- **TypeScript**: Type checking (errors ignored in builds)

## Current Configuration Issues

### PostCSS Configuration Problem
**File**: `postcss.config.mjs`
**Issue**: Mixing ESM and CommonJS syntax
**Current State**: 
```js
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
```

### Tailwind Configuration
**File**: `tailwind.config.ts`
**Status**: Properly configured with:
- Correct content paths
- Theme extensions
- CSS variables
- shadcn/ui integration

### Next.js Configuration
**File**: `next.config.mjs`
**Status**: Configured with:
- ESLint ignoring during builds
- TypeScript error ignoring
- Image optimization disabled

## Dependencies Analysis

### Core Dependencies (Relevant to Styling)
```json
{
  "next": "14.1.0",
  "react": "^18.2.0", 
  "react-dom": "^18.2.0",
  "tailwindcss": "^3.4.17",
  "autoprefixer": "^10.4.20",
  "postcss": "^8",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.5.5",
  "tailwindcss-animate": "^1.0.7"
}
```

### UI Component Dependencies
```json
{
  "@radix-ui/react-*": "Various versions",
  "lucide-react": "^0.454.0",
  "next-themes": "^0.4.4"
}
```

## File Structure Analysis

### CSS Files
- `app/globals.css`: Contains Tailwind directives and CSS variables
- No conflicting CSS files found

### Configuration Files
- `tailwind.config.ts`: Properly structured
- `postcss.config.mjs`: Format mismatch issue
- `components.json`: shadcn/ui configuration correct

## Known Issues

### Critical Issues
1. **Tailwind Not Processing**: CSS classes not being applied
2. **PostCSS Module Format**: .mjs file with mixed syntax
3. **Build Cache**: Potential stale cache issues

### Build Configuration Issues
- ESLint disabled during builds (intentional)
- TypeScript errors ignored (intentional)
- Images unoptimized (intentional)

## Dependencies Compatibility
- Next.js 14.1.0 + React 18.3.1: ✅ Compatible
- Tailwind 3.4.17 + PostCSS 8: ✅ Compatible  
- shadcn/ui + Radix UI: ✅ Compatible
- All Radix UI versions: ⚠️ Mixed versions (functional but not optimal)

## Environment Requirements
- Node.js: Version compatible with Next.js 14
- PNPM: Latest version
- TypeScript: 5.3.3+
- Browser: Modern browsers with ES6+ support 