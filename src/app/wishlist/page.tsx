"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import PageHero from "@/components/ui/PageHero";
import EmptyState from "@/components/ui/EmptyState";

export default function WishlistPage() {
  const { ids } = useWishlist();
  const wishedProducts = products.filter((p) => ids.includes(p.id));

  return (
    <>
      <PageHero
        eyebrow="Saved For Later"
        title="Your Wishlist"
        description={
          wishedProducts.length > 0
            ? `${wishedProducts.length} item${wishedProducts.length !== 1 ? "s" : ""} saved.`
            : undefined
        }
      />

      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-8xl px-6">
          {wishedProducts.length === 0 ? (
            <EmptyState
              icon={Heart}
              title="Your wishlist is empty"
              description="Tap the heart icon on any product to save it here for later."
              actionLabel="Browse Products"
              actionHref="/products"
            />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              <AnimatePresence mode="popLayout">
                {wishedProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
