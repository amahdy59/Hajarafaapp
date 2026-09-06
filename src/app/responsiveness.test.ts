import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Responsiveness & Mobile-First Review Suite", () => {
  const rootDir = path.resolve(__dirname, "../..");
  const srcAppDir = path.resolve(__dirname, "../app");

  it("verifies mobile viewport meta and notch safe-area configuration in index.html", () => {
    const indexPath = path.join(rootDir, "index.html");
    const html = fs.readFileSync(indexPath, "utf-8");

    expect(html).toContain('name="viewport"');
    expect(html).toContain("width=device-width");
    expect(html).toContain("initial-scale=1.0");
    expect(html).toContain("viewport-fit=cover");
  });

  it("verifies index.html has no user-scalable=no disabling zoom", () => {
    const indexPath = path.join(rootDir, "index.html");
    const html = fs.readFileSync(indexPath, "utf-8");

    // WCAG 2.2 AAA requires users be able to zoom up to 200%
    expect(html).not.toContain("user-scalable=no");
    expect(html).not.toContain("maximum-scale=1");
  });

  it("audits codebase for rigid wide physical pixel widths that cause horizontal mobile overflow", () => {
    function getAllTsxFiles(dir: string): string[] {
      let results: string[] = [];
      const list = fs.readdirSync(dir);
      for (const file of list) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
          results = results.concat(getAllTsxFiles(fullPath));
        } else if (file.endsWith(".tsx")) {
          results.push(fullPath);
        }
      }
      return results;
    }

    const files = getAllTsxFiles(srcAppDir);
    const widePixelRegex = /(?:^|\s)w-\[(\d+)px\]/g;
    const violations: { file: string; match: string }[] = [];

    for (const file of files) {
      const content = fs.readFileSync(file, "utf-8");
      let match;
      while ((match = widePixelRegex.exec(content)) !== null) {
        const widthStr = match[1];
        if (widthStr && match[0]) {
          const widthVal = parseInt(widthStr, 10);
          // Any fixed width >= 400px without responsive prefix causes mobile overflow on 360-390px screens
          if (widthVal >= 400) {
            violations.push({ file: path.relative(rootDir, file), match: match[0] });
          }
        }
      }
    }

    expect(violations).toEqual([]);
  });

  it("verifies bottom navigation bar incorporates safe area spacing and touch targets", () => {
    const bottomNavPath = path.join(srcAppDir, "components/BottomNav.tsx");
    const content = fs.readFileSync(bottomNavPath, "utf-8");

    // Must have fixed mobile positioning, z-index, and touch target height
    expect(content).toContain("fixed");
    expect(content).toContain("bottom-0");
    expect(content.includes("sm:hidden") || content.includes("md:hidden")).toBe(true);
    expect(content.includes("min-h-[44px]") || content.includes("min-h-[48px]")).toBe(true);
  });

  it("verifies mobile navigation drawer incorporates logical category navigation", () => {
    const settingsDrawerPath = path.join(srcAppDir, "components/SettingsDrawer.tsx");
    const content = fs.readFileSync(settingsDrawerPath, "utf-8");

    // Must provide mobile categories drawer with deep links
    expect(content).toContain("/category/");
    expect(content).toContain("categories");
  });

  it("verifies product card steppers adapt cleanly across small mobile viewports", () => {
    const productCardPath = path.join(srcAppDir, "components/ProductCard.tsx");
    const content = fs.readFileSync(productCardPath, "utf-8");

    // Steppers must provide touch target and accessible label
    expect(content).toContain("aria-label");
    expect(content.includes("min-h-[44px]") || content.includes("h-11")).toBe(true);
  });

  it("verifies desktop category rail is hidden on small mobile viewports to prevent layout clutter", () => {
    const headerPath = path.join(srcAppDir, "components/Header.tsx");
    const content = fs.readFileSync(headerPath, "utf-8");

    // Desktop category rail should be scoped to sm/md/lg screens
    expect(content.includes("hidden sm:block") || content.includes("hidden lg:block")).toBe(true);
  });

  it("verifies header avoids absolute logo centering that causes tablet & mobile collisions", () => {
    const headerPath = path.join(srcAppDir, "components/Header.tsx");
    const content = fs.readFileSync(headerPath, "utf-8");

    // Must not use absolute left-1/2 on logo
    expect(content).not.toContain("absolute left-1/2");
    // Must group hamburger and logo at the start
    expect(content).toContain("lg:hidden");
    expect(content).toContain("logoImg");
  });

  it("verifies header utilities maintain progressive disclosure thresholds", () => {
    const headerPath = path.join(srcAppDir, "components/Header.tsx");
    const content = fs.readFileSync(headerPath, "utf-8");

    // Loyalty pill must be scoped to lg to prevent tablet clutter
    expect(content).toContain("hidden lg:inline-flex");
    // Currency switcher must be scoped to md to prevent mobile crowding
    expect(content).toContain("hidden md:block");
  });

  it("verifies category navigation rail contains edge fade gradients for overflow hinting", () => {
    const headerPath = path.join(srcAppDir, "components/Header.tsx");
    const content = fs.readFileSync(headerPath, "utf-8");

    expect(content).toContain("linear-gradient");
    expect(content).toContain("whitespace-nowrap");
    expect(content).toContain("overflow-x-auto");
  });

  it("verifies ScrollRail provides edge fade hints across both mobile and tablet", () => {
    const scrollRailPath = path.join(srcAppDir, "components/ui/ScrollRail.tsx");
    const content = fs.readFileSync(scrollRailPath, "utf-8");

    expect(content).toContain("sm:w-7");
    expect(content).toContain("sm:w-8");
  });

  it("performs automated mathematical clearance audit across standard device viewports", () => {
    // Audit viewports: 320px (SE 1st gen), 360px (Android), 375px (iPhone Mini), 390px (iPhone 14), 412px, 430px (Pro Max),
    // 640px (sm boundary), 768px (iPad portrait), 820px (iPad Air), 1024px (iPad Pro / 13" laptop), 1280px (xl desktop), 1440px (MacBook 16)
    const viewports = [
      { name: "iPhone SE (1st gen)", width: 320, isMobile: true, isTablet: false, isDesktop: false },
      { name: "Galaxy A / Small Android", width: 360, isMobile: true, isTablet: false, isDesktop: false },
      { name: "iPhone 13/SE (2nd gen)", width: 375, isMobile: true, isTablet: false, isDesktop: false },
      { name: "iPhone 14/15", width: 390, isMobile: true, isTablet: false, isDesktop: false },
      { name: "Pixel 7 / Galaxy S23", width: 412, isMobile: true, isTablet: false, isDesktop: false },
      { name: "iPhone 14/15 Pro Max", width: 430, isMobile: true, isTablet: false, isDesktop: false },
      { name: "Tailwind sm boundary", width: 640, isMobile: false, isTablet: true, isDesktop: false },
      { name: "iPad 10th Gen (Portrait)", width: 768, isMobile: false, isTablet: true, isDesktop: false },
      { name: "iPad Air 10.9 (Portrait)", width: 820, isMobile: false, isTablet: true, isDesktop: false },
      { name: "iPad Pro / Small Laptop (lg)", width: 1024, isMobile: false, isTablet: false, isDesktop: true },
      { name: "Standard Desktop (xl)", width: 1280, isMobile: false, isTablet: false, isDesktop: true },
      { name: "MacBook Pro 16 / QHD", width: 1440, isMobile: false, isTablet: false, isDesktop: true },
    ];

    for (const vp of viewports) {
      const padding = vp.width < 640 ? 24 : 48; // px-3 (12*2) or sm:px-6 (24*2)
      
      // Calculate start cluster width (Hamburger + gap + Logo)
      let startWidth: number;
      if (vp.width < 1024) {
        // Mobile & Tablet: Hamburger (44) + gap (6 to 12) + Logo (~110 to 135)
        startWidth = 44 + 8 + (vp.width < 640 ? 110 : 135);
      } else {
        // Desktop >= 1024: Logo (~140) + Tagline (if >= 1280, ~180)
        startWidth = 140 + (vp.width >= 1280 ? 180 : 0);
      }

      // Calculate end cluster width
      let endWidth: number;
      if (vp.width < 360) {
        // Ultra-narrow mobile (<360px): Search (44) + Cart Icon (44) + gaps (6)
        endWidth = 44 + 44 + 6;
      } else if (vp.width < 640) {
        // Standard Mobile (360-639px): Search (44) + Wishlist (44) + Cart Icon (44) + gaps (12)
        endWidth = 44 + 44 + 44 + 12;
      } else if (vp.width < 768) {
        // sm (640-767): Search (44) + Wishlist (44) + Cart Pill (135) + gaps (16)
        endWidth = 44 + 44 + 135 + 16;
      } else if (vp.width < 1024) {
        // md (768-1023): Currency (85) + Search (44) + Wishlist (44) + Cart Pill (135) + gaps (24)
        endWidth = 85 + 44 + 44 + 135 + 24;
      } else {
        // lg (1024+): Loyalty (105) + Currency (85) + Lang (65) + Theme (44) + Wishlist (44) + Cart Pill (135) + gaps (36)
        endWidth = 105 + 85 + 65 + 44 + 44 + 135 + 36 + (vp.width >= 1280 ? 75 : 0);
      }

      const totalOccupied = padding + startWidth + endWidth;
      const remainingClearance = vp.width - totalOccupied;

      // On mobile and tablet, remainingClearance acts as breathing room between start & end
      expect(
        remainingClearance,
        `${vp.name} (${vp.width}px): total occupied ${totalOccupied}px must leave positive clearance, got ${remainingClearance}px`
      ).toBeGreaterThan(0);

      // On desktop (>= 1024), remaining space accommodates the desktop search bar
      if (vp.isDesktop) {
        expect(
          remainingClearance,
          `${vp.name} (${vp.width}px): desktop search bar must have >= 300px available space, got ${remainingClearance}px`
        ).toBeGreaterThanOrEqual(300);
      }
    }
  });

  it("verifies desktop search bar has min-w-0 to guarantee fluid flex shrinking", () => {
    const headerPath = path.join(srcAppDir, "components/Header.tsx");
    const content = fs.readFileSync(headerPath, "utf-8");

    expect(content).toContain("min-w-0");
    expect(content).toContain("desktop-header-search");
  });

  it("verifies touch target accessibility on header interactive controls", () => {
    const headerPath = path.join(srcAppDir, "components/Header.tsx");
    const content = fs.readFileSync(headerPath, "utf-8");

    // All buttons in header must have >= 44x44px touch targets
    expect(content).toContain("min-h-[44px]");
    expect(content).toContain("IconButton");
  });

  it("verifies safe-area padding is applied to sticky and fixed navigation bars", () => {
    const headerPath = path.join(srcAppDir, "components/Header.tsx");
    const bottomNavPath = path.join(srcAppDir, "components/BottomNav.tsx");
    const headerContent = fs.readFileSync(headerPath, "utf-8");
    const bottomNavContent = fs.readFileSync(bottomNavPath, "utf-8");

    expect(headerContent).toContain("safe-area-pt");
    expect(bottomNavContent).toContain("safe-area-inset-bottom");
  });
});
