import * as Accordion from "@radix-ui/react-accordion";
import { stepConfigs } from "../../lib/catalog";
import { useBuilderStore } from "../../store/useBuilderStore";
import { AccordionStep } from "./AccordionStep";
import type { StepNumber } from "../../lib/types";

export function Builder() {
  const openStep = useBuilderStore((s) => s.openStep);
  const setOpenStep = useBuilderStore((s) => s.setOpenStep);

  return (
    <Accordion.Root
      type="single"
      collapsible
      value={openStep ? String(openStep) : ""}
      onValueChange={(value) => setOpenStep(value ? (Number(value) as StepNumber) : null)}
      className="flex flex-col gap-4"
    >
      {stepConfigs.map((config) => (
        <AccordionStep key={config.step} config={config} />
      ))}
    </Accordion.Root>
  );
}
