import { describe, expect, it } from "vitest";
import {
  addProductToWishlist,
  removeProductFromWishlist,
  sanitizeStoredWishlist,
  toggleWishlistProduct,
} from "../../context/WishlistContext";
import { products } from "../../data/products";

const mockProductA = products[0]!;
const mockProductB = products[1]!;

describe("Wishlist State & Persistence Invariants", () => {
  it("adds a product to an empty wishlist", () => {
    const result = addProductToWishlist([], mockProductA);
    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe(mockProductA.id);
  });

  it("prevents duplicate products when added again", () => {
    const initial = [mockProductA];
    const result = addProductToWishlist(initial, mockProductA);
    expect(result).toHaveLength(1);
  });

  it("removes a product by ID", () => {
    const initial = [mockProductA, mockProductB];
    const result = removeProductFromWishlist(initial, mockProductA.id);
    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe(mockProductB.id);
  });

  it("toggles product on if not present, and off if present", () => {
    const step1 = toggleWishlistProduct([], mockProductA);
    expect(step1.wasAdded).toBe(true);
    expect(step1.next).toHaveLength(1);
    expect(step1.next[0]!.id).toBe(mockProductA.id);

    const step2 = toggleWishlistProduct(step1.next, mockProductA);
    expect(step2.wasAdded).toBe(false);
    expect(step2.next).toHaveLength(0);
  });

  it("sanitizes corrupted localStorage payloads safely", () => {
    expect(sanitizeStoredWishlist(null)).toEqual([]);
    expect(sanitizeStoredWishlist(undefined)).toEqual([]);
    expect(sanitizeStoredWishlist("corrupt")).toEqual([]);
    expect(sanitizeStoredWishlist(123)).toEqual([]);
    expect(sanitizeStoredWishlist({})).toEqual([]);

    const corruptList = [
      null,
      undefined,
      "text",
      { title: "No ID" },
      { id: "p1" }, // missing price
      { id: "p1", price: "string-price" },
      mockProductA, // valid
    ];

    const sanitized = sanitizeStoredWishlist(corruptList);
    expect(sanitized).toHaveLength(1);
    expect(sanitized[0]!.id).toBe(mockProductA.id);
  });
});
