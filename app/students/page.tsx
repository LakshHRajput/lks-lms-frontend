"use client";

import Link from "next/link";

import { Plus, Users, FileText } from "lucide-react";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

import { StudentCard } from "@/components/management/student-card";

import { useStudents } from "@/lib/hooks/use-students";

import LoadingState from "@/components/states/loading-state";

import { EmptyState } from "@/components/states/empty-state";

import { ErrorState } from "@/components/states/error-state";

import { useAuth } from "@/lib/hooks/use-auth";

export default function StudentsPage() {
  const { user } = useAuth();

  const { data, isLoading, isError, refetch } = useStudents();

  const students = data?.data ?? [];

  const canCreate = user?.role === "SUPER_ADMIN" || user?.role === "ADMIN";

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Students</h1>

            <p className="text-sm text-muted-foreground">
              Manage all students and admissions.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/progress-reports"
              className="inline-flex items-center justify-center gap-2 rounded-lg border bg-background px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              <FileText className="h-4 w-4" />
              Progress Reports
            </Link>

            {canCreate && (
              <Link
                href="/students/new"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              >
                <Plus className="h-4 w-4" />
                Add Student
              </Link>
            )}
          </div>
        </div>

        {isLoading && <LoadingState />}

        {isError && (
          <ErrorState
            title="Failed to load students"
            description="Something went wrong while loading students."
            onRetry={() => refetch()}
          />
        )}

        {!isLoading && !isError && students.length === 0 && (
          <EmptyState
            icon={Users}
            title="No students found"
            description="Start by adding your first student."
          />
        )}

        {!isLoading && !isError && students.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {students.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
