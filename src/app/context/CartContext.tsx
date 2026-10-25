import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Product } from "../data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  freeShipping: boolean;
}

const VALID_COUPONS: Record<string, { discountPercent: number; freeShipping: boolean; descriptionEn: string; descriptionAr: string }> = {
  ARAFANEW10: {
    discountPercent: 10,
    freeShipping: false,
    descriptionEn: "10% Welcome Discount applied!",
    descriptionAr: "تم تطبيق خصم الترحيب ١٠٪!",
  },
  RAMADAN20: {
    discountPercent: 20,
    freeShipping: false,
    descriptionEn: "20% Seasonal Discount applied!",
    descriptionAr: "تم تطبيق خصم الموسم ٢٠٪!",
  },
  FREESHIP: {
    discountPercent: 0,
    freeShipping: true,
    descriptionEn: "Free shipping unlocked!",
    descriptionAr: "تم تفعيل الشحن المجاني!",
  },
};

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  discountAmount: number;
  effectiveTotalPrice: number;
  coupon: Coupon | null;
  applyCoupon: (code: string, isRTL?: boolean) => { success: boolean; message: string };
  removeCoupon: () => void;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("hajarafa.cart");
      const parsed = stored ? JSON.parse(stored) : [];
      if (Array.isArray(parsed)) {
        return parsed.filter((item: unknown): item is CartItem => {
          if (!item || typeof item !== "object") return false;
          const candidate = item as Partial<CartItem>;
          return Boolean(
            candidate.product &&
            typeof candidate.product === "object" &&
            typeof candidate.product.id === "string" &&
            typeof candidate.product.price === "number" &&
            typeof candidate.quantity === "number"
          );
        });
      }
      return [];
    } catch (e) {
      console.error("Failed to load cart", e);
      return [];
    }
  });

  const [coupon, setCoupon] = useState<Coupon | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const stored = localStorage.getItem("hajarafa.coupon");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("hajarafa.cart", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (coupon) {
      localStorage.setItem("hajarafa.coupon", JSON.stringify(coupon));
    } else {
      localStorage.removeItem("hajarafa.coupon");
    }
  }, [coupon]);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems(prev => prev.filter(i => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(i => i.product.id !== productId));
    } else {
      setItems(prev =>
        prev.map(i => i.product.id === productId ? { ...i, quantity } : i)
      );
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setCoupon(null);
  }, []);

  const applyCoupon = useCallback((code: string, isRTL = false) => {
    const clean = code.trim().toUpperCase();
    const found = VALID_COUPONS[clean];
    if (found) {
      const newCoupon = {
        code: clean,
        discountPercent: found.discountPercent,
        freeShipping: found.freeShipping,
      };
      setCoupon(newCoupon);
      return {
        success: true,
        message: isRTL ? found.descriptionAr : found.descriptionEn,
      };
    }
    return {
      success: false,
      message: isRTL ? "كوبون غير صالح أو منتهي الصلاحية" : "Invalid or expired promo code",
    };
  }, []);

  const removeCoupon = useCallback(() => {
    setCoupon(null);
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  const discountAmount = coupon
    ? (totalPrice * coupon.discountPercent) / 100
    : 0;
  const effectiveTotalPrice = Math.max(0, totalPrice - discountAmount);

  return (
    <CartContext.Provider value={{
      items, addToCart, removeFromCart, updateQuantity, clearCart,
      totalItems, totalPrice, discountAmount, effectiveTotalPrice,
      coupon, applyCoupon, removeCoupon,
      isCartOpen, setCartOpen: setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
