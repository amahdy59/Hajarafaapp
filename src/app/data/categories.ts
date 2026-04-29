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
  slug: string;
  group: CategoryGroup;
  icon: string;
  description: string;
  image: string;
  children: string[];
}

export const categories: Category[] = [
  // Foods
  { id: "c-coffee", name: "Coffee & Drinks", nameAr: "قهوة ومشروبات", slug: "coffee-drinks", icon: "☕", bgColor: "#EFE4DB", count: 24, image: "https://hajarafa.com/cdn/shop/files/167.png?v=1768755537&width=533", group: "foods", parent: "d-coffee" },
  { id: "c-drinks", name: "Drinks", nameAr: "عصائر", slug: "drinks", icon: "🥤", bgColor: "#F4E7DA", count: 9, image: "https://hajarafa.com/cdn/shop/files/153.png?v=1768746082&width=533", group: "foods", parent: "d-coffee" },
  { id: "c-legumes", name: "Legumes", nameAr: "بقوليات", slug: "legumes", icon: "🫘", bgColor: "#EAE2D2", count: 18, image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=400", group: "foods", parent: "d-legumes" },
  { id: "c-spices", name: "Spices", nameAr: "بهارات", slug: "spices", icon: "🌶", bgColor: "#FCE6DC", count: 32, image: "https://images.unsplash.com/photo-1768729340925-2749ecdc211c?w=400", group: "foods", parent: "d-spices" },
  { id: "c-nuts", name: "Nuts", nameAr: "مكسرات", slug: "nuts", icon: "🌰", bgColor: "#F5EDE0", count: 22, image: "https://hajarafa.com/cdn/shop/files/cd6b5a3b25138f70003ededaa702162a.png?v=1708794682&width=533", group: "foods", parent: "d-others" },
  { id: "c-honey", name: "Honey", nameAr: "عسل", slug: "honey", icon: "🍯", bgColor: "#FFF3D4", count: 12, image: "https://images.unsplash.com/photo-1761416351532-ede97c29fab8?w=400", group: "foods", parent: "d-others" },
  { id: "c-snacks", name: "Snacks", nameAr: "سناكس", slug: "snacks", icon: "🍿", bgColor: "#FFE9CF", count: 16, image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400", group: "foods", parent: "d-others" },
  { id: "c-dates", name: "Yamish & Dates", nameAr: "ياميش وتمور", slug: "yamish-dates", icon: "🌴", bgColor: "#F1E0CD", count: 14, image: "https://hajarafa.com/cdn/shop/files/1e6764dd8ccfd87cac88fe384d062a8c.png?v=1709654915&width=533", group: "foods", parent: "d-others" },
  { id: "c-healthy", name: "Healthy Corner", nameAr: "ركن الصحة", slug: "healthy-corner", icon: "🥗", bgColor: "#E5EFDB", count: 11, image: "https://hajarafa.com/cdn/shop/files/AppleCiderVinegar.webp?v=1770232195&width=533", group: "foods", parent: "d-others" },
  { id: "c-sweets", name: "Sweets & Chocolates", nameAr: "حلويات", slug: "sweets-chocolates", icon: "🍫", bgColor: "#F2DCC9", count: 9, image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=400", group: "foods", parent: "d-others" },
  { id: "c-baby", name: "Dr. Baby", nameAr: "د. بيبي", slug: "dr-baby", icon: "👶", bgColor: "#FCE0E6", count: 7, image: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=400", group: "foods", parent: "d-others" },
  { id: "c-maamoul", name: "Maamoul", nameAr: "معمول", slug: "maamoul", icon: "🥮", bgColor: "#F1DDC2", count: 6, image: "https://images.unsplash.com/photo-1590080875823-cdf69eddffeb?w=400", group: "foods", parent: "d-others" },
  { id: "c-herbal", name: "Herbal Drinks", nameAr: "أعشاب", slug: "herbal-drinks", icon: "🍵", bgColor: "#E5EFDB", count: 18, image: "https://hajarafa.com/cdn/shop/files/2cfe5fee7d264dac71c46c59a0c3811d.png?v=1709123951&width=533", group: "foods", parent: "d-others" },
  { id: "c-dried", name: "Dried Fruits", nameAr: "فواكه مجففة", slug: "dried-fruits", icon: "🍇", bgColor: "#F0DCC4", count: 8, image: "https://images.unsplash.com/photo-1599045118108-bf9954418b76?w=400", group: "foods", parent: "d-others" },

  // Non-Food
  { id: "c-cosmetics", name: "Cosmetics", nameAr: "مستحضرات تجميل", slug: "cosmetics", icon: "✨", bgColor: "#F5E1EC", count: 38, image: "https://hajarafa.com/cdn/shop/files/132.png?v=1768576687&width=533", group: "non-food", parent: "d-cosmetics" },
  { id: "c-incense", name: "Incense", nameAr: "بخور", slug: "incense", icon: "🪔", bgColor: "#EADBC8", count: 14, image: "https://hajarafa.com/cdn/shop/files/Sticks-Afghano.webp?v=1768478647&width=533", group: "non-food", parent: "d-incense" },
];

export const departments: Department[] = [
  { id: "d-coffee", name: "Coffee & Drinks", slug: "coffee-drinks", group: "foods", icon: "☕", description: "Arabic coffee, blends & natural juices", image: "https://hajarafa.com/cdn/shop/files/167.png?v=1768755537&width=533", children: ["coffee-drinks","drinks"] },
  { id: "d-legumes", name: "Legumes", slug: "legumes", group: "foods", icon: "🫘", description: "Lentils, beans & whole grains", image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600", children: ["legumes"] },
  { id: "d-spices", name: "Spices", slug: "spices", group: "foods", icon: "🌶", description: "Hand-mixed spice packs", image: "https://images.unsplash.com/photo-1768729340925-2749ecdc211c?w=600", children: ["spices"] },
  { id: "d-others", name: "Pantry & More", slug: "pantry", group: "foods", icon: "🧺", description: "Nuts, honey, snacks, dates & more", image: "https://hajarafa.com/cdn/shop/files/cd6b5a3b25138f70003ededaa702162a.png?v=1708794682&width=533", children: ["nuts","honey","snacks","yamish-dates","healthy-corner","sweets-chocolates","dr-baby","maamoul","herbal-drinks","dried-fruits"] },
  { id: "d-cosmetics", name: "Cosmetics", slug: "cosmetics", group: "non-food", icon: "✨", description: "Natural skincare & body care", image: "https://hajarafa.com/cdn/shop/files/132.png?v=1768576687&width=533", children: ["cosmetics"] },
  { id: "d-incense", name: "Incense", slug: "incense", group: "non-food", icon: "🪔", description: "Traditional & modern incense", image: "https://hajarafa.com/cdn/shop/files/Sticks-Afghano.webp?v=1768478647&width=533", children: ["incense"] },
];

export const getCategoryBySlug = (slug: string) => categories.find(c => c.slug === slug);
