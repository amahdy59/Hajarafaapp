import { categoryMapping } from "./categories";
import cheeseRingsImg from "../../assets/cheese_rings.png";
import redLentilsImg from "../../assets/red_lentils.png";
import driedApricotsImg from "../../assets/dried_apricots.png";
import darkChocolateImg from "../../assets/dark_chocolate_bar.png";
import dateMaamoulImg from "../../assets/date_maamoul.png";

export interface Product {
  id: string;
  name: string;
  nameAr?: string;
  category: string;
  categorySlug: string;
  price: number;
  priceFrom?: boolean;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  description: string;
  benefits: string[];
  usage: string;
  weight: string;
  origin: string;
  inStock: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  isOrganic?: boolean;
}

const HAJ = "https://hajarafa.com/cdn/shop/files/";

export const products: Product[] = [
  // Incense
  {
    id: "p1", name: "Afghano Incense", nameAr: "بخور أفغانو",
    category: "Incense", categorySlug: "incense",
    price: 80, rating: 4.8, reviewCount: 142,
    image: `${HAJ}Sticks-Afghano.webp?v=1768478647&width=533`,
    images: [`${HAJ}Sticks-Afghano.webp?v=1768478647&width=533`],
    description: "Smooth, woody Afghano incense sticks crafted in the traditional Egyptian way. Long-lasting fragrance perfect for relaxing evenings and gatherings.",
    benefits: ["Long-lasting aroma", "Hand-rolled", "Premium ingredients"],
    usage: "Light the tip, let flame catch, then blow out and place in a holder.",
    weight: "Pack of 12", origin: "Egypt", inStock: true, isBestSeller: true,
  },
  {
    id: "p2", name: "Amber Maamoul Incense", nameAr: "بخور معمول العنبر",
    category: "Incense", categorySlug: "incense",
    price: 80, rating: 4.7, reviewCount: 88,
    image: `${HAJ}Sticks-Ambermaamoul.webp?v=1768475616&width=533`,
    images: [`${HAJ}Sticks-Ambermaamoul.webp?v=1768475616&width=533`],
    description: "Warm amber maamoul incense — a deep oriental fragrance built around amber resin and oud notes.",
    benefits: ["Deep amber aroma", "Long burn", "Authentic recipe"],
    usage: "Light, blow out, and place in a heat-safe holder.",
    weight: "Pack of 12", origin: "Egypt", inStock: true,
  },

  // Yamish & Dates
  {
    id: "p3", name: "Agwa Almadia Dates", nameAr: "تمر عجوة المدينة",
    category: "Yamish & Dates", categorySlug: "yamish-dates",
    price: 85, rating: 4.9, reviewCount: 312,
    image: `${HAJ}1e6764dd8ccfd87cac88fe384d062a8c.png?v=1709654915&width=533`,
    images: [`${HAJ}1e6764dd8ccfd87cac88fe384d062a8c.png?v=1709654915&width=533`],
    description: "Authentic Ajwa dates from Madinah — soft, dark and naturally sweet. A revered variety with a rich, caramel-like finish.",
    benefits: ["Naturally sweet", "Rich in fiber", "Energy boost"],
    usage: "Enjoy 3–7 dates daily, with milk or on their own.",
    weight: "500 g", origin: "Saudi Arabia", inStock: true, isBestSeller: true, isOrganic: true,
  },

  // Cosmetics
  {
    id: "p4", name: "Almond Oil & Pomegranate Cream", nameAr: "كريم زيت اللوز والرمان",
    category: "Cosmetics", categorySlug: "cosmetics",
    price: 49, priceFrom: true, rating: 4.8, reviewCount: 204,
    image: `${HAJ}132.png?v=1768576687&width=533`,
    images: [`${HAJ}132.png?v=1768576687&width=533`],
    description: "Nourishing body cream blending sweet almond oil with pomegranate extract. Lightweight, deeply hydrating, antioxidant-rich.",
    benefits: ["Deep hydration", "Antioxidant", "Softens skin"],
    usage: "Apply to clean skin morning and night.",
    weight: "120 ml", origin: "Egypt", inStock: true, isNew: true,
  },
  {
    id: "p5", name: "Amal Solid Perfume", nameAr: "مخمرية الأمال",
    category: "Cosmetics", categorySlug: "cosmetics",
    price: 205, rating: 4.9, reviewCount: 167,
    image: `${HAJ}11_84861da1-be69-444f-ba38-05bf3bf21d29.png?v=1766606202&width=533`,
    images: [`${HAJ}11_84861da1-be69-444f-ba38-05bf3bf21d29.png?v=1766606202&width=533`],
    description: "A luxurious solid perfume balm. Travel-friendly format with a long-lasting oriental scent.",
    benefits: ["Alcohol-free", "Long-lasting", "Travel size"],
    usage: "Dab onto pulse points: wrists, neck, behind ears.",
    weight: "15 g", origin: "Egypt", inStock: true, isBestSeller: true,
  },
  {
    id: "p6", name: "Amber Mist Hair Perfume", nameAr: "عطر الشعر العنبري",
    category: "Cosmetics", categorySlug: "cosmetics",
    price: 105, rating: 4.7, reviewCount: 98,
    image: `${HAJ}IMG_5325.png?v=1766265526&width=533`,
    images: [`${HAJ}IMG_5325.png?v=1766265526&width=533`],
    description: "Lightweight amber-scented mist designed specifically for hair. Leaves a soft, lingering fragrance without buildup.",
    benefits: ["Hair-safe", "Long fragrance", "Lightweight"],
    usage: "Spray 2–3 times onto dry hair from a distance.",
    weight: "100 ml", origin: "Egypt", inStock: true,
  },
  {
    id: "p7", name: "Amber Oil", nameAr: "زيت عنبر",
    category: "Cosmetics", categorySlug: "cosmetics",
    price: 160, rating: 4.8, reviewCount: 121,
    image: `${HAJ}AW2-Recovered0.png?v=1763548738&width=533`,
    images: [`${HAJ}AW2-Recovered0.png?v=1763548738&width=533`],
    description: "Rich amber body oil — warm, sensual, and deeply moisturizing. Crafted with traditional amber notes.",
    benefits: ["Hydrating", "Sensual scent", "Multi-use"],
    usage: "Apply a few drops onto skin or hair after showering.",
    weight: "30 ml", origin: "Egypt", inStock: true, isNew: true,
  },

  // Nuts
  {
    id: "p8", name: "Raw Almonds", nameAr: "لوز ني",
    category: "Nuts", categorySlug: "nuts",
    price: 100, rating: 4.7, reviewCount: 245,
    image: `${HAJ}cd6b5a3b25138f70003ededaa702162a.png?v=1708794682&width=533`,
    images: [`${HAJ}cd6b5a3b25138f70003ededaa702162a.png?v=1708794682&width=533`],
    description: "Whole raw almonds — natural, unsalted, unroasted. Perfect for snacking, soaking, or fresh almond milk.",
    benefits: ["Vitamin E", "Plant protein", "Healthy fats"],
    usage: "Eat raw, soaked, or use in recipes.",
    weight: "250 g", origin: "California", inStock: true, isOrganic: true,
  },
  {
    id: "p9", name: "Roasted Almonds", nameAr: "لوز محمص",
    category: "Nuts", categorySlug: "nuts",
    price: 35, rating: 4.6, reviewCount: 188,
    image: `${HAJ}307.png?v=1772041115&width=533`,
    images: [`${HAJ}307.png?v=1772041115&width=533`],
    description: "Lightly roasted almonds with a satisfying crunch and natural sweetness — no oil added.",
    benefits: ["Crunchy", "Natural", "Roasted dry"],
    usage: "Snack daily, or use in trail mixes.",
    weight: "100 g", origin: "Egypt", inStock: true,
  },
  {
    id: "p10", name: "American Pistachio Salted", nameAr: "فستق أمريكي مملح كبير",
    category: "Nuts", categorySlug: "nuts",
    price: 120, originalPrice: 140, discount: 14, rating: 4.9, reviewCount: 312,
    image: `${HAJ}70a13da22e282ebd3cad12033bb5866b.png?v=1708688599&width=533`,
    images: [`${HAJ}70a13da22e282ebd3cad12033bb5866b.png?v=1708688599&width=533`],
    description: "Premium salted American pistachios. Big, fresh kernels with a perfectly roasted finish.",
    benefits: ["Heart healthy", "High protein", "Satisfying snack"],
    usage: "Enjoy a handful daily.",
    weight: "250 g", origin: "USA", inStock: true, isBestSeller: true,
  },

  // Herbal Drinks
  {
    id: "p11", name: "Anise", nameAr: "ينسون",
    category: "Herbal Drinks", categorySlug: "herbal-drinks",
    price: 39.9, rating: 4.7, reviewCount: 156,
    image: `${HAJ}2cfe5fee7d264dac71c46c59a0c3811d.png?v=1709123951&width=533`,
    images: [`${HAJ}2cfe5fee7d264dac71c46c59a0c3811d.png?v=1709123951&width=533`],
    description: "Whole aniseed for brewing — sweet, warm and digestive-friendly. A timeless evening drink.",
    benefits: ["Digestive aid", "Calming", "Sweet aroma"],
    usage: "Steep 1 tsp in hot water for 5 minutes.",
    weight: "100 g", origin: "Egypt", inStock: true,
  },

  // Healthy Corner
  {
    id: "p12", name: "Apple Cider Vinegar", nameAr: "خل تفاح طبيعي",
    category: "Healthy Corner", categorySlug: "healthy-corner",
    price: 99, rating: 4.8, reviewCount: 273,
    image: `${HAJ}AppleCiderVinegar.webp?v=1770232195&width=533`,
    images: [`${HAJ}AppleCiderVinegar.webp?v=1770232195&width=533`],
    description: "Raw, unfiltered apple cider vinegar with the mother. Naturally fermented, no additives.",
    benefits: ["Gut health", "Raw & unfiltered", "Versatile"],
    usage: "Take 1–2 tbsp diluted in water before meals.",
    weight: "500 ml", origin: "Egypt", inStock: true, isOrganic: true, isBestSeller: true,
  },

  // Drinks
  {
    id: "p13", name: "Apple Juice", nameAr: "عصير تفاح",
    category: "Drinks", categorySlug: "drinks",
    price: 60, rating: 4.6, reviewCount: 84,
    image: `${HAJ}153.png?v=1768746082&width=533`,
    images: [`${HAJ}153.png?v=1768746082&width=533`],
    description: "Cold-pressed pure apple juice — no added sugar, no preservatives. Bright, fresh, and naturally sweet.",
    benefits: ["100% fruit", "No added sugar", "Fresh-pressed"],
    usage: "Serve chilled. Refrigerate after opening.",
    weight: "1 L", origin: "Egypt", inStock: true, isNew: true,
  },

  // Coffee & Drinks
  {
    id: "p14", name: "Arabic Coffee with Cardamom & Saffron", nameAr: "قهوة عربي بالهيل والزعفران",
    category: "Coffee & Drinks", categorySlug: "coffee-drinks",
    price: 120, rating: 4.9, reviewCount: 421,
    image: `${HAJ}167.png?v=1768755537&width=533`,
    images: [`${HAJ}167.png?v=1768755537&width=533`],
    description: "Hand-blended Arabic coffee infused with green cardamom and authentic saffron threads. A ceremonial cup, freshly ground.",
    benefits: ["Hand-blended", "Cardamom & saffron", "Ceremonial grade"],
    usage: "Brew 1 tbsp in 100 ml water, simmer 5 minutes.",
    weight: "200 g", origin: "Egypt", inStock: true, isBestSeller: true,
  },

  // Spices (curated additions in HajArafa style)
  {
    id: "p15", name: "BBQ Spice Mix", nameAr: "بهارات مشاوي",
    category: "Spices", categorySlug: "spices",
    price: 35, rating: 4.7, reviewCount: 201,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600",
    images: ["https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600"],
    description: "House BBQ blend — paprika, cumin, garlic and a hint of smoke. Perfect for grilled meats and vegetables.",
    benefits: ["No additives", "Bold flavor", "Versatile"],
    usage: "Rub generously onto meat or vegetables before grilling.",
    weight: "100 g", origin: "Egypt", inStock: true,
  },
  {
    id: "p16", name: "Bay Leaves", nameAr: "ورق لاورو",
    category: "Spices", categorySlug: "spices",
    price: 35, rating: 4.6, reviewCount: 76,
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600",
    images: ["https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600"],
    description: "Whole, hand-picked bay leaves with a deep aromatic profile.",
    benefits: ["Aromatic", "Whole leaves", "Long shelf-life"],
    usage: "Add 1–2 leaves to soups, stews and rice.",
    weight: "50 g", origin: "Turkey", inStock: true,
  },

  // Honey
  {
    id: "p17", name: "Sidr Honey", nameAr: "عسل سدر",
    category: "Honey", categorySlug: "honey",
    price: 450, rating: 5.0, reviewCount: 134,
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600",
    images: ["https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600"],
    description: "Rare Yemeni Sidr honey, harvested from pristine mountain valleys. Robust flavor with caramel and herbal notes.",
    benefits: ["Premium grade", "Naturally raw", "Antioxidant rich"],
    usage: "1 tsp daily on its own or in warm water.",
    weight: "250 g", origin: "Yemen", inStock: true, isBestSeller: true, isOrganic: true,
  },

  // Snacks
  {
    id: "p18", name: "Salted Caramel Popcorn", nameAr: "فشار كراميل مملح",
    category: "Snacks", categorySlug: "snacks",
    price: 35, rating: 4.7, reviewCount: 156,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600",
    images: ["https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600"],
    description: "Crunchy popcorn in buttery salted caramel — perfect movie-night snack.",
    benefits: ["Whole grain", "Sweet & salty"],
    usage: "Open and enjoy.",
    weight: "120 g", origin: "Egypt", inStock: true, isNew: true,
  },
  {
    id: "p19", name: "Protein Rings Cheese", nameAr: "بروتين رينجز جبنة",
    category: "Snacks", categorySlug: "snacks",
    price: 25, rating: 4.5, reviewCount: 64,
    image: cheeseRingsImg,
    images: [cheeseRingsImg],
    description: "Cheese-flavored crunchy rings with added protein. Light and savory.",
    benefits: ["Protein-rich", "Light snack"],
    usage: "Open and enjoy.",
    weight: "40 g", origin: "Egypt", inStock: true,
  },

  // Legumes
  {
    id: "p20", name: "Red Lentils", nameAr: "عدس أحمر",
    category: "Legumes", categorySlug: "legumes",
    price: 45, rating: 4.8, reviewCount: 92,
    image: redLentilsImg,
    images: [redLentilsImg],
    description: "Cleaned, premium red lentils — quick-cooking and rich in plant protein.",
    benefits: ["Plant protein", "Quick cooking", "Premium grade"],
    usage: "Rinse and simmer 15 minutes for soup.",
    weight: "500 g", origin: "Egypt", inStock: true,
  },

  // Dried Fruits
  {
    id: "p21", name: "Dried Apricots", nameAr: "مشمش مجفف",
    category: "Dried Fruits", categorySlug: "dried-fruits",
    price: 75, rating: 4.7, reviewCount: 58,
    image: driedApricotsImg,
    images: [driedApricotsImg],
    description: "Sun-dried Turkish apricots — soft, tangy and naturally sweet.",
    benefits: ["No added sugar", "High fiber", "Natural"],
    usage: "Eat as a snack or add to oatmeal.",
    weight: "200 g", origin: "Turkey", inStock: true,
  },

  // Sweets & Chocolates
  {
    id: "p22", name: "Dark Chocolate Bar 70%", nameAr: "شوكولاتة دارك 70%",
    category: "Sweets & Chocolates", categorySlug: "sweets-chocolates",
    price: 65, rating: 4.8, reviewCount: 142,
    image: darkChocolateImg,
    images: [darkChocolateImg],
    description: "Smooth 70% dark chocolate with deep cocoa notes. Crafted in small batches.",
    benefits: ["70% cocoa", "Antioxidant", "Small batch"],
    usage: "Enjoy 2–3 squares daily.",
    weight: "100 g", origin: "Egypt", inStock: true,
  },

  // Maamoul
  {
    id: "p23", name: "Date Maamoul", nameAr: "معمول تمر",
    category: "Maamoul", categorySlug: "maamoul",
    price: 90, rating: 4.9, reviewCount: 78,
    image: dateMaamoulImg,
    images: [dateMaamoulImg],
    description: "Buttery shortbread cookies stuffed with rich date paste. A traditional festive favorite.",
    benefits: ["Traditional recipe", "Hand-shaped"],
    usage: "Enjoy with coffee or tea.",
    weight: "300 g", origin: "Egypt", inStock: true, isNew: true,
  },

  // Dr. Baby
  {
    id: "p24", name: "Baby Soothing Oil", nameAr: "زيت بيبي مهدئ",
    category: "Dr. Baby", categorySlug: "dr-baby",
    price: 110, rating: 4.9, reviewCount: 112,
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=600",
    images: ["https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=600"],
    description: "Gentle natural oil blend formulated for delicate baby skin. Soothing and lightly fragranced.",
    benefits: ["Hypoallergenic", "Light scent", "Pediatrician-approved formula"],
    usage: "Massage gently onto baby's skin after bath.",
    weight: "100 ml", origin: "Egypt", inStock: true,
  },
];

export const getProductById = (id: string) => products.find(p => p.id === id);
export const getProductsByCategory = (slug: string) => {
  const subSlugs = Object.entries(categoryMapping)
    .filter(([_, parent]) => parent === slug)
    .map(([sub, _]) => sub);
  const matchSlugs = subSlugs.length > 0 ? subSlugs : [slug];
  return products.filter(p => matchSlugs.includes(p.categorySlug));
};
export const getProductsByCategorySlugs = (slugs: string[]) => products.filter(p => slugs.includes(p.categorySlug));
export const getBestSellers = () => products.filter(p => p.isBestSeller);
export const getNewProducts = () => products.filter(p => p.isNew);
export const getDiscountedProducts = () => products.filter(p => p.discount);

export const formatLE = (price: number, from = false) =>
  `${from ? "From " : ""}LE ${price.toFixed(2)}`;
