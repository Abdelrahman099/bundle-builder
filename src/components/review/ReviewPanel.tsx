import { useReviewGroups } from "../../store/selectors";
import { Divider } from "../ui/Divider";
import { ReviewGroup } from "./ReviewGroup";
import { SummaryRows } from "./SummaryRows";
import { TotalBlock } from "./TotalBlock";

export function ReviewPanel() {
  const groups = useReviewGroups();

  return (
    <aside className="rounded-panel bg-lavender p-6 sm:p-8 lg:max-xxl:sticky lg:max-xxl:top-6 lg:max-xxl:self-start">
      {/* Two columns on wide screens (Frame 1736): items left, totals right. Single column otherwise. */}
      <div className="xxl:grid xxl:grid-cols-2 xxl:gap-x-12">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-subtle xxl:hidden">Review</p>
          <h2 className="mt-2 text-2xl font-bold text-ink sm:text-3xl xxl:mt-0">Your security system</h2>
          <p className="mt-2 text-sm leading-relaxed text-body">
            Review your personalized protection system designed to keep what matters most safe.
          </p>

          <Divider className="mt-4" />

          <div>
            {groups.map((group) => (
              <ReviewGroup key={group.category} group={group} />
            ))}
          </div>

          <SummaryRows />
        </div>

        <div className="xxl:flex xxl:flex-col xxl:justify-start xxl:pt-12">
          <TotalBlock />
        </div>
      </div>
    </aside>
  );
}
