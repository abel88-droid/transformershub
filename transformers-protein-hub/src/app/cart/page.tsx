"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import { formatPrice, buildWhatsAppLink } from "@/lib/utils";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import PageHero from "@/components/ui/PageHero";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, totalItems, clearCart } = useCart();

  const cartProducts = items
    .map((item) => ({ item, product: products.find((p) => p.id === item.productId) }))
    .filter((entry) => entry.product);

  const shipping = subtotal > 2000 || subtotal === 0 ? 0 : 99;
  const total = subtotal + shipping;

  const summaryLines = cartProducts
    .map(
      ({ item, product }) =>
        `${item.quantity}x ${product!.name}${item.flavor ? ` (${item.flavor})` : ""}`
    )
    .join(", ");

  const whatsappLink = buildWhatsAppLink({
    phone: WHATSAPP_NUMBER,
    productName: summaryLines || undefined,
    price: total,
  });

  return (
    <>
      <PageHero eyebrow="Your Order" title="Shopping Bag" />

      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-8xl px-6">
          {cartProducts.length === 0 ? (
            <EmptyState
              icon={ShoppingBag}
              title="Your bag is empty"
              description="Looks like you haven't added anything yet. Explore our best sellers to get started."
              actionLabel="Browse Products"
              actionHref="/products"
            />
          ) : (
            <div className="grid lg:grid-cols-[1fr_360px] gap-10">
              <div>
                <div className="hidden sm:grid grid-cols-[1fr_120px_100px_40px] gap-4 px-2 pb-4 border-b border-ink-border font-mono text-[10px] tracking-widest2 text-graphite">
                  <span>PRODUCT</span>
                  <span className="text-center">QUANTITY</span>
                  <span className="text-right">TOTAL</span>
                  <span />
                </div>
                <AnimatePresence>
                  {cartProducts.map(({ item, product }) => (
                    <motion.div
                      key={`${item.productId}-${item.flavor}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -30 }}
                      className="grid sm:grid-cols-[1fr_120px_100px_40px] gap-4 items-center py-5 border-b border-ink-border"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-ink-surface shrink-0 border border-ink-border">
                          <Image
                            src={product!.images[0]}
                            alt={product!.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <Link
                            href={`/products/${product!.slug}`}
                            className="font-semibold text-bone hover:text-gold transition-colors"
                          >
                            {product!.name}
                          </Link>
                          {item.flavor && (
                            <p className="text-xs text-graphite mt-0.5">{item.flavor}</p>
                          )}
                          <p className="font-mono text-sm text-gold mt-1">
                            {formatPrice(product!.price)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-center">
                        <div className="flex items-center border border-ink-border rounded-full">
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity - 1, item.flavor)
                            }
                            className="p-2.5 text-bone/70 hover:text-gold"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="font-mono text-sm w-8 text-center text-bone">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity + 1, item.flavor)
                            }
                            className="p-2.5 text-bone/70 hover:text-gold"
                            aria-label="Increase quantity"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      </div>

                      <p className="font-mono text-right text-bone">
                        {formatPrice(product!.price * item.quantity)}
                      </p>

                      <button
                        onClick={() => removeItem(item.productId, item.flavor)}
                        aria-label="Remove item"
                        className="text-graphite hover:text-ember transition-colors justify-self-end sm:justify-self-center"
                      >
                        <Trash2 size={16} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <button
                  onClick={clearCart}
                  className="mt-6 text-xs text-graphite hover:text-ember transition-colors underline underline-offset-2"
                >
                  Clear bag
                </button>
              </div>

              <div className="label-card rounded-2xl p-6 h-fit sticky top-28">
                <h3 className="font-display text-xl uppercase text-bone mb-6">Order Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-bone/70">
                    <span>Subtotal ({totalItems} items)</span>
                    <span className="font-mono">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-bone/70">
                    <span>Shipping</span>
                    <span className="font-mono">
                      {shipping === 0 ? "FREE" : formatPrice(shipping)}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="font-mono text-[10px] text-gold tracking-wide">
                      ADD {formatPrice(2000 - subtotal)} MORE FOR FREE SHIPPING
                    </p>
                  )}
                </div>
                <div className="tear-line my-5" />
                <div className="flex justify-between items-baseline">
                  <span className="text-bone font-semibold">Total</span>
                  <span className="font-mono text-2xl text-gold font-semibold">
                    {formatPrice(total)}
                  </span>
                </div>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-6"
                >
                  <Button variant="primary" fullWidth size="lg">
                    <MessageCircle size={18} /> Checkout on WhatsApp
                  </Button>
                </a>
                <Link href="/products" className="block mt-3">
                  <Button variant="ghost" fullWidth>
                    Continue Shopping <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
