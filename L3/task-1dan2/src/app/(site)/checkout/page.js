"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/context/CartContext";
import { useToast } from "@/lib/context/ToastContext";
import { FormField } from "@/components/molecules/FormField";
import { Button } from "@/components/atoms/Button";
import { Price } from "@/components/atoms/Price";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart, isHydrated } = useCart();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isHydrated) return null;
  if (items.length === 0) {
    router.replace("/cart");
    return null;
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulasi API delay
    setTimeout(() => {
      clearCart();
      toast.success("Order placed successfully! We'll process it soon.");
      router.push("/shop");
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="mb-6 text-2xl font-semibold text-slate-900">Checkout</h1>
      <form
        onSubmit={handlePlaceOrder}
        className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h2 className="mb-4 text-sm font-semibold text-slate-900">
          Shipping Details
        </h2>
        <div className="flex flex-col gap-4 mb-8">
          <FormField
            label="Full Name"
            name="name"
            required
            placeholder="John Doe"
          />
          <FormField
            label="Address"
            name="address"
            required
            placeholder="123 Main St, City"
          />
          <FormField
            label="Phone Number"
            name="phone"
            required
            placeholder="+1 234 567 890"
          />
        </div>

        <div className="border-t border-slate-100 pt-6">
          <div className="flex items-center justify-between text-base font-semibold text-slate-900 mb-6">
            <span>Total to pay</span>
            <Price value={totalPrice} />
          </div>
          <Button type="submit" className="w-full" isLoading={isSubmitting}>
            Place Order
          </Button>
        </div>
      </form>
    </div>
  );
}
