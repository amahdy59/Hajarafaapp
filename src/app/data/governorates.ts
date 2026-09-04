export interface Governorate {
  id: string;
  nameEn: string;
  nameAr: string;
  zone: 1 | 2 | 3;
  deliveryDaysEn: string;
  deliveryDaysAr: string;
}

export const EGYPTIAN_GOVERNORATES: Governorate[] = [
  // Zone 1: Greater Cairo (24-48 hours)
  { id: "cairo", nameEn: "Cairo", nameAr: "القاهرة", zone: 1, deliveryDaysEn: "1-2 business days", deliveryDaysAr: "خلال ٢٤-٤٨ ساعة عمل" },
  { id: "giza", nameEn: "Giza", nameAr: "الجيزة", zone: 1, deliveryDaysEn: "1-2 business days", deliveryDaysAr: "خلال ٢٤-٤٨ ساعة عمل" },
  { id: "qalyubia", nameEn: "Qalyubia", nameAr: "القليوبية", zone: 1, deliveryDaysEn: "1-2 business days", deliveryDaysAr: "خلال ٢٤-٤٨ ساعة عمل" },

  // Zone 2: Alexandria & Nile Delta (2-3 days)
  { id: "alexandria", nameEn: "Alexandria", nameAr: "الإسكندرية", zone: 2, deliveryDaysEn: "2-3 business days", deliveryDaysAr: "خلال ٢-٣ أيام عمل" },
  { id: "dakahlia", nameEn: "Dakahlia", nameAr: "الدقهلية", zone: 2, deliveryDaysEn: "2-3 business days", deliveryDaysAr: "خلال ٢-٣ أيام عمل" },
  { id: "sharqia", nameEn: "Sharqia", nameAr: "الشرقية", zone: 2, deliveryDaysEn: "2-3 business days", deliveryDaysAr: "خلال ٢-٣ أيام عمل" },
  { id: "gharbia", nameEn: "Gharbia", nameAr: "الغربية", zone: 2, deliveryDaysEn: "2-3 business days", deliveryDaysAr: "خلال ٢-٣ أيام عمل" },
  { id: "menofia", nameEn: "Menofia", nameAr: "المنوفية", zone: 2, deliveryDaysEn: "2-3 business days", deliveryDaysAr: "خلال ٢-٣ أيام عمل" },
  { id: "beheira", nameEn: "Beheira", nameAr: "البحيرة", zone: 2, deliveryDaysEn: "2-3 business days", deliveryDaysAr: "خلال ٢-٣ أيام عمل" },
  { id: "kafr_el_sheikh", nameEn: "Kafr El Sheikh", nameAr: "كفر الشيخ", zone: 2, deliveryDaysEn: "2-3 business days", deliveryDaysAr: "خلال ٢-٣ أيام عمل" },
  { id: "damietta", nameEn: "Damietta", nameAr: "دمياط", zone: 2, deliveryDaysEn: "2-3 business days", deliveryDaysAr: "خلال ٢-٣ أيام عمل" },

  // Zone 3: Canal, Upper Egypt & Coastal / Frontier (3-5 days)
  { id: "port_said", nameEn: "Port Said", nameAr: "بورسعيد", zone: 3, deliveryDaysEn: "3-4 business days", deliveryDaysAr: "خلال ٣-٤ أيام عمل" },
  { id: "ismailia", nameEn: "Ismailia", nameAr: "الإسماعيلية", zone: 3, deliveryDaysEn: "3-4 business days", deliveryDaysAr: "خلال ٣-٤ أيام عمل" },
  { id: "suez", nameEn: "Suez", nameAr: "السويس", zone: 3, deliveryDaysEn: "3-4 business days", deliveryDaysAr: "خلال ٣-٤ أيام عمل" },
  { id: "fayoum", nameEn: "Fayoum", nameAr: "الفيوم", zone: 3, deliveryDaysEn: "3-4 business days", deliveryDaysAr: "خلال ٣-٤ أيام عمل" },
  { id: "beni_suef", nameEn: "Beni Suef", nameAr: "بني سويف", zone: 3, deliveryDaysEn: "3-4 business days", deliveryDaysAr: "خلال ٣-٤ أيام عمل" },
  { id: "minya", nameEn: "Minya", nameAr: "المنيا", zone: 3, deliveryDaysEn: "3-5 business days", deliveryDaysAr: "خلال ٣-٥ أيام عمل" },
  { id: "asyut", nameEn: "Asyut", nameAr: "أسيوط", zone: 3, deliveryDaysEn: "3-5 business days", deliveryDaysAr: "خلال ٣-٥ أيام عمل" },
  { id: "sohag", nameEn: "Sohag", nameAr: "سوهاج", zone: 3, deliveryDaysEn: "3-5 business days", deliveryDaysAr: "خلال ٣-٥ أيام عمل" },
  { id: "qena", nameEn: "Qena", nameAr: "قنا", zone: 3, deliveryDaysEn: "3-5 business days", deliveryDaysAr: "خلال ٣-٥ أيام عمل" },
  { id: "luxor", nameEn: "Luxor", nameAr: "الأقصر", zone: 3, deliveryDaysEn: "3-5 business days", deliveryDaysAr: "خلال ٣-٥ أيام عمل" },
  { id: "aswan", nameEn: "Aswan", nameAr: "أسوان", zone: 3, deliveryDaysEn: "3-5 business days", deliveryDaysAr: "خلال ٣-٥ أيام عمل" },
  { id: "red_sea", nameEn: "Red Sea (Hurghada)", nameAr: "البحر الأحمر (الغردقة)", zone: 3, deliveryDaysEn: "3-5 business days", deliveryDaysAr: "خلال ٣-٥ أيام عمل" },
  { id: "matrouh", nameEn: "Matrouh", nameAr: "مطروح والساحل الشمالي", zone: 3, deliveryDaysEn: "3-5 business days", deliveryDaysAr: "خلال ٣-٥ أيام عمل" },
  { id: "south_sinai", nameEn: "South Sinai (Sharm)", nameAr: "جنوب سيناء (شرم الشيخ)", zone: 3, deliveryDaysEn: "3-5 business days", deliveryDaysAr: "خلال ٣-٥ أيام عمل" },
  { id: "north_sinai", nameEn: "North Sinai", nameAr: "شمال سيناء", zone: 3, deliveryDaysEn: "3-5 business days", deliveryDaysAr: "خلال ٣-٥ أيام عمل" },
  { id: "new_valley", nameEn: "New Valley", nameAr: "الوادي الجديد", zone: 3, deliveryDaysEn: "4-5 business days", deliveryDaysAr: "خلال ٤-٥ أيام عمل" },
];

export function getGovernorateById(id: string): Governorate | undefined {
  return EGYPTIAN_GOVERNORATES.find((g) => g.id === id);
}
