"use client";

import {
  useState,
} from "react";

import { DashboardSidebar } from "./dashboard-sidebar";

import { DashboardHeader } from "./dashboard-header";

import { MobileSidebar } from "./mobile-sidebar";

import { ProtectedRoute } from "@/components/auth/protected-route";

export function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-muted/30">
        <DashboardSidebar />

        <MobileSidebar
          open={mobileOpen}
          onClose={() =>
            setMobileOpen(false)
          }
        />

        <div className="lg:pl-64">
          <DashboardHeader
            onMenuClick={() =>
              setMobileOpen(true)
            }
          />

          <main className="p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}