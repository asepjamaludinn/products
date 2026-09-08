"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { useCart } from "@/lib/context/CartContext";
import { useToast } from "@/lib/context/ToastContext";
import * as productApi from "@/lib/api/product.api";
import * as messageApi from "@/lib/api/message.api";
import { ProductThumb } from "@/components/atoms/ProductThumb";
import { Price } from "@/components/atoms/Price";
import { Button } from "@/components/atoms/Button";
import { Spinner } from "@/components/atoms/Spinner";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { addItem } = useCart();
  const toast = useToast();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isChatStarting, setIsChatStarting] = useState(false);

  useEffect(() => {
    productApi
      .getProduct(params.id)
      .then((res) => setProduct(res.data))
      .finally(() => setIsLoading(false));
  }, [params.id]);

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`Added ${quantity} × "${product.name}" to cart`);
  };

  const handleChatSeller = async () => {
    if (!user) {
      toast.info("Please log in to chat with support.");
      router.push("/login");
      return;
    }
    setIsChatStarting(true);
    try {
      const res = await messageApi.startSupportConversation();
      router.push(`/messages/${res.data.id}`);
    } catch (error) {
      toast.error(error.message || "Failed to start chat");
      setIsChatStarting(false);
    }
  };

  if (isLoading) return <Spinner />;
  if (!product) return null;
  const isOutOfStock = product.stock === 0;

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
      <ProductThumb name={product.name} size="lg" />
      <div>
        <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500">
          {product.category?.name}
        </span>
        <h1 className="mt-3 text-2xl font-semibold text-slate-900">
          {product.name}
        </h1>
        <Price value={product.price} className="mt-3 text-2xl" />
        <p
          className={`mt-2 text-sm ${isOutOfStock ? "text-red-600" : "text-slate-500"}`}
        >
          {isOutOfStock ? "Out of stock" : `${product.stock} in stock`}
        </p>

        <div className="mt-8 flex flex-col gap-4">
          {!isOutOfStock && (
            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-lg border border-slate-300">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-slate-600 hover:bg-slate-50"
                >
                  −
                </button>
                <span className="w-10 text-center text-sm font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock, q + 1))
                  }
                  className="px-3 py-2 text-slate-600 hover:bg-slate-50"
                >
                  +
                </button>
              </div>
              <Button onClick={handleAddToCart} className="flex-1">
                Add to cart
              </Button>
            </div>
          )}
          <Button
            variant="secondary"
            onClick={handleChatSeller}
            isLoading={isChatStarting}
          >
            💬 Ask Support about this product
          </Button>
        </div>
      </div>
    </div>
  );
}
