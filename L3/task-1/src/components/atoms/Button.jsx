import { cn } from "@/lib/utils/cn";

const VARIANT_CLASSES = {
  primary: "bg-slate-900 text-white hover:bg-slate-700",
  danger: "bg-red-600 text-white hover:bg-red-500",
  ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
};

export const Button = ({
  variant = "primary",
  isLoading = false,
  className,
  children,
  disabled,
  ...props
}) => (
  <button
    className={cn(
      "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50",
      VARIANT_CLASSES[variant],
      className,
    )}
    disabled={disabled || isLoading}
    {...props}
  >
    {isLoading ? "Loading..." : children}
  </button>
);
