import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function getLuminance(r: number, g: number, b: number): number {
  const [rs = 0, gs = 0, bs = 0] = [r, g, b].map(c => {
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

describe("Design System & WCAG 2.2 AAA Contrast Suite", () => {
  const cssPath = path.resolve(__dirname, "../styles/tailwind.css");
  const cssContent = fs.readFileSync(cssPath, "utf-8");

  it("verifies brand-moss and brand-moss-dark tokens exist in @theme inline", () => {
    expect(cssContent).toContain("--color-brand-moss: var(--brand-moss);");
    expect(cssContent).toContain("--color-brand-moss-dark: var(--brand-moss-dark);");
  });

  it("verifies light and dark mode definition parity for brand moss tokens", () => {
    expect(cssContent).toContain("--brand-moss: #223829;");
    expect(cssContent).toContain("--brand-moss-dark: #16261C;");
    expect(cssContent).toContain("--brand-moss: #385942;");
    expect(cssContent).toContain("--brand-moss-dark: #1A2E21;");
  });

  it("audits critical UI element contrast against WCAG 2.2 AAA standard", () => {
    const colorPairs = [
      { name: "Modal Header (White on Moss Dark)", fg: "#FFFFFF", bg: "#16261C", minRatio: 7.0 },
      { name: "Modal Subtitle (Amber-200 on Moss Dark)", fg: "#FDE68A", bg: "#16261C", minRatio: 7.0 },
      { name: "CTA Button Light (White on Moss)", fg: "#FFFFFF", bg: "#223829", minRatio: 7.0 },
      { name: "CTA Button Dark (Zinc-950 on Sage Accent)", fg: "#09090B", bg: "#ADC6A0", minRatio: 7.0 },
      { name: "Gold Tier Badge (Moss Dark on Amber-400)", fg: "#16261C", bg: "#FBBF24", minRatio: 7.0 },
      { name: "Dark Surface Text (Zinc-100 on Dark Surface)", fg: "#F4F4F5", bg: "#0D1511", minRatio: 7.0 },
      { name: "Muted Text Dark (Zinc-300 on Dark Surface)", fg: "#D4D4D8", bg: "#1F2422", minRatio: 7.0 },
      { name: "Footer Text (Zinc-300 on Dark Canvas)", fg: "#D4D4D8", bg: "#0D1511", minRatio: 7.0 },
      { name: "Cream Surface Body Text (Stone-900 on Stone-100)", fg: "#1C1917", bg: "#F5F3EF", minRatio: 7.0 },
      { name: "Emerald Savings Badge (Emerald-900 on Emerald-100)", fg: "#064E3B", bg: "#D1FAE5", minRatio: 7.0 },
      { name: "In-Stock Badge (Emerald-900 on Emerald-50)", fg: "#064E3B", bg: "#ECFDF5", minRatio: 7.0 },
      { name: "Cancelled Badge (Red-800 on Red-50)", fg: "#991B1B", bg: "#FEF2F2", minRatio: 7.0 },
      { name: "Input Placeholders (Zinc-500 on White)", fg: "#71717A", bg: "#FFFFFF", minRatio: 4.5 },
    ];

    for (const pair of colorPairs) {
      const ratio = getContrastRatio(pair.fg, pair.bg);
      expect(
        ratio,
        `${pair.name} contrast ${ratio.toFixed(2)}:1 must be >= ${pair.minRatio}:1`
      ).toBeGreaterThanOrEqual(pair.minRatio);
    }
  });

  it("verifies global placeholder contrast rules in tailwind.css", () => {
    expect(cssContent).toContain("input::placeholder");
    expect(cssContent).toContain("textarea::placeholder");
    expect(cssContent).toContain("var(--muted-foreground)");
  });
});
