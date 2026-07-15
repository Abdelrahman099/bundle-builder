import { useMemo } from "react";
import { useBuilderStore } from "./useBuilderStore";
import { catalog, productsByStep } from "../lib/catalog";
import { computeTotals, type PriceableLine } from "../lib/pricing";
import { variantKey, type StepNumber, type Product, type Variant } from "../lib/types";

export function useQty(productId: string, variantId: string): number {
  return useBuilderStore((s) => s.quantities[variantKey(productId, variantId)] ?? 0);
}

export function useActiveVariantId(product: Product): string {
  return useBuilderStore((s) => s.activeVariant[product.id] ?? product.defaultVariantId);
}

/** Distinct products in a step with at least one variant selected (qty > 0). */
export function useStepSelectedCount(step: StepNumber): number {
  const quantities = useBuilderStore((s) => s.quantities);
  return useMemo(() => {
    let count = 0;
    for (const product of productsByStep(step)) {
      const hasQty = product.variants.some((v) => (quantities[variantKey(product.id, v.id)] ?? 0) > 0);
      if (hasQty) count++;
    }
    return count;
  }, [quantities, step]);
}

export interface ReviewLineData {
  product: Product;
  variant: Variant;
  qty: number;
}

export interface ReviewGroup {
  category: Product["category"];
  label: string;
  lines: ReviewLineData[];
}

const CATEGORY_LABELS: Record<Product["category"], string> = {
  cameras: "Cameras",
  sensors: "Sensors",
  accessories: "Accessories",
  plan: "Plan",
};

const CATEGORY_ORDER: Product["category"][] = ["cameras", "sensors", "accessories", "plan"];

export function useReviewGroups(): ReviewGroup[] {
  const quantities = useBuilderStore((s) => s.quantities);
  return useMemo(() => {
    const byCategory = new Map<Product["category"], ReviewLineData[]>();
    for (const product of catalog.products) {
      for (const variant of product.variants) {
        const qty = quantities[variantKey(product.id, variant.id)] ?? 0;
        if (qty <= 0) continue;
        const list = byCategory.get(product.category) ?? [];
        list.push({ product, variant, qty });
        byCategory.set(product.category, list);
      }
    }
    return CATEGORY_ORDER.filter((c) => byCategory.has(c)).map((category) => ({
      category,
      label: CATEGORY_LABELS[category],
      lines: byCategory.get(category)!,
    }));
  }, [quantities]);
}

export function useCartTotals() {
  const quantities = useBuilderStore((s) => s.quantities);
  return useMemo(() => {
    const lines: PriceableLine[] = [];
    for (const product of catalog.products) {
      for (const variant of product.variants) {
        const qty = quantities[variantKey(product.id, variant.id)] ?? 0;
        if (qty <= 0) continue;
        lines.push({ price: variant.price, compareAtPrice: variant.compareAtPrice, qty });
      }
    }
    return computeTotals(lines, catalog.shipping, catalog.financingMonths);
  }, [quantities]);
}
