const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatMoney(amount: number): string {
  return currencyFormatter.format(amount);
}

/** Renders "FREE" for zero-cost lines, otherwise a formatted price with optional /mo suffix. */
export function formatPrice(amount: number, suffix?: string): string {
  if (amount === 0) return "FREE";
  return suffix ? `${formatMoney(amount)}${suffix}` : formatMoney(amount);
}
