export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ink">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-ink-border" />
          <div className="absolute inset-0 rounded-full border-2 border-t-gold border-r-transparent border-b-transparent border-l-transparent animate-spin" />
        </div>
        <span className="font-mono text-[10px] tracking-widest2 text-graphite uppercase">
          Loading
        </span>
      </div>
    </div>
  );
}
