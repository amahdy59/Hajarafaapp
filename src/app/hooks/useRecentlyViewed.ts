import { useState, useEffect, useCallback } from "react";
import { getProductById, type Product } from "../data/products";

export const STORAGE_KEY = "hajarafa.recently_viewed";
export const MAX_ITEMS = 8;

export function useRecentlyViewed(currentProductId?: string) {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  // Load recently viewed on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const ids: string[] = JSON.parse(stored);
        if (Array.isArray(ids)) {
          // Filter out current product if provided, and map to products
          const resolved = ids
            .filter((id) => !currentProductId || id !== currentProductId)
            .map((id) => getProductById(id))
            .filter((p): p is Product => Boolean(p));
          setRecentlyViewed(resolved);
        }
      }
    } catch {
      // Fallback silently if localStorage fails
    }
  }, [currentProductId]);

  // Record product view
  const recordView = useCallback((productId: string) => {
    if (!productId) return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const existing: string[] = stored ? JSON.parse(stored) : [];
      const updated = [productId, ...existing.filter((id) => id !== productId)].slice(0, MAX_ITEMS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Fallback silently
    }
  }, []);

  // Record current product on mount if provided
  useEffect(() => {
    if (currentProductId) {
      recordView(currentProductId);
    }
  }, [currentProductId, recordView]);

  return { recentlyViewed, recordView };
}
