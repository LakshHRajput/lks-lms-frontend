"use client";

import Link from "next/link";

import {
  Plus,
  Users,
} from "lucide-react";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

import { ParentCard } from "@/components/management/parent-card";

import {
  useParents,
} from "@/lib/hooks/use-parent";

import LoadingState from "@/components/states/loading-state";

import { EmptyState } from "@/components/states/empty-state";

import { ErrorState } from "@/components/states/error-state";

import { useAuth } from "@/lib/hooks/use-auth";

export default function ParentsPage() {
  const { user } = useAuth();

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useParents();

  const parents = data?.data ?? [];

  const canCreate =
    user?.role === "SUPER_ADMIN" ||
    user?.role === "ADMIN";

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Header */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h1 className="text-2xl font-bold">
              Parents
            </h1>

            <p className="text-sm text-muted-foreground">
              Manage parents and their children.
            </p>
          </div>

          {canCreate && (
            <Link
              href="/parents/new"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              <Plus className="h-4 w-4" />
              Add Parent
            </Link>
          )}
        </div>

        {/* Loading */}

        {isLoading && <LoadingState />}

        {/* Error */}

        {isError && (
          <ErrorState
            title="Failed to load parents"
            description="Something went wrong while loading parents."
            onRetry={() => refetch()}
          />
        )}

        {/* Empty */}

        {!isLoading &&
          !isError &&
          parents.length === 0 && (
            <EmptyState
              icon={Users}
              title="No parents found"
              description="Start by adding your first parent."
            />
          )}

        {/* List */}

        {!isLoading &&
          !isError &&
          parents.length > 0 && (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {parents.map((parent) => (
                <ParentCard
                  key={parent.id}
                  parent={parent}
                />
              ))}
            </div>
          )}
      </div>
    </DashboardLayout>
  );
}