import { useBuilderStore } from "../../store/useBuilderStore";
import { useActiveVariantId, useQty } from "../../store/selectors";
import { Badge } from "../ui/Badge";
import { Price } from "../ui/Price";
import { ProductImage } from "../ui/ProductImage";
import { QuantityStepper } from "../ui/QuantityStepper";
import { VariantSelector } from "./VariantSelector";
import { cn } from "../../lib/cn";
import { productsByStep, maxQtyOf } from "../../lib/catalog";
import type { Product } from "../../lib/types";

export function ProductCard({ product }: { product: Product }) {
  const activeVariantId = useActiveVariantId(product);
  const activeVariant =
    product.variants.find((v) => v.id === activeVariantId) ?? product.variants[0];
  const qty = useQty(product.id, activeVariantId);

  const increment = useBuilderStore((s) => s.increment);
  const decrement = useBuilderStore((s) => s.decrement);
  const setActiveVariant = useBuilderStore((s) => s.setActiveVariant);
  const setQty = useBuilderStore((s) => s.setQty);

  const selected = qty > 0;
  const hasVariants = product.variants.length > 1;

  const handleCardClick = () => {
    if (product.step === 2) {
      const stepProducts = productsByStep(2);
      stepProducts.forEach((p) => {
        const isCurrent = p.id === product.id;
        p.variants.forEach((v) => {
          setQty(p.id, v.id, isCurrent && v.id === activeVariantId ? 1 : 0);
        });
      });
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={cn(
        // 1/row below lg · 2/row (centered) lg→xxl · single row at xxl+.
        // basis+min-w let xxl rows wrap down instead of crushing; max-w keeps
        // wrapped orphans from stretching edge-to-edge.
        "relative flex flex-col rounded-card border-2 bg-white p-5 shadow-card transition-colors w-full lg:w-[calc(49%-0.5rem)] xxl:w-auto xxl:flex-1 xxl:basis-[13rem] xxl:min-w-[12.5rem] xxl:max-w-[24rem]",
        product.step === 2 && "cursor-pointer hover:border-brand-300",
        selected ? "border-brand-400" : "border-transparent",
      )}
    >
      {product.badge && (
        <Badge className="absolute -top-1 left-4 z-10 shadow-sm">{product.badge}</Badge>
      )}

      <div className="flex flex-row gap-4 h-[100%] xxl:flex-col ">
        <div className="flex justify-center  ">
          <ProductImage productId={product.id} variantId={activeVariantId} icon={product.icon} category={product.category} alt={product.title} size="card" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-between h-[100%]">
          <div className="flex ">
            <div className="min-w-0 flex-1 ">
              <h3 className="text-base font-semibold text-ink">{product.title}</h3>
              {product.description && (
                <p className="mt-1 text-sm leading-snug text-body">
                  {product.description}{" "}
                  {product.learnMoreUrl && (
                    <a
                      href={product.learnMoreUrl}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-block text-sm font-medium text-brand-500 underline underline-offset-2 hover:text-brand-600"
                    >
                      Learn More
                    </a>
                  )}
                </p>
              )}
            </div>
          </div>

          {hasVariants && (
            <div className="mt-4">
              <VariantSelector
                product={product}
                activeVariantId={activeVariantId}
                onSelect={(variantId) => setActiveVariant(product.id, variantId)}
              />
            </div>
          )}

          <div className="mt-auto pt-4 flex items-center justify-between gap-3">
            {product.step !== 2 && <QuantityStepper
              qty={qty}
              onIncrement={() => increment(product.id, activeVariantId)}
              onDecrement={() => decrement(product.id, activeVariantId)}
              max={maxQtyOf(product, activeVariant)}
              label={product.title}
            />}
            <Price
              price={activeVariant.price}
              compareAtPrice={activeVariant.compareAtPrice}
              suffix={product.priceSuffix}
              tone="card"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
