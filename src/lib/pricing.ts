export interface PriceableLine {
  price: number;
  compareAtPrice?: number;
  qty: number;
}

/** Avoids floating point drift (e.g. 0.1 + 0.2) when summing money. */
export const roundCents = (n: number): number => Math.round(n * 100) / 100;

export const lineTotal = (line: PriceableLine): number => roundCents(line.price * line.qty);

export const lineCompareTotal = (line: PriceableLine): number =>
  roundCents((line.compareAtPrice ?? line.price) * line.qty);

export interface CartTotals {
  subtotal: number;
  compareSubtotal: number;
  savings: number;
  grandTotal: number;
  grandCompareTotal: number;
  totalSavings: number;
  financingPerMonth: number;
}

export function computeTotals(
  lines: PriceableLine[],
  shipping: { price: number; compareAtPrice?: number },
  financingMonths: number,
): CartTotals {
  const subtotal = roundCents(lines.reduce((sum, l) => sum + lineTotal(l), 0));
  const compareSubtotal = roundCents(lines.reduce((sum, l) => sum + lineCompareTotal(l), 0));
  const savings = roundCents(compareSubtotal - subtotal);

  const grandTotal = roundCents(subtotal + shipping.price);
  const grandCompareTotal = roundCents(compareSubtotal + (shipping.compareAtPrice ?? shipping.price));
  const totalSavings = roundCents(grandCompareTotal - grandTotal);

  const financingPerMonth = roundCents(grandTotal / financingMonths);

  return { subtotal, compareSubtotal, savings, grandTotal, grandCompareTotal, totalSavings, financingPerMonth };
}
