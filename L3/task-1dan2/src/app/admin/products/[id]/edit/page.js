"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { useCategories } from "@/lib/hooks/useCategories";
import { useToast } from "@/lib/context/ToastContext";
import { ProductForm } from "@/components/organisms/ProductForm";
import { Spinner } from "@/components/atoms/Spinner";
import * as productApi from "@/lib/api/product.api";

export default function EditProductPage() {
  const { isAdmin, isLoading: isAuthLoading } = useAuth();
  const { categories } = useCategories();
  const toast = useToast();
  const router = useRouter();
  const params = useParams();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthLoading && !isAdmin) router.replace("/admin/products");
  }, [isAuthLoading, isAdmin, router]);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await productApi.getProduct(params.id);
      setProduct(response.data);
      setIsLoading(false);
    };
    fetchProduct();
  }, [params.id]);

  if (isAuthLoading || !isAdmin || isLoading || !product) return <Spinner />;

  const handleSubmit = async (data) => {
    await productApi.updateProduct(params.id, data);
    toast.success(`"${data.name}" was updated`);
    router.push("/admin/products");
  };

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold text-slate-900">Edit product</h1>
      <p className="mt-1 text-sm text-slate-500">
        Update the details for this product.
      </p>
      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <ProductForm
          initialValues={{ ...product, categoryId: product.category.id }}
          categories={categories}
          onSubmit={handleSubmit}
          submitLabel="Save changes"
        />
      </div>
    </div>
  );
}
