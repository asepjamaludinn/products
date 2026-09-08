import Link from "next/link";
import { getCategoryIcon } from "@/lib/utils/categoryIcon";

export const CategoryTile = ({ category }) => {
  const Icon = getCategoryIcon(category.name);

  return (
    <Link
      href={`/shop?categoryId=${category.id}`}
      className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
        <Icon size={22} strokeWidth={1.75} />
      </div>
      <span className="text-sm font-medium text-slate-700">
        {category.name}
      </span>
    </Link>
  );
};
