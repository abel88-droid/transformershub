import { cn } from "@/lib/utils";

interface DiscountBadgeProps {
  percent: number;
  className?: string;
}

export default function DiscountBadge({ percent, className }: DiscountBadgeProps) {
  if (percent <= 0) return null;
  return (
    <span className={cn("foil-seal inline-block", className)}>
      -{percent}% OFF
    </span>
  );
}
