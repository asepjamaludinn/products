export const EmptyState = ({ title, description }) => (
  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 py-16 text-center">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
      <span aria-hidden className="text-xl">
        □
      </span>
    </div>
    <h3 className="mt-4 text-sm font-semibold text-slate-900">{title}</h3>
    <p className="mt-1 text-sm text-slate-500">{description}</p>
  </div>
);
