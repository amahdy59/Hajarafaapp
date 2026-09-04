import { describe, expect, it } from "vitest";
import enDict from "../i18n/en.json";
import arDict from "../i18n/ar.json";
import { toArabicIndic } from "./context/AppSettingsContext";
import { categories } from "./data/categories";
import { products } from "./data/products";

// WCAG 2.2 AAA Relative Luminance & Contrast Ratio calculation
function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(hex1: string, hex2: string): number {
  const [r1, g1, b1] = hexToRgb(hex1);
  const [r2, g2, b2] = hexToRgb(hex2);
  const l1 = getLuminance(r1, g1, b1);
  const l2 = getLuminance(r2, g2, b2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

describe("WCAG 2.2 AAA & Accessibility Standards", () => {
  it("converts Western numerals to Arabic-Indic correctly", () => {
    expect(toArabicIndic("12345")).toBe("١٢٣٤٥");
    expect(toArabicIndic("49.00")).toBe("٤٩.٠٠");
    expect(toArabicIndic("LE 500")).toBe("LE ٥٠٠");
  });

  it("ensures dark mode background and light text achieve WCAG AAA contrast (>= 7:1)", () => {
    const darkBg = "#0D1511";
    const whiteText = "#FFFFFF";
    const lightText = "#F4EFE6";

    const ratio1 = getContrastRatio(darkBg, whiteText);
    const ratio2 = getContrastRatio(darkBg, lightText);

    expect(ratio1).toBeGreaterThanOrEqual(7.0);
    expect(ratio2).toBeGreaterThanOrEqual(7.0);
  });

  it("ensures brand dark moss on cream achieves high contrast (>= 4.5:1)", () => {
    const mossDark = "#1B3B28";
    const creamBg = "#FFFDF9";

    const ratio = getContrastRatio(mossDark, creamBg);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it("guarantees full translation parity between English and Arabic dictionaries", () => {
    const enKeys = Object.keys(enDict).sort();
    const arKeys = Object.keys(arDict).sort();

    const missingInAr = enKeys.filter(k => !(k in arDict));
    const missingInEn = arKeys.filter(k => !(k in enDict));

    expect(missingInAr).toEqual([]);
    expect(missingInEn).toEqual([]);
    expect(enKeys.length).toBe(arKeys.length);
  });

  it("verifies all categories have accessible names, slugs, and icons", () => {
    for (const cat of categories) {
      expect(cat.name).toBeTruthy();
      expect(cat.nameAr).toBeTruthy();
      expect(cat.slug).toBeTruthy();
      expect(cat.icon).toBeTruthy();
      expect(cat.bgColor).toMatch(/^#[0-9A-Fa-f]{6}$/);
    }
  });

  it("verifies all catalog products have required accessibility attributes", () => {
    for (const p of products) {
      expect(p.id).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.nameAr).toBeTruthy();
      expect(p.price).toBeGreaterThan(0);
      expect(p.image).toBeTruthy();
      expect(p.categorySlug).toBeTruthy();
      expect(Array.isArray(p.benefits)).toBe(true);
      expect(p.benefits.length).toBeGreaterThan(0);
    }
  });
});
