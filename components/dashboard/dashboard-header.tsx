"use client";

import { Bell, Menu } from "lucide-react";

import { useAuth } from "@/lib/hooks/use-auth";

interface DashboardHeaderProps {
  onMenuClick?: () => void;
}

export function DashboardHeader({
  onMenuClick,
}: DashboardHeaderProps) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur md:px-6">
      {/* Left */}

      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 hover:bg-muted lg:hidden"
        >
          <Menu size={20} />
        </button>

      </div>

      {/* Right */}

      <div className="flex items-center gap-3">
        <button className="relative rounded-full p-2 hover:bg-muted">
          <Bell size={19} />

          <span className="absolute right-1 top-1 size-2 rounded-full bg-red-500" />
        </button>

        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium">
            {user?.name}
          </p>

          <p className="text-xs text-muted-foreground">
            {user?.role}
          </p>
        </div>

        <div className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
          {user?.name
            ?.charAt(0)
            .toUpperCase()}
        </div>
      </div>
    </header>
  );
}