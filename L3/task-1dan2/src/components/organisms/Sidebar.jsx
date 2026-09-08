"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { useToast } from "@/lib/context/ToastContext";
import { Badge } from "@/components/atoms/Badge";
import { ConfirmDialog } from "@/components/molecules/ConfirmDialog";
import { NotificationBell } from "@/components/organisms/NotificationBell";
import { cn } from "@/lib/utils/cn";

const NAV_LINKS = [
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/messages", label: "Messages" },
  { href: "/profile", label: "Profile" },
];

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const toast = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const [isConfirmingLogout, setIsConfirmingLogout] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      toast.success("Logged out");
      router.replace("/login");
    } finally {
      setIsLoggingOut(false);
      setIsConfirmingLogout(false);
    }
  };

  return (
    <>
      <aside className="flex h-screen w-64 flex-shrink-0 flex-col justify-between border-r border-slate-800 bg-slate-900 text-slate-100">
        <div>
          <div className="flex h-16 items-center justify-between border-b border-slate-800 px-6">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold">
                TC
              </div>
              <span className="text-sm font-semibold tracking-wide">
                Tomorrow Co.
              </span>
            </Link>
            <NotificationBell variant="light" />
          </div>
          <nav className="flex flex-col gap-1 px-3 py-6">
            {NAV_LINKS.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-brand-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="border-t border-slate-800 p-4">
          <div className="flex items-center gap-3 rounded-lg bg-slate-800 px-3 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-sm font-bold uppercase">
              {user?.name?.charAt(0) ?? "?"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">
                {user?.name}
              </p>
              <div className="mt-0.5">
                <Badge role={user?.role} />
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsConfirmingLogout(true)}
            className="mt-3 w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
          >
            Log out
          </button>
        </div>
      </aside>

      <ConfirmDialog
        isOpen={isConfirmingLogout}
        title="Log out?"
        description="You'll need to sign in again to access the dashboard."
        confirmLabel="Log out"
        onCancel={() => setIsConfirmingLogout(false)}
        onConfirm={handleLogout}
        isLoading={isLoggingOut}
      />
    </>
  );
};
