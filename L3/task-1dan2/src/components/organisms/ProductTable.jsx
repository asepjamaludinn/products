"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/lib/context/ToastContext";
import { ProductRow } from "@/components/molecules/ProductRow";
import { ConfirmDialog } from "@/components/molecules/ConfirmDialog";
import { EmptyState } from "@/components/molecules/EmptyState";

export const ProductTable = ({ products, isAdmin, onDelete }) => {
  const router = useRouter();
  const toast = useToast();
  const [productToDelete, setProductToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(productToDelete.id);
      toast.success(`"${productToDelete.name}" was deleted`);
      setProductToDelete(null);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  if (products.length === 0) {
    return (
      <EmptyState
        title="No products yet"
        description="Products you add will show up here."
      />
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Price</th>
              <th className="px-5 py-3">Stock</th>
              {isAdmin && <th className="px-5 py-3 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                isAdmin={isAdmin}
                onEdit={(p) => router.push(`/admin/products/${p.id}/edit`)}
                onDelete={setProductToDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmDialog
        isOpen={Boolean(productToDelete)}
        title="Delete this product?"
        description={`"${productToDelete?.name}" will be permanently removed. This can't be undone.`}
        onCancel={() => setProductToDelete(null)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
      />
    </>
  );
};
