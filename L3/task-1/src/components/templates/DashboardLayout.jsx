import { Navbar } from "@/components/organisms/Navbar";

export const DashboardLayout = ({ children }) => (
  <div className="min-h-screen bg-slate-50">
    <Navbar />
    <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
  </div>
);
