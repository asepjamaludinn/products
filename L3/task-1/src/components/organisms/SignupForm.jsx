"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { signupSchema } from "@/lib/validators/auth.schema";
import { FormField } from "@/components/molecules/FormField";
import { Button } from "@/components/atoms/Button";
import { ErrorText } from "@/components/atoms/ErrorText";

export const SignupForm = () => {
  const { signup } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError(null);
    setFieldErrors({});

    const result = signupSchema.safeParse(formData);
    if (!result.success) {
      setFieldErrors(
        Object.fromEntries(
          result.error.issues.map((issue) => [issue.path[0], issue.message]),
        ),
      );
      return;
    }

    setIsSubmitting(true);
    try {
      await signup(result.data);
      router.replace("/products");
    } catch (err) {
      setFormError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={fieldErrors.name}
      />
      <FormField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={fieldErrors.email}
      />
      <FormField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={fieldErrors.password}
      />
      <ErrorText>{formError}</ErrorText>
      <Button type="submit" isLoading={isSubmitting}>
        Sign up
      </Button>
    </form>
  );
};
