export default function Loading() {
  return (
    <div className="pt-28 sm:pt-32 pb-20">
      <div className="mx-auto max-w-8xl px-6">
        <div className="grid lg:grid-cols-2 gap-12 animate-pulse">
          <div className="aspect-square rounded-2xl bg-ink-surface" />
          <div className="space-y-4">
            <div className="h-3 w-24 bg-ink-surface rounded" />
            <div className="h-10 w-3/4 bg-ink-surface rounded" />
            <div className="h-4 w-1/2 bg-ink-surface rounded" />
            <div className="h-8 w-40 bg-ink-surface rounded" />
            <div className="h-32 w-full bg-ink-surface rounded mt-6" />
            <div className="h-12 w-full bg-ink-surface rounded-full mt-6" />
            <div className="h-12 w-full bg-ink-surface rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
