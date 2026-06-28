"use client";

import { useMemo, useState } from "react";
import { Product, SortOption, Category } from "@/types";
import { MAX_PRICE } from "@/components/product/FilterSidebar";

interface UseProductFilterOptions {
  baseProducts: Product[];
  lockedCategory?: Category;
}

export function useProductFilter({ baseProducts, lockedCategory }: UseProductFilterOptions) {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(
    lockedCategory ? [lockedCategory] : []
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, MAX_PRICE]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<SortOption>("featured");

  const toggleCategory = (cat: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const resetFilters = () => {
    setSelectedCategories(lockedCategory ? [lockedCategory] : []);
    setPriceRange([0, MAX_PRICE]);
    setInStockOnly(false);
    setMinRating(0);
  };

  const filtered = useMemo(() => {
    let result = baseProducts.filter((p) => {
      if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) {
        return false;
      }
      if (p.price > priceRange[1]) return false;
      if (inStockOnly && !p.inStock) return false;
      if (p.rating < minRating) return false;
      return true;
    });

    switch (sort) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result = [...result].sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
      default:
        result = [...result].sort((a, b) => Number(b.isBestSeller) - Number(a.isBestSeller));
    }

    return result;
  }, [baseProducts, selectedCategories, priceRange, inStockOnly, minRating, sort]);

  return {
    selectedCategories,
    toggleCategory,
    priceRange,
    setPriceRange,
    inStockOnly,
    setInStockOnly: () => setInStockOnly((v) => !v),
    minRating,
    setMinRating,
    sort,
    setSort,
    filtered,
    resetFilters,
  };
}
