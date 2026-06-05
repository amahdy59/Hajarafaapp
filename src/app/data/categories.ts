export type CategoryGroup = "foods" | "non-food";

export interface Category {
  id: string;
  name: string;
  nameAr?: string;
  slug: string;
  icon: string;
  bgColor: string;
  count: number;
  image: string;
  group: CategoryGroup;
  parent?: string;
}

export const categories: Category[] = [
  { id: "c-coffee", name: "Coffee & Drinks", nameAr: "قهوة ومشروبات", slug: "coffee-drinks", icon: "☕", bgColor: "#EFE4DB", count: 51, image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&auto=format&fit=crop", group: "foods" },
  { id: "c-honey", name: "Honey & Dates", nameAr: "عسل وتمور", slug: "honey", icon: "🍯", bgColor: "#FFF3D4", count: 49, image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop", group: "foods" },
  { id: "c-spices", name: "Spices & Grains", nameAr: "بهارات وحبوب", slug: "spices", icon: "🌶", bgColor: "#FCE6DC", count: 50, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop", group: "foods" },
  { id: "c-nuts", name: "Nuts & Snacks", nameAr: "مكسرات وتسالي", slug: "nuts", icon: "🌰", bgColor: "#F5EDE0", count: 38, image: "https://images.unsplash.com/photo-1534080391025-a77b0afb137e?w=600&auto=format&fit=crop", group: "foods" },
  { id: "c-healthy", name: "Targeted Wellness", nameAr: "حلول صحية مخصصة", slug: "wellness", icon: "🥗", bgColor: "#E5EFDB", count: 18, image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop", group: "foods" },
  { id: "c-cosmetics", name: "Natural Cosmetics", nameAr: "مستحضرات تجميل", slug: "cosmetics", icon: "✨", bgColor: "#F5E1EC", count: 38, image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=600&auto=format&fit=crop", group: "non-food" },
  { id: "c-incense", name: "Incense & Fragrance", nameAr: "بخور وعطور", slug: "incense", icon: "🪔", bgColor: "#EADBC8", count: 14, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop", group: "non-food" },
];

export const categoryMapping: Record<string, string> = {
  "coffee-drinks": "coffee-drinks",
  "drinks": "coffee-drinks",
  "herbal-drinks": "coffee-drinks",
  "spices": "spices",
  "legumes": "spices",
  "honey": "honey",
  "sweets-chocolates": "honey",
  "maamoul": "honey",
  "dried-fruits": "honey",
  "yamish-dates": "honey",
  "nuts": "nuts",
  "snacks": "nuts",
  "healthy-corner": "wellness",
  "dr-baby": "wellness",
  "cosmetics": "cosmetics",
  "incense": "incense",
};

export const getCategoryBySlug = (slug: string) => categories.find(c => c.slug === slug);
