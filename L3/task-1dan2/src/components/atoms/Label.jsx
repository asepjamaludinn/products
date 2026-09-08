export const Label = ({ htmlFor, children }) => (
  <label
    htmlFor={htmlFor}
    className="mb-1.5 block text-sm font-medium text-slate-700"
  >
    {children}
  </label>
);
