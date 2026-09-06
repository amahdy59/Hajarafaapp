import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import enDict from "../i18n/en.json";
import arDict from "../i18n/ar.json";
import { toArabicIndic } from "./context/AppSettingsContext";

describe("i18n Static Analysis & Localization Integrity Suite", () => {
  const rootDir = path.resolve(__dirname, "../..");
  const srcAppDir = path.resolve(__dirname);

  function getAllSourceFiles(dir: string): string[] {
    let results: string[] = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        results = results.concat(getAllSourceFiles(full));
      } else if (
        (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts")) &&
        !entry.name.endsWith(".test.ts") &&
        !entry.name.endsWith(".test.tsx")
      ) {
        results.push(full);
      }
    }
    return results;
  }

  it("verifies 100% symmetric key parity between English and Arabic dictionaries", () => {
    const enKeys = Object.keys(enDict).sort();
    const arKeys = Object.keys(arDict).sort();

    const missingInAr = enKeys.filter(k => !(k in arDict));
    const missingInEn = arKeys.filter(k => !(k in enDict));

    expect(missingInAr).toEqual([]);
    expect(missingInEn).toEqual([]);
    expect(enKeys.length).toBe(arKeys.length);
  });

  it("ensures zero empty strings in both translation dictionaries", () => {
    for (const value of Object.values(enDict)) {
      expect(typeof value).toBe("string");
      expect(value.trim().length).toBeGreaterThan(0);
    }
    for (const value of Object.values(arDict)) {
      expect(typeof value).toBe("string");
      expect(value.trim().length).toBeGreaterThan(0);
    }
  });

  it("scans application codebase to guarantee every referenced translation key exists", () => {
    const allFiles = getAllSourceFiles(srcAppDir);
    const validKeys = new Set(Object.keys(enDict));
    const missingKeys: { file: string; key: string }[] = [];

    // Regex matching t.<key> where key is alphanumeric/underscore
    // Example: t.heroBadge, t.products, t.addToCart
    const tKeyRegex = /\bt\.([a-zA-Z0-9_]+)\b/g;

    // Words that belong to context methods or types, not translation dictionary
    const ignoredProperties = new Set([
      "length", "map", "filter", "find", "reduce", "forEach", "some", "every", "includes",
      "toLowerCase", "toUpperCase", "trim", "slice", "split", "join", "replace",
      "toFixed", "toString",
    ]);

    for (const file of allFiles) {
      const content = fs.readFileSync(file, "utf-8");
      // Only check files that access the translation object `t`
      if (!content.includes("t.") && !content.includes("const { t }") && !content.includes("t,")) {
        continue;
      }

      let match;
      while ((match = tKeyRegex.exec(content)) !== null) {
        const key = match[1];
        if (key && !ignoredProperties.has(key)) {
          if (!validKeys.has(key)) {
            missingKeys.push({ file: path.relative(rootDir, file), key });
          }
        }
      }
    }

    expect(missingKeys).toEqual([]);
  });

  it("converts numbers, decimals, and alphanumeric strings to Arabic-Indic accurately", () => {
    expect(toArabicIndic(0)).toBe("٠");
    expect(toArabicIndic(1234567890)).toBe("١٢٣٤٥٦٧٨٩٠");
    expect(toArabicIndic("49.99")).toBe("٤٩.٩٩");
    expect(toArabicIndic("LE 250 - Save 10%")).toBe("LE ٢٥٠ - Save ١٠%");
  });
});
