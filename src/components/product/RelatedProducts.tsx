"use client";

import { motion } from "framer-motion";
import { Product } from "@/types";
import ProductCard from "./ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";

export default function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="py-20 border-t border-ink-border">
      <SectionHeading eyebrow="Pairs Well With" title="You May Also Like" />
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
