import { describe, expect, it } from "vitest";
import {
  POINTS_VALUE_IN_EGP,
  EGP_PER_EARNED_POINT,
  LOYALTY_TIERS,
} from "../../context/LoyaltyContext";

describe("Haj Arafa Loyalty Club Engine", () => {
  it("converts points to EGP discount at 100 pts = 25 EGP", () => {
    expect(100 * POINTS_VALUE_IN_EGP).toBe(25);
    expect(150 * POINTS_VALUE_IN_EGP).toBe(37.5);
    expect(400 * POINTS_VALUE_IN_EGP).toBe(100);
  });

  it("calculates earnable points based on 1 pt per 10 EGP spent", () => {
    const calcEarnable = (subtotal: number) => Math.floor(subtotal / EGP_PER_EARNED_POINT);
    expect(calcEarnable(250)).toBe(25);
    expect(calcEarnable(99)).toBe(9);
    expect(calcEarnable(1000)).toBe(100);
    expect(calcEarnable(0)).toBe(0);
  });

  it("maintains correct tier thresholds from Bronze to Apothecary Elite", () => {
    const bronze = LOYALTY_TIERS.find(t => t.id === "bronze");
    const silver = LOYALTY_TIERS.find(t => t.id === "silver");
    const gold = LOYALTY_TIERS.find(t => t.id === "gold");
    const elite = LOYALTY_TIERS.find(t => t.id === "elite");

    expect(bronze?.minPoints).toBe(0);
    expect(silver?.minPoints).toBe(300);
    expect(gold?.minPoints).toBe(800);
    expect(elite?.minPoints).toBe(1500);
  });
});
