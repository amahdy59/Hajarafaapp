export interface Governorate {
  id: string;
  nameEn: string;
  nameAr: string;
  deliveryHours: string;
}

export const EGYPT_GOVERNORATES: Governorate[] = [
  { id: "cairo", nameEn: "Cairo", nameAr: "القاهرة", deliveryHours: "24-48" },
  { id: "giza", nameEn: "Giza", nameAr: "الجيزة", deliveryHours: "24-48" },
  { id: "alexandria", nameEn: "Alexandria", nameAr: "الإسكندرية", deliveryHours: "24-48" },
  { id: "qalyubia", nameEn: "Qalyubia", nameAr: "القليوبية", deliveryHours: "48" },
  { id: "sharqia", nameEn: "Sharqia", nameAr: "الشرقية", deliveryHours: "48-72" },
  { id: "dakahlia", nameEn: "Dakahlia (Mansoura)", nameAr: "الدقهلية (المنصورة)", deliveryHours: "48-72" },
  { id: "gharbia", nameEn: "Gharbia (Tanta)", nameAr: "الغربية (طنطا)", deliveryHours: "48-72" },
  { id: "monufia", nameEn: "Monufia", nameAr: "المنوفية", deliveryHours: "48-72" },
  { id: "beheira", nameEn: "Beheira", nameAr: "البحيرة", deliveryHours: "48-72" },
  { id: "kafr_el_sheikh", nameEn: "Kafr El Sheikh", nameAr: "كفر الشيخ", deliveryHours: "48-72" },
  { id: "damietta", nameEn: "Damietta", nameAr: "دمياط", deliveryHours: "48-72" },
  { id: "port_said", nameEn: "Port Said", nameAr: "بورسعيد", deliveryHours: "48-72" },
  { id: "ismailia", nameEn: "Ismailia", nameAr: "الإسماعيلية", deliveryHours: "48-72" },
  { id: "suez", nameEn: "Suez", nameAr: "السويس", deliveryHours: "48-72" },
  { id: "fayoum", nameEn: "Fayoum", nameAr: "الفيوم", deliveryHours: "48-72" },
  { id: "beni_suef", nameEn: "Beni Suef", nameAr: "بني سويف", deliveryHours: "48-72" },
  { id: "minya", nameEn: "Minya", nameAr: "المنيا", deliveryHours: "72" },
  { id: "asyut", nameEn: "Asyut", nameAr: "أسيوط", deliveryHours: "72" },
  { id: "sohag", nameEn: "Sohag", nameAr: "سوهاج", deliveryHours: "72" },
  { id: "qena", nameEn: "Qena", nameAr: "قنا", deliveryHours: "72" },
  { id: "luxor", nameEn: "Luxor", nameAr: "الأقصر", deliveryHours: "72" },
  { id: "aswan", nameEn: "Aswan", nameAr: "أسوان", deliveryHours: "72" },
  { id: "red_sea", nameEn: "Red Sea (Hurghada / Gouna)", nameAr: "البحر الأحمر (الغردقة / الجونة)", deliveryHours: "72" },
  { id: "south_sinai", nameEn: "South Sinai (Sharm El Sheikh)", nameAr: "جنوب سيناء (شرم الشيخ)", deliveryHours: "72" },
  { id: "north_sinai", nameEn: "North Sinai", nameAr: "شمال سيناء", deliveryHours: "72" },
  { id: "matrouh", nameEn: "Matrouh / North Coast", nameAr: "مطروح / الساحل الشمالي", deliveryHours: "72" },
];
