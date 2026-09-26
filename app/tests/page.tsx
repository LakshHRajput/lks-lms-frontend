"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";

import { TestCard } from "@/components/tests/test-card";

import LoadingState from "@/components/states/loading-state";
import { EmptyState } from "@/components/states/empty-state";
import { ErrorState } from "@/components/states/error-state";

import { useAuth } from "@/lib/hooks/use-auth";
import { useDeleteTest, useTests } from "@/lib/hooks/use-tests";

export default function TestsPage() {
  const { user } = useAuth();

  const {
    data: tests,
    isLoading,
    isError,
    refetch,
  } = useTests();

  const deleteTest = useDeleteTest();

  const canManage =
    user?.role === "SUPER_ADMIN" ||
    user?.role === "ADMIN";

  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this test?"
    );

    if (!confirmed) return;

    deleteTest.mutate(id);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold">
              Tests
            </h1>

            <p className="text-muted-foreground">
              Create and manage online tests.
            </p>
          </div>

          {canManage && (
            <Link href="/tests/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Test
              </Button>
            </Link>
          )}
        </div>

        {/* Loading */}
        {isLoading && <LoadingState />}

        {/* Error */}
        {isError && (
          <ErrorState
            title="Failed to load tests"
            description="Something went wrong while loading tests."
            onRetry={() => refetch()}
          />
        )}

        {/* Empty */}
        {!isLoading &&
          !isError &&
          (!tests || tests.length === 0) && (
            <EmptyState
              title="No tests found"
              description="Create your first test to get started."
            />
          )}

        {/* Tests */}
        {!isLoading &&
          !isError &&
          tests &&
          tests.length > 0 && (
            <div className="grid gap-5 lg:grid-cols-2">
              {tests.map((test) => (
                <TestCard
                  key={test.id}
                  test={test}
                  canManage={canManage}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
      </div>
    </DashboardLayout>
  );
}
