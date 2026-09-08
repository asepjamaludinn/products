"use client";

import { useState } from "react";
import { productSchema } from "@/lib/validators/product.schema";
import { FormField } from "@/components/molecules/FormField";
import { Label } from "@/components/atoms/Label";
import { Select } from "@/components/atoms/Select";
import { ErrorText } from "@/components/atoms/ErrorText";
import { Button } from "@/components/atoms/Button";

export const ProductForm = ({
  initialValues,
  categories,
  onSubmit,
  submitLabel = "Save product",
}) => {
  const [formData, setFormData] = useState({
    name: initialValues?.name ?? "",
    price: initialValues?.price ?? "",
    stock: initialValues?.stock ?? "",
    categoryId: initialValues?.categoryId ?? "",
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

    const result = productSchema.safeParse(formData);
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
      await onSubmit(result.data);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <FormField
        label="Product name"
        name="name"
        placeholder="e.g. Wireless Keyboard"
        value={formData.name}
        onChange={handleChange}
        error={fieldErrors.name}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Price"
          name="price"
          type="number"
          placeholder="0"
          value={formData.price}
          onChange={handleChange}
          error={fieldErrors.price}
        />
        <FormField
          label="Stock"
          name="stock"
          type="number"
          placeholder="0"
          value={formData.stock}
          onChange={handleChange}
          error={fieldErrors.stock}
        />
      </div>

      <div>
        <Label htmlFor="categoryId">Category</Label>
        <Select
          id="categoryId"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
        <ErrorText>{fieldErrors.categoryId}</ErrorText>
      </div>

      <ErrorText>{formError}</ErrorText>

      <div className="flex justify-end border-t border-slate-100 pt-5">
        <Button type="submit" isLoading={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};
