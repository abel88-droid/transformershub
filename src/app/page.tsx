import { Metadata } from "next";
import Hero from "@/components/home/Hero";
import BrandCarousel from "@/components/home/BrandCarousel";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ReviewsCarousel from "@/components/home/ReviewsCarousel";
import CtaSection from "@/components/home/CtaSection";
import TearDivider from "@/components/ui/TearDivider";

export const metadata: Metadata = {
  title: "Premium Sports Nutrition — Fuel Your Transformation",
  description:
    "Shop lab-verified whey protein, creatine, mass gainers, pre-workouts, vitamins and fish oil. 100% genuine supplements, fast delivery across India.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandCarousel />
      <Categories />
      <TearDivider />
      <FeaturedProducts />
      <WhyChooseUs />
      <TearDivider />
      <ReviewsCarousel />
      <CtaSection />
    </>
  );
}
