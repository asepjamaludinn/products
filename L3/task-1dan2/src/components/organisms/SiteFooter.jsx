export const SiteFooter = () => (
  <footer className="mt-16 border-t border-slate-200 bg-white">
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
        <div>
          <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-xs font-bold text-white">
            IC
          </div>
          <p className="text-sm text-slate-500">
            Your everyday marketplace for quality products.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Shop</h4>
          <ul className="space-y-2 text-sm text-slate-500">
            <li>All products</li>
            <li>Categories</li>
            <li>Deals</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Support</h4>
          <ul className="space-y-2 text-sm text-slate-500">
            <li>Help center</li>
            <li>Shipping info</li>
            <li>Returns</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Company</h4>
          <ul className="space-y-2 text-sm text-slate-500">
            <li>About us</li>
            <li>Careers</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
      <p className="mt-10 text-xs text-slate-400">
        © {new Date().getFullYear()} Tomorrow Co. All rights reserved.
      </p>
    </div>
  </footer>
);
