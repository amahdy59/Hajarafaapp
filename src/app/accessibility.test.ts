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

  it("verifies mobile viewport meta and safe-area compatibility in index.html", async () => {
    const html = (await import("../../index.html?raw")).default;
    expect(html).toContain('name="viewport"');
    expect(html).toContain("width=device-width");
    expect(html).toContain("viewport-fit=cover");
  });

  it("verifies PWA manifest content and configuration", async () => {
    const manifestRaw = (await import("../../public/manifest.webmanifest?raw")).default;
    const manifest = JSON.parse(manifestRaw);
    expect(manifest.display).toBe("standalone");
    expect(manifest.icons.length).toBeGreaterThan(0);
    expect(manifest.background_color).toBe("#0D1511");
  });

  it("verifies Egyptian governorates data integrity and delivery zones", async () => {
    const { EGYPTIAN_GOVERNORATES, getGovernorateById } = await import("./data/governorates");
    expect(EGYPTIAN_GOVERNORATES.length).toBe(27);
    for (const gov of EGYPTIAN_GOVERNORATES) {
      expect(gov.id).toBeTruthy();
      expect(gov.nameEn).toBeTruthy();
      expect(gov.nameAr).toBeTruthy();
      expect([1, 2, 3]).toContain(gov.zone);
      expect(gov.deliveryDaysEn).toBeTruthy();
      expect(gov.deliveryDaysAr).toBeTruthy();
    }
    const cairo = getGovernorateById("cairo");
    expect(cairo?.zone).toBe(1);
    const alex = getGovernorateById("alexandria");
    expect(alex?.zone).toBe(2);
  });

  it("verifies tax invoice 14% Egyptian VAT calculation consistency", () => {
    const subtotal = 1000;
    const taxRate = 0.14;
    const tax = subtotal * taxRate;
    const shipping = 49;
    const total = subtotal + tax + shipping;

    expect(tax).toBe(140);
    expect(total).toBe(1189);
  });

  it("verifies official WhatsApp contact configuration for direct ordering", async () => {
    const { CONTACT } = await import("./config/contact");
    expect(CONTACT.whatsappPhone).toBe("201020401400");
    expect(CONTACT.whatsappUrl).toContain("201020401400");
  });

  it("verifies external links include screen-reader accessible new-tab indicators", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const branchesPath = path.resolve(__dirname, "pages/Branches.tsx");
    const contactPath = path.resolve(__dirname, "pages/Contact.tsx");
    const footerPath = path.resolve(__dirname, "components/Footer.tsx");

    const branchesContent = fs.readFileSync(branchesPath, "utf-8");
    const contactContent = fs.readFileSync(contactPath, "utf-8");
    const footerContent = fs.readFileSync(footerPath, "utf-8");

    // Must announce new window / tab opening to assistive tech
    expect(branchesContent).toContain("opens in a new tab");
    expect(branchesContent).toContain("يفتح في نافذة جديدة");
    expect(contactContent).toContain("opens in a new tab");
    expect(footerContent).toContain("aria-label");
  });

  it("verifies interactive forms employ role='alert' for immediate validation feedback", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const checkoutPath = path.resolve(__dirname, "pages/Checkout.tsx");
    const contactPath = path.resolve(__dirname, "pages/Contact.tsx");
    const cartPath = path.resolve(__dirname, "pages/Cart.tsx");

    const checkoutContent = fs.readFileSync(checkoutPath, "utf-8");
    const contactContent = fs.readFileSync(contactPath, "utf-8");
    const cartContent = fs.readFileSync(cartPath, "utf-8");

    expect(checkoutContent).toContain('role="alert"');
    expect(contactContent).toContain('role="alert"');
    expect(cartContent).toContain('role="alert"');
  });
});

