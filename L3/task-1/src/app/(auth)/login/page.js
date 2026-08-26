import Link from "next/link";
import { AuthLayout } from "@/components/templates/AuthLayout";
import { LoginForm } from "@/components/organisms/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout title="Log in">
      <LoginForm />
      <p className="mt-4 text-center text-sm text-slate-600">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-medium text-slate-900 underline">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}
