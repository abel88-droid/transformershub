import { CategoryInfo } from "@/types";

export const categories: CategoryInfo[] = [
  {
    slug: "whey-protein",
    name: "Whey Protein",
    tagline: "Build. Repair. Repeat.",
    description:
      "Fast-absorbing whey isolate and concentrate blends engineered for lean muscle recovery after every session.",
    image:
      "https://images.unsplash.com/photo-1579722820308-13f1473884cc?q=80&w=1200&auto=format&fit=crop",
    icon: "Dumbbell",
  },
  {
    slug: "creatine",
    name: "Creatine",
    tagline: "Power in every gram.",
    description:
      "Micronized monohydrate for explosive strength, denser muscle volume, and faster recovery between sets.",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop",
    icon: "Zap",
  },
  {
    slug: "mass-gainer",
    name: "Mass Gainer",
    tagline: "Engineered for size.",
    description:
      "High-calorie, high-protein formulas built for hard gainers who need serious surplus without the bloat.",
    image:
      "https://images.unsplash.com/photo-1594882645126-14020914d58d?q=80&w=1200&auto=format&fit=crop",
    icon: "TrendingUp",
  },
  {
    slug: "pre-workout",
    name: "Pre Workout",
    tagline: "Ignite the session.",
    description:
      "Clinically dosed stimulants and pump agents for focus, energy, and skin-splitting pumps from rep one.",
    image:
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=1200&auto=format&fit=crop",
    icon: "Flame",
  },
  {
    slug: "vitamins",
    name: "Vitamins",
    tagline: "The unseen foundation.",
    description:
      "Daily essential micronutrients that keep your immune system, joints, and energy levels battle-ready.",
    image:
      "https://images.unsplash.com/photo-1550572017-edd951aa8f4b?q=80&w=1200&auto=format&fit=crop",
    icon: "Sparkles",
  },
  {
    slug: "fish-oil",
    name: "Fish Oil",
    tagline: "Recover from within.",
    description:
      "High-potency Omega-3 for joint health, cardiovascular support, and reduced training inflammation.",
    image:
      "https://images.unsplash.com/photo-1577003833619-76bbd7f82948?q=80&w=1200&auto=format&fit=crop",
    icon: "Droplet",
  },
];

export const getCategoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug);
