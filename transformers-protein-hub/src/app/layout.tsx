import type { Metadata } from "next";
import { Anton, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import BackToTop from "@/components/layout/BackToTop";
import WhatsAppFloatingButton from "@/components/layout/WhatsAppFloatingButton";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Premium Sports Nutrition`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Premium whey protein, creatine, mass gainers, pre-workouts, vitamins and fish oil. 100% genuine, lab-verified supplements with fast delivery across India.",
  keywords: [
    "whey protein India",
    "creatine monohydrate",
    "mass gainer",
    "pre workout supplement",
    "sports nutrition store",
    "genuine supplements",
  ],
  authors: [{ name: SITE_NAME }],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Fuel Your Transformation`,
    description:
      "Premium sports nutrition: whey protein, creatine, mass gainers, pre-workouts, vitamins and fish oil. 100% genuine and lab-verified.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Fuel Your Transformation`,
    description:
      "Premium sports nutrition: whey protein, creatine, mass gainers, pre-workouts, vitamins and fish oil.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        className={`${anton.variable} ${inter.variable} ${jetbrainsMono.variable} font-body bg-ink text-bone antialiased`}
      >
        <ThemeProvider>
          <WishlistProvider>
            <CartProvider>
              <Navbar />
              <main className="min-h-screen">{children}</main>
              <Footer />
              <CartDrawer />
              <BackToTop />
              <WhatsAppFloatingButton />
            </CartProvider>
          </WishlistProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
