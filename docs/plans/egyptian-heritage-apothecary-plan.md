# Egyptian Heritage Apothecary Implementation Plan

## Proposed Changes
Transform the footer and overall application aesthetics according to Option A (Egyptian Heritage Apothecary). Ensure WCAG 2.2 AAA accessibility, zero layout shift (CLS = 0), mobile bottom-nav safe clearance, and seamless bilingual Arabic/English experience in both Light and Dark themes.

---

## Task Breakdown

### Task 1: Complete Footer Redesign (Egyptian Heritage Apothecary)
- **Files Touched**: `src/app/components/Footer.tsx`
- **Actions**:
  1. Update background to `#142318` (Light) and `#080D0A` (Dark) with subtle gold/sage radial gradients and top divider.
  2. Implement Value Pillars Ribbon with 4 tactile cards, subtle gold borders, and bilingual microcopy.
  3. Redesign Herbal Circle Newsletter with "ختم الجودة العطارية" seal, anti-spam guarantee, and accessible input with `data-no-focus-ring`.
  4. Enhance Brand & Concierge column with 1968 heritage story, live concierge beacon, and 44px tactile social buttons.
  5. Upgrade Collections and Customer Care links with directional micro-hover translations (`hover:translate-x-1` / `rtl:hover:-translate-x-1`) and >= 44px touch targets.
  6. Polish Direct Support column with 1-Click WhatsApp Quick Order Assistant, Hotline, Email, and Branches links.
  7. Upgrade Legal & Payment Matrix with official Egyptian payment marks (Meeza, Vodafone Cash, Visa, Mastercard, COD) and 256-bit SSL Encrypted Checkout trust badge.
  8. Add `pb-[calc(5rem+env(safe-area-inset-bottom,0px))] sm:pb-8` to eliminate mobile bottom-nav occlusion.

### Task 2: Design Tokens & Global Style Enhancements
- **Files Touched**: `src/styles/tailwind.css`, `src/styles/index.css`
- **Actions**:
  1. Ensure warm cream canvas tokens (`--brand-cream`, `--brand-cream-2`, `--brand-terracotta`) match the Egyptian Heritage Apothecary spec.
  2. Maintain WCAG 2.2 AAA contrast parity in both Light and Dark modes.

### Task 3: Comprehensive Automated Tests
- **Files Touched**: `src/app/footerAndTheme.test.ts`
- **Actions**:
  1. Write tests verifying footer background colors, contrast ratios, and mobile safe area padding.
  2. Verify all payment badges, SSL encryption trust mark, and newsletter anti-spam guarantee.
  3. Verify touch targets >= 44px and RTL directional classes.

### Task 4: Full Quality Pipeline, Commit, Push & Deployment Verification
- **Commands**:
  1. `npm run review` (TypeScript `tsc`, ESLint `eslint .`, Vitest `vitest run`).
  2. `npm run build` (Vite production build).
  3. `git commit` and `git push origin main`.
  4. Monitor GitHub Actions workflow run via `gh run watch`.
  5. Run `npm run test:deploy` against live production URL (`https://amahdy59.github.io/Hajarafaapp/`).
