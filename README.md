# 360 Admin Dashboard

This repository contains the 360 Admin Dashboard — a Next.js + TypeScript admin panel with a layered API architecture (Components → Hooks → ApiService → Domain Services → Infrastructure).

## Key Features

- Layered API architecture with domain services
- React Query (TanStack Query) for data fetching and caching
- TypeScript-first codebase with shared types
- Mock data support for development
- Centralized documentation in the `docs/` folder

## Getting Started

1. Install dependencies

```bash
pnpm install
```

2. Create `.env.local` with required variables (see `docs/getting-started/ENVIRONMENT_SETUP.md`).

3. Run the development server

```bash
pnpm dev
```

## Project Structure (relevant)

- app/ — Next.js app routes and pages
- components/ — React UI components
- services/ — API services, hooks, types
  - api/ — API clients and domain services
  - hooks/ — React Query hooks
  - types/ — TypeScript types for requests/responses
- docs/ — Project documentation (moved and reorganized)

## Contributing

Please follow the documentation in `docs/README.md` for contribution guidelines and documentation standards.

## License

MIT
