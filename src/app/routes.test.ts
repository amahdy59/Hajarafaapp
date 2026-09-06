import { describe, expect, it } from "vitest";
import { routeDefinitions } from "./routes";

describe("Router & Navigation Invariants Suite", () => {
  it("verifies router contains root route with children", () => {
    const rootRoute = routeDefinitions[0];
    expect(rootRoute).toBeDefined();
    expect(rootRoute?.path).toBe("/");
    expect(rootRoute?.children).toBeDefined();
    expect(Array.isArray(rootRoute?.children)).toBe(true);
  });

  it("verifies all critical storefront paths are registered without duplicates", () => {
    const children = routeDefinitions[0]?.children || [];
    const paths = children.map(r => (r.index ? "" : r.path)).filter(p => p !== undefined) as string[];

    const expectedPaths = [
      "", // index / Home
      "products",
      "products/:id",
      "category/:slug",
      "search",
      "cart",
      "checkout",
      "account",
      "wishlist",
      "about",
      "branches",
      "contact",
      "help",
      "*", // 404
    ];

    for (const expected of expectedPaths) {
      expect(paths).toContain(expected);
    }

    // Check for duplicates
    const uniquePaths = new Set(paths);
    expect(uniquePaths.size).toBe(paths.length);
  });

  it("verifies wildcard 404 route exists and is positioned at the end", () => {
    const children = routeDefinitions[0]?.children || [];
    const lastRoute = children[children.length - 1];
    expect(lastRoute?.path).toBe("*");
  });
});
