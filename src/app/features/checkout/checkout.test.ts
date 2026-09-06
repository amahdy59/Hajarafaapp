import { describe, expect, it } from "vitest";
import { SHIPPING_CONFIG } from "../../config/contact";
import { EGYPTIAN_GOVERNORATES, getGovernorateById } from "../../data/governorates";

// Pure functions reflecting checkout calculation rules
export function calculateShippingFee(subtotal: number, country: string): number {
  const isGCC = ["SA", "AE", "KW"].includes(country);
  if (isGCC) {
    const GCC_FREE_THRESHOLD = 1500;
    const GCC_FLAT_RATE = 250;
    return subtotal >= GCC_FREE_THRESHOLD ? 0 : GCC_FLAT_RATE;
  }
  return subtotal >= SHIPPING_CONFIG.freeThreshold ? 0 : SHIPPING_CONFIG.flatRate;
}

export function calculateOrderTotals(subtotal: number, loyaltyDiscount: number, shipping: number) {
  const appliedDiscount = Math.min(loyaltyDiscount, subtotal);
  const discountedSubtotal = Math.max(0, subtotal - appliedDiscount);
  const tax = Number((discountedSubtotal * 0.14).toFixed(2));
  const total = Number((discountedSubtotal + shipping + tax).toFixed(2));
  return { appliedDiscount, discountedSubtotal, tax, total };
}

export function validateEgyptianPhone(phone: string): boolean {
  const clean = phone.trim().replace(/\D/g, "");
  return /^01[0125]\d{8}$/.test(clean);
}

export function validateCardNumber(cardNumber: string): boolean {
  const clean = cardNumber.replace(/\s/g, "");
  return /^\d{15,16}$/.test(clean);
}

export function validateCardExpiry(expiry: string): boolean {
  if (!expiry.includes("/")) return false;
  const parts = expiry.split("/");
  if (parts.length !== 2) return false;
  const month = parseInt(parts[0]!, 10);
  const year = parseInt(parts[1]!, 10);
  return month >= 1 && month <= 12 && !isNaN(year) && parts[0]!.length === 2 && parts[1]!.length === 2;
}

