"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import { formatPrice, buildWhatsAppLink } from "@/lib/utils";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";

export default function CartDrawer() {
  const { items, isCartOpen, closeCart, updateQuantity, removeItem, subtotal, totalItems } =
    useCart();

  const cartProducts = items
    .map((item) => ({
      item,
      product: products.find((p) => p.id === item.productId),
    }))
    .filter((entry) => entry.product);

  const whatsappCheckoutLink = buildWhatsAppLink({
    phone: WHATSAPP_NUMBER,
    productName:
      cartProducts.length === 1
        ? cartProducts[0].product!.name
        : `${totalItems} items (cart order)`,
    price: subtotal,
  });

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            className="fixed right-0 top-0 z-[71] h-full w-full max-w-md bg-ink-raised border-l border-ink-border flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-ink-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="text-gold" size={20} />
                <h2 className="font-display text-lg uppercase text-bone">
                  Your Bag ({totalItems})
                </h2>
              </div>
              <button onClick={closeCart} aria-label="Close cart">
                <X className="text-bone/70 hover:text-gold" size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cartProducts.length === 0 ? (
                <EmptyState
                  icon={ShoppingBag}
                  title="Your bag is empty"
                  description="Add some premium fuel to get started on your transformation."
                  actionLabel="Browse Products"
                  actionHref="/products"
                />
              ) : (
                <ul className="space-y-5">
                  {cartProducts.map(({ item, product }) => (
                    <motion.li
                      key={`${item.productId}-${item.flavor}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex gap-4"
                    >
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-ink-surface shrink-0 border border-ink-border">
                        <Image
                          src={product!.images[0]}
                          alt={product!.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/products/${product!.slug}`}
                          onClick={closeCart}
                          className="text-sm font-semibold text-bone hover:text-gold transition-colors line-clamp-1"
                        >
                          {product!.name}
                        </Link>
                        {item.flavor && (
                          <p className="text-xs text-graphite mt-0.5">{item.flavor}</p>
                        )}
                        <p className="font-mono text-sm text-gold mt-1">
                          {formatPrice(product!.price)}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center border border-ink-border rounded-full">
                            <button
                              onClick={() =>
                                updateQuantity(item.productId, item.quantity - 1, item.flavor)
                              }
                              className="p-1.5 text-bone/70 hover:text-gold"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="font-mono text-xs w-6 text-center text-bone">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.productId, item.quantity + 1, item.flavor)
                              }
                              className="p-1.5 text-bone/70 hover:text-gold"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.productId, item.flavor)}
                            aria-label="Remove item"
                            className="text-graphite hover:text-ember transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {cartProducts.length > 0 && (
              <div className="border-t border-ink-border px-6 py-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-graphite">Subtotal</span>
                  <span className="font-mono text-lg text-gold font-semibold">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <Link href="/cart" onClick={closeCart}>
                  <Button variant="secondary" fullWidth>
                    View Bag
                  </Button>
                </Link>
                <a href={whatsappCheckoutLink} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" fullWidth>
                    Checkout on WhatsApp
                  </Button>
                </a>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
