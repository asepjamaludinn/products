import { Button } from "@/components/atoms/Button";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export const ProductRow = ({ product, isAdmin, onEdit, onDelete }) => (
  <tr className="border-b border-slate-100 text-sm transition-colors last:border-0 hover:bg-slate-50">
    <td className="px-5 py-3.5 font-medium text-slate-900">{product.name}</td>
    <td className="px-5 py-3.5">
      <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
        {product.category?.name}
      </span>
    </td>
    <td className="px-5 py-3.5 text-slate-600">
      {formatCurrency(product.price)}
    </td>
    <td className="px-5 py-3.5 text-slate-600">
      <span className={product.stock === 0 ? "font-medium text-red-600" : ""}>
        {product.stock}
      </span>
    </td>
    {isAdmin && (
      <td className="px-5 py-3.5 text-right">
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={() => onEdit(product)}>
            Edit
          </Button>
          <Button variant="danger" size="sm" onClick={() => onDelete(product)}>
            Delete
          </Button>
        </div>
      </td>
    )}
  </tr>
);
