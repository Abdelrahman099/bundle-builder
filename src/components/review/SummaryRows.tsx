import { Truck } from "lucide-react";
import { catalog } from "../../lib/catalog";
import { Price } from "../ui/Price";
import { Divider } from "../ui/Divider";

export function SummaryRows() {
  const { shipping } = catalog;

  return (
    <div>
      <Divider className="mt-2" />
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <Truck className="h-5 w-5 text-success" strokeWidth={1.5} aria-hidden="true" />
          <span className="text-sm font-medium text-ink">{shipping.label}</span>
        </div>
        <Price price={shipping.price} compareAtPrice={shipping.compareAtPrice} tone="review" />
      </div>
    </div>
  );
}
