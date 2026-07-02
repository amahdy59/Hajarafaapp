import { categoryMapping } from "../../data/categories";
import type { Product } from "../../data/products";

export type CatalogSortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "new";

export interface CatalogFilters {
  maxPrice: number;
  minRating: number;
  priceRange: [number, number];
  searchQuery: string;
  selectedCategories: string[];
  showCategoryFilter: boolean;
  showOrganic: boolean;
  sort: CatalogSortOption;
}

export function getCatalogPriceLimit(products: Product[]) {
  const highestPrice = Math.max(...products.map((product) => product.price), 0);
  return Math.max(50, Math.ceil(highestPrice / 50) * 50);
}

export function filterAndSortProducts(
  products: Product[],
  {
    minRating,
    priceRange,
    searchQuery,
    selectedCategories,
    showCategoryFilter,
    showOrganic,
    sort,
  }: CatalogFilters
) {
  const [minPrice, maxSelectedPrice] = priceRange;
  const query = searchQuery.trim().toLowerCase();

  const filteredProducts = products.filter((product) => {
    if (showCategoryFilter && selectedCategories.length > 0) {
      const parentSlug = categoryMapping[product.categorySlug] || product.categorySlug;
      if (!selectedCategories.includes(parentSlug)) {
        return false;
      }
    }

    if (product.price < minPrice || product.price > maxSelectedPrice) {
      return false;
    }

    if (minRating > 0 && product.rating < minRating) {
      return false;
    }

    if (showOrganic && !product.isOrganic) {
      return false;
    }

    if (!query) {
      return true;
    }

    return (
      product.name.toLowerCase().includes(query) ||
      product.nameAr?.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  });

  return filteredProducts.sort((left, right) => {
    switch (sort) {
      case "price-asc":
        return left.price - right.price;
      case "price-desc":
        return right.price - left.price;
      case "rating":
        return right.rating - left.rating;
      case "new":
        return Number(Boolean(right.isNew)) - Number(Boolean(left.isNew));
      case "featured":
      default:
        return Number(Boolean(right.isBestSeller)) - Number(Boolean(left.isBestSeller));
    }
  });
}

export function getActiveCatalogFilterCount({
  maxPrice,
  minRating,
  priceRange,
  searchQuery,
  selectedCategories,
  showCategoryFilter,
  showOrganic,
  sort,
}: CatalogFilters) {
  let count = 0;

  if (showCategoryFilter) {
    count += selectedCategories.length;
  }

  if (priceRange[0] > 0 || priceRange[1] < maxPrice) {
    count += 1;
  }

  if (minRating > 0) {
    count += 1;
  }

  if (showOrganic) {
    count += 1;
  }

  if (sort !== "featured") {
    count += 1;
  }

  if (searchQuery.trim().length > 0) {
    count += 1;
  }

  return count;
}
