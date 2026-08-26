"use client";

import Link from "next/link";
import { useAuth } from "@/lib/context/AuthContext";
import { useProducts } from "@/lib/hooks/useProducts";
import { ProductTable } from "@/components/organisms/ProductTable";
import { Pagination } from "@/components/molecules/Pagination";
import { Button } from "@/components/atoms/Button";
import { Spinner } from "@/components/atoms/Spinner";
import { ErrorText } from "@/components/atoms/ErrorText";

export default function ProductsPage() {
  const { isAdmin } = useAuth();
  const { products, pagination, isLoading, error, goToPage, removeProduct } =
    useProducts();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-slate-900">Products</h1>
        {isAdmin && (
          <Link href="/products/new">
            <Button>Add product</Button>
          </Link>
        )}
      </div>

      {isLoading && <Spinner />}
      <ErrorText>{error}</ErrorText>

      {!isLoading && !error && (
        <>
          <ProductTable
            products={products}
            isAdmin={isAdmin}
            onDelete={removeProduct}
          />
          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={goToPage}
          />
        </>
      )}
    </div>
  );
}