export function validateCardCvv(cvv: string): boolean {
  return /^\d{3,4}$/.test(cvv.trim());
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

describe("Checkout & Shipping Engine", () => {
  describe("Shipping Calculation Rules", () => {
    it("applies domestic Egypt flat rate when order subtotal is below free shipping threshold", () => {
      expect(calculateShippingFee(100, "EG")).toBe(SHIPPING_CONFIG.flatRate);
      expect(calculateShippingFee(SHIPPING_CONFIG.freeThreshold - 1, "EG")).toBe(SHIPPING_CONFIG.flatRate);
    });

    it("awards free shipping in Egypt when subtotal meets or exceeds threshold", () => {
      expect(calculateShippingFee(SHIPPING_CONFIG.freeThreshold, "EG")).toBe(0);
      expect(calculateShippingFee(SHIPPING_CONFIG.freeThreshold + 100, "EG")).toBe(0);
    });

    it("applies GCC flat rate (250 EGP) when below GCC free shipping threshold (1500 EGP)", () => {
      expect(calculateShippingFee(500, "SA")).toBe(250);
      expect(calculateShippingFee(1000, "AE")).toBe(250);
      expect(calculateShippingFee(1499, "KW")).toBe(250);
    });

    it("awards free GCC shipping for orders >= 1500 EGP", () => {
      expect(calculateShippingFee(1500, "SA")).toBe(0);
      expect(calculateShippingFee(2000, "AE")).toBe(0);
    });
  });

  describe("Order Totals & 14% VAT Invariants", () => {
    it("calculates correct 14% VAT on discounted subtotal and grand total", () => {
      const { appliedDiscount, discountedSubtotal, tax, total } = calculateOrderTotals(200, 50, 45);
      expect(appliedDiscount).toBe(50);
      expect(discountedSubtotal).toBe(150);
      expect(tax).toBe(21); // 150 * 0.14 = 21.00
      expect(total).toBe(216); // 150 + 45 + 21 = 216.00
    });

    it("caps loyalty discount so subtotal never drops below zero", () => {
      const { appliedDiscount, discountedSubtotal, tax, total } = calculateOrderTotals(50, 200, 45);
      expect(appliedDiscount).toBe(50);
      expect(discountedSubtotal).toBe(0);
      expect(tax).toBe(0);
      expect(total).toBe(45); // shipping only
    });

    it("handles precision rounding cleanly on odd numbers", () => {
      const { tax, total } = calculateOrderTotals(133.33, 0, 45);
      expect(tax).toBe(18.67); // 133.33 * 0.14 = 18.6662 -> 18.67
      expect(total).toBe(197); // 133.33 + 45 + 18.67 = 197.00
    });
  });

  describe("Governorates Coverage & Delivery Zones", () => {
    it("contains exactly 27 Egyptian governorates", () => {
      expect(EGYPTIAN_GOVERNORATES.length).toBe(27);
    });

    it("ensures every governorate has non-empty metadata in English and Arabic", () => {
      for (const gov of EGYPTIAN_GOVERNORATES) {
        expect(gov.id).toBeTruthy();
        expect(gov.nameEn).toBeTruthy();
        expect(gov.nameAr).toBeTruthy();
        expect([1, 2, 3]).toContain(gov.zone);
        expect(gov.deliveryDaysEn).toBeTruthy();
        expect(gov.deliveryDaysAr).toBeTruthy();
      }
    });

    it("classifies Greater Cairo as Zone 1 (fast delivery)", () => {
      const cairo = getGovernorateById("cairo");
      const giza = getGovernorateById("giza");
      const qalyubia = getGovernorateById("qalyubia");

      expect(cairo?.zone).toBe(1);
      expect(giza?.zone).toBe(1);
      expect(qalyubia?.zone).toBe(1);
      expect(cairo?.deliveryDaysEn).toContain("1-2");
    });

    it("returns undefined safely for non-existent governorate IDs", () => {
      expect(getGovernorateById("invalid-id")).toBeUndefined();
    });
  });

  describe("Input Validation Form Rules", () => {
    it("validates Egyptian mobile phone numbers (010, 011, 012, 015 with 11 digits)", () => {
      expect(validateEgyptianPhone("01012345678")).toBe(true);
      expect(validateEgyptianPhone("01198765432")).toBe(true);
      expect(validateEgyptianPhone("01233445566")).toBe(true);
      expect(validateEgyptianPhone("01555667788")).toBe(true);
      expect(validateEgyptianPhone(" 010 1234 5678 ")).toBe(true);

      // Invalid formats
      expect(validateEgyptianPhone("01312345678")).toBe(false); // wrong prefix
      expect(validateEgyptianPhone("0101234567")).toBe(false);  // 10 digits
      expect(validateEgyptianPhone("010123456789")).toBe(false); // 12 digits
      expect(validateEgyptianPhone("abcdefghijk")).toBe(false);
    });

    it("validates credit card numbers (15-16 digits)", () => {
      expect(validateCardNumber("4111 2222 3333 4444")).toBe(true);
      expect(validateCardNumber("378282246310005")).toBe(true); // 15 digits Amex
      expect(validateCardNumber("1234")).toBe(false);
      expect(validateCardNumber("41112222333344445555")).toBe(false);
    });

    it("validates card expiry dates (MM/YY format, month 01-12)", () => {
      expect(validateCardExpiry("01/28")).toBe(true);
      expect(validateCardExpiry("12/30")).toBe(true);
      expect(validateCardExpiry("00/28")).toBe(false); // invalid month
      expect(validateCardExpiry("13/28")).toBe(false); // invalid month
      expect(validateCardExpiry("5/28")).toBe(false);  // single digit month
      expect(validateCardExpiry("05-28")).toBe(false); // wrong delimiter
    });

    it("validates CVV codes (3 or 4 digits)", () => {
      expect(validateCardCvv("123")).toBe(true);
      expect(validateCardCvv("1234")).toBe(true);
      expect(validateCardCvv("12")).toBe(false);
      expect(validateCardCvv("12345")).toBe(false);
      expect(validateCardCvv("abc")).toBe(false);
    });

    it("validates email addresses", () => {
      expect(validateEmail("user@hajarafa.com")).toBe(true);
      expect(validateEmail("customer.care@advansys-is.com")).toBe(true);
      expect(validateEmail("invalid-email")).toBe(false);
      expect(validateEmail("user@domain")).toBe(false);
      expect(validateEmail("@empty.com")).toBe(false);
    });
  });
});
