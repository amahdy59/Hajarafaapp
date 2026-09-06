import { createContext, useContext, useEffect, useState, useMemo, useCallback, ReactNode } from "react";

export type LoyaltyTierName = "bronze" | "silver" | "gold" | "elite";

export interface LoyaltyTier {
  id: LoyaltyTierName;
  nameAr: string;
  nameEn: string;
  minPoints: number;
  perksAr: string;
  perksEn: string;
  color: string;
}

export const LOYALTY_TIERS: LoyaltyTier[] = [
  {
    id: "bronze",
    nameAr: "برونزي",
    nameEn: "Bronze",
    minPoints: 0,
    perksAr: "جمع نقطة لكل ١٠ ج.م",
    perksEn: "Earn 1 pt per 10 EGP",
    color: "from-amber-700 to-amber-900",
  },
  {
    id: "silver",
    nameAr: "فضي",
    nameEn: "Silver",
    minPoints: 300,
    perksAr: "خصم ٥٪ إضافي وشحن مخفض",
    perksEn: "Extra 5% discount & reduced shipping",
    color: "from-slate-400 to-slate-600",
  },
  {
    id: "gold",
    nameAr: "ذهبي",
    nameEn: "Gold",
    minPoints: 800,
    perksAr: "شحن مجاني دائم وهدايا عشبية حصرية",
    perksEn: "Free shipping & complimentary botanicals",
    color: "from-amber-400 to-amber-600",
  },
  {
    id: "elite",
    nameAr: "نخبة العطارين",
    nameEn: "Apothecary Elite",
    minPoints: 1500,
    perksAr: "استشارات عشبية خاصة وأولوية التوصيل",
    perksEn: "VIP Herbalist consultations & priority dispatch",
    color: "from-emerald-600 to-teal-800",
  },
];

export interface LoyaltyTransaction {
  id: string;
  date: string;
  points: number;
  type: "bonus" | "earn" | "redeem";
  reasonAr: string;
  reasonEn: string;
}

const INITIAL_BONUS_POINTS = 150;
const INITIAL_TRANSACTIONS: LoyaltyTransaction[] = [
  {
    id: "tx-welcome",
    date: new Date().toISOString(),
    points: INITIAL_BONUS_POINTS,
    type: "bonus",
    reasonAr: "مكافأة الترحيب بنادي عرفة للعشابين 🌿",
    reasonEn: "Welcome bonus to Haj Arafa Herbal Club 🌿",
  },
];

// 100 points = 25 EGP discount (0.25 EGP per point)
export const POINTS_VALUE_IN_EGP = 0.25;
export const EGP_PER_EARNED_POINT = 10;

interface LoyaltyContextValue {
  points: number;
  transactions: LoyaltyTransaction[];
  tier: LoyaltyTier;
  nextTier: LoyaltyTier | null;
  pointsToNextTier: number;
  isLoyaltyModalOpen: boolean;
  setLoyaltyModalOpen: (open: boolean) => void;
  addPoints: (amount: number, reasonAr: string, reasonEn: string, type?: "earn" | "bonus") => void;
  redeemPoints: (amount: number, reasonAr?: string, reasonEn?: string) => boolean;
  pointsToDiscountEgp: (pts: number) => number;
  calcEarnablePoints: (subtotalEgp: number) => number;
}

const LoyaltyContext = createContext<LoyaltyContextValue | null>(null);

export function LoyaltyProvider({ children }: { children: ReactNode }) {
  const [points, setPoints] = useState<number>(() => {
    if (typeof window === "undefined") return INITIAL_BONUS_POINTS;
    const stored = localStorage.getItem("hajarafa.loyalty_points");
    if (stored !== null) {
      const parsed = parseInt(stored, 10);
      if (!Number.isNaN(parsed)) return parsed;
    }
    return INITIAL_BONUS_POINTS;
  });

  const [transactions, setTransactions] = useState<LoyaltyTransaction[]>(() => {
    if (typeof window === "undefined") return INITIAL_TRANSACTIONS;
    const stored = localStorage.getItem("hajarafa.loyalty_history");
    if (stored) {
      try {
        return JSON.parse(stored) as LoyaltyTransaction[];
      } catch {
        return INITIAL_TRANSACTIONS;
      }
    }
    return INITIAL_TRANSACTIONS;
  });

  const [isLoyaltyModalOpen, setLoyaltyModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("hajarafa.loyalty_points", String(points));
  }, [points]);

  useEffect(() => {
    localStorage.setItem("hajarafa.loyalty_history", JSON.stringify(transactions));
  }, [transactions]);

  const tier = useMemo(() => {
    const sorted = [...LOYALTY_TIERS].sort((a, b) => b.minPoints - a.minPoints);
    const found = sorted.find(tier => points >= tier.minPoints);
    return found ?? LOYALTY_TIERS[0]!;
  }, [points]);

  const nextTier = useMemo(() => {
    return LOYALTY_TIERS.find(tier => tier.minPoints > points) ?? null;
  }, [points]);

  const pointsToNextTier = useMemo(() => {
    return nextTier ? nextTier.minPoints - points : 0;
  }, [nextTier, points]);

  const addPoints = useCallback((amount: number, reasonAr: string, reasonEn: string, type: "earn" | "bonus" = "earn") => {
    if (amount <= 0) return;
    setPoints(prev => prev + amount);
    const newTx: LoyaltyTransaction = {
      id: `tx-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      date: new Date().toISOString(),
      points: amount,
      type,
      reasonAr,
      reasonEn,
    };
    setTransactions(prev => [newTx, ...prev]);
  }, []);

  const redeemPoints = useCallback((amount: number, reasonAr?: string, reasonEn?: string): boolean => {
    if (amount <= 0 || amount > points) return false;
    setPoints(prev => prev - amount);
    const newTx: LoyaltyTransaction = {
      id: `tx-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      date: new Date().toISOString(),
      points: -amount,
      type: "redeem",
      reasonAr: reasonAr ?? `استبدال ${amount} نقطة مقابل خصم شراء`,
      reasonEn: reasonEn ?? `Redeemed ${amount} points for order discount`,
    };
    setTransactions(prev => [newTx, ...prev]);
    return true;
  }, [points]);

  const pointsToDiscountEgp = useCallback((pts: number) => {
    return Math.max(0, pts * POINTS_VALUE_IN_EGP);
  }, []);

  const calcEarnablePoints = useCallback((subtotalEgp: number) => {
    return Math.floor(Math.max(0, subtotalEgp) / EGP_PER_EARNED_POINT);
  }, []);

  const value = useMemo<LoyaltyContextValue>(() => ({
    points,
    transactions,
    tier,
    nextTier,
    pointsToNextTier,
    isLoyaltyModalOpen,
    setLoyaltyModalOpen,
    addPoints,
    redeemPoints,
    pointsToDiscountEgp,
    calcEarnablePoints,
  }), [
    points,
    transactions,
    tier,
    nextTier,
    pointsToNextTier,
    isLoyaltyModalOpen,
    setLoyaltyModalOpen,
    addPoints,
    redeemPoints,
    pointsToDiscountEgp,
    calcEarnablePoints,
  ]);

  return <LoyaltyContext.Provider value={value}>{children}</LoyaltyContext.Provider>;
}

export function useLoyalty() {
  const ctx = useContext(LoyaltyContext);
  if (!ctx) {
    throw new Error("useLoyalty must be used within LoyaltyProvider");
  }
  return ctx;
}
