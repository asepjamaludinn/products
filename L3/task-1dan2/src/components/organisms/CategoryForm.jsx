"use client";

import { useState } from "react";
import { categorySchema } from "@/lib/validators/category.schema";
import { useToast } from "@/lib/context/ToastContext";
import { FormField } from "@/components/molecules/FormField";
import { Button } from "@/components/atoms/Button";
import { ErrorText } from "@/components/atoms/ErrorText";

export const CategoryForm = ({ onSubmit }) => {
  const toast = useToast();
  const [name, setName] = useState("");
  const [fieldError, setFieldError] = useState(null);
  const [formError, setFormError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError(null);
    setFieldError(null);

    const result = categorySchema.safeParse({ name });
    if (!result.success) {
      setFieldError(result.error.issues[0]?.message);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(result.data);
      toast.success(`Category "${result.data.name}" created`);
      setName("");
    } catch (err) {
      setFormError(err.message);
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <FormField
            label="New category name"
            name="name"
            placeholder="e.g. Electronics"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={fieldError}
          />
        </div>
        <Button type="submit" isLoading={isSubmitting} className="mt-7">
          Add category
        </Button>
      </div>
      <ErrorText>{formError}</ErrorText>
    </form>
  );
};
