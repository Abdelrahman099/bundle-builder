import { useState } from "react";
import { catalog } from "../../lib/catalog";
import { formatMoney } from "../../lib/format";
import { useCartTotals } from "../../store/selectors";
import { useBuilderStore } from "../../store/useBuilderStore";
import { GuaranteeBadge } from "../ui/GuaranteeBadge";
import { Button } from "../ui/Button";

export function TotalBlock() {
  const totals = useCartTotals();
  const markSaved = useBuilderStore((s) => s.markSaved);
  const [justSaved, setJustSaved] = useState(false);

  const hasSavings = totals.totalSavings > 0;

  const handleSave = () => {
    markSaved();
    setJustSaved(true);
    window.setTimeout(() => setJustSaved(false), 2500);
  };

  const financingPill = (
    <span className="inline-flex rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white">
      as low as {formatMoney(totals.financingPerMonth)}/mo
    </span>
  );

  const totalAmount = (
    <div className="flex items-baseline gap-2">
      {totals.grandCompareTotal > totals.grandTotal && (
        <span className="text-base text-subtle line-through">{formatMoney(totals.grandCompareTotal)}</span>
      )}
      <span className="text-3xl font-extrabold text-brand-500">{formatMoney(totals.grandTotal)}</span>
    </div>
  );

  return (
    <div className="mt-2 xxl:mt-0">
      <div className="flex items-start gap-4">
        <GuaranteeBadge lines={catalog.guarantee.badgeLines} className="h-20 w-20 xxl:h-24 xxl:w-24 rotate-340" />

        <div className="min-w-0 flex-1">
          {/* Returns copy — only in the wide (Frame 1736) review-below layout */}
          <div className="hidden xxl:block">
            <p className="text-lg font-bold text-ink">{catalog.guarantee.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-body">{catalog.guarantee.body}</p>
          </div>

          {/* Compact financing + total beside the badge — sidebar & mobile */}
          <div className="flex flex-col items-end gap-2 xxl:hidden">
            {financingPill}
            {totalAmount}
          </div>
        </div>
      </div>

      {/* Wide financing + total row — below the badge in the review-below layout */}
      <div className="mt-4 hidden items-baseline justify-between xxl:flex">
        {financingPill}
        {totalAmount}
      </div>

      {hasSavings && (
        <p className="mt-3 text-center text-sm font-semibold text-success xxl:text-left">
          Congrats! You&apos;re saving {formatMoney(totals.totalSavings)} on your security bundle!
        </p>
      )}

      <Button className="mt-5 w-full" onClick={() => window.alert("This is a prototype — checkout isn't wired up yet.")}>
        Checkout
      </Button>

      <button
        type="button"
        onClick={handleSave}
        className="mt-3 block w-full text-center text-sm font-medium italic text-ink underline underline-offset-2 hover:text-brand-500"
      >
        {justSaved ? "Saved! Come back anytime." : "Save my system for later"}
      </button>
    </div>
  );
}
