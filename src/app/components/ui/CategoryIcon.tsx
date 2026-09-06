import type { ComponentType } from "react";
import {
  LayoutGrid,
  Coffee,
  Droplet,
  Flame,
  Wheat,
  HeartPulse,
  Flower2,
  Wind,
  type LucideProps,
} from "lucide-react";

export const CATEGORY_LUCIDE_ICONS: Record<string, ComponentType<LucideProps>> = {
  all: LayoutGrid,
  "coffee-drinks": Coffee,
  honey: Droplet,
  spices: Flame,
  nuts: Wheat,
  wellness: HeartPulse,
  cosmetics: Flower2,
  incense: Wind,
};

interface CategoryIconProps {
  slug: string;
  fallbackEmoji?: string;
  size?: number;
  className?: string;
}

export function CategoryIcon({
  slug,
  fallbackEmoji,
  size = 14,
  className = "",
}: CategoryIconProps) {
  const Icon = CATEGORY_LUCIDE_ICONS[slug];
  if (Icon) {
    return <Icon size={size} className={className} aria-hidden="true" />;
  }
  if (fallbackEmoji) {
    return <span className={className} aria-hidden="true">{fallbackEmoji}</span>;
  }
  return null;
}
