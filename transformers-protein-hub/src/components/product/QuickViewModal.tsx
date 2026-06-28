"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, MessageCircle, Minus, Plus } from "lucide-react";
import { Product } from "@/types";
import { formatPrice, discountPercent, buildWhatsAppLink } from "@/lib/utils";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { useCart } from "@/context/CartContext";
import RatingStars from "@/components/ui/RatingStars";
import DiscountBadge from "@/components/ui/DiscountBadge";
import Button from "@/components/ui/Button";

interface QuickViewModalProps {
  product: Product;
  open: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, open, onClose }: QuickViewModalProps) {
  const [flavor, setFlavor] = useState(product.flavors[0]?.name);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const discount = discountPercent(product.price, product.mrp);

  const whatsappLink = buildWhatsAppLink({
    phone: WHATSAPP_NUMBER,
    productName: `${product.name}${flavor ? ` (${flavor})` : ""}`,
    price: product.price * quantity,
    quantity,
  });

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-black/75 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-[81] max-w-3xl w-full max-h-[85vh] overflow-y-auto bg-ink-raised border border-ink-border rounded-2xl shadow-card-hover"
          >
            <button
              onClick={onClose}
              aria-label="Close quick view"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-ink/70 flex items-center justify-center hover:bg-ink"
            >
              <X size={18} className="text-bone" />
            </button>

            <div className="grid sm:grid-cols-2 gap-0">
              <div className="relative aspect-square bg-ink-surface">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                {discount > 0 && (
                  <DiscountBadge percent={discount} className="absolute top-4 left-4" />
                )}
              </div>

              <div className="p-6 sm:p-8 flex flex-col">
                <span className="font-mono text-[10px] tracking-widest2 text-graphite uppercase">
                  {product.brand}
                </span>
                <h3 className="font-display text-2xl uppercase text-bone mt-1">
                  {product.name}
                </h3>
                <RatingStars
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  showValue
                  className="mt-2"
                />
                <div className="flex items-baseline gap-3 mt-4">
                  <span className="font-mono text-2xl text-gold font-semibold">
                    {formatPrice(product.price)}
                  </span>
                  {discount > 0 && (
                    <span className="font-mono text-sm text-graphite line-through">
                      {formatPrice(product.mrp)}
                    </span>
                  )}
                </div>

                <p className="text-graphite text-sm mt-4 leading-relaxed">
                  {product.shortDescription}
                </p>

                {product.flavors.length > 1 && (
                  <div className="mt-5">
                    <p className="eyebrow mb-2">Flavor</p>
                    <div className="flex flex-wrap gap-2">
                      {product.flavors.map((f) => (
                        <button
                          key={f.name}
                          onClick={() => setFlavor(f.name)}
                          className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                            flavor === f.name
                              ? "border-gold text-gold bg-gold/10"
                              : "border-ink-border text-bone/70 hover:border-bone/40"
                          }`}
                        >
                          {f.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-5 flex items-center gap-3">
                  <div className="flex items-center border border-ink-border rounded-full">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-2.5 text-bone/70 hover:text-gold"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-mono text-sm w-8 text-center text-bone">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-2.5 text-bone/70 hover:text-gold"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="font-mono text-xs text-graphite">
                    {product.servings} servings / tub
                  </span>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <Button
                    variant="primary"
                    fullWidth
                    disabled={!product.inStock}
                    onClick={() => {
                      addItem(product, quantity, flavor);
                      onClose();
                    }}
                  >
                    {product.inStock ? "Add to Bag" : "Out of Stock"}
                  </Button>
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <Button variant="secondary" fullWidth>
                      <MessageCircle size={16} /> Order on WhatsApp
                    </Button>
                  </a>
                </div>

                <Link
                  href={`/products/${product.slug}`}
                  onClick={onClose}
                  className="mt-4 text-xs text-center text-graphite hover:text-gold transition-colors underline underline-offset-2"
                >
                  View full details
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
