import { useBuilderStore } from "../../store/useBuilderStore";
import { ProductImage } from "../ui/ProductImage";
import { QuantityStepper } from "../ui/QuantityStepper";
import { Price } from "../ui/Price";
import { lineTotal, lineCompareTotal } from "../../lib/pricing";
import { maxQtyOf } from "../../lib/catalog";
import type { Product, Variant } from "../../lib/types";

interface ReviewLineProps {
  product: Product;
  variant: Variant;
  qty: number;
}

export function ReviewLine({ product, variant, qty }: ReviewLineProps) {
  const increment = useBuilderStore((s) => s.increment);
  const decrement = useBuilderStore((s) => s.decrement);

  const locked = !product.addable || product.required;
  const total = lineTotal({ price: variant.price, qty });
  const compareTotal = variant.compareAtPrice
    ? lineCompareTotal({ price: variant.price, compareAtPrice: variant.compareAtPrice, qty })
    : undefined;

  return (
    <div className="flex items-center gap-7 py-3">
      <ProductImage productId={product.id} variantId={variant.id} icon={product.icon} category={product.category} alt={product.title} size="thumb" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-ink">{product.title}</p>
        {product.variants.length > 1 && <p className="text-xs text-subtle">{variant.label}</p>}
      </div>
      {product.step !== 2 &&
        <QuantityStepper
          qty={qty}
          onIncrement={() => increment(product.id, variant.id)}
          onDecrement={() => decrement(product.id, variant.id)}
          disabled={locked}
          min={locked ? 1 : 0}
          max={maxQtyOf(product, variant)}
          label={product.title}
        />}
      <Price price={total} compareAtPrice={compareTotal} tone="review" className="w-12 flex-none" />
    </div>
  );
}
