"use client";

import { X } from "lucide-react";

import { navigationItems } from "@/config/navigation";
import { useAuth } from "@/lib/hooks/use-auth";

import { NavItem } from "./nav-item";

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function MobileSidebar({
  open,
  onClose,
}: MobileSidebarProps) {
  const { user } = useAuth();

  if (!open) {
    return null;
  }

  const items = navigationItems.filter(
    (item) =>
      user &&
      item.roles.includes(user.role)
  );

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      <aside className="relative flex h-full w-72 flex-col bg-background shadow-xl">
        <div className="flex h-16 items-center justify-between border-b px-5">
          <div>
            <p className="font-bold">
              LKS
            </p>

            <p className="text-xs text-muted-foreground">
              Learning Knowledge Solution
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-muted"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {items.map((item) => (
            <NavItem
              key={item.href}
              item={item}
            />
          ))}
        </nav>
      </aside>
    </div>
  );
}