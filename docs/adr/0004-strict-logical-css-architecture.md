# ADR-0004: Strict Logical CSS Architecture for Bilingual RTL/LTR

- **Status**: Accepted
- **Date**: 2026-09-05
- **Deciders**: Senior UX & Engineering Review Committee

## Context
Traditional CSS uses physical directional properties (`left`, `right`, `margin-left`, `padding-right`). In bilingual storefronts supporting Arabic (RTL) and English (LTR), physical properties require duplicate overrides, causing CSS bloat and frequent layout inversion bugs.

## Decision
Enforce Tailwind logical CSS properties across all layout and interactive components:
- Physical padding `pl-4 pr-4` $\rightarrow$ Logical `ps-4 pe-4` or `px-4`.
- Physical positioning `left-2 right-2` $\rightarrow$ Logical `start-2 end-2` or `inset-x-2`.
- Physical margins `ml-auto mr-auto` $\rightarrow$ Logical `ms-auto me-auto`.
- Directional icons (arrows, chevrons) must apply `.rtl-flip` to flip naturally in Arabic; non-directional icons (search, user, cart) remain unflipped.

## Consequences
- **Positive**: 100% automatic layout mirroring without extra RTL-specific CSS overrides.
- **Positive**: Validated automatically in CI via `responsiveness.test.ts`.
