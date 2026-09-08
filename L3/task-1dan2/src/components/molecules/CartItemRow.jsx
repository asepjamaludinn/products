"use client";

import { ProductThumb } from "@/components/atoms/ProductThumb";
import { Price } from "@/components/atoms/Price";
import { Button } from "@/components/atoms/Button";

export const CartItemRow = ({ item, onUpdateQuantity, onRemove }) => (
  <div className="flex items-center gap-4 border-b border-slate-100 py-4 last:border-0">
    <div className="w-16 flex-shrink-0">
      <ProductThumb name={item.name} />
    </div>
    <div className="min-w-0 flex-1">
      <p className="truncate text-sm font-medium text-slate-900">{item.name}</p>
      <p className="text-xs text-slate-500">{item.categoryName}</p>
      <Price value={item.price} className="mt-1 text-sm" />
    </div>
    <div className="flex items-center gap-2">
      <button
        onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
        disabled={item.quantity <= 1}
        className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-300 text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40"
      >
        −
      </button>
      <span className="w-6 text-center text-sm font-medium">
        {item.quantity}
      </span>
      <button
        onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
        disabled={item.quantity >= item.stock}
        className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-300 text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40"
      >
        +
      </button>
    </div>
    <Button variant="ghost" size="sm" onClick={() => onRemove(item)}>
      Remove
    </Button>
  </div>
);
