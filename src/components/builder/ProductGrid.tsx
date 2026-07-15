import { productsByStep } from "../../lib/catalog";
import { ProductCard } from "./ProductCard";
import type { StepNumber } from "../../lib/types";

export function ProductGrid({ step }: { step: StepNumber }) {
  const products = productsByStep(step).filter((p) => p.addable);
  {/*
      Always allow wrapping — cards have a min width, so when a row runs out of
      room they drop to the next line (centered) instead of crushing each other.
      Row counts come from the card widths: 1/row below lg, 2/row lg→xxl,
      one full row at xxl+ (gap-4 = 1rem, so the 50% cards subtract 0.5rem).
    */}
  return (

    <div className="flex flex-wrap justify-center gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
