import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  size?: number;
  showValue?: boolean;
  className?: string;
}

export default function RatingStars({
  rating,
  reviewCount,
  size = 14,
  showValue = false,
  className,
}: RatingStarsProps) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < Math.floor(rating);
          const half = !filled && i < rating;
          return (
            <Star
              key={i}
              size={size}
              className={cn(
                filled || half ? "text-gold fill-gold" : "text-graphite/40",
                half && "opacity-60"
              )}
            />
          );
        })}
      </div>
      {showValue && (
        <span className="font-mono text-xs text-bone-dim">{rating.toFixed(1)}</span>
      )}
      {reviewCount !== undefined && (
        <span className="font-mono text-xs text-graphite">({reviewCount})</span>
      )}
    </div>
  );
}
