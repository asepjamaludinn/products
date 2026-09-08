"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";
import { useCart } from "@/lib/context/CartContext";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { NotificationBell } from "@/components/organisms/NotificationBell";

const NAV_LINK_CLASSES =
  "hidden rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 sm:block";

export const SiteHeader = () => {
  const { user, isAdmin, logout } = useAuth();
  const { totalItems } = useCart();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    router.push(
      `/shop${searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : ""}`,
    );
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3.5">
        <div className="flex items-center gap-6 flex-1">
          <Link href="/" className="flex flex-shrink-0 items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
              TC
            </div>
            <span className="hidden text-sm font-semibold text-slate-900 sm:block">
              Tomorrow Co.
            </span>
          </Link>
          <form
            onSubmit={handleSearch}
            className="hidden sm:block flex-1 max-w-md"
          >
            <Input
              placeholder="Search for products…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>

        <nav className="flex flex-shrink-0 items-center gap-1 sm:gap-1.5">
          <Link href="/shop" className={NAV_LINK_CLASSES}>
            Shop
          </Link>

          <Link
            href="/cart"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <ShoppingCart size={19} strokeWidth={1.75} />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-semibold text-white">
                {totalItems}
              </span>
            )}
          </Link>

          {user && <NotificationBell />}

          <div className="mx-1.5 hidden h-6 w-px bg-slate-200 sm:block" />

          {user ? (
            <div className="flex items-center gap-1 sm:gap-1.5">
              <Link href="/messages" className={NAV_LINK_CLASSES}>
                Messages
              </Link>
              <Link href="/profile" className={NAV_LINK_CLASSES}>
                Profile
              </Link>
              {isAdmin && (
                <Link href="/admin/products" className="hidden pl-1 lg:block">
                  <Button variant="secondary" size="sm">
                    Admin
                  </Button>
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                Log out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="secondary" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">Sign up</Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
