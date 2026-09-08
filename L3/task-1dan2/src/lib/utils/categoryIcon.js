import {
  Smartphone,
  Shirt,
  UtensilsCrossed,
  Home,
  BookOpen,
  Sparkles,
  Dumbbell,
  Baby,
  Car,
  Gamepad2,
  Gem,
  PawPrint,
  Wrench,
  Palette,
  Music,
  Package,
} from "lucide-react";

const KEYWORD_ICON_MAP = [
  {
    keywords: ["electronic", "gadget", "phone", "computer", "laptop"],
    icon: Smartphone,
  },
  { keywords: ["cloth", "fashion", "apparel", "wear"], icon: Shirt },
  {
    keywords: ["food", "grocery", "snack", "beverage", "drink"],
    icon: UtensilsCrossed,
  },
  { keywords: ["home", "furniture", "kitchen", "decor"], icon: Home },
  { keywords: ["book", "stationery", "office"], icon: BookOpen },
  { keywords: ["beauty", "cosmetic", "skincare"], icon: Sparkles },
  { keywords: ["sport", "fitness", "gym", "outdoor"], icon: Dumbbell },
  { keywords: ["baby", "kid", "toy", "children"], icon: Baby },
  { keywords: ["automotive", "car", "vehicle"], icon: Car },
  { keywords: ["game", "gaming", "console"], icon: Gamepad2 },
  { keywords: ["jewelry", "accessor", "watch"], icon: Gem },
  { keywords: ["pet", "animal"], icon: PawPrint },
  { keywords: ["tool", "hardware", "diy"], icon: Wrench },
  { keywords: ["art", "craft", "hobby"], icon: Palette },
  { keywords: ["music", "instrument", "audio"], icon: Music },
];

export const getCategoryIcon = (categoryName = "") => {
  const normalized = categoryName.toLowerCase();
  const match = KEYWORD_ICON_MAP.find(({ keywords }) =>
    keywords.some((keyword) => normalized.includes(keyword)),
  );
  return match?.icon ?? Package;
};
