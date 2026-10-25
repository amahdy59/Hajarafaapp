# Spec: Egyptian Heritage Apothecary UI/UX Redesign & Optimization

## 1. Overview & Vision
This specification establishes the **Egyptian Heritage Apothecary** aesthetic (Option A) across the Haj Arafa digital storefront. Founded in 1968 in Bab El Louk, Cairo, Haj Arafa embodies over 55 years of apothecary mastery. This redesign elevates the footer, declutters layout surfaces, guarantees WCAG 2.2 AAA accessibility, enhances mobile and desktop performance, and ensures complete symmetry in both Arabic and English across Light and Dark themes.

---

## 2. Palette & Design Tokens

### 2.1 Surfaces & Canvas
- **Light Theme**:
  - Main Body Canvas: Warm Papyrus Cream (`#FBF7F1`)
  - Elevated Card Surface: Crisp White (`#FFFFFF`) / Warm Sand Wash (`#F7F3EC`)
  - Footer Canvas: Deep Botanical Apothecary Moss (`#142318`)
  - Primary Borders: Warm Sand Line (`rgba(216, 206, 196, 0.6)`)
- **Dark Theme**:
  - Main Body Canvas: Charcoal Apothecary Ink (`#0D1511`)
  - Elevated Card Surface: Deep Moss Night (`#16261C`) / Zinc Dark (`#181E1A`)
  - Footer Canvas: Obsidian Moss (`#080D0A`)
  - Primary Borders: Muted Sage Border (`rgba(141, 163, 146, 0.16)`)

### 2.2 Accents & Heritage Highlights
- Terracotta Brand Primary: `#83340F` (Dark: `#9E4319`)
- Amber Gold Highlights: `#F5D77F` (Light Footer), `#D0A040` (Accents)
- Deep Forest Green: `#16261C` (Light CTAs), `#385942` (Dark Accents)
- Soft Luminous Sage: `#8DA392`
- Contrast Standard: **WCAG 2.2 AAA (>= 7:1)** across all text and background pairings.

---

## 3. The Footer Redesign

### 3.1 Architectural Layout
1. **Value Pillars Ribbon**:
   - 4 tactile cards with glassmorphism micro-borders (`border-white/10`).
   - Bilingual icons (Pure Harvest, 1968 Heritage, Nationwide Express Delivery, Guaranteed Satisfaction).
2. **Herbal Circle Newsletter (Apothecary Privilege)**:
   - Heritage quality seal badge ("ختم الجودة العطارية • عائلة حاج عرفة منذ ١٩٦٨").
   - Anti-spam reassurance pill ("بدون رسائل مزعجة • يمكنك إلغاء الاشتراك في أي وقت").
   - Clean, accessible email input using `data-no-focus-ring` with unified focus glow.
   - Spring-animated terracotta subscription button with loading spinner state.
3. **Four-Column Main Navigation**:
   - **Column 1 (Brand & Heritage)**: 1968 Egyptian Apothecary seal, brand narrative, live concierge availability indicator (pulsing green beacon), tactile social media buttons (Facebook, Instagram, WhatsApp) with 44px touch targets.
   - **Column 2 (Store Collections)**: 6 core herbal categories with directional micro-hover animation (`hover:translate-x-1` in LTR, `rtl:hover:-translate-x-1` in RTL).
   - **Column 3 (Customer Care & Integrity)**: Track Orders, Branches, Customer Support, FAQs & Returns, all with >= 44px touch targets.
   - **Column 4 (Direct Support & Concierge)**: 1-Click WhatsApp Quick Order Assistant button, direct Hotline dialer, official support email, interactive Branch locator.
4. **Bottom Legal & Payment Matrix (Mobile-Safe)**:
   - High-definition Egyptian payment badges: **Meeza (ميزة)**, **Vodafone Cash (فودافون كاش)**, **Visa**, **Mastercard**, and **Cash on Delivery (COD)**.
   - Trust and security mark: 🔒 256-Bit SSL Encrypted Checkout & Egyptian Commercial Registration.
   - Smooth "Back to Top" button with hover micro-elevation.
   - **Mobile Safe Area**: Explicit padding `pb-[calc(5rem+env(safe-area-inset-bottom,0px))] sm:pb-8` preventing any occlusion by the fixed mobile bottom navigation bar.

---

## 4. Layout Decluttering & Look and Feel

### 4.1 Visual Hierarchy & Rhythm
- Replace harsh flat borders with soft ambient drop shadows (`shadow-soft` with `rgba(27, 28, 26, 0.05)`).
- Ensure consistent spacing cadence (multiples of 4px / 8px).
- Simplify promotional banners and eliminate redundant border boxes.

### 4.2 Bilingual Arabic & English Typography
- **Arabic**: Font family **Cairo** with relaxed line-heights (`leading-relaxed`) to prevent dot clipping, with standardized Arabic-Indic numbers (`١٢٣٤٥`).
- **English**: Font family **Questrial** for apothecary headings, paired with clean system sans for dense tabular text.
- Full logical CSS properties (`start`, `end`, `margin-inline`, `padding-inline`) for perfect layout mirroring.

---

## 5. Performance & Quality Gates
- **Zero CLS**: Explicit width and height attributes on all footer badges, logos, and images.
- **Passive Event Handlers**: All scroll listeners use `{ passive: true }`.
- **Automated Verification**: Complete coverage via Vitest, TypeScript typecheck, and ESLint with zero errors.
