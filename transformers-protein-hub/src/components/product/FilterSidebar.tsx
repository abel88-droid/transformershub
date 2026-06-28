"use client";

import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";
import { Category } from "@/types";

interface FilterSidebarProps {
  selectedCategories: Category[];
  onToggleCategory: (cat: Category) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  inStockOnly: boolean;
  onToggleInStock: () => void;
  minRating: number;
  onMinRatingChange: (rating: number) => void;
  hideCategories?: boolean;
}

const MAX_PRICE = 5500;

export default function FilterSidebar({
  selectedCategories,
  onToggleCategory,
  priceRange,
  onPriceChange,
  inStockOnly,
  onToggleInStock,
  minRating,
  onMinRatingChange,
  hideCategories = false,
}: FilterSidebarProps) {
  return (
    <div className="space-y-8">
      {!hideCategories && (
        <div>
          <p className="eyebrow mb-4">Category</p>
          <div className="space-y-2.5">
            {categories.map((cat) => (
              <label
                key={cat.slug}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.slug)}
                  onChange={() => onToggleCategory(cat.slug)}
                  className="w-4 h-4 rounded accent-gold cursor-pointer"
                />
                <span className="text-sm text-bone/80 group-hover:text-gold transition-colors">
                  {cat.name}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="eyebrow mb-4">Price Range</p>
        <input
          type="range"
          min={0}
          max={MAX_PRICE}
          step={100}
          value={priceRange[1]}
          onChange={(e) => onPriceChange([0, Number(e.target.value)])}
          className="w-full accent-gold cursor-pointer"
        />
        <div className="flex items-center justify-between mt-2 font-mono text-xs text-graphite">
          <span>₹0</span>
          <span className="text-gold">₹{priceRange[1].toLocaleString("en-IN")}</span>
        </div>
      </div>

      <div>
        <p className="eyebrow mb-4">Minimum Rating</p>
        <div className="flex gap-2">
          {[0, 3, 4, 4.5].map((r) => (
            <button
              key={r}
              onClick={() => onMinRatingChange(r)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-mono border transition-colors",
                minRating === r
                  ? "border-gold text-gold bg-gold/10"
                  : "border-ink-border text-bone/60 hover:border-bone/40"
              )}
            >
              {r === 0 ? "All" : `${r}+`}
            </button>
          ))}
        </div>
      </div>

      <label className="flex items-center gap-2.5 cursor-pointer">
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={onToggleInStock}
          className="w-4 h-4 rounded accent-gold cursor-pointer"
        />
        <span className="text-sm text-bone/80">In stock only</span>
      </label>
    </div>
  );
}

export { MAX_PRICE };
