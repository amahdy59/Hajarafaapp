import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { filterAndSortProducts, getCatalogPriceLimit } from "./catalogUtils";
import { products } from "../../data/products";
import { categories, categoryMapping } from "../../data/categories";

describe("Catalog Multi-Facet Search & Data Integrity Suite", () => {
  const maxPrice = getCatalogPriceLimit(products);

  it("searches products by English name case-insensitively", () => {
    const results = filterAndSortProducts(products, {
      maxPrice,
      minRating: 0,
      priceRange: [0, maxPrice],
      searchQuery: "HONEY",
      selectedCategories: [],
      showCategoryFilter: false,
      showOrganic: false,
      sort: "featured",
    });

    expect(results.length).toBeGreaterThan(0);
    expect(results.every(p => p.name.toLowerCase().includes("honey") || p.description.toLowerCase().includes("honey"))).toBe(true);
  });

  it("searches products by Arabic name", () => {
    const results = filterAndSortProducts(products, {
      maxPrice,
      minRating: 0,
      priceRange: [0, maxPrice],
      searchQuery: "عسل",
      selectedCategories: [],
      showCategoryFilter: false,
      showOrganic: false,
      sort: "featured",
    });

    expect(results.length).toBeGreaterThan(0);
    expect(results.every(p => p.nameAr?.includes("عسل") || p.category.includes("عسل"))).toBe(true);
  });

  it("filters strictly by organic flag", () => {
    const results = filterAndSortProducts(products, {
      maxPrice,
      minRating: 0,
      priceRange: [0, maxPrice],
      searchQuery: "",
      selectedCategories: [],
      showCategoryFilter: false,
      showOrganic: true,
      sort: "featured",
    });

    expect(results.length).toBeGreaterThan(0);
    expect(results.every(p => p.isOrganic === true)).toBe(true);
  });

  it("filters strictly by minimum star rating", () => {
    const minRating = 4.8;
    const results = filterAndSortProducts(products, {
      maxPrice,
      minRating,
      priceRange: [0, maxPrice],
      searchQuery: "",
      selectedCategories: [],
      showCategoryFilter: false,
      showOrganic: false,
      sort: "featured",
    });

    expect(results.length).toBeGreaterThan(0);
    expect(results.every(p => p.rating >= minRating)).toBe(true);
  });

  it("filters strictly within price range boundaries", () => {
    const priceRange: [number, number] = [30, 80];
    const results = filterAndSortProducts(products, {
      maxPrice,
      minRating: 0,
      priceRange,
      searchQuery: "",
      selectedCategories: [],
      showCategoryFilter: false,
      showOrganic: false,
      sort: "featured",
    });

    expect(results.length).toBeGreaterThan(0);
    expect(results.every(p => p.price >= priceRange[0] && p.price <= priceRange[1])).toBe(true);
  });

  it("sorts strictly in ascending price order (price-asc)", () => {
    const results = filterAndSortProducts(products, {
      maxPrice,
      minRating: 0,
      priceRange: [0, maxPrice],
      searchQuery: "",
      selectedCategories: [],
      showCategoryFilter: false,
      showOrganic: false,
      sort: "price-asc",
    });

    for (let i = 0; i < results.length - 1; i++) {
      expect(results[i]!.price).toBeLessThanOrEqual(results[i + 1]!.price);
    }
  });

  it("sorts strictly in descending price order (price-desc)", () => {
    const results = filterAndSortProducts(products, {
      maxPrice,
      minRating: 0,
      priceRange: [0, maxPrice],
      searchQuery: "",
      selectedCategories: [],
      showCategoryFilter: false,
      showOrganic: false,
      sort: "price-desc",
    });

    for (let i = 0; i < results.length - 1; i++) {
      expect(results[i]!.price).toBeGreaterThanOrEqual(results[i + 1]!.price);
    }
  });

  it("sorts strictly by customer rating (rating)", () => {
    const results = filterAndSortProducts(products, {
      maxPrice,
      minRating: 0,
      priceRange: [0, maxPrice],
      searchQuery: "",
      selectedCategories: [],
      showCategoryFilter: false,
      showOrganic: false,
      sort: "rating",
    });

    for (let i = 0; i < results.length - 1; i++) {
      expect(results[i]!.rating).toBeGreaterThanOrEqual(results[i + 1]!.rating);
    }
  });

  it("ensures every catalog product image points to a real asset on disk", () => {
    const assetsDir = path.resolve(__dirname, "../../../assets");
    for (const p of products) {
      expect(p.image).toBeTruthy();
      // p.image can be imported webp module or url
      if (typeof p.image === "string" && p.image.endsWith(".webp")) {
        const basename = path.basename(p.image);
        const exists = fs.existsSync(path.join(assetsDir, basename));
        expect(exists).toBe(true);
      }
    }
  });

  it("ensures every category contains at least one product", () => {
    const allProductCategories = new Set(
      products.map(p => categoryMapping[p.categorySlug] || p.categorySlug)
    );
    for (const cat of categories) {
      expect(allProductCategories.has(cat.slug)).toBe(true);
    }
  });
});
