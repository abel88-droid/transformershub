"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search as SearchIcon, X } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import EmptyState from "@/components/ui/EmptyState";
import PageHero from "@/components/ui/PageHero";

export default function SearchPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q)
    );
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <>
      <PageHero eyebrow="Find Your Fuel" title="Search">
        <form onSubmit={handleSubmit} className="mt-8 max-w-xl relative">
          <SearchIcon
            className="absolute left-0 top-1/2 -translate-y-1/2 text-gold"
            size={22}
          />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search whey, creatine, pre-workout..."
            className="w-full bg-transparent border-b-2 border-ink-border focus:border-gold pl-9 pr-9 py-3 text-xl sm:text-2xl font-display uppercase text-bone placeholder:text-graphite outline-none transition-colors"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-0 top-1/2 -translate-y-1/2 text-graphite hover:text-gold"
            >
              <X size={20} />
            </button>
          )}
        </form>
      </PageHero>

      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-8xl px-6">
          {query.trim() === "" ? (
            <EmptyState
              icon={SearchIcon}
              title="Start typing to search"
              description="Search by product name, brand, or category — whey, creatine, gainer, and more."
            />
          ) : results.length === 0 ? (
            <EmptyState
              icon={SearchIcon}
              title={`No results for "${query}"`}
              description="Try a different keyword, or browse the full catalogue instead."
              actionLabel="View All Products"
              actionHref="/products"
            />
          ) : (
            <>
              <p className="font-mono text-xs text-graphite tracking-widest2 mb-8">
                {results.length} RESULT{results.length !== 1 ? "S" : ""} FOR &ldquo;{query}&rdquo;
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {results.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: (i % 8) * 0.04 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
