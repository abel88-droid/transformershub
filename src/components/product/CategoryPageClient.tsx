"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PackageX } from "lucide-react";
import { CategoryInfo } from "@/types";
import { getProductsByCategory } from "@/data/products";
import { useProductFilter } from "@/hooks/useProductFilter";
import FilterSidebar from "@/components/product/FilterSidebar";
import SortDropdown from "@/components/product/SortDropdown";
import MobileFilterDrawer from "@/components/product/MobileFilterDrawer";
import ProductCard from "@/components/product/ProductCard";
import PageHero from "@/components/ui/PageHero";
import EmptyState from "@/components/ui/EmptyState";

export default function CategoryPageClient({ category }: { category: CategoryInfo }) {
  const baseProducts = getProductsByCategory(category.slug);
  const {
    priceRange,
    setPriceRange,
    inStockOnly,
    setInStockOnly,
    minRating,
    setMinRating,
    sort,
    setSort,
    filtered,
  } = useProductFilter({ baseProducts, lockedCategory: category.slug });

  const filterProps = {
    selectedCategories: [category.slug],
    onToggleCategory: () => {},
    priceRange,
    onPriceChange: setPriceRange,
    inStockOnly,
    onToggleInStock: setInStockOnly,
    minRating,
    onMinRatingChange: setMinRating,
    hideCategories: true,
  };

  return (
    <>
      <PageHero eyebrow={category.tagline} title={category.name} description={category.description} />

      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-8xl px-6">
          <div className="flex items-center justify-between mb-8">
            <p className="font-mono text-xs text-graphite tracking-widest2">
              {filtered.length} PRODUCT{filtered.length !== 1 ? "S" : ""}
            </p>
            <div className="flex items-center gap-3">
              <MobileFilterDrawer>
                <FilterSidebar {...filterProps} />
              </MobileFilterDrawer>
              <SortDropdown value={sort} onChange={setSort} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10">
            <aside className="hidden lg:block">
              <div className="sticky top-28 label-card rounded-2xl p-6">
                <FilterSidebar {...filterProps} />
              </div>
            </aside>

            <div>
              {filtered.length === 0 ? (
                <EmptyState
                  icon={PackageX}
                  title="No products match"
                  description="Try widening your price range or clearing a filter."
                  actionLabel="View All Products"
                  actionHref="/products"
                />
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                  <AnimatePresence mode="popLayout">
                    {filtered.map((product, i) => (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, delay: (i % 6) * 0.04 }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
