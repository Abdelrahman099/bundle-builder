import satisfactionBadge from "../../assets/satisfaction-badge.png";
import { cn } from "../../lib/cn";

export function GuaranteeBadge({ className }: { lines?: string[]; className?: string }) {
  return (
    <img
      src={satisfactionBadge}
      alt="100% Wyze satisfaction guarantee — try worry-free for 30 days"
      className={cn("h-24 w-24 flex-none object-contain", className)}
    />
  );
}
