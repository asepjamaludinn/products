import Link from "next/link";
import { AuthLayout } from "@/components/templates/AuthLayout";
import { SignupForm } from "@/components/organisms/SignupForm";

export default function SignupPage() {
  return (
    <AuthLayout title="Create account">
      <SignupForm />
      <p className="mt-4 text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-slate-900 underline">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}
