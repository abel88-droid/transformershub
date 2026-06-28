"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import { buildWhatsAppLink } from "@/lib/utils";
import { WHATSAPP_NUMBER } from "@/lib/constants";

export default function CtaSection() {
  const whatsappLink = buildWhatsAppLink({ phone: WHATSAPP_NUMBER });

  return (
    <section className="relative py-28 sm:py-36 bg-ink overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.14),_transparent_60%)]" />
      <div className="absolute inset-0 bg-grain opacity-30" />
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="eyebrow"
        >
          Your Next PR Starts Here
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl uppercase text-bone mt-4 leading-[1.05] text-balance"
        >
          Stop Settling For
          <br />
          <span className="shimmer-text">Average Supplements</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-graphite mt-6 max-w-xl mx-auto"
        >
          Order on WhatsApp for instant confirmation, or browse the full
          catalogue and check out online. Either way, your bag ships within
          24 hours.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/products">
            <Button variant="primary" size="lg" className="shadow-gold-glow">
              Start Shopping <ArrowRight size={18} />
            </Button>
          </Link>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" size="lg">
              <MessageCircle size={18} /> Order on WhatsApp
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
