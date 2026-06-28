"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Eye, MessageCircle } from "lucide-react";
import { Product } from "@/types";
import { formatPrice, discountPercent, buildWhatsAppLink, cn } from "@/lib/utils";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { useWishlist } from "@/context/WishlistContext";
import RatingStars from "@/components/ui/RatingStars";
import DiscountBadge from "@/components/ui/DiscountBadge";
import QuickViewModal from "./QuickViewModal";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { has, toggle } = useWishlist();
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const wished = has(product.id);
  const discount = discountPercent(product.price, product.mrp);

  const whatsappLink = buildWhatsAppLink({
    phone: WHATSAPP_NUMBER,
    productName: product.name,
    price: product.price,
  });

  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="label-card group rounded-2xl overflow-hidden flex flex-col h-full"
      >
        <div className="relative aspect-square overflow-hidden bg-ink-surface">
          <Link href={`/products/${product.slug}`}>
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </Link>

          <div className="absolute top-3 left-3 flex flex-col gap-2 items-start">
            {discount > 0 && <DiscountBadge percent={discount} />}
            {product.isNew && (
              <span className="font-mono text-[10px] tracking-widest2 bg-ink/80 text-bone border border-gold/40 px-2 py-1 rounded">
                NEW
              </span>
            )}
            {!product.inStock && (
              <span className="font-mono text-[10px] tracking-widest2 bg-ember/90 text-bone px-2 py-1 rounded">
                SOLD OUT
              </span>
            )}
          </div>

          <button
            onClick={() => toggle(product.id)}
            aria-label="Toggle wishlist"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-ink/70 backdrop-blur flex items-center justify-center hover:bg-ink transition-colors"
          >
            <Heart
              size={15}
              className={cn(
                wished ? "fill-ember text-ember" : "text-bone/80"
              )}
            />
          </button>

          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex">
            <button
              onClick={() => setQuickViewOpen(true)}
              className="flex-1 flex items-center justify-center gap-1.5 bg-bone text-ink text-xs font-semibold py-2.5 hover:bg-gold transition-colors"
            >
              <Eye size={13} /> Quick View
            </button>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 bg-[#25D366] text-white text-xs font-semibold py-2.5 hover:bg-[#1ebe57] transition-colors"
            >
              <MessageCircle size={13} /> Buy Now
            </a>
          </div>
        </div>

        <div className="p-4 flex flex-col flex-1">
          <span className="font-mono text-[10px] tracking-widest2 text-graphite uppercase">
            {product.brand}
          </span>
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-semibold text-bone text-sm sm:text-base mt-1 line-clamp-1 hover:text-gold transition-colors">
              {product.name}
            </h3>
          </Link>
          <RatingStars
            rating={product.rating}
            reviewCount={product.reviewCount}
            className="mt-2"
          />
          <div className="flex items-baseline gap-2 mt-3">
            <span className="font-mono text-base sm:text-lg text-gold font-semibold">
              {formatPrice(product.price)}
            </span>
            {discount > 0 && (
              <span className="font-mono text-xs text-graphite line-through">
                {formatPrice(product.mrp)}
              </span>
            )}
          </div>
        </div>
      </motion.div>

      <QuickViewModal
        product={product}
        open={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </>
  );
}
