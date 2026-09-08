import Link from "next/link";
import { AuthLayout } from "@/components/templates/AuthLayout";
import { SignupForm } from "@/components/organisms/SignupForm";

export default function SignupPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start managing your product catalog"
    >
      <SignupForm />
      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-brand-600 hover:text-brand-700"
        >
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}
