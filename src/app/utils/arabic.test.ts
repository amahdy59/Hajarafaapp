import { describe, expect, it } from "vitest";
import { normalizeArabic, matchesArabicOrEnglish } from "./arabic";

describe("Arabic Text Normalization", () => {
  it("normalizes different forms of Alef (أ, إ, آ, ا)", () => {
    expect(normalizeArabic("أعشاب")).toBe("اعشاب");
    expect(normalizeArabic("إكليل الجبل")).toBe("اكليل الجبل");
    expect(normalizeArabic("آس")).toBe("اس");
  });

  it("normalizes Ta Marbuta to Ha (ة -> ه)", () => {
    expect(normalizeArabic("حبة البركة")).toBe("حبه البركه");
  });

  it("normalizes Alef Maksura to Ya (ى -> ي)", () => {
    expect(normalizeArabic("شاي")).toBe("شاي");
    expect(normalizeArabic("حلوى")).toBe("حلوي");
  });

  it("strips Arabic diacritics (Harakat / Tashkeel)", () => {
    expect(normalizeArabic("عَسَلٌ نَقِيٌّ")).toBe("عسل نقي");
    expect(normalizeArabic("حَبَّةُ البَرَكَةِ")).toBe("حبه البركه");
  });

  it("matchesArabicOrEnglish finds flexible matches across Arabic forms", () => {
    // User types without dots or hamzas
    expect(matchesArabicOrEnglish("عسل سدر جبلي فاخر", "سدر")).toBe(true);
    expect(matchesArabicOrEnglish("عسل حبة البركة", "حبه البركه")).toBe(true);
    expect(matchesArabicOrEnglish("عسل حبة البركة", "حبة البركة")).toBe(true);
    expect(matchesArabicOrEnglish("أعشاب طبيعية", "اعشاب")).toBe(true);
    expect(matchesArabicOrEnglish("Sidr Honey", "sidr")).toBe(true);
    expect(matchesArabicOrEnglish("Sidr Honey", "HONEY")).toBe(true);
  });
});
