const PALETTE = [
  "from-brand-500 to-brand-700",
  "from-emerald-500 to-emerald-700",
  "from-amber-500 to-amber-700",
  "from-rose-500 to-rose-700",
  "from-sky-500 to-sky-700",
];

const pickGradient = (seed) => PALETTE[seed % PALETTE.length];

export const ProductThumb = ({ name, size = "md" }) => {
  const seed = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const sizeClass = size === "lg" ? "h-56 text-4xl" : "h-40 text-2xl";

  return (
    <div
      className={`flex ${sizeClass} w-full items-center justify-center rounded-lg bg-gradient-to-br ${pickGradient(seed)} font-semibold text-white`}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
};
