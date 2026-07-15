import { ChevronDown } from "lucide-react";
import { stepIcons } from "../ui/icons";
import { Divider } from "../ui/Divider";
import { cn } from "../../lib/cn";
import type { StepConfig } from "../../lib/types";

interface StepHeaderProps {
  config: StepConfig;
  selectedCount: number;
  isOpen: boolean;
}

export function StepHeader({ config, selectedCount, isOpen }: StepHeaderProps) {
  const Icon = stepIcons[config.icon];

  return (
    <div className="w-full">
      <span className="block pb-3 text-xs font-semibold uppercase tracking-wider text-muted">
        Step {config.step} of 4
      </span>
      <Divider />
      <div className="flex items-center justify-between gap-4 py-5">
        <div className="flex min-w-0 items-center gap-3">
          <Icon className="h-6 w-6 flex-none text-ink" strokeWidth={1.5} aria-hidden="true" />
          <h2 className="truncate text-xl font-bold text-ink sm:text-2xl">{config.title}</h2>
        </div>
        <div className="flex flex-none items-center gap-2 text-brand-500">
          <span className="whitespace-nowrap text-sm font-semibold">{selectedCount} selected</span>
          <ChevronDown
            className={cn("h-5 w-5 transition-transform duration-200", isOpen && "rotate-180")}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
