import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function discountPercent(price: number, mrp: number): number {
  if (mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}

export function buildWhatsAppLink(opts: {
  phone: string;
  productName?: string;
  price?: number;
  quantity?: number;
}): string {
  const { phone, productName, price, quantity } = opts;
  let message = "Hi Transformers Protein Hub, I'd like to order";
  if (productName) {
    message += ` ${quantity && quantity > 1 ? `${quantity}x ` : ""}${productName}`;
  }
  if (price) {
    message += ` (₹${price})`;
  }
  message += ". Please confirm availability.";
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
