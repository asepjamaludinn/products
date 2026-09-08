"use client";

import { useAuth } from "@/lib/context/AuthContext";
import { useCategories } from "@/lib/hooks/useCategories";
import { CategoryList } from "@/components/organisms/CategoryList";
import { CategoryForm } from "@/components/organisms/CategoryForm";
import { Spinner } from "@/components/atoms/Spinner";
import { ErrorText } from "@/components/atoms/ErrorText";

export default function CategoriesPage() {
  const { isAdmin } = useAuth();
  const { categories, isLoading, error, addCategory, removeCategory } =
    useCategories();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900">Categories</h1>
        <p className="mt-1 text-sm text-slate-500">
          Organize your products into categories.
        </p>
      </div>

      {isAdmin && (
        <div className="mb-6 max-w-xl">
          <CategoryForm onSubmit={addCategory} />
        </div>
      )}

      {isLoading && <Spinner />}
      <ErrorText>{error}</ErrorText>

      {!isLoading && !error && (
        <CategoryList
          categories={categories}
          isAdmin={isAdmin}
          onDelete={removeCategory}
        />
      )}
    </div>
  );
}
