# ADR-0001: Multi-Tier Automated CI/CD Review Gates

- **Status**: Accepted
- **Date**: 2026-09-05
- **Deciders**: Senior UX & Engineering Review Committee

## Context
Deploying code directly to production without automated quality gates allows subtle regressions to escape into production, including:
- Broken color contrast ratios violating WCAG 2.2 AAA.
- Missing translation keys between Arabic and English.
- Rigid pixel widths breaking mobile viewports.
- TypeScript type bypasses (`any`, `as any`) causing runtime crashes.
- Oversized assets slowing down mobile storefront load times.

## Decision
We enforce a mandatory multi-tier "synthetic review team" in `.github/workflows/deploy.yml` and local development via `npm run review`:
1. **💻 Code Review Gate**: Static analysis, zero `any` types, strict imports.
2. **♿ Accessibility Gate**: WCAG 2.2 AAA math calculation ($\ge 7:1$ contrast), translation parity, ARIA alerts.
3. **📱 Responsiveness Gate**: Viewport-fit cover, safe-area insets, mobile touch targets ($\ge 44\text{px}$).
4. **⚡ Performance Gate**: All images are `.webp` under 250kB; vendor chunking enforced.
5. **🧪 Unit Test Gate**: Full execution of all automated domain test suites.

GitHub Actions automatically blocks deployment on any gate failure and renders an automated scorecard in `$GITHUB_STEP_SUMMARY`.

## Consequences
- **Positive**: Regressions cannot be deployed; the site is permanently self-maintaining.
- **Trade-off**: Slightly longer CI runtime (~60s), which is mitigated by npm dependency caching.
