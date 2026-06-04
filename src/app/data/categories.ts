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

export interface Department {
  id: string;
  name: string;
  nameAr?: string;
  slug: string;
  group: CategoryGroup;
  icon: string;
  description: string;
  descriptionAr?: string;
  image: string;
  children: string[];
}

export const categories: Category[] = [
  { id: "c-coffee", name: "Coffee & Drinks", nameAr: "قهوة ومشروبات", slug: "coffee-drinks", icon: "☕", bgColor: "#EFE4DB", count: 51, image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop", group: "foods" },
  { id: "c-honey", name: "Honey & Dates", nameAr: "عسل وتمور", slug: "honey", icon: "🍯", bgColor: "#FFF3D4", count: 49, image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop", group: "foods" },
  { id: "c-spices", name: "Spices & Grains", nameAr: "بهارات وحبوب", slug: "spices", icon: "🌶", bgColor: "#FCE6DC", count: 50, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop", group: "foods" },
  { id: "c-nuts", name: "Nuts & Snacks", nameAr: "مكسرات وتسالي", slug: "nuts", icon: "🌰", bgColor: "#F5EDE0", count: 38, image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=600&auto=format&fit=crop", group: "foods" },
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

export const departments: Department[] = [
  { id: "d-coffee", name: "Coffee & Drinks", nameAr: "قهوة ومشروبات", slug: "coffee-drinks", group: "foods", icon: "☕", description: "Arabic coffee, blends & natural juices", descriptionAr: "قهوة عربية ومشروبات طبيعية", image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop", children: ["coffee-drinks"] },
  { id: "d-legumes", name: "Legumes", nameAr: "بقوليات وحبوب", slug: "legumes", group: "foods", icon: "🫘", description: "Lentils, beans & grains", descriptionAr: "عدس وفول وحبوب", image: "https://images.unsplash.com/photo-1515942400420-2b98fed1f515?w=600&auto=format&fit=crop", children: ["spices"] },
  { id: "d-spices", name: "Spices", nameAr: "بهارات وتوابل", slug: "spices", group: "foods", icon: "🌶", description: "Hand-mixed spices", descriptionAr: "بهارات طازجة وممتازة", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop", children: ["spices"] },
  { id: "d-others", name: "Pantry & More", nameAr: "مؤن وأكثر", slug: "pantry", group: "foods", icon: "🧺", description: "Nuts, honey, snacks, dates & more", descriptionAr: "مكسرات وعسل وتمور وسناكس", image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=600&auto=format&fit=crop", children: ["nuts", "honey", "wellness"] },
  { id: "d-cosmetics", name: "Cosmetics", nameAr: "تجميل طبيعي", slug: "cosmetics", group: "non-food", icon: "✨", description: "Natural skincare", descriptionAr: "عناية طبيعية بالبشرة والجسم", image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=600&auto=format&fit=crop", children: ["cosmetics"] },
  { id: "d-incense", name: "Incense", nameAr: "بخور وعطور", slug: "incense", group: "non-food", icon: "🪔", description: "Traditional incense", descriptionAr: "بخور تقليدي وعصري", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop", children: ["incense"] },
];

export const getCategoryBySlug = (slug: string) => categories.find(c => c.slug === slug);
