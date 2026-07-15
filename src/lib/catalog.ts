import raw from "../data/products.json";
import type { CatalogData, Product, StepConfig, StepNumber, Variant } from "./types";

export const catalog = raw as unknown as CatalogData;

/** Fallback cap so the "+" always disables somewhere, even if nothing sets a limit. */
export const DEFAULT_MAX_QTY = 10;

/** Effective stock cap: per-color first, then product-wide, then the default. */
export const maxQtyOf = (product: Product, variant?: Variant): number =>
  variant?.maxQty ?? product.maxQty ?? DEFAULT_MAX_QTY;

export const stepConfigs: StepConfig[] = catalog.steps;

export const productsByStep = (step: StepNumber): Product[] =>
  catalog.products.filter((p) => p.step === step);

export const stepConfigByNumber = (step: StepNumber): StepConfig => {
  const config = stepConfigs.find((s) => s.step === step);
  if (!config) throw new Error(`No step config for step ${step}`);
  return config;
};
