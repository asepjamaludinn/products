const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export const Price = ({ value, className = "" }) => (
  <span className={`font-semibold text-slate-900 ${className}`}>
    {formatCurrency(value)}
  </span>
);
