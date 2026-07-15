import * as Accordion from "@radix-ui/react-accordion";
import { StepHeader } from "./StepHeader";
import { ProductGrid } from "./ProductGrid";
import { Button } from "../ui/Button";
import { useBuilderStore } from "../../store/useBuilderStore";
import { useStepSelectedCount } from "../../store/selectors";
import { cn } from "../../lib/cn";
import type { StepConfig, StepNumber } from "../../lib/types";

const nextStep = (step: StepNumber): StepNumber | null => (step < 4 ? ((step + 1) as StepNumber) : null);

export function AccordionStep({ config }: { config: StepConfig }) {
  const openStep = useBuilderStore((s) => s.openStep);
  const setOpenStep = useBuilderStore((s) => s.setOpenStep);
  const selectedCount = useStepSelectedCount(config.step);
  const isOpen = openStep === config.step;
  const upcoming = nextStep(config.step);

  return (
    <Accordion.Item
      value={String(config.step)}
      className={cn(
        "transition-colors ",
        isOpen
          ? "rounded-panel bg-lavender pt-4 px-4 sm:px-8"
          : "border-b border-border-subtle px-1",
      )}
    >
      <Accordion.Header>
        <Accordion.Trigger className="w-full cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 rounded-lg">
          <StepHeader config={config} selectedCount={selectedCount} isOpen={isOpen} />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
        <div className="pb-8 pt-1">
          <ProductGrid step={config.step} />
          {upcoming && (
            <div className="mt-6 flex justify-center">
              <Button variant="outline" onClick={() => setOpenStep(upcoming)}>
                {config.nextLabel ?? `Next: step ${upcoming}`}
              </Button>
            </div>
          )}
        </div>
      </Accordion.Content>
    </Accordion.Item>
  );
}
