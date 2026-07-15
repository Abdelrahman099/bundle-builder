import { cn } from "../../lib/cn";
import { getVariantImage } from "../../assets/productImages";
import type { Variant } from "../../lib/types";

interface VariantChipProps {
  productId: string;
  variant: Variant;
  active: boolean;
  onSelect: () => void;
}

export function VariantChip({ productId, variant, active, onSelect }: VariantChipProps) {
  const thumb = getVariantImage(productId, variant.id);

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors",
        active ? "border-success text-ink" : "border-border-subtle text-body hover:border-subtle",
      )}
    >
      {thumb ? (
        <img src={thumb} alt="" aria-hidden className="h-4 w-4 flex-none rounded-sm object-contain" />
      ) : (
        <span
          className="h-3.5 w-3.5 flex-none rounded-full border border-black/10"
          style={{ backgroundColor: variant.swatchColor }}
          aria-hidden="true"
        />
      )}
      {variant.label}
    </button>
  );
}
