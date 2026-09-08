import { cn } from "@/lib/utils/cn";

export const Badge = ({ role }) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
      role === "ADMIN"
        ? "bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-600/20"
        : "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-500/10",
    )}
  >
    {role}
  </span>
);
