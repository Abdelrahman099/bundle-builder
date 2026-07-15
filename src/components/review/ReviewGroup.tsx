import { ReviewLine } from "./ReviewLine";
import type { ReviewGroup as ReviewGroupData } from "../../store/selectors";

export function ReviewGroup({ group }: { group: ReviewGroupData }) {
  return (
    <div>
      <p className="pt-4 text-xs font-semibold uppercase tracking-wider text-subtle">{group.label}</p>
      <div className="divide-y divide-border-subtle">
        {group.lines.map((line) => (
          <ReviewLine key={`${line.product.id}:${line.variant.id}`} product={line.product} variant={line.variant} qty={line.qty} />
        ))}
      </div>
    </div>
  );
}
