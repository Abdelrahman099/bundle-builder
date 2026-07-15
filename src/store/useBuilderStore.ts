import { create } from "zustand";
import { persist } from "zustand/middleware";
import { catalog, maxQtyOf } from "../lib/catalog";
import { variantKey, type StepNumber } from "../lib/types";

interface BuilderData {
  quantities: Record<string, number>;
  activeVariant: Record<string, string>;
  openStep: StepNumber | null;
  lastSavedAt: number | null;
}

interface BuilderActions {
  setQty: (productId: string, variantId: string, qty: number) => void;
  increment: (productId: string, variantId: string) => void;
  decrement: (productId: string, variantId: string) => void;
  setActiveVariant: (productId: string, variantId: string) => void;
  setOpenStep: (step: StepNumber | null) => void;
  markSaved: () => void;
}

type BuilderState = BuilderData & BuilderActions;

function buildSeedData(): BuilderData {
  const quantities: Record<string, number> = {};
  const activeVariant: Record<string, string> = {};
  for (const product of catalog.products) {
    activeVariant[product.id] = product.defaultVariantId;
    for (const variant of product.variants) {
      quantities[variantKey(product.id, variant.id)] = variant.seedQty ?? 0;
    }
  }
  return { quantities, activeVariant, openStep: 1, lastSavedAt: null };
}

export const useBuilderStore = create<BuilderState>()(
  persist(
    (set, get) => ({
      ...buildSeedData(),

      setQty: (productId, variantId, qty) => {
        const product = catalog.products.find((p) => p.id === productId);
        const variant = product?.variants.find((v) => v.id === variantId);
        const max = product ? maxQtyOf(product, variant) : Infinity;
        const min = product?.required ? 1 : 0;
        const clamped = Math.max(min, Math.min(max, qty));
        set((state) => ({
          quantities: { ...state.quantities, [variantKey(productId, variantId)]: clamped },
        }));
      },

      increment: (productId, variantId) => {
        const current = get().quantities[variantKey(productId, variantId)] ?? 0;
        get().setQty(productId, variantId, current + 1);
      },

      decrement: (productId, variantId) => {
        const current = get().quantities[variantKey(productId, variantId)] ?? 0;
        get().setQty(productId, variantId, current - 1);
      },

      setActiveVariant: (productId, variantId) =>
        set((state) => ({ activeVariant: { ...state.activeVariant, [productId]: variantId } })),

      setOpenStep: (step) => set({ openStep: step }),

      markSaved: () => set({ lastSavedAt: Date.now() }),
    }),
    {
      // Bump this suffix whenever the seed/variant shape changes — it discards
      // stale persisted state so returning users reseed cleanly instead of
      // replaying data that predates the change.
      name: "wyze-bundle-builder/v2",
      partialize: (state) => ({
        quantities: state.quantities,
        activeVariant: state.activeVariant,
        openStep: state.openStep,
        lastSavedAt: state.lastSavedAt,
      }),
    },
  ),
);
