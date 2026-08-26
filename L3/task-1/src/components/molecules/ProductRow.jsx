import { Button } from "@/components/atoms/Button";

export const ProductRow = ({ product, isAdmin, onEdit, onDelete }) => (
  <tr className="border-b border-slate-200">
    <td className="px-4 py-3 text-sm">{product.name}</td>
    <td className="px-4 py-3 text-sm">{product.category?.name}</td>
    <td className="px-4 py-3 text-sm">{product.price.toLocaleString()}</td>
    <td className="px-4 py-3 text-sm">{product.stock}</td>
    {isAdmin && (
      <td className="px-4 py-3 text-right text-sm">
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => onEdit(product)}>
            Edit
          </Button>
          <Button variant="danger" onClick={() => onDelete(product)}>
            Delete
          </Button>
        </div>
      </td>
    )}
  </tr>
);
