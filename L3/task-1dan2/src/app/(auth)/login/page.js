import Link from "next/link";
import { AuthLayout } from "@/components/templates/AuthLayout";
import { LoginForm } from "@/components/organisms/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue to your dashboard"
    >
      <LoginForm />
      <p className="mt-6 text-center text-sm text-slate-500">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-brand-600 hover:text-brand-700"
        >
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}
