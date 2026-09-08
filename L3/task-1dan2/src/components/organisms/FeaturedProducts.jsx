"use client";

import Link from "next/link";
import { useProducts } from "@/lib/hooks/useProducts";
import { ProductCard } from "@/components/molecules/ProductCard";
import { Spinner } from "@/components/atoms/Spinner";

export const FeaturedProducts = () => {
  const { products, isLoading } = useProducts({ initialLimit: 8 });

  if (isLoading) return <Spinner />;
  if (products.length === 0) return null;

  return (
    <section className="mt-8 md:mt-12">
      {/* Header Section */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Best sellers
        </h2>
        <Link
          href="/shop"
          className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-200 sm:text-sm"
        >
          View all
          <span aria-hidden="true" className="text-slate-400">
            ❯
          </span>
        </Link>
      </div>

      {/* Horizontal Scroll / Slider Layout */}
      <div className="-mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-12 sm:-mx-16 sm:px-16 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[280px] shrink-0 snap-start sm:w-[320px]"
          >
            <ProductCard product={product} />
          </div>
        ))}
        {/* Elemen kosong untuk memberi ruang di akhir scroll */}
        <div className="w-[1px] shrink-0" />
      </div>
    </section>
  );
};
