import sidrHoneyImg from "../../../assets/sidr_honey.webp";
import bbqSpicesImg from "../../../assets/bbq_spices.webp";
import bayLeavesImg from "../../../assets/bay_leaves.webp";
import dateMaamoulImg from "../../../assets/date_maamoul.webp";

export interface OrderProduct {
  name: string;
  nameAr?: string;
  quantity: number;
  price: number;
  image: string;
}

export interface CourierInfo {
  company: string;
  trackingCode: string;
  phone: string;
  estDateEn: string;
  estDateAr: string;
}

export interface ReceiptInfo {
  subtotal: number;
  shipping: number;
  discount: number;
}

export interface Order {
  id: string;
  dateEn: string;
  dateAr: string;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: number;
  image: string;
  courier: CourierInfo | null;
  deliveryAddress: string;
  deliveryAddressAr: string;
  receipt: ReceiptInfo;
  products: OrderProduct[];
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface SavedAddress {
  id: string;
  type: string;
  details: string;
}

export interface SavedPayment {
  id: string;
  type: string;
  number: string;
  expiry: string;
}

export interface NotificationPreferences {
  newsletter: boolean;
  orders: boolean;
  promotions: boolean;
}

export type AccountTab = "profile" | "orders" | "wishlist";

export const initialOrders: Order[] = [
  { 
    id: "HJR-845102", 
    dateEn: "Jun 04, 2026", 
    dateAr: "٤ يونيو ٢٠٢٦", 
    status: "processing", 
    total: 120.00, 
    items: 1, 
    image: sidrHoneyImg,
    courier: null,
    deliveryAddress: "12 El-Nile St, Agouza, Giza (Home)",
    deliveryAddressAr: "١٢ شارع النيل، العجوزة، الجيزة (المنزل)",
    receipt: { subtotal: 110.00, shipping: 15.00, discount: 5.00 },
    products: [
      { name: "Sidr Honey", nameAr: "عسل سدر", quantity: 1, price: 110.00, image: sidrHoneyImg }
    ]
  },
  { 
    id: "HJR-823047", 
    dateEn: "Apr 15, 2025", 
    dateAr: "١٥ أبريل ٢٠٢٥", 
    status: "delivered", 
    total: 67.98, 
    items: 2, 
    image: bbqSpicesImg,
    courier: { company: "Aramex", trackingCode: "AR-883719-EG", phone: "+20 100 123 4567", estDateEn: "Apr 18, 2025", estDateAr: "١٨ أبريل ٢٠٢٥" },
    deliveryAddress: "Building 3, El-Taseen St, Fifth Settlement, Cairo (Work)",
    deliveryAddressAr: "المبنى ٣، شارع التسعين، التجمع الخامس، القاهرة (العمل)",
    receipt: { subtotal: 60.00, shipping: 15.00, discount: 7.02 },
    products: [
      { name: "BBQ Spice Mix", nameAr: "بهارات مشاوي", quantity: 1, price: 35.00, image: bbqSpicesImg },
      { name: "Bay Leaves", nameAr: "ورق لاورو", quantity: 1, price: 25.00, image: bayLeavesImg }
    ]
  },
  { 
    id: "HJR-814523", 
    dateEn: "Mar 28, 2025", 
    dateAr: "٢٨ مارس ٢٠٢٥", 
    status: "shipped", 
    total: 45.99, 
    items: 1, 
    image: dateMaamoulImg,
    courier: { company: "Haj Arafa Express", trackingCode: "HA-09921-EG", phone: "+20 112 345 6789", estDateEn: "Apr 01, 2025", estDateAr: "٠١ أبريل ٢٠٢٥" },
    deliveryAddress: "12 El-Nile St, Agouza, Giza (Home)",
    deliveryAddressAr: "١٢ شارع النيل، العجوزة، الجيزة (المنزل)",
    receipt: { subtotal: 45.99, shipping: 0.00, discount: 0.00 },
    products: [
      { name: "Date Maamoul", nameAr: "معمول تمر", quantity: 1, price: 45.99, image: dateMaamoulImg }
    ]
  },
];

export const statusColors: Record<Order["status"], string> = {
  delivered: "bg-brand-cream-2 text-brand-moss dark:bg-brand-moss/30 dark:text-brand-sage border border-brand-line/60",
  shipped: "bg-brand-cream-2 text-brand-forest dark:bg-brand-forest/15 dark:text-brand-forest border border-brand-line/60",
  processing: "bg-brand-peach text-brand-terracotta dark:bg-brand-terracotta/15 dark:text-brand-terracotta border border-brand-terracotta/20",
  cancelled: "bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-900/40",
};

export const statusTranslations: Record<Order["status"], { en: string; ar: string }> = {
  delivered: { en: "Delivered", ar: "تم التوصيل" },
  shipped: { en: "Shipped", ar: "تم الشحن" },
  processing: { en: "Processing", ar: "قيد المعالجة" },
  cancelled: { en: "Cancelled", ar: "ملغى" },
};
