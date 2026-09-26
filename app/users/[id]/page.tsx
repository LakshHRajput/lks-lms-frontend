"use client";

import Link from "next/link";

import { ArrowLeft, Mail, Phone, UserRound } from "lucide-react";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

import { useUser } from "@/lib/hooks/use-users";

import LoadingState from "@/components/states/loading-state";

import { ErrorState } from "@/components/states/error-state";

interface UserProfilePageProps {
  params: {
    id: string;
  };
}

function getRoleLabel(role: string) {
  return role
    .replace("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function UserProfilePage({ params }: UserProfilePageProps) {
  const { data, isLoading, isError, refetch } = useUser(params.id);

  const user = data?.data;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Back */}

        <Link
          href="/users"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Users
        </Link>

        {/* Loading */}

        {isLoading && <LoadingState />}

        {/* Error */}

        {isError && (
          <ErrorState
            title="Failed to load user"
            description="User information could not be loaded."
            onRetry={() => refetch()}
          />
        )}

        {/* Profile */}

        {!isLoading && !isError && user && (
          <div className="space-y-8 rounded-xl border bg-card p-6">
            {/* Header */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <UserRound className="h-7 w-7 text-primary" />
                </div>

                <div>
                  <h1 className="text-2xl font-bold">{user.name}</h1>

                  <p className="text-sm text-muted-foreground">
                    {getRoleLabel(user.role)}
                  </p>
                </div>
              </div>

              <span
                className={`w-fit rounded-full px-3 py-1 text-sm font-medium ${
                  user.status === "active"
                    ? "bg-green-100 text-green-700"
                    : user.status === "blocked"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-600"
                }`}
              >
                {user.status}
              </span>
            </div>

            {/* Information */}

            <section>
              <h2 className="mb-4 text-lg font-semibold">
                Account Information
              </h2>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>

                  <p className="mt-1 flex items-center gap-2 font-medium">
                    <Mail className="h-4 w-4" />
                    {user.email}
                  </p>
                </div>

                {user.phone && (
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>

                    <p className="mt-1 flex items-center gap-2 font-medium">
                      <Phone className="h-4 w-4" />
                      {user.phone}
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-muted-foreground">Role</p>

                  <p className="mt-1 font-medium">{getRoleLabel(user.role)}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Status</p>

                  <p className="mt-1 font-medium capitalize">{user.status}</p>
                </div>

                {user.lastLoginAt && (
                  <div>
                    <p className="text-sm text-muted-foreground">Last Login</p>

                    <p className="mt-1 font-medium">{user.lastLoginAt}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-muted-foreground">User ID</p>

                  <p className="mt-1 break-all font-mono text-sm">{user.id}</p>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
