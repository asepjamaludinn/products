import { cn } from "@/lib/utils/cn";

export const Spinner = ({ className }) => (
  <div className="flex items-center justify-center py-10">
    <div
      className={cn(
        "h-6 w-6 animate-spin rounded-full border-2 border-slate-200 border-t-brand-600",
        className,
      )}
    />
  </div>
);
