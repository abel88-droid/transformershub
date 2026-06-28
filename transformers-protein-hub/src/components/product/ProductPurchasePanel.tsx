"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Minus, Plus, MessageCircle, ShieldCheck, Truck } from "lucide-react";
import { Product } from "@/types";
import { formatPrice, discountPercent, buildWhatsAppLink, cn } from "@/lib/utils";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import RatingStars from "@/components/ui/RatingStars";
import DiscountBadge from "@/components/ui/DiscountBadge";
import Button from "@/components/ui/Button";

export default function ProductPurchasePanel({ product }: { product: Product }) {
  const [flavor, setFlavor] = useState(product.flavors[0]?.name);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const wished = has(product.id);
  const discount = discountPercent(product.price, product.mrp);

  const whatsappLink = buildWhatsAppLink({
    phone: WHATSAPP_NUMBER,
    productName: `${product.name}${flavor ? ` (${flavor})` : ""}`,
    price: product.price * quantity,
    quantity,
  });

  const handleAddToCart = () => {
    addItem(product, quantity, flavor);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] tracking-widest2 text-graphite uppercase">
          {product.brand}
        </span>
        <span className="foil-seal">BATCH {product.batchCode}</span>
      </div>

      <h1 className="font-display text-3xl sm:text-4xl uppercase text-bone mt-2 leading-[1.05]">
        {product.name}
      </h1>

      <div className="flex items-center gap-4 mt-3">
        <RatingStars rating={product.rating} reviewCount={product.reviewCount} showValue size={16} />
        {product.isBestSeller && (
          <span className="font-mono text-[10px] tracking-widest2 text-gold border border-gold/30 px-2 py-0.5 rounded">
            BEST SELLER
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-3 mt-6">
        <span className="font-mono text-3xl text-gold font-semibold">
          {formatPrice(product.price)}
        </span>
        {discount > 0 && (
          <>
            <span className="font-mono text-lg text-graphite line-through">
              {formatPrice(product.mrp)}
            </span>
            <DiscountBadge percent={discount} />
          </>
        )}
      </div>

      <p className="text-graphite mt-5 leading-relaxed max-w-md">{product.shortDescription}</p>

      {product.flavors.length > 1 && (
        <div className="mt-7">
          <p className="eyebrow mb-3">Flavor — {flavor}</p>
          <div className="flex flex-wrap gap-2.5">
            {product.flavors.map((f) => (
              <button
                key={f.name}
                onClick={() => setFlavor(f.name)}
                className={cn(
                  "flex items-center gap-2 px-3.5 py-2 rounded-full text-xs border transition-colors",
                  flavor === f.name
                    ? "border-gold text-gold bg-gold/10"
                    : "border-ink-border text-bone/70 hover:border-bone/40"
                )}
              >
                <span
                  className="w-3 h-3 rounded-full border border-white/20"
                  style={{ backgroundColor: f.hex }}
                />
                {f.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 mt-7">
        <div className="flex items-center border border-ink-border rounded-full">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="p-3 text-bone/70 hover:text-gold"
            aria-label="Decrease quantity"
          >
            <Minus size={15} />
          </button>
          <span className="font-mono text-sm w-8 text-center text-bone">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="p-3 text-bone/70 hover:text-gold"
            aria-label="Increase quantity"
          >
            <Plus size={15} />
          </button>
        </div>
        <button
          onClick={() => toggle(product.id)}
          aria-label="Toggle wishlist"
          className="w-12 h-12 rounded-full border border-ink-border flex items-center justify-center hover:border-ember/50 transition-colors"
        >
          <Heart size={18} className={cn(wished ? "fill-ember text-ember" : "text-bone/70")} />
        </button>
      </div>

      <div className="flex flex-col gap-3 mt-6 max-w-md">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          disabled={!product.inStock}
          onClick={handleAddToCart}
        >
          <motion.span
            key={added ? "added" : "idle"}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {!product.inStock ? "Out of Stock" : added ? "Added to Bag ✓" : "Add to Bag"}
          </motion.span>
        </Button>
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
          <Button variant="secondary" size="lg" fullWidth>
            <MessageCircle size={18} /> Buy Now on WhatsApp
          </Button>
        </a>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8 max-w-md">
        <div className="flex items-center gap-2.5 text-xs text-bone/70">
          <ShieldCheck size={16} className="text-gold shrink-0" />
          100% genuine, batch verified
        </div>
        <div className="flex items-center gap-2.5 text-xs text-bone/70">
          <Truck size={16} className="text-gold shrink-0" />
          Dispatched within 24 hours
        </div>
      </div>
    </div>
  );
}
