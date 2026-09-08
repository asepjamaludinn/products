"use client";

import Link from "next/link";
import { useCart } from "@/lib/context/CartContext";
import { useToast } from "@/lib/context/ToastContext";
import { ProductThumb } from "@/components/atoms/ProductThumb";
import { Price } from "@/components/atoms/Price";
import { Button } from "@/components/atoms/Button";

const MOCK_COLORS = [
  "bg-slate-900",
  "bg-slate-500",
  "bg-slate-200",
  "bg-stone-400",
];

export const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const toast = useToast();
  const isOutOfStock = product.stock === 0;

  const handleAddToCart = (event) => {
    event.preventDefault();
    addItem(product, 1);
    toast.success(`"${product.name}" added to cart`);
  };

  const isBestChoice = product.id % 2 !== 0;

  return (
    <Link
      href={`/product/${product.id}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-[#f4f5f7] p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200"
    >
      {/* Floating Badge */}
      <div className="absolute left-6 top-6 z-10">
        {isBestChoice ? (
          <span className="rounded-full bg-emerald-500 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
            Best Choice
          </span>
        ) : (
          <span className="rounded-full bg-[#8b5cf6] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
            New
          </span>
        )}
      </div>

      {/* Thumbnail Area */}
      <div className="mb-6 mt-12 flex w-full items-center justify-center transition-transform duration-500 group-hover:scale-105">
        <div className="w-[85%]">
          <ProductThumb name={product.name} />
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col px-1">
        <h3 className="line-clamp-2 text-[15px] font-bold leading-snug text-slate-900">
          {product.name}{" "}
          <span className="font-normal text-slate-500">
            / {product.category?.name}
          </span>
        </h3>

        <div className="mt-2 text-[15px] font-medium text-slate-500">
          <Price value={product.price} />
        </div>

        {/* Color Swatches */}
        <div className="mt-5 flex items-center gap-2">
          {MOCK_COLORS.map((color, idx) => (
            <div
              key={idx}
              className={`h-4 w-4 rounded-full ${color} ring-1 ring-slate-900/10 ring-offset-2 ${
                idx === 0 ? "ring-offset-slate-200" : "ring-transparent"
              }`}
            />
          ))}
        </div>

        {/* Hover Action Button */}
        <div className="mt-6 overflow-hidden">
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="w-full translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          >
            {isOutOfStock ? "Unavailable" : "Add to cart"}
          </Button>
        </div>
      </div>
    </Link>
  );
};
