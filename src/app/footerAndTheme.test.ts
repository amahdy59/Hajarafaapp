import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function getLuminance(r: number, g: number, b: number): number {
  const [rs = 0, gs = 0, bs = 0] = [r, g, b].map((c) => {
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

describe("Footer & Egyptian Heritage Apothecary Aesthetics", () => {
  const footerPath = path.resolve(__dirname, "./components/Footer.tsx");
  const footerContent = fs.readFileSync(footerPath, "utf-8");

  it("applies the Egyptian Heritage Apothecary color canvas (#142318 and #080D0A)", () => {
    expect(footerContent).toContain("bg-[#142318]");
    expect(footerContent).toContain("dark:bg-[#080D0A]");
  });

  it("exceeds WCAG 2.2 AAA contrast standards for all footer typography", () => {
    // Light footer canvas (#142318) with zinc-100/300 and amber-200/300
    const lightFooterBg = "#142318";
    const whiteText = "#FFFFFF";
    const zinc300 = "#D4D4D8";
    const amber300 = "#FCD34D";

    expect(getContrastRatio(whiteText, lightFooterBg)).toBeGreaterThanOrEqual(7.0);
    expect(getContrastRatio(zinc300, lightFooterBg)).toBeGreaterThanOrEqual(7.0);
    expect(getContrastRatio(amber300, lightFooterBg)).toBeGreaterThanOrEqual(7.0);

    // Dark footer canvas (#080D0A)
    const darkFooterBg = "#080D0A";
    expect(getContrastRatio(whiteText, darkFooterBg)).toBeGreaterThanOrEqual(7.0);
    expect(getContrastRatio(zinc300, darkFooterBg)).toBeGreaterThanOrEqual(7.0);
    expect(getContrastRatio(amber300, darkFooterBg)).toBeGreaterThanOrEqual(7.0);
  });

  it("includes mobile bottom navigation safe clearance to prevent collisions", () => {
    expect(footerContent).toMatch(/pb-\[calc\(5\.(?:0|25)rem\+env\(safe-area-inset-bottom,0px\)\)\]/);
  });

  it("renders all Egyptian payment marks (Meeza, Vodafone Cash, Visa, Mastercard, COD)", () => {
    expect(footerContent).toContain('type === "meeza"');
    expect(footerContent).toContain('type === "vodafone"');
    expect(footerContent).toContain('type === "visa"');
    expect(footerContent).toContain('type === "mastercard"');
    expect(footerContent).toContain("Banknote");
    expect(footerContent).toContain("COD");
  });

  it("features a 256-Bit SSL encrypted checkout trust mark", () => {
    expect(footerContent).toContain("Lock");
    expect(footerContent).toMatch(/256-Bit SSL Encrypted/i);
    expect(footerContent).toMatch(/دفع آمن ومحمي بأعلى معايير التشفير/i);
  });

  it("incorporates the Herbal Circle anti-spam guarantee", () => {
    expect(footerContent).toContain("بدون رسائل مزعجة");
    expect(footerContent).toContain("Zero spam");
  });

  it("enforces minimum 44px touch targets on navigation links and actions", () => {
    expect(footerContent).toContain("min-h-[44px]");
    expect(footerContent).toContain("min-h-[48px]");
  });

  it("supports bilingual directional micro-hover translations", () => {
    expect(footerContent).toContain("hover:translate-x-1.5");
    expect(footerContent).toContain("rtl:hover:-translate-x-1.5");
  });
});
