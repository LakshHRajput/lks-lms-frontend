"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";

export default function AdminPage() {
  return (
    <ProtectedRoute
      allowedRoles={[
        "SUPER_ADMIN",
        "ADMIN",
      ]}
    >
      <div className="p-6">
        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <p className="mt-2">
          Only Admin and Super Admin can access this.
        </p>
      </div>
    </ProtectedRoute>
  );
}