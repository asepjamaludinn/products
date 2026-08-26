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
      <h1 className="mb-6 text-lg font-semibold text-slate-900">Categories</h1>

      {isAdmin && (
        <div className="mb-6 max-w-md">
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
