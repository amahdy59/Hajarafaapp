# ADR-0003: Asynchronous IntersectionObserver for Zero-CPU Scroll UX

- **Status**: Accepted
- **Date**: 2026-09-05
- **Deciders**: Senior UX & Engineering Review Committee

## Context
Earlier versions of the desktop sticky purchase bar (`ProductDetail.tsx`) listened to `window.addEventListener("scroll", ...)` with numeric threshold checks (`window.scrollY > 550`). In low-powered laptops and mobile devices, continuous scroll listeners trigger synchronous layout thrashing and stutter on high-refresh rate displays.

## Decision
Replace all scroll depth listeners with the native asynchronous browser `IntersectionObserver` API:
- An observer attaches to the buy-box element (`buyBoxRef`).
- An offset root margin (`rootMargin: "-80px 0px 0px 0px"`) accounts for the fixed desktop navigation header.
- The observer runs off the main browser thread, consuming 0% CPU while scrolling.

## Consequences
- **Positive**: 60fps / 120fps smooth scrolling with zero stutter or layout recalculation overhead.
- **Positive**: Resilient across viewport resizing without arbitrary pixel hardcoding.
