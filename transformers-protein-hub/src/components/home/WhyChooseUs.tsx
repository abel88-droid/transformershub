"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Truck, Tag, Award } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const reasons = [
  {
    icon: ShieldCheck,
    title: "100% Genuine",
    description:
      "Every product is sourced directly from authorized distributors with verifiable batch codes.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Same-day dispatch and 24-48 hour delivery across major cities, tracked end to end.",
  },
  {
    icon: Tag,
    title: "Best Price",
    description:
      "Direct sourcing cuts the middleman, so you pay for the formula, not the markup.",
  },
  {
    icon: Award,
    title: "Trusted Store",
    description:
      "500+ verified five-star reviews from athletes who've made us their permanent supplier.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-24 sm:py-28 bg-ink">
      <div className="mx-auto max-w-8xl px-6">
        <SectionHeading
          eyebrow="The Standard"
          title="Why Lifters Choose Us"
          align="center"
          description="Four commitments we don't compromise on, no matter the order size."
          className="mx-auto"
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="label-card rounded-2xl p-7 group cursor-default"
            >
              <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mb-5 group-hover:bg-gold group-hover:shadow-gold-glow transition-all duration-300">
                <reason.icon
                  size={24}
                  className="text-gold group-hover:text-ink transition-colors duration-300"
                />
              </div>
              <h3 className="font-display text-xl uppercase text-bone mb-2">
                {reason.title}
              </h3>
              <p className="text-graphite text-sm leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
