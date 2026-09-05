import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from "react";
import { Product } from "../data/products";

interface WishlistContextType {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("hajarafa.wishlist");
      const parsed = stored ? JSON.parse(stored) : [];
      if (Array.isArray(parsed)) {
        return parsed.filter((p: unknown): p is Product => {
          if (!p || typeof p !== "object") return false;
          const candidate = p as Partial<Product>;
          return typeof candidate.id === "string" && typeof candidate.price === "number";
        });
      }
      return [];
    } catch (e) {
      console.error("Failed to load wishlist", e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("hajarafa.wishlist", JSON.stringify(items));
  }, [items]);

  const addToWishlist = useCallback((product: Product) => {
    setItems(prev => prev.find(p => p.id === product.id) ? prev : [...prev, product]);
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setItems(prev => prev.filter(p => p.id !== productId));
  }, []);

  const isWishlisted = useCallback((productId: string) => {
    return items.some(p => p.id === productId);
  }, [items]);

  const toggleWishlist = useCallback((product: Product) => {
    setItems(prev => {
      if (prev.find(p => p.id === product.id)) {
        return prev.filter(p => p.id !== product.id);
      }
      return [...prev, product];
    });
  }, []);

  const value = useMemo<WishlistContextType>(() => ({
    items, addToWishlist, removeFromWishlist, isWishlisted, toggleWishlist
  }), [items, addToWishlist, removeFromWishlist, isWishlisted, toggleWishlist]);

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
