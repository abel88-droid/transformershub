"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/categories";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Categories() {
  return (
    <section className="relative py-24 sm:py-28 bg-ink">
      <div className="mx-auto max-w-8xl px-6">
        <SectionHeading
          eyebrow="Shop By Goal"
          title="Six Categories. One Standard."
          description="Every category is curated for a specific outcome — strength, size, recovery, or readiness. Pick your goal."
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
            >
              <Link href={`/category/${cat.slug}`} className="group block">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-ink-border"
                >
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10 group-hover:from-ink/95 transition-colors duration-500" />

                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-ink/60 border border-gold/30 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-300">
                    <ArrowUpRight size={16} className="text-gold" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="font-mono text-[10px] tracking-widest2 text-gold uppercase">
                      {cat.tagline}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl uppercase text-bone mt-1">
                      {cat.name}
                    </h3>
                    <p className="text-graphite text-sm mt-2 max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-400 overflow-hidden">
                      {cat.description}
                    </p>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
