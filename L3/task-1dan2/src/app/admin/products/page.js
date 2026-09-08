"use client";

import Link from "next/link";
import { useAuth } from "@/lib/context/AuthContext";
import { useProducts } from "@/lib/hooks/useProducts";
import { ProductTable } from "@/components/organisms/ProductTable";
import { Pagination } from "@/components/molecules/Pagination";
import { Button } from "@/components/atoms/Button";
import { Spinner } from "@/components/atoms/Spinner";
import { ErrorText } from "@/components/atoms/ErrorText";

export default function AdminProductsPage() {
  const { isAdmin } = useAuth();
  const { products, pagination, isLoading, error, goToPage, removeProduct } =
    useProducts();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Products</h1>
          <p className="mt-1 text-sm text-slate-500">
            {pagination.total} product{pagination.total === 1 ? "" : "s"} in
            your catalog
          </p>
        </div>
        {isAdmin && (
          <Link href="/admin/products/new">
            <Button>+ Add product</Button>
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
