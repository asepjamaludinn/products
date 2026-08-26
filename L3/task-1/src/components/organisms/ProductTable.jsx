"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProductRow } from "@/components/molecules/ProductRow";
import { ConfirmDialog } from "@/components/molecules/ConfirmDialog";

export const ProductTable = ({ products, isAdmin, onDelete }) => {
  const router = useRouter();
  const [productToDelete, setProductToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(productToDelete.id);
      setProductToDelete(null);
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
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Stock</th>
            {isAdmin && <th className="px-4 py-2 text-right">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
              isAdmin={isAdmin}
              onEdit={(p) => router.push(`/products/${p.id}/edit`)}
              onDelete={setProductToDelete}
            />
          ))}
        </tbody>
      </table>
      <ConfirmDialog
        isOpen={Boolean(productToDelete)}
        title="Delete product"
        description={`Are you sure you want to delete "${productToDelete?.name}"?`}
        onCancel={() => setProductToDelete(null)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
      />
    </>
  );
};
