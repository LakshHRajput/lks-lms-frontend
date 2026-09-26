"use client";

import { useMemo, useState } from "react";

import { Search, Users } from "lucide-react";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

import { UserCard } from "@/components/management/user-card";

import { useUsers } from "@/lib/hooks/use-users";

import LoadingState from "@/components/states/loading-state";

import { EmptyState } from "@/components/states/empty-state";

import { ErrorState } from "@/components/states/error-state";

import type { UserRole } from "@/types/auth";

import type { UserStatus } from "@/types/user";

export default function UsersPage() {
  const { data, isLoading, isError, refetch } = useUsers();

  const [search, setSearch] = useState("");

  const [roleFilter, setRoleFilter] = useState<"ALL" | UserRole>("ALL");

  const [statusFilter, setStatusFilter] = useState<"ALL" | UserStatus>("ALL");

  const users = useMemo(() => data?.data || [], [data?.data]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        user.name.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue);

      const matchesRole = roleFilter === "ALL" || user.role === roleFilter;

      const matchesStatus =
        statusFilter === "ALL" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}

        <div>
          <h1 className="text-2xl font-bold">Users</h1>

          <p className="text-sm text-muted-foreground">
            Manage user accounts, roles and statuses.
          </p>
        </div>

        {/* Filters */}

        <div className="rounded-xl border bg-card p-4">
          <div className="grid gap-3 md:grid-cols-3">
            {/* Search */}

            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search name or email..."
                className="w-full rounded-lg border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Role */}

            <select
              value={roleFilter}
              onChange={(event) =>
                setRoleFilter(event.target.value as "ALL" | UserRole)
              }
              className="rounded-lg border bg-background px-3 py-2 text-sm"
            >
              <option value="ALL">All Roles</option>

              <option value="SUPER_ADMIN">Super Admin</option>

              <option value="ADMIN">Admin</option>

              <option value="TEACHER">Teacher</option>

              <option value="STUDENT">Student</option>

              <option value="PARENT">Parent</option>
            </select>

            {/* Status */}

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value as "ALL" | UserStatus)
              }
              className="rounded-lg border bg-background px-3 py-2 text-sm"
            >
              <option value="ALL">All Status</option>

              <option value="active">Active</option>

              <option value="inactive">Inactive</option>

              <option value="blocked">Blocked</option>
            </select>
          </div>
        </div>

        {/* Loading */}

        {isLoading && <LoadingState />}

        {/* Error */}

        {isError && (
          <ErrorState
            title="Failed to load users"
            description="Something went wrong while loading users."
            onRetry={() => refetch()}
          />
        )}

        {/* Empty */}

        {!isLoading && !isError && users.length === 0 && (
          <EmptyState
            icon={Users}
            title="No users found"
            description="There are no user accounts available."
          />
        )}

        {/* Filtered Empty */}

        {!isLoading &&
          !isError &&
          users.length > 0 &&
          filteredUsers.length === 0 && (
            <EmptyState
              icon={Search}
              title="No matching users"
              description="Try changing your search or filters."
            />
          )}

        {/* Users */}

        {!isLoading && !isError && filteredUsers.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
