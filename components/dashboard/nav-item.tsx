"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import * as Icons from "lucide-react";

import type { NavigationItem } from "@/config/navigation";

interface NavItemProps {
  item: NavigationItem;
  collapsed?: boolean;
}

export function NavItem({
  item,
  collapsed = false,
}: NavItemProps) {
  const pathname = usePathname();

  const isActive =
    pathname === item.href ||
    pathname.startsWith(`${item.href}/`);

  const Icon =
    Icons[
      item.icon as keyof typeof Icons
    ] as React.ElementType;

  return (
    <Link
      href={item.href}
      title={collapsed ? item.title : undefined}
      className={`
        flex items-center gap-3 rounded-lg px-3 py-2.5
        text-sm font-medium transition-colors
        ${
          isActive
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }
        ${collapsed ? "justify-center" : ""}
      `}
    >
      {Icon && <Icon size={18} />}

      {!collapsed && (
        <span>{item.title}</span>
      )}
    </Link>
  );
}