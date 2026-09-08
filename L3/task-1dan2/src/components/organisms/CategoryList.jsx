"use client";

import { useState } from "react";
import { CategoryRow } from "@/components/molecules/CategoryRow";
import { ConfirmDialog } from "@/components/molecules/ConfirmDialog";

export const CategoryList = ({ categories, isAdmin, onDelete }) => {
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(categoryToDelete.id);
      setCategoryToDelete(null);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-slate-300 text-left text-xs uppercase text-slate-500">
            <th className="px-4 py-2">Name</th>
            {isAdmin && <th className="px-4 py-2 text-right">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <CategoryRow
              key={category.id}
              category={category}
              isAdmin={isAdmin}
              onDelete={setCategoryToDelete}
            />
          ))}
        </tbody>
      </table>
      <ConfirmDialog
        isOpen={Boolean(categoryToDelete)}
        title="Delete category"
        description={`Are you sure you want to delete "${categoryToDelete?.name}"?`}
        onCancel={() => setCategoryToDelete(null)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
      />
    </>
  );
};
