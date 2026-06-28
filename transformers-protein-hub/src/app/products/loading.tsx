import { ProductGridSkeleton } from "@/components/ui/Skeletons";

export default function Loading() {
  return (
    <div className="pt-32 sm:pt-40 pb-20">
      <div className="mx-auto max-w-8xl px-6">
        <div className="h-3 w-32 bg-ink-surface rounded mb-4 animate-pulse" />
        <div className="h-10 w-72 bg-ink-surface rounded mb-10 animate-pulse" />
        <ProductGridSkeleton count={9} />
      </div>
    </div>
  );
}
