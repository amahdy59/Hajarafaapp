import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { categories, categoryMapping } from "./data/categories";
import { products } from "./data/products";
import { EGYPTIAN_GOVERNORATES } from "./data/governorates";

describe("Code Quality & Automated Code Review Suite", () => {
  const rootDir = path.resolve(__dirname, "../..");
  const srcDir = path.resolve(__dirname, "..");

  function getAllCodeFiles(dir: string): string[] {
    let results: string[] = [];
    const list = fs.readdirSync(dir);
    for (const file of list) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat && stat.isDirectory()) {
        results = results.concat(getAllCodeFiles(fullPath));
      } else if (
        (file.endsWith(".tsx") || file.endsWith(".ts")) &&
        !file.endsWith(".test.ts") &&
        !file.endsWith(".test.tsx")
      ) {
        results.push(fullPath);
      }
    }
    return results;
  }

  const allCodeFiles = getAllCodeFiles(srcDir);

  it("enforces strict TypeScript typing: zero ': any' in application codebase", () => {
    const anyRegex = /:\s*any\b/g;
    const violations: { file: string; line: number }[] = [];

    for (const file of allCodeFiles) {
      const lines = fs.readFileSync(file, "utf-8").split("\n");
      lines.forEach((line: string, idx: number) => {
        if (anyRegex.test(line) && !line.includes("eslint-disable") && !line.includes("anyRegex")) {
          violations.push({ file: path.relative(rootDir, file), line: idx + 1 });
        }
      });
    }

    expect(violations).toEqual([]);
  });

  it("enforces type safety: zero 'as any' type casts across codebase", () => {
    const asAnyRegex = /\bas\s+any\b/g;
    const violations: { file: string; line: number }[] = [];

    for (const file of allCodeFiles) {
      const lines = fs.readFileSync(file, "utf-8").split("\n");
      lines.forEach((line: string, idx: number) => {
        if (asAnyRegex.test(line) && !line.includes("asAnyRegex")) {
          violations.push({ file: path.relative(rootDir, file), line: idx + 1 });
        }
      });
    }

    expect(violations).toEqual([]);
  });

  it("enforces unified routing: zero imports from 'react-router-dom' (must use 'react-router')", () => {
    const legacyRouterRegex = /from\s+["']react-router-dom["']/g;
    const violations: string[] = [];

    for (const file of allCodeFiles) {
      const content = fs.readFileSync(file, "utf-8");
      if (legacyRouterRegex.test(content)) {
        violations.push(path.relative(rootDir, file));
      }
    }

    expect(violations).toEqual([]);
  });

  it("enforces unified animation library: zero imports from 'framer-motion' (must use 'motion/react')", () => {
    const legacyMotionRegex = /from\s+["']framer-motion["']/g;
    const violations: string[] = [];

    for (const file of allCodeFiles) {
      const content = fs.readFileSync(file, "utf-8");
      if (legacyMotionRegex.test(content)) {
        violations.push(path.relative(rootDir, file));
      }
    }

    expect(violations).toEqual([]);
  });

  it("audits catalog product data integrity: unique IDs, valid categories, positive pricing", () => {
    const seenIds = new Set<string>();
    const validCategorySlugs = new Set([
      ...categories.map((c) => c.slug),
      ...Object.keys(categoryMapping),
    ]);

    expect(products.length).toBeGreaterThanOrEqual(25);

    for (const p of products) {
      expect(seenIds.has(p.id)).toBe(false);
      seenIds.add(p.id);

      expect(p.name.trim().length).toBeGreaterThan(0);
      expect(p.nameAr).toBeDefined();
      expect(p.nameAr!.trim().length).toBeGreaterThan(0);
      expect(p.price).toBeGreaterThan(0);
      expect(p.image).toBeTruthy();
      expect(validCategorySlugs.has(p.categorySlug)).toBe(true);
      expect(Array.isArray(p.benefits)).toBe(true);
      expect(p.benefits.length).toBeGreaterThan(0);

      if (p.discount) {
        expect(p.originalPrice).toBeDefined();
        expect(p.originalPrice!).toBeGreaterThan(p.price);
      }
    }
  });

  it("audits category taxonomy data integrity: unique slugs, hex backgrounds, bilingual names", () => {
    const seenSlugs = new Set<string>();

    expect(categories.length).toBe(7);

    for (const cat of categories) {
      expect(seenSlugs.has(cat.slug)).toBe(false);
      seenSlugs.add(cat.slug);

      expect(cat.name.trim().length).toBeGreaterThan(0);
      expect(cat.nameAr).toBeDefined();
      expect(cat.nameAr!.trim().length).toBeGreaterThan(0);
      expect(cat.icon).toBeTruthy();
      expect(cat.bgColor).toMatch(/^#[0-9A-Fa-f]{6}$/);
    }
  });

  it("audits Egyptian governorates taxonomy: all 27 governorates mapped with valid zones", () => {
    expect(EGYPTIAN_GOVERNORATES.length).toBe(27);
    const seenGovIds = new Set<string>();

    for (const gov of EGYPTIAN_GOVERNORATES) {
      expect(seenGovIds.has(gov.id)).toBe(false);
      seenGovIds.add(gov.id);

      expect(gov.nameEn).toBeTruthy();
      expect(gov.nameAr).toBeTruthy();
      expect([1, 2, 3]).toContain(gov.zone);
      expect(gov.deliveryDaysEn).toBeTruthy();
      expect(gov.deliveryDaysAr).toBeTruthy();
    }
  });
});
