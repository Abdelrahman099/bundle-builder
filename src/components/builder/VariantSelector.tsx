import { VariantChip } from "../ui/VariantChip";
import type { Product } from "../../lib/types";

interface VariantSelectorProps {
  product: Product;
  activeVariantId: string;
  onSelect: (variantId: string) => void;
}

export function VariantSelector({ product, activeVariantId, onSelect }: VariantSelectorProps) {
  return (
    <div className="flex flex-wrap gap-1" role="radiogroup" aria-label={`${product.title} color`}>
      {product.variants.map((variant) => (
        <VariantChip
          key={variant.id}
          productId={product.id}
          variant={variant}
          active={variant.id === activeVariantId}
          onSelect={() => onSelect(variant.id)}
        />
      ))}
    </div>
  );
}
