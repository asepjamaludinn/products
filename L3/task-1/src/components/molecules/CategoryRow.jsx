import { Button } from "@/components/atoms/Button";

export const CategoryRow = ({ category, isAdmin, onDelete }) => (
  <tr className="border-b border-slate-200">
    <td className="px-4 py-3 text-sm">{category.name}</td>
    {isAdmin && (
      <td className="px-4 py-3 text-right text-sm">
        <Button variant="danger" onClick={() => onDelete(category)}>
          Delete
        </Button>
      </td>
    )}
  </tr>
);
