import { Metadata } from "next";
import { Suspense } from "react";
import SearchPageClient from "@/components/product/SearchPageClient";
import { ProductGridSkeleton } from "@/components/ui/Skeletons";

export const metadata: Metadata = {
  title: "Search",
  description: "Search the Transformers Protein Hub catalogue by product, brand, or category.",
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-32 sm:pt-40 pb-20">
          <div className="mx-auto max-w-8xl px-6">
            <ProductGridSkeleton count={8} />
          </div>
        </div>
      }
    >
      <SearchPageClient />
    </Suspense>
  );
}
