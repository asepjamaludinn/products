"use client";

import { useState } from "react";
import { categorySchema } from "@/lib/validators/category.schema";
import { FormField } from "@/components/molecules/FormField";
import { Button } from "@/components/atoms/Button";
import { ErrorText } from "@/components/atoms/ErrorText";

export const CategoryForm = ({ onSubmit }) => {
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
      setName("");
    } catch (err) {
      setFormError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-start gap-3">
      <div className="flex-1">
        <FormField
          label="New category"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={fieldError}
        />
      </div>
      <Button type="submit" isLoading={isSubmitting} className="mt-6">
        Add
      </Button>
      <ErrorText>{formError}</ErrorText>
    </form>
  );
};
