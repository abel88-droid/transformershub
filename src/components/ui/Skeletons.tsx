export function ProductCardSkeleton() {
  return (
    <div className="label-card rounded-2xl overflow-hidden animate-pulse">
      <div className="aspect-square bg-ink-surface" />
      <div className="p-5 space-y-3">
        <div className="h-3 w-1/3 bg-ink-surface rounded" />
        <div className="h-4 w-3/4 bg-ink-surface rounded" />
        <div className="h-3 w-1/2 bg-ink-surface rounded" />
        <div className="h-8 w-full bg-ink-surface rounded-full mt-4" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function CategoryCardSkeleton() {
  return (
    <div className="aspect-[4/5] rounded-2xl bg-ink-surface animate-pulse" />
  );
}
