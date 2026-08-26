"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { useCategories } from "@/lib/hooks/useCategories";
import { ProductForm } from "@/components/organisms/ProductForm";
import { Spinner } from "@/components/atoms/Spinner";
import * as productApi from "@/lib/api/product.api";

export default function EditProductPage() {
  const { isAdmin, isLoading: isAuthLoading } = useAuth();
  const { categories } = useCategories();
  const router = useRouter();
  const params = useParams();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthLoading && !isAdmin) router.replace("/products");
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
    router.push("/products");
  };

  return (
    <div className="max-w-md">
      <h1 className="mb-6 text-lg font-semibold text-slate-900">
        Edit product
      </h1>
      <ProductForm
        initialValues={{ ...product, categoryId: product.category.id }}
        categories={categories}
        onSubmit={handleSubmit}
        submitLabel="Update"
      />
    </div>
  );
}
