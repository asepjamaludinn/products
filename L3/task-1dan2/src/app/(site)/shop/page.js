"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useProducts } from "@/lib/hooks/useProducts";
import { useCategories } from "@/lib/hooks/useCategories";
import { ProductGrid } from "@/components/organisms/ProductGrid";
import { cn } from "@/lib/utils/cn";

export default function ShopPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { categories } = useCategories();

  const categoryId = searchParams.get("categoryId") || undefined;
  const search = searchParams.get("search") || undefined;

  const { products, pagination, isLoading, error, goToPage } = useProducts({
    categoryId,
    search,
  });

  const setCategoryFilter = (id) => {
    const params = new URLSearchParams(searchParams);
    if (id) params.set("categoryId", id);
    else params.delete("categoryId");
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
      <aside>
        <h3 className="mb-3 text-sm font-semibold text-slate-900">
          Categories
        </h3>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => setCategoryFilter(null)}
            className={cn(
              "rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors",
              !categoryId
                ? "bg-brand-50 text-brand-700"
                : "text-slate-600 hover:bg-slate-100",
            )}
          >
            All products
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setCategoryFilter(String(category.id))}
              className={cn(
                "rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors",
                String(category.id) === categoryId
                  ? "bg-brand-50 text-brand-700"
                  : "text-slate-600 hover:bg-slate-100",
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      </aside>

      <div>
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-slate-900">
            {search ? `Results for "${search}"` : "All products"}
          </h1>
          <span className="text-sm text-slate-500">
            {pagination.total} items
          </span>
        </div>
        <ProductGrid
          products={products}
          pagination={pagination}
          isLoading={isLoading}
          error={error}
          onPageChange={goToPage}
        />
      </div>
    </div>
  );
}
