"use client";

import Link from "next/link";

import {
  Plus,
  Users,
} from "lucide-react";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

import { TeacherCard } from "@/components/management/teacher-card";

import {
  useTeachers,
} from "@/lib/hooks/use-teachers";

import LoadingState from "@/components/states/loading-state";

import { EmptyState } from "@/components/states/empty-state";

import { ErrorState } from "@/components/states/error-state";

import { useAuth } from "@/lib/hooks/use-auth";

export default function TeachersPage() {
  const { user } = useAuth();

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useTeachers();

  const teachers = data?.data ?? [];

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
              Teachers
            </h1>

            <p className="text-sm text-muted-foreground">
              Manage teachers, qualifications and assignments.
            </p>
          </div>

          {canCreate && (
            <Link
              href="/teachers/new"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              <Plus className="h-4 w-4" />
              Add Teacher
            </Link>
          )}
        </div>

        {/* Loading */}

        {isLoading && <LoadingState />}

        {/* Error */}

        {isError && (
          <ErrorState
            title="Failed to load teachers"
            description="Something went wrong while loading teachers."
            onRetry={() => refetch()}
          />
        )}

        {/* Empty */}

        {!isLoading &&
          !isError &&
          teachers.length === 0 && (
            <EmptyState
              icon={Users}
              title="No teachers found"
              description="Start by adding your first teacher."
            />
          )}

        {/* Teachers */}

        {!isLoading &&
          !isError &&
          teachers.length > 0 && (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {teachers.map((teacher) => (
                <TeacherCard
                  key={teacher.id}
                  teacher={teacher}
                />
              ))}
            </div>
          )}
      </div>
    </DashboardLayout>
  );
}