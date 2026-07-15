export type StepNumber = 1 | 2 | 3 | 4;

export type Category = "cameras" | "plan" | "sensors" | "accessories";

export type IconKey =
  | "camera-cube"
  | "camera-pan"
  | "floodlight"
  | "doorbell"
  | "battery-cam"
  | "shield-plan"
  | "shield-plan-plus"
  | "sensor-motion"
  | "sensor-hub"
  | "sensor-entry"
  | "sensor-water"
  | "sd-card"
  | "solar-panel"
  | "mount-kit";

export type StepIconKey = "step-camera" | "step-shield" | "step-sensor" | "step-grid";

export interface Variant {
  id: string;
  label: string;
  swatchColor: string;
  price: number;
  compareAtPrice?: number;
  /** Per-color stock cap. Falls back to the product's maxQty, then DEFAULT_MAX_QTY. */
  maxQty?: number;
  /** Quantity this variant is seeded with on first load / reset. */
  seedQty?: number;
}

export interface Product {
  id: string;
  step: StepNumber;
  category: Category;
  title: string;
  description?: string;
  icon: IconKey;
  badge?: string;
  learnMoreUrl?: string;
  variants: Variant[];
  defaultVariantId: string;
  /** Whether this product is user-adjustable from a card. Locked/required items are false. */
  addable: boolean;
  required?: boolean;
  maxQty?: number;
  priceSuffix?: string;
}

export interface StepConfig {
  step: StepNumber;
  title: string;
  icon: StepIconKey;
  category: Category;
  nextLabel?: string;
}

export interface ShippingConfig {
  label: string;
  price: number;
  compareAtPrice?: number;
}

export interface GuaranteeConfig {
  badgeLines: string[];
  title: string;
  body: string;
}

export interface CatalogData {
  steps: StepConfig[];
  products: Product[];
  shipping: ShippingConfig;
  guarantee: GuaranteeConfig;
  financingMonths: number;
}

export type VariantKey = `${string}:${string}`;

export const variantKey = (productId: string, variantId: string): VariantKey =>
  `${productId}:${variantId}`;
