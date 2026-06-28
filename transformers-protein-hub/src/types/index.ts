export type Category =
  | "whey-protein"
  | "creatine"
  | "mass-gainer"
  | "pre-workout"
  | "vitamins"
  | "fish-oil";

export interface CategoryInfo {
  slug: Category;
  name: string;
  tagline: string;
  description: string;
  image: string;
  icon: string;
}

export interface ProductFlavor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  mrp: number;
  rating: number;
  reviewCount: number;
  servings: number;
  flavors: ProductFlavor[];
  images: string[];
  shortDescription: string;
  description: string;
  highlights: string[];
  nutrition: { label: string; value: string }[];
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  batchCode: string;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatarColor: string;
  verified: boolean;
}

export interface Brand {
  id: string;
  name: string;
  logoText: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  flavor?: string;
}

export type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "newest";
