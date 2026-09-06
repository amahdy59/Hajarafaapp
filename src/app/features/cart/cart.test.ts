import { describe, expect, it } from "vitest";
import {
  addProductToCart,
  calculateCartTotals,
  removeProductFromCart,
  sanitizeStoredCart,
  updateCartItemQuantity,
  CartItem,
} from "../../context/CartContext";
import { products } from "../../data/products";

const mockProductA = products[0]!;
const mockProductB = products[1]!;

describe("Cart Business Logic & State Invariants", () => {
  it("initializes empty totals when cart is empty", () => {
    const totals = calculateCartTotals([]);
    expect(totals.totalItems).toBe(0);
    expect(totals.totalPrice).toBe(0);
  });

  it("adds a new product to an empty cart with default quantity of 1", () => {
    const items: CartItem[] = [];
    const result = addProductToCart(items, mockProductA);
    expect(result).toHaveLength(1);
    expect(result[0]!.product.id).toBe(mockProductA.id);
    expect(result[0]!.quantity).toBe(1);
  });

  it("adds a new product with custom quantity", () => {
    const items: CartItem[] = [];
    const result = addProductToCart(items, mockProductA, 4);
    expect(result).toHaveLength(1);
    expect(result[0]!.quantity).toBe(4);
  });

  it("ignores non-positive quantity additions", () => {
    const items: CartItem[] = [{ product: mockProductA, quantity: 2 }];
    const resultZero = addProductToCart(items, mockProductB, 0);
    const resultNegative = addProductToCart(items, mockProductB, -3);
    expect(resultZero).toEqual(items);
    expect(resultNegative).toEqual(items);
  });

  it("increments quantity when existing product is added again", () => {
    const initial: CartItem[] = [{ product: mockProductA, quantity: 2 }];
    const result = addProductToCart(initial, mockProductA, 3);
    expect(result).toHaveLength(1);
    expect(result[0]!.quantity).toBe(5);
  });

  it("supports multiple distinct products in cart", () => {
    let items: CartItem[] = [];
    items = addProductToCart(items, mockProductA, 2);
    items = addProductToCart(items, mockProductB, 3);
    expect(items).toHaveLength(2);

    const totals = calculateCartTotals(items);
    expect(totals.totalItems).toBe(5);
    const expectedPrice = Math.round((mockProductA.price * 2 + mockProductB.price * 3) * 100) / 100;
    expect(totals.totalPrice).toBe(expectedPrice);
  });

  it("updates quantity for a specific product", () => {
    const items: CartItem[] = [
      { product: mockProductA, quantity: 2 },
      { product: mockProductB, quantity: 1 },
    ];
    const updated = updateCartItemQuantity(items, mockProductA.id, 5);
    expect(updated.find(i => i.product.id === mockProductA.id)?.quantity).toBe(5);
    expect(updated.find(i => i.product.id === mockProductB.id)?.quantity).toBe(1);
  });

  it("removes product when updated quantity is zero or negative", () => {
    const items: CartItem[] = [
      { product: mockProductA, quantity: 2 },
      { product: mockProductB, quantity: 1 },
    ];
    const zeroed = updateCartItemQuantity(items, mockProductA.id, 0);
    expect(zeroed).toHaveLength(1);
    expect(zeroed[0]!.product.id).toBe(mockProductB.id);

    const negatived = updateCartItemQuantity(items, mockProductB.id, -1);
    expect(negatived).toHaveLength(1);
    expect(negatived[0]!.product.id).toBe(mockProductA.id);
  });

  it("removes product by ID cleanly", () => {
    const items: CartItem[] = [
      { product: mockProductA, quantity: 3 },
      { product: mockProductB, quantity: 2 },
    ];
    const removed = removeProductFromCart(items, mockProductA.id);
    expect(removed).toHaveLength(1);
    expect(removed[0]!.product.id).toBe(mockProductB.id);
  });

  it("maintains floating point currency precision without decimal rounding drift", () => {
    const productFractional = { ...mockProductA, price: 19.99 };
    const items: CartItem[] = [{ product: productFractional, quantity: 3 }];
    const totals = calculateCartTotals(items);
    expect(totals.totalPrice).toBe(59.97);
  });

  it("sanitizes corrupted or invalid localStorage payloads safely", () => {
    expect(sanitizeStoredCart(null)).toEqual([]);
    expect(sanitizeStoredCart(undefined)).toEqual([]);
    expect(sanitizeStoredCart("random string")).toEqual([]);
    expect(sanitizeStoredCart(12345)).toEqual([]);
    expect(sanitizeStoredCart({})).toEqual([]);

    const mixedPayload = [
      null,
      undefined,
      "corrupted string",
      { quantity: 2 },
      { product: null, quantity: 2 },
      { product: { id: "p1" }, quantity: 1 },
      { product: { id: "p1", price: "invalid" }, quantity: 1 },
      { product: { id: "p1", price: 50 }, quantity: 0 },
      { product: { id: "p1", price: 50 }, quantity: -5 },
      { product: mockProductA, quantity: 3 },
    ];

    const sanitized = sanitizeStoredCart(mixedPayload);
    expect(sanitized).toHaveLength(1);
    expect(sanitized[0]!.product.id).toBe(mockProductA.id);
    expect(sanitized[0]!.quantity).toBe(3);
  });
});
