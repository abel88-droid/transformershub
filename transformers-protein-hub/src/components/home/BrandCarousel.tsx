import { brands } from "@/data/brands";

export default function BrandCarousel() {
  const loop = [...brands, ...brands];

  return (
    <section className="relative py-14 border-y border-ink-border bg-ink-raised overflow-hidden">
      <div className="mx-auto max-w-8xl px-6 mb-8">
        <p className="eyebrow text-center">Trusted By Athletes Who Stock</p>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-ink-raised to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-ink-raised to-transparent z-10" />
        <div className="flex w-max animate-marquee">
          {loop.map((brand, i) => (
            <div
              key={`${brand.id}-${i}`}
              className="flex items-center px-10 sm:px-14"
            >
              <span className="font-display text-2xl sm:text-3xl uppercase text-bone/30 hover:text-gold/80 transition-colors duration-300 tracking-wide whitespace-nowrap">
                {brand.logoText}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
