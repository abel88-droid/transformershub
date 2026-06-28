"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Dumbbell } from "lucide-react";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-6 bg-ink relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.1),_transparent_60%)]" />
      <div className="relative z-10 text-center max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-20 h-20 rounded-full bg-ink-surface border border-gold/30 flex items-center justify-center mx-auto mb-8 animate-float"
        >
          <Dumbbell size={32} className="text-gold" />
        </motion.div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="foil-seal inline-block mb-4"
        >
          ERROR 404
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="font-display text-4xl sm:text-5xl uppercase text-bone leading-tight"
        >
          Rep Not Found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-graphite mt-4"
        >
          The page you're looking for must have skipped leg day — it's not here.
          Let's get you back to the catalogue.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-9 flex flex-wrap justify-center gap-4"
        >
          <Link href="/">
            <Button variant="primary">Back to Home</Button>
          </Link>
          <Link href="/products">
            <Button variant="outline">Browse Products</Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
