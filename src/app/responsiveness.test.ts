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
});
