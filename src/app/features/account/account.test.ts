import { describe, expect, it } from "vitest";
import { initialOrders, Order } from "./types";

export function filterOrders(
  orders: Order[],
  statusFilter: "all" | Order["status"],
  searchQuery: string
): Order[] {
  const query = searchQuery.trim().toLowerCase();
  return orders.filter(order => {
    if (statusFilter !== "all" && order.status !== statusFilter) {
      return false;
    }
    if (!query) return true;

    const matchesId = order.id.toLowerCase().includes(query);
    const matchesAddress =
      order.deliveryAddress.toLowerCase().includes(query) ||
      order.deliveryAddressAr.toLowerCase().includes(query);
    const matchesProduct = order.products.some(
      p =>
        p.name.toLowerCase().includes(query) ||
        (p.nameAr && p.nameAr.toLowerCase().includes(query))
    );

    return matchesId || matchesAddress || matchesProduct;
  });
}

describe("Account & Order History Suite", () => {
  it("verifies initial mock orders data integrity", () => {
    expect(initialOrders.length).toBeGreaterThanOrEqual(2);
    const seenIds = new Set<string>();

    for (const order of initialOrders) {
      expect(order.id).toMatch(/^HJR-\d{6}$/);
      expect(seenIds.has(order.id)).toBe(false);
      seenIds.add(order.id);

      expect(["processing", "shipped", "delivered", "cancelled"]).toContain(order.status);
      expect(order.total).toBeGreaterThan(0);
      expect(order.items).toBeGreaterThan(0);
      expect(order.products.length).toBeGreaterThan(0);
      expect(order.deliveryAddress).toBeTruthy();
      expect(order.deliveryAddressAr).toBeTruthy();

      // Check receipt balance
      const receiptTotal = order.receipt.subtotal + order.receipt.shipping - order.receipt.discount;
      expect(Math.abs(receiptTotal - order.total)).toBeLessThan(0.01);
    }
  });

  it("filters orders by status correctly", () => {
    const processing = filterOrders(initialOrders, "processing", "");
    expect(processing.every(o => o.status === "processing")).toBe(true);

    const delivered = filterOrders(initialOrders, "delivered", "");
    expect(delivered.every(o => o.status === "delivered")).toBe(true);

    const all = filterOrders(initialOrders, "all", "");
    expect(all.length).toBe(initialOrders.length);
  });

  it("searches orders by order ID", () => {
    const target = initialOrders[0]!;
    const results = filterOrders(initialOrders, "all", target.id.toLowerCase());
    expect(results).toHaveLength(1);
    expect(results[0]!.id).toBe(target.id);
  });

  it("searches orders by included product name in English and Arabic", () => {
    const target = initialOrders[0]!;
    const productName = target.products[0]!.name;
    const resultsEn = filterOrders(initialOrders, "all", productName);
    expect(resultsEn.some(o => o.id === target.id)).toBe(true);

    if (target.products[0]!.nameAr) {
      const resultsAr = filterOrders(initialOrders, "all", target.products[0]!.nameAr);
      expect(resultsAr.some(o => o.id === target.id)).toBe(true);
    }
  });

  it("returns empty array when search query matches nothing", () => {
    const results = filterOrders(initialOrders, "all", "nonexistent-query-xyz");
    expect(results).toEqual([]);
  });
});
