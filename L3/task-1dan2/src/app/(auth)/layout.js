import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function AuthRouteLayout({ children }) {
  const cookieStore = await cookies();
  if (cookieStore.get("token")) redirect("/");
  return <>{children}</>;
}
