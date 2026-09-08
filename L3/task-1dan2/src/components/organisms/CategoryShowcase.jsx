"use client";

import { useCategories } from "@/lib/hooks/useCategories";
import { CategoryTile } from "@/components/molecules/CategoryTile";
import { Spinner } from "@/components/atoms/Spinner";

export const CategoryShowcase = () => {
  const { categories, isLoading } = useCategories();

  if (isLoading) return <Spinner />;
  if (categories.length === 0) return null;

  return (
    <section>
      <h2 className="text-lg font-semibold text-slate-900">Shop by category</h2>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => (
          <CategoryTile key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
};
