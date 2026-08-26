export const AuthLayout = ({ title, children }) => (
  <div className="flex min-h-screen items-center justify-center bg-slate-50">
    <div className="w-full max-w-sm rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="mb-6 text-xl font-semibold text-slate-900">{title}</h1>
      {children}
    </div>
  </div>
);
