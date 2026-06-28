"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PackageX } from "lucide-react";
import { products } from "@/data/products";
import { useProductFilter } from "@/hooks/useProductFilter";
import FilterSidebar from "@/components/product/FilterSidebar";
import SortDropdown from "@/components/product/SortDropdown";
import MobileFilterDrawer from "@/components/product/MobileFilterDrawer";
import ProductCard from "@/components/product/ProductCard";
import PageHero from "@/components/ui/PageHero";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";

export default function ProductsPageClient() {
  const {
    selectedCategories,
    toggleCategory,
    priceRange,
    setPriceRange,
    inStockOnly,
    setInStockOnly,
    minRating,
    setMinRating,
    sort,
    setSort,
    filtered,
    resetFilters,
  } = useProductFilter({ baseProducts: products });

  const filterProps = {
    selectedCategories,
    onToggleCategory: toggleCategory,
    priceRange,
    onPriceChange: setPriceRange,
    inStockOnly,
    onToggleInStock: setInStockOnly,
    minRating,
    onMinRatingChange: setMinRating,
  };

  return (
    <>
      <PageHero
        eyebrow="The Full Range"
        title="All Products"
        description="Every formula we stock, filtered and sorted exactly the way you train."
      />

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
                <button
                  onClick={resetFilters}
                  className="mt-6 text-xs text-gold hover:text-gold-light underline underline-offset-2"
                >
                  Reset filters
                </button>
              </div>
            </aside>

            <div>
              {filtered.length === 0 ? (
                <EmptyState
                  icon={PackageX}
                  title="No products match"
                  description="Try widening your price range or clearing a filter."
                  actionLabel="Reset Filters"
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
