"use client";

import { ProductCard } from "@/components/molecules/ProductCard";
import { Pagination } from "@/components/molecules/Pagination";
import { EmptyState } from "@/components/molecules/EmptyState";
import { Spinner } from "@/components/atoms/Spinner";
import { ErrorText } from "@/components/atoms/ErrorText";

export const ProductGrid = ({
  products,
  pagination,
  isLoading,
  error,
  onPageChange,
}) => {
  if (isLoading) return <Spinner />;
  if (error) return <ErrorText>{error}</ErrorText>;
  if (products.length === 0) {
    return (
      <EmptyState
        title="No products found"
        description="Try a different search term or category."
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination
        page={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
};
