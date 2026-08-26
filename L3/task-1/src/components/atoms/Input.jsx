import { cn } from "@/lib/utils/cn";

export const Input = ({ className, ...props }) => (
  <input
    className={cn(
      "w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none",
      className,
    )}
    {...props}
  />
);
