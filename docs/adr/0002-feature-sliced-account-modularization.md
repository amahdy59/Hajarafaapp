# ADR-0002: Feature-Sliced Domain Modularization for Account Area

- **Status**: Accepted
- **Date**: 2026-09-05
- **Deciders**: Senior UX & Engineering Review Committee

## Context
The previous `Account.tsx` component had grown into a monolithic file of 2,195 lines, mixing authentication forms, interactive Leaflet maps, saved card brands, order histories, print templates, and notification preferences in a single component. This created massive cognitive load, merge conflict hazards, and high risk of regressions.

## Decision
Decompose `Account.tsx` into isolated domain feature modules under `src/app/features/account/`:
- `types.ts`: Central domain models and status configurations.
- `AccountAuth.tsx`: Dedicated sign-in, registration, and social provider login.
- `AccountOrders.tsx`: Order history, tracking timeline, and CSS-variable-themed printable receipts.
- `AccountProfile.tsx`: Personal data form, password change, and notification switch toggles.
- `AccountWishlist.tsx`: Wishlist items management and empty state.
- `AccountAddressesModal.tsx`: Leaflet map location selection and saved address storage.
- `AccountPaymentsModal.tsx`: Real-time card brand detection and saved payments.

`Account.tsx` is reduced from 2,195 lines to a ~420-line coordinator managing top-level URL search parameters (`?tab=profile|orders|wishlist`) and `localStorage` synchronization.

## Consequences
- **Positive**: Substantially improved code readability, testability, and isolated bug fixing.
- **Positive**: Full backwards compatibility with deep links (`/account?tab=orders`).
- **Trade-off**: Additional feature directory structure.
