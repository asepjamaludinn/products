import { cn } from "@/lib/utils/cn";

const VARIANT_STYLES = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-800",
  error: "border-red-200 bg-red-50 text-red-800",
  info: "border-slate-200 bg-white text-slate-800",
};

const VARIANT_DOT = {
  success: "bg-emerald-500",
  error: "bg-red-500",
  info: "bg-brand-500",
};

export const Toast = ({ message, variant = "info", onDismiss }) => (
  <div
    role="alert"
    className={cn(
      "toast-enter flex w-80 items-start gap-3 rounded-lg border px-4 py-3 shadow-lg shadow-slate-900/5",
      VARIANT_STYLES[variant],
    )}
  >
    <span
      className={cn(
        "mt-1.5 h-2 w-2 flex-shrink-0 rounded-full",
        VARIANT_DOT[variant],
      )}
    />
    <p className="flex-1 text-sm font-medium leading-snug">{message}</p>
    <button
      onClick={onDismiss}
      className="text-slate-400 transition-colors hover:text-slate-600"
      aria-label="Dismiss"
    >
      ×
    </button>
  </div>
);
