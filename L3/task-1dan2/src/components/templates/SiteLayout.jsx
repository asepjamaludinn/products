import { SiteHeader } from "@/components/organisms/SiteHeader";
import { SiteFooter } from "@/components/organisms/SiteFooter";

export const SiteLayout = ({ children }) => (
  <div className="flex min-h-screen flex-col bg-slate-50">
    <SiteHeader />
    <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">
      {children}
    </main>
    <SiteFooter />
  </div>
);
