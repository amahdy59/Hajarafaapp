import { describe, expect, it } from "vitest";
import { getQuizRecommendation } from "../../components/ApothecaryQuizModal";
import { products } from "../../data/products";

describe("Apothecary Wellness Quiz Engine", () => {
  it("recommends digestive botanicals when goal is digestion", () => {
    const rec = getQuizRecommendation({
      goal: "digestion",
      format: "herbs",
      lifestyle: "balanced",
    });
    expect(rec.productIds).toContain("p11"); // Anise
    expect(rec.productIds).toContain("p12"); // Apple cider vinegar
    expect(rec.titleAr).toContain("الجهاز الهضمي");
  });

  it("recommends immunity and restful sleep botanicals", () => {
    const rec = getQuizRecommendation({
      goal: "immunity_sleep",
      format: "honey_oils",
      lifestyle: "caffeine_free",
    });
    expect(rec.productIds).toContain("p17b"); // Black seed honey
    expect(rec.productIds).toContain("p11"); // Anise
    expect(rec.productIds).toContain("p17"); // Sidr honey
  });

  it("recommends energy and stamina superfoods", () => {
    const rec = getQuizRecommendation({
      goal: "energy",
      format: "nutrition",
      lifestyle: "zero_sugar",
    });
    expect(rec.productIds).toContain("p3"); // Agwa dates
    expect(rec.productIds).toContain("p17c"); // Mountain honey with nuts
    expect(rec.productIds).toContain("p8"); // Raw almonds
  });

  it("recommends skin and hair remedies for beauty", () => {
    const rec = getQuizRecommendation({
      goal: "beauty",
      format: "honey_oils",
      lifestyle: "balanced",
    });
    expect(rec.productIds).toContain("p4"); // Almond pomegranate cream
    expect(rec.productIds).toContain("p7"); // Amber oil
  });

  it("ensures all recommended IDs exist in the real products catalog", () => {
    const goals = ["digestion", "immunity_sleep", "energy", "beauty"] as const;
    const allCatalogIds = new Set(products.map(p => p.id));

    goals.forEach(goal => {
      const rec = getQuizRecommendation({
        goal,
        format: "herbs",
        lifestyle: "balanced",
      });
      rec.productIds.forEach(id => {
        expect(allCatalogIds.has(id)).toBe(true);
      });
    });
  });
});
