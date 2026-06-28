"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { CartItem, Product } from "@/types";
import { products } from "@/data/products";

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, flavor?: string) => void;
  removeItem: (productId: string, flavor?: string) => void;
  updateQuantity: (productId: string, quantity: number, flavor?: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  lastAdded: Product | null;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = "tph_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<Product | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore corrupted storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback(
    (product: Product, quantity = 1, flavor?: string) => {
      setItems((prev) => {
        const existing = prev.find(
          (i) => i.productId === product.id && i.flavor === flavor
        );
        if (existing) {
          return prev.map((i) =>
            i.productId === product.id && i.flavor === flavor
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        }
        return [...prev, { productId: product.id, quantity, flavor }];
      });
      setLastAdded(product);
      setIsCartOpen(true);
    },
    []
  );

  const removeItem = useCallback((productId: string, flavor?: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.productId === productId && i.flavor === flavor))
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, quantity: number, flavor?: string) => {
      setItems((prev) =>
        prev
          .map((i) =>
            i.productId === productId && i.flavor === flavor
              ? { ...i, quantity }
              : i
          )
          .filter((i) => i.quantity > 0)
      );
    },
    []
  );

  const clearCart = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () =>
      items.reduce((sum, i) => {
        const product = products.find((p) => p.id === i.productId);
        return product ? sum + product.price * i.quantity : sum;
      }, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        isCartOpen,
        openCart,
        closeCart,
        lastAdded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
