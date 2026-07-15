import { cn } from "../../lib/cn";

export function Badge({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white",
        className,
      )}
    >
      {children}
    </span>
  );
}
