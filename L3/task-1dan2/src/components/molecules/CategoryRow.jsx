import { Button } from "@/components/atoms/Button";

export const CategoryRow = ({ category, isAdmin, onDelete }) => (
  <tr className="border-b border-slate-100 text-sm transition-colors last:border-0 hover:bg-slate-50">
    <td className="px-5 py-3.5 font-medium text-slate-900">{category.name}</td>
    {isAdmin && (
      <td className="px-5 py-3.5 text-right">
        <Button variant="danger" size="sm" onClick={() => onDelete(category)}>
          Delete
        </Button>
      </td>
    )}
  </tr>
);
