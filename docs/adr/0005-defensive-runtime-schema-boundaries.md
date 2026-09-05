# ADR-0005: Compiler Hardening & Defensive Runtime Schema Boundaries

- **Status**: Accepted
- **Date**: 2026-09-05
- **Deciders**: Senior UX & Engineering Review Committee

## Context
TypeScript type checks operate at compile time. Data entering the application at runtime through `localStorage`, URL search parameters, and asynchronous network responses can be malformed, corrupted, or stale, causing unhandled null-reference crashes in production.

## Decision
1. **Compiler Hardening**: Enable `"noUncheckedIndexedAccess": true` in `tsconfig.app.json` so that array index accesses and record dictionary lookups are typed as `T | undefined`, forcing explicit null-checks.
2. **Defensive Boundary Parsers**: Validate all `localStorage` payloads (`hajarafa.cart`, `hajarafa.wishlist`, `hajarafa.profile`, `hajarafa.orders`) through type predicates and defensive schema filters before placing into React state.
3. **Safe Fallbacks**: If stored data fails structural validation, the application gracefully initializes default state without crashing or rendering empty white screens.

## Consequences
- **Positive**: Zero unhandled "cannot read properties of undefined" runtime crashes.
- **Positive**: Complete fault tolerance when user browser storage contains legacy or corrupt data.
