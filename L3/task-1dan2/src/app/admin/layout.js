import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { DashboardLayout } from "@/components/templates/DashboardLayout";

export default async function AdminRouteLayout({ children }) {
  const cookieStore = await cookies();
  if (!cookieStore.get("token")) redirect("/login");
  return <DashboardLayout>{children}</DashboardLayout>;
}
