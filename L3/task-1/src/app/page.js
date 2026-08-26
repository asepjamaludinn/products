import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function RootPage() {
  const cookieStore = await cookies();
  redirect(cookieStore.get("token") ? "/products" : "/login");
}
