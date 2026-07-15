import { formatMoney, formatPrice } from "../../lib/format";
import { cn } from "../../lib/cn";

interface PriceProps {
  price: number;
  compareAtPrice?: number;
  suffix?: string;
  /** "card" = ink active price, red strike. "review" = brand-colored active price, muted strike. */
  tone?: "card" | "review";
  align?: "start" | "end";
  className?: string;
}

export function Price({ price, compareAtPrice, suffix, tone = "card", align = "end", className }: PriceProps) {
  const hasDiscount = typeof compareAtPrice === "number" && compareAtPrice > price;

  return (
    <span
      className={cn(
        "flex flex-wrap items-baseline gap-x-1.5 gap-y-0",
        align === "end" ? "justify-end text-right" : "justify-start text-left",
        className,
      )}
    >
      {hasDiscount && (
        <span
          className={cn(
            "text-sm line-through",
            tone === "card" ? "text-danger" : "text-subtle",
          )}
        >
          {formatMoney(compareAtPrice!)}
        </span>
      )}
      <span
        className={cn(
          "text-base font-bold",
          tone === "card" ? "text-ink" : "text-brand-500",
        )}
      >
        {formatPrice(price, suffix)}
      </span>
    </span>
  );
}
