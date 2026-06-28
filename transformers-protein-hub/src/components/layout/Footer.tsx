"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { CATEGORY_NAV, SITE_NAME, SUPPORT_EMAIL, SUPPORT_PHONE, STORE_ADDRESS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative bg-ink-raised border-t border-ink-border mt-20">
      <div className="tear-line" />
      <div className="mx-auto max-w-8xl px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2">
          <span className="font-display text-2xl uppercase text-bone">
            Transformers
          </span>
          <span className="block font-mono text-[10px] tracking-widest2 text-gold mt-1">
            PROTEIN HUB
          </span>
          <p className="text-graphite text-sm mt-4 max-w-xs leading-relaxed">
            Lab-verified sports nutrition for athletes who refuse to compromise.
            Every batch tested, every order genuine.
          </p>
          <div className="flex items-center gap-3 mt-6">
            {[Instagram, Facebook, Youtube].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ y: -3, borderColor: "#D4AF37" }}
                className="w-10 h-10 rounded-full border border-ink-border flex items-center justify-center text-bone/70 hover:text-gold transition-colors"
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow mb-4">Shop</p>
          <ul className="space-y-2.5">
            {CATEGORY_NAV.map((c) => (
              <li key={c.href}>
                <Link
                  href={c.href}
                  className="text-sm text-bone/70 hover:text-gold transition-colors"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Company</p>
          <ul className="space-y-2.5">
            <li>
              <Link href="/about" className="text-sm text-bone/70 hover:text-gold transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm text-bone/70 hover:text-gold transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/products" className="text-sm text-bone/70 hover:text-gold transition-colors">
                All Products
              </Link>
            </li>
            <li>
              <Link href="/wishlist" className="text-sm text-bone/70 hover:text-gold transition-colors">
                Wishlist
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Get In Touch</p>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-sm text-bone/70">
              <MapPin size={16} className="text-gold mt-0.5 shrink-0" />
              {STORE_ADDRESS}
            </li>
            <li className="flex items-center gap-2 text-sm text-bone/70">
              <Phone size={16} className="text-gold shrink-0" />
              {SUPPORT_PHONE}
            </li>
            <li className="flex items-center gap-2 text-sm text-bone/70">
              <Mail size={16} className="text-gold shrink-0" />
              {SUPPORT_EMAIL}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-border">
        <div className="mx-auto max-w-8xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-graphite">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p className="font-mono text-xs text-graphite tracking-widest2">
            LOT TPH — VERIFIED GENUINE
          </p>
        </div>
      </div>
    </footer>
  );
}
