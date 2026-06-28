"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/types";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const tabs = ["Description", "Highlights", "Nutrition Facts"] as const;

export default function ProductInfoTabs({ product }: { product: Product }) {
  const [active, setActive] = useState<(typeof tabs)[number]>("Description");

  return (
    <div className="mt-16">
      <div className="flex gap-8 border-b border-ink-border">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={cn(
              "relative pb-4 text-sm tracking-wide transition-colors",
              active === tab ? "text-gold" : "text-graphite hover:text-bone"
            )}
          >
            {tab}
            {active === tab && (
              <motion.span
                layoutId="tab-underline"
                className="absolute bottom-0 left-0 right-0 h-px bg-gold"
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="py-8 max-w-2xl"
        >
          {active === "Description" && (
            <p className="text-bone/80 leading-relaxed">{product.description}</p>
          )}
          {active === "Highlights" && (
            <ul className="space-y-3">
              {product.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-bone/80">
                  <Check size={18} className="text-gold mt-0.5 shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          )}
          {active === "Nutrition Facts" && (
            <div className="border border-ink-border rounded-xl overflow-hidden">
              {product.nutrition.map((n, i) => (
                <div
                  key={n.label}
                  className={cn(
                    "flex items-center justify-between px-5 py-3.5",
                    i % 2 === 0 ? "bg-ink-surface" : "bg-ink-raised"
                  )}
                >
                  <span className="text-sm text-bone/70">{n.label}</span>
                  <span className="font-mono text-sm text-gold">{n.value}</span>
                </div>
              ))}
              <div className="px-5 py-3 bg-ink-surface">
                <span className="font-mono text-[10px] tracking-widest2 text-graphite">
                  PER SERVING · {product.servings} SERVINGS PER TUB
                </span>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
