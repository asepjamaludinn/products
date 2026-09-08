"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { useCategories } from "@/lib/hooks/useCategories";
import { useToast } from "@/lib/context/ToastContext";
import { ProductForm } from "@/components/organisms/ProductForm";
import * as productApi from "@/lib/api/product.api";

export default function NewProductPage() {
  const { isAdmin, isLoading: isAuthLoading } = useAuth();
  const { categories } = useCategories();
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthLoading && !isAdmin) router.replace("/admin/products");
  }, [isAuthLoading, isAdmin, router]);

  if (isAuthLoading || !isAdmin) return null;

  const handleSubmit = async (data) => {
    await productApi.createProduct(data);
    toast.success(`"${data.name}" was added to your catalog`);
    router.push("/admin/products");
  };

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold text-slate-900">Add product</h1>
      <p className="mt-1 text-sm text-slate-500">
        Fill in the details below to add a new product.
      </p>
      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <ProductForm
          categories={categories}
          onSubmit={handleSubmit}
          submitLabel="Create product"
        />
      </div>
    </div>
  );
}
