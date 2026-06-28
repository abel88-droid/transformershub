import { Metadata } from "next";
import ProductsPageClient from "@/components/product/ProductsPageClient";

export const metadata: Metadata = {
  title: "All Products",
  description:
    "Browse our full range of whey protein, creatine, mass gainers, pre-workouts, vitamins and fish oil. Filter by category, price and rating.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return <ProductsPageClient />;
}
