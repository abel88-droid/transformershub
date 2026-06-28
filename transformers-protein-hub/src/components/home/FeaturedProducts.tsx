"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { bestSellers } from "@/data/products";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/product/ProductCard";
import Button from "@/components/ui/Button";

export default function FeaturedProducts() {
  return (
    <section className="relative py-24 sm:py-28 bg-ink-raised">
      <div className="mx-auto max-w-8xl px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <SectionHeading
            eyebrow="Best Sellers"
            title="Most Reordered This Month"
            description="The formulas our customers come back for, batch after batch."
          />
          <Link href="/products" className="shrink-0">
            <Button variant="outline">
              View All <ArrowRight size={16} />
            </Button>
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestSellers.slice(0, 8).map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.08 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
