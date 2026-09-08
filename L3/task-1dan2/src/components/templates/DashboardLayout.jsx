import { Sidebar } from "@/components/organisms/Sidebar";

export const DashboardLayout = ({ children }) => (
  <div className="flex min-h-screen bg-slate-50">
    <Sidebar />
    <main className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-6xl px-8 py-10">{children}</div>
    </main>
  </div>
);
