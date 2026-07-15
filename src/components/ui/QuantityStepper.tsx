import { Plus, Minus } from "lucide-react";
import { cn } from "../../lib/cn";

interface QuantityStepperProps {
  qty: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  label?: string;
}

export function QuantityStepper({
  qty,
  onIncrement,
  onDecrement,
  min = 0,
  max = Infinity,
  disabled = false,
  label,
}: QuantityStepperProps) {
  const canDecrement = !disabled && qty > min;
  const canIncrement = !disabled && qty < max;

  return (
    <div className="inline-flex items-center gap-3" role="group" aria-label={label ? `${label} quantity` : "Quantity"}>
      <button
        type="button"
        onClick={onDecrement}
        disabled={!canDecrement}
        aria-label="Decrease quantity"
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-lg bg-white text-ink transition-colors",
          "hover:bg-brand-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white",
        )}
      >
        <Minus className="h-3.5 w-3.5" strokeWidth={2.25} />
      </button>
      <span className="w-4 text-center text-base font-semibold tabular-nums text-ink">{qty}</span>
      <button
        type="button"
        onClick={onIncrement}
        disabled={!canIncrement}
        aria-label="Increase quantity"
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-lg bg-white text-ink transition-colors",
          "hover:bg-brand-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white",
        )}
      >
        <Plus className="h-3.5 w-3.5" strokeWidth={2.25} />
      </button>
    </div>
  );
}
