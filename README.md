# Haj Arafa E-Commerce Platform

A premium, high-performance Direct-to-Consumer (DTC) React Single Page Application (SPA) designed and built for **Haj Arafa**, a boutique brand specializing in natural honeys, herbs, nuts, dried fruits, oils, and organic wellness products.

This codebase is a high-fidelity implementation of the [Haj Arafa Figma Design](https://www.figma.com/design/MN6XEI5KhZGE87Q5VbHGNz/%3C%3E-Haj-Arafa).

---

## 🚀 Why This Solution is Better Than the Current Web Presence

Haj Arafa currently lacks a dedicated, official standalone e-commerce store, relying primarily on social media pages, directory listings, and third-party marketplaces (e.g., Noon, mall portals, local directories). 

Our React SPA solution delivers a massive upgrade:

| Feature / Metric | Third-Party Marketplaces / Listings | Our Dedicated React SPA Solution |
| :--- | :--- | :--- |
| **Brand Identity** | Generic, standard grid layouts with no branding. | Premium boutique design with custom organic color palettes, elegant typography, and micro-interactions that elevate Haj Arafa's brand value. |
| **Competitor Ads** | Flooded with competitor suggestions, ads, and price comparisons. | **Zero distractions**. 100% focused on Haj Arafa's catalog and story. |
| **Language & RTL** | Generic machine translation; broken layouts or misaligned columns when toggling Arabic. | **Perfect Native Dual-Language Support**. Seamless dynamic layout mirroring (Arabic/English) with RTL-optimized margins, icons, and text flows. |
| **Performance** | Slow page transitions, heavy tracking pixels, and bloated load times. | **Ultra-Fast Single Page Application**. Near-instantaneous routing, minimal network overhead, and smooth client-side operations. |
| **Checkout Experience** | Long checkout steps with third-party logins and generic maps. | Sleek, custom direct checkout with integrated client-side location search (Nominatim OpenStreetMap) to easily pinpoint delivery addresses. |
| **Customer Retention** | No loyalty building; consumers buy from whoever is cheapest on the day. | Interactive features, personal wishlist tracking, clear benefits explanations, and secure direct-payment indicators. |

---

## 🛠️ Modern Tech Stack

- **Core Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) (for type-safety and robust components)
- **Build Tooling**: [Vite](https://vite.dev/) (delivering instant hot-reloads and optimized compilation)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + custom CSS variables for design system tokens (spacing, typography, HSL theme colors)
- **Routing**: [React Router v7](https://reactrouter.com/) (declarative nested client-side routes)
- **State Management**:
  - `AppSettingsContext`: Global language (AR/EN), RTL layout state, and theme configuration.
  - `CartContext`: Persistent shopping cart with item controls.
  - `WishlistContext`: Persistent customer wishlist.
- **Animations & Micro-interactions**: [Motion (Framer Motion)](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## ✨ Key Updates & Recent Improvements

We have refined the codebase to meet strict professional, semantic, and accessibility criteria:

1. **Zero Hardcoded Strings (i18n Transition)**
   - Moved all inline dictionaries to localized JSON files: [`src/i18n/ar.json`](file:///c:/Users/AhmedMahdy/OneDrive%20-%20Advansys%20IS/Documents/Antigravity/HajArafa/src/i18n/ar.json) and [`src/i18n/en.json`](file:///c:/Users/AhmedMahdy/OneDrive%20-%20Advansys%20IS/Documents/Antigravity/HajArafa/src/i18n/en.json).
   - The application dynamically translates headers, buttons, form validations, descriptions, and statuses based on the user's preferred locale.

2. **Pixel-Perfect RTL & LTR Mirroring**
   - Automatically flips document layouts, margins, paddings, borders, flex directions, absolute positioning coordinates, and directional icons (like arrows and back buttons) when switching languages.

3. **Strict Semantic HTML5 & Accessibility (a11y)**
   - No interactive elements utilize `div` tags. We strictly use native `<button>`, `<input>`, `<nav>`, `<section>`, and `<header>` tags.
   - Interactive sections support clear focus outlines for keyboard navigation, appropriate `aria-*` tags, and unique IDs.
   - Automatic focus triggers (`autoFocus` and `.focus()`) are implemented on search inputs (e.g. category view, FAQ, and header search overlays) when navigating.

4. **UI & Spacing Harmony**
   - Matching component heights for adjacent elements (e.g. ensuring the "Add to Cart" button matches the height of the quantity adjustment selectors).
   - Categories pills and horizontal navigation headers are fully responsive and retained on all screens.
   - Heavy desktop-only components (like multi-step marketing benefits lists) are programmatically hidden on mobile viewports to maximize shop speed and conversion rates.

5. **Integrated Payment & Security Trust Indicators**
   - Footer contains elegant security indicators and verified payment badges (Visa, Mastercard, Meeza, and Cash on Delivery) to increase checkout confidence.

---

## 📁 Repository Structure

```
├── public/                 # Static assets (favicons, etc.)
├── guidelines/             # Design guidelines & setup files
├── src/
│   ├── assets/             # Optimized WebP product photography & branding images
│   ├── i18n/               # Translation dictionary JSON files (ar.json / en.json)
│   ├── main.tsx            # App bootstrapping entry point
│   ├── styles/             # Global stylesheets, fonts, and theme CSS variables
│   └── app/
│       ├── App.tsx         # Main layout wrapper
│       ├── Root.tsx        # Shell component with header/footer layouts
│       ├── routes.tsx      # Application routing definition
│       ├── components/     # Specialized UI components (CartDrawer, Header, ProductCard, etc.)
│       ├── context/        # Global React context states (Cart, Settings, Wishlist)
│       ├── data/           # Core static database definitions (products.ts, categories.ts)
│       └── pages/          # Individual app pages (Home, Products, Checkout, Account, etc.)
└── package.json            # Configuration and script definitions
```

---

## 💻 Running the Code

### 1. Install Dependencies
Make sure you have [Node.js](https://nodejs.org/) installed, then run:
```bash
npm install
```

### 2. Run the Development Server
To launch the hot-reloading development server locally:
```bash
npm run dev
```

### 3. Build for Production
To compile and bundle optimized static assets for deployment (Vercel, Netlify, etc.):
```bash
npm run build
```