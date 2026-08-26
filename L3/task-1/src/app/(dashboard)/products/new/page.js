"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { useCategories } from "@/lib/hooks/useCategories";
import { ProductForm } from "@/components/organisms/ProductForm";
import * as productApi from "@/lib/api/product.api";

export default function NewProductPage() {
  const { isAdmin, isLoading: isAuthLoading } = useAuth();
  const { categories } = useCategories();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthLoading && !isAdmin) router.replace("/products");
  }, [isAuthLoading, isAdmin, router]);

  if (isAuthLoading || !isAdmin) return null;

  const handleSubmit = async (data) => {
    await productApi.createProduct(data);
    router.push("/products");
  };

  return (
    <div className="max-w-md">
      <h1 className="mb-6 text-lg font-semibold text-slate-900">Add product</h1>
      <ProductForm
        categories={categories}
        onSubmit={handleSubmit}
        submitLabel="Create"
      />
    </div>
  );
}
