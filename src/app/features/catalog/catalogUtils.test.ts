import { describe, expect, it } from "vitest";
import { filterAndSortProducts, getActiveCatalogFilterCount, getCatalogPriceLimit } from "./catalogUtils";
import { products } from "../../data/products";

describe("catalogUtils", () => {
  it("rounds the price limit up to the next 50", () => {
    expect(getCatalogPriceLimit(products)).toBe(450);
  });

  it("filters and sorts products by category, price, and organic flag", () => {
    const results = filterAndSortProducts(products, {
      maxPrice: 450,
      minRating: 0,
      priceRange: [0, 150],
      searchQuery: "",
      selectedCategories: ["coffee-drinks"],
      showCategoryFilter: true,
      showOrganic: false,
      sort: "price-desc",
    });

    expect(results.map((product) => product.id)).toEqual(["p14", "p13", "p11"]);
  });

  it("counts active filters consistently", () => {
    expect(
      getActiveCatalogFilterCount({
        maxPrice: 450,
        minRating: 4,
        priceRange: [0, 200],
        searchQuery: "honey",
        selectedCategories: ["honey", "nuts"],
        showCategoryFilter: true,
        showOrganic: true,
        sort: "rating",
      })
    ).toBe(7);
  });
});
