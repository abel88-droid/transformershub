"use client";

import { ReactNode, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";

export default function MobileFilterDrawer({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-full border border-ink-border text-sm text-bone/80 hover:border-gold/40 transition-colors"
      >
        <SlidersHorizontal size={14} className="text-gold" />
        Filters
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 z-[71] max-h-[80vh] overflow-y-auto bg-ink-raised border-t border-ink-border rounded-t-2xl p-6 lg:hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-display text-lg uppercase text-bone">Filters</span>
                <button onClick={() => setOpen(false)} aria-label="Close filters">
                  <X size={20} className="text-bone/70" />
                </button>
              </div>
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
