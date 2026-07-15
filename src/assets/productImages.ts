// Real product photos, imported as modules so Vite fingerprints and bundles them.
// Filenames are kebab-case `${product}-${variant}` so the mapping stays obvious.
import v4White from "./wyze-cam-v4-white.png";
import v4Grey from "./wyze-cam-v4-grey.png";
import v4Black from "./wyze-cam-v4-black.png";
import panWhite from "./wyze-cam-pan-v3-white.png";
import panBlack from "./wyze-cam-pan-v3-black.png";
import floodWhite from "./wyze-cam-floodlight-v2-white.png";
import floodBlack from "./wyze-cam-floodlight-v2-black.png";
import doorbell from "./wyze-duo-cam-doorbell.png";
import batteryWhite from "./wyze-battery-cam-pro-white.png";
import batteryBlack from "./wyze-battery-cam-pro-black.png";

/**
 * Per-variant photos, keyed by `${productId}:${variantId}`.
 * Add a line here when a new variant photo lands — the card, chip and review
 * thumbnail all switch automatically, no component changes needed.
 */
export const variantImages: Record<string, string> = {
  "wyze-cam-v4:white": v4White,
  "wyze-cam-v4:grey": v4Grey,
  "wyze-cam-v4:black": v4Black,
  "wyze-cam-pan-v3:white": panWhite,
  "wyze-cam-pan-v3:black": panBlack,
  "wyze-cam-floodlight-v2:white": floodWhite,
  "wyze-cam-floodlight-v2:black": floodBlack,
  "wyze-duo-cam-doorbell:default": doorbell,
  "wyze-battery-cam-pro:white": batteryWhite,
  "wyze-battery-cam-pro:black": batteryBlack,
};

/** Default photo per product (shown when a variant has no specific photo). */
export const productImages: Record<string, string> = {
  "wyze-cam-v4": v4White,
  "wyze-cam-pan-v3": panWhite,
  "wyze-cam-floodlight-v2": floodWhite,
  "wyze-duo-cam-doorbell": doorbell,
  "wyze-battery-cam-pro": batteryWhite,
};

/** Photo for a specific variant, if one exists (no product-level fallback). */
export const getVariantImage = (productId: string, variantId: string): string | undefined =>
  variantImages[`${productId}:${variantId}`];

/** Best available photo: exact variant → product default → none. */
export const getProductImage = (productId: string, variantId?: string): string | undefined =>
  (variantId ? variantImages[`${productId}:${variantId}`] : undefined) ?? productImages[productId];
