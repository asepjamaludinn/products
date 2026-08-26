"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { Button } from "@/components/atoms/Button";
import { cn } from "@/lib/utils/cn";

const NAV_LINKS = [
  { href: "/products", label: "Products" },
  { href: "/categories", label: "Categories" },
];

export const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <nav className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
      <div className="flex items-center gap-6">
        <span className="font-semibold text-slate-900">Task-3</span>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "text-sm text-slate-600 hover:text-slate-900",
              pathname.startsWith(link.href) && "font-semibold text-slate-900",
            )}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-600">
          {user?.name} ({user?.role})
        </span>
        <Button variant="ghost" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </nav>
  );
};
