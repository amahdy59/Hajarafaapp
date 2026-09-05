import { describe, expect, it } from "vitest";
import { CURRENCIES, toArabicIndic } from "../../context/AppSettingsContext";

describe("GCC Multi-Currency Engine", () => {
  it("defines base currency and GCC regional currencies", () => {
    expect(CURRENCIES.EGP.rate).toBe(1.0);
    expect(CURRENCIES.SAR.rate).toBe(0.076);
    expect(CURRENCIES.AED.rate).toBe(0.074);
    expect(CURRENCIES.KWD.rate).toBe(0.0062);
  });

  it("accurately converts Egyptian pounds to GCC currencies", () => {
    const baseEgp = 1000;
    expect(baseEgp * CURRENCIES.SAR.rate).toBe(76);
    expect(baseEgp * CURRENCIES.AED.rate).toBe(74);
    expect(baseEgp * CURRENCIES.KWD.rate).toBe(6.2);
  });

  it("handles Arabic Indic numeral conversion", () => {
    expect(toArabicIndic(12345)).toBe("١٢٣٤٥");
    expect(toArabicIndic("0123456789")).toBe("٠١٢٣٤٥٦٧٨٩");
  });

  it("preserves currency symbols in English and Arabic", () => {
    expect(CURRENCIES.EGP.symbolAr).toBe("ج.م");
    expect(CURRENCIES.SAR.symbolAr).toBe("ر.س");
    expect(CURRENCIES.AED.symbolAr).toBe("د.إ");
    expect(CURRENCIES.KWD.symbolAr).toBe("د.ك");

    expect(CURRENCIES.EGP.symbolEn).toBe("EGP");
    expect(CURRENCIES.SAR.symbolEn).toBe("SAR");
  });
});
