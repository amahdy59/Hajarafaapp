import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from "react";
import { Product } from "../data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}

export function sanitizeStoredCart(parsed: unknown): CartItem[] {
  if (Array.isArray(parsed)) {
    return parsed.filter((item: unknown): item is CartItem => {
      if (!item || typeof item !== "object") return false;
      const candidate = item as Partial<CartItem>;
      return Boolean(
        candidate.product &&
        typeof candidate.product === "object" &&
        typeof candidate.product.id === "string" &&
        typeof candidate.product.price === "number" &&
        typeof candidate.quantity === "number" &&
        candidate.quantity > 0
      );
    });
  }
  return [];
}

export function addProductToCart(prev: CartItem[], product: Product, quantity = 1): CartItem[] {
  if (quantity <= 0) return prev;
  const existing = prev.find(i => i.product.id === product.id);
  if (existing) {
    return prev.map(i =>
      i.product.id === product.id
        ? { ...i, quantity: i.quantity + quantity }
        : i
    );
  }
  return [...prev, { product, quantity }];
}

export function updateCartItemQuantity(prev: CartItem[], productId: string, quantity: number): CartItem[] {
  if (quantity <= 0) {
    return prev.filter(i => i.product.id !== productId);
  }
  return prev.map(i => (i.product.id === productId ? { ...i, quantity } : i));
}

export function removeProductFromCart(prev: CartItem[], productId: string): CartItem[] {
  return prev.filter(i => i.product.id !== productId);
}

export function calculateCartTotals(items: CartItem[]): { totalItems: number; totalPrice: number } {
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  return {
    totalItems,
    totalPrice: Math.round(totalPrice * 100) / 100,
  };
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("hajarafa.cart");
      const parsed = stored ? JSON.parse(stored) : [];
      return sanitizeStoredCart(parsed);
    } catch (e) {
      console.error("Failed to load cart", e);
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("hajarafa.cart", JSON.stringify(items));
  }, [items]);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setItems(prev => addProductToCart(prev, product, quantity));
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems(prev => removeProductFromCart(prev, productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems(prev => updateCartItemQuantity(prev, productId, quantity));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totals = useMemo(() => calculateCartTotals(items), [items]);

  const value = useMemo<CartContextType>(() => ({
    items, addToCart, removeFromCart, updateQuantity, clearCart,
    totalItems: totals.totalItems, totalPrice: totals.totalPrice, isCartOpen, setCartOpen: setIsCartOpen
  }), [items, addToCart, removeFromCart, updateQuantity, clearCart, totals, isCartOpen]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
