import { cn } from "@/lib/utils/cn";

export const Select = ({ className, children, ...props }) => (
  <select
    className={cn(
      "w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none",
      className,
    )}
    {...props}
  >
    {children}
  </select>
);
