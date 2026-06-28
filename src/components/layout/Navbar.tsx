"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, Menu, X, Sun, Moon } from "lucide-react";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useTheme } from "@/context/ThemeContext";
import { NAV_LINKS, CATEGORY_NAV } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const scrolled = useScrollPosition(40);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { totalItems, openCart } = useCart();
  const { count } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery("");
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-ink/90 backdrop-blur-md border-b border-ink-border py-3"
            : "bg-transparent py-5"
        )}
      >
        <nav className="mx-auto max-w-8xl px-4 sm:px-6 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <span className="font-display text-xl sm:text-2xl tracking-tight text-bone uppercase">
              Transformers
            </span>
            <span className="hidden sm:inline font-mono text-[10px] tracking-widest2 text-gold border border-gold/40 rounded px-2 py-1">
              PROTEIN HUB
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-wide text-bone/80 hover:text-gold transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <div className="relative group">
              <span className="text-sm tracking-wide text-bone/80 hover:text-gold transition-colors cursor-default">
                Categories
              </span>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="glass rounded-xl p-2 w-56 shadow-card">
                  {CATEGORY_NAV.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="block px-4 py-2.5 text-sm text-bone/80 hover:text-gold hover:bg-white/5 rounded-lg transition-colors"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="p-2.5 text-bone/80 hover:text-gold transition-colors"
            >
              <Search size={20} />
            </button>
            <button
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="p-2.5 text-bone/80 hover:text-gold transition-colors hidden sm:block"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="p-2.5 text-bone/80 hover:text-gold transition-colors relative"
            >
              <Heart size={20} />
              {count > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-ember text-[10px] flex items-center justify-center text-bone font-mono">
                  {count}
                </span>
              )}
            </Link>
            <button
              aria-label="Open cart"
              onClick={openCart}
              className="p-2.5 text-bone/80 hover:text-gold transition-colors relative"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="absolute top-0 right-0 w-4 h-4 rounded-full bg-gold text-[10px] flex items-center justify-center text-ink font-mono font-bold"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>
            <button
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="p-2.5 text-bone/80 hover:text-gold transition-colors lg:hidden"
            >
              <Menu size={22} />
            </button>
          </div>
        </nav>
      </header>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/95 backdrop-blur-md flex items-start justify-center pt-32 px-6"
            onClick={() => setSearchOpen(false)}
          >
            <motion.form
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleSearchSubmit}
              className="w-full max-w-2xl"
            >
              <div className="flex items-center gap-3 border-b-2 border-gold pb-4">
                <Search className="text-gold" size={24} />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search whey, creatine, pre-workout..."
                  className="flex-1 bg-transparent text-2xl font-display uppercase text-bone placeholder:text-graphite outline-none"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                >
                  <X className="text-bone/60 hover:text-gold" size={24} />
                </button>
              </div>
              <p className="mt-4 font-mono text-xs text-graphite tracking-widest2">
                PRESS ENTER TO SEARCH
              </p>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/95 backdrop-blur-md lg:hidden"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 h-full w-full max-w-sm bg-ink-raised border-l border-ink-border p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-10">
                <span className="font-display text-xl uppercase text-bone">Menu</span>
                <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
                  <X className="text-bone" size={24} />
                </button>
              </div>
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block py-3 text-lg font-display uppercase text-bone hover:text-gold transition-colors border-b border-ink-border"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8">
                <p className="eyebrow mb-3">Categories</p>
                <div className="flex flex-col gap-1">
                  {CATEGORY_NAV.map((c, i) => (
                    <motion.div
                      key={c.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.04 }}
                    >
                      <Link
                        href={c.href}
                        onClick={() => setMenuOpen(false)}
                        className="block py-2.5 text-sm text-bone/80 hover:text-gold transition-colors"
                      >
                        {c.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className="mt-auto flex items-center gap-2 text-sm text-bone/80 hover:text-gold py-3"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                Switch to {theme === "dark" ? "light" : "dark"} mode
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
