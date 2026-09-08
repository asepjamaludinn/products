import { cn } from "@/lib/utils/cn";

export const Select = ({ className, children, ...props }) => (
  <select
    className={cn(
      "w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 transition-colors focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10",
      className,
    )}
    {...props}
  >
    {children}
  </select>
);
