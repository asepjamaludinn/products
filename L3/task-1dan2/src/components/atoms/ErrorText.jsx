export const ErrorText = ({ children }) => {
  if (!children) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1 text-sm text-red-600">
      <span aria-hidden>⚠</span>
      {children}
    </p>
  );
};
