import { productIcons } from "./icons";
import { getProductImage } from "../../assets/productImages";
import { cn } from "../../lib/cn";
import type { IconKey } from "../../lib/types";

const CATEGORY_TINTS: Record<string, string> = {
  cameras: "bg-brand-50 text-brand-500",
  sensors: "bg-emerald-50 text-success",
  accessories: "bg-slate-100 text-body",
  plan: "bg-brand-50 text-brand-500",
};

/*
  Fluid square, tuned per screen category. Every class is written out literally
  (Tailwind's scanner can't see runtime-built strings like `lg:${VAR}`), and
  each width still scales continuously inside its zone via clamp(rem, vw, rem):

    base  <lg    phones/tablets — card is full-width, image sits left
    lg:   ≥64rem laptops — 2 cards/row beside the sidebar, so smaller
    xxl:  ≥90rem large desktops — single row, image on top, so largest

  max-w-full lets the photo shrink inside a tight card instead of overflowing.
*/
const CARD_SIZE =
  "aspect-square max-w-full w-[clamp(5.5rem,18vw,9rem)] lg:w-[clamp(5rem,8vw,9rem)] xxl:w-[clamp(9rem,10vw,13rem)]";
const THUMB_SIZE = "h-12 w-12";

interface ProductImageProps {
  productId?: string;
  variantId?: string;
  icon: IconKey;
  category?: string;
  alt?: string;
  size?: "card" | "thumb";
  className?: string;
}

export function ProductImage({ productId, variantId, icon, category = "cameras", alt = "", size = "card", className }: ProductImageProps) {
  const photo = productId ? getProductImage(productId, variantId) : undefined;
  const boxSize = size === "card" ? CARD_SIZE : THUMB_SIZE;

  if (photo) {
    return (
      <img
        src={photo}
        alt={alt}
        loading="lazy"
        decoding="async"
        draggable={false}
        className={cn("flex-none select-none object-contain", boxSize, className)}

      />
    );
  }

  const Icon = productIcons[icon];
  const tint = CATEGORY_TINTS[category] ?? CATEGORY_TINTS.cameras;

  return (
    <div
      className={cn(
        "flex flex-none items-center justify-center",
        size === "card" ? "rounded-2xl" : "rounded-xl",
        boxSize,
        tint,
        className,
      )}
    >
      <Icon className={size === "card" ? "h-10 w-10" : "h-6 w-6"} strokeWidth={1.5} />
    </div>
  );
}
