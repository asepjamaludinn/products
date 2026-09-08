export const AuthLayout = ({ title, subtitle, children }) => (
  <div className="flex min-h-screen">
    <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-slate-900 p-12 text-white lg:flex">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-700 via-slate-900 to-slate-900" />
      <div className="relative flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-sm font-bold backdrop-blur">
          TC
        </div>
        <span className="text-sm font-semibold tracking-wide">
          Tomorrow Co.
        </span>
      </div>
      <div className="relative">
        <h2 className="text-3xl font-semibold leading-snug">
          Manage your catalog with clarity and confidence.
        </h2>
        <p className="mt-4 max-w-md text-sm text-slate-300">
          Track products, organize categories, and control access — all from a
          single, focused workspace.
        </p>
      </div>
      <p className="relative text-xs text-slate-400">
        © {new Date().getFullYear()} Tomorrow Co.
      </p>
    </div>

    <div className="flex w-full items-center justify-center bg-slate-50 px-6 py-12 lg:w-1/2">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
        {subtitle && (
          <p className="mt-1.5 text-sm text-slate-500">{subtitle}</p>
        )}
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  </div>
);
