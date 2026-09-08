"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/context/CartContext";
import { useToast } from "@/lib/context/ToastContext";
import { CartItemRow } from "@/components/molecules/CartItemRow";
import { ConfirmDialog } from "@/components/molecules/ConfirmDialog";
import { EmptyState } from "@/components/molecules/EmptyState";
import { Price } from "@/components/atoms/Price";
import { Button } from "@/components/atoms/Button";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    totalPrice,
    isHydrated,
  } = useCart();
  const toast = useToast();
  const [itemToRemove, setItemToRemove] = useState(null);
  const [isConfirmingClear, setIsConfirmingClear] = useState(false);

  if (!isHydrated) return null;

  const handleConfirmRemove = () => {
    removeItem(itemToRemove.productId);
    toast.success(`"${itemToRemove.name}" removed from cart`);
    setItemToRemove(null);
  };

  const handleConfirmClear = () => {
    clearCart();
    toast.success("Cart cleared");
    setIsConfirmingClear(false);
  };

  const router = useRouter();
  const handleCheckout = () => {
    router.push("/checkout");
  };

  if (items.length === 0) {
    return (
      <div>
        <h1 className="mb-6 text-2xl font-semibold text-slate-900">
          Your cart
        </h1>
        <EmptyState
          title="Your cart is empty"
          description="Browse the shop and add something you like."
        />
        <div className="mt-6 text-center">
          <Link href="/shop">
            <Button>Continue shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Your cart</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsConfirmingClear(true)}
        >
          Clear cart
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          {items.map((item) => (
            <CartItemRow
              key={item.productId}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={setItemToRemove}
            />
          ))}
        </div>

        <div className="h-fit rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900">
            Order summary
          </h3>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-slate-500">Subtotal</span>
            <Price value={totalPrice} />
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Shipping and taxes calculated at checkout.
          </p>
          <Button onClick={handleCheckout} className="mt-5 w-full">
            Proceed to checkout
          </Button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={Boolean(itemToRemove)}
        title="Remove this item?"
        description={`"${itemToRemove?.name}" will be removed from your cart.`}
        confirmLabel="Remove"
        onCancel={() => setItemToRemove(null)}
        onConfirm={handleConfirmRemove}
      />

      <ConfirmDialog
        isOpen={isConfirmingClear}
        title="Clear your entire cart?"
        description="All items will be removed. This can't be undone."
        confirmLabel="Clear cart"
        onCancel={() => setIsConfirmingClear(false)}
        onConfirm={handleConfirmClear}
      />
    </div>
  );
}
