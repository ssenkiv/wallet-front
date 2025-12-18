# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Next.js dev server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run test     # Run all tests with Vitest
npx vitest run src/tests/wallets/mockWalletRepository.test.ts  # Run single test file
```

## Architecture

This is a Next.js 16 banking application ("NerdyPay") using Clean Architecture with domain-driven design principles.

### Layer Structure

```
src/
├── modules/{domain}/           # Core business logic
│   ├── domain/                 # Entities and Repository interfaces
│   ├── application/            # Use cases (pure functions accepting repository)
│   ├── infra/                  # Repository implementations (localStorage mock)
│   └── types/                  # DTOs and command objects
├── hooks/{domain}/             # React Query hooks wrapping use cases
│   └── view/                   # Hooks returning ViewModels
├── view-models/{domain}/       # Transform domain entities for UI
├── components/                 # Reusable UI components
└── app/                        # Next.js App Router pages
```

### Domains

- **accounts**: User accounts with CRUD operations and login
- **wallets**: Currency wallets linked to accounts
- **transactions**: Deposit, withdraw, transfer operations

### Key Patterns

**Use Case Functions**: Application layer exports factory functions that take a repository and return an async operation:
```typescript
export function getById(repo: AccountRepository) {
  return async (id: number) => repo.getAccountById(id);
}
```

**Repository Pattern**: Domain defines interface, infra provides implementation. Currently uses localStorage-based mocks.

**ViewModel Pattern**: `view-models/` transforms domain entities into UI-ready objects. Hooks in `hooks/{domain}/view/` combine data fetching with ViewModel transformation.

### Tech Stack

- Next.js 16 with React Compiler (`reactCompiler: true`)
- React 19, TypeScript (strict mode)
- TanStack Query for server state
- TanStack Table for data tables
- react-hook-form for forms
- MUI + CSS Modules for styling
- Vitest + Testing Library for tests (jsdom environment)

### Path Alias

`@/*` maps to `./src/*`
