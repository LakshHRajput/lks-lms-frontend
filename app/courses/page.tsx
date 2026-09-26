"use client";

import Link from "next/link";
import { Plus, BookOpen } from "lucide-react";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import LoadingState from "@/components/states/loading-state";
import { EmptyState } from "@/components/states/empty-state";
import { ErrorState } from "@/components/states/error-state";

import { useCourses } from "@/lib/hooks/use-courses";
import { useAuth } from "@/lib/hooks/use-auth";

import type { Course } from "@/types/course";

export default function CoursesPage() {
  return (
    <DashboardLayout>
      <CoursesContent />
    </DashboardLayout>
  );
}

function CoursesContent() {
  const { user } = useAuth();

  const { data: coursesData, isLoading, isError, refetch } = useCourses();

  if (isLoading) {
    return <LoadingState message="Loading courses..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Unable to load courses"
        description="Something went wrong while loading courses."
        onRetry={() => refetch()}
      />
    );
  }

  const courses: Course[] = coursesData?.data?.data ?? [];

  const canManage = user?.role === "SUPER_ADMIN" || user?.role === "ADMIN";

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold">Courses</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage LKS academic courses.
          </p>
        </div>

        {canManage && (
          <Link
            href="/courses/new"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            <Plus size={18} />
            Add Course
          </Link>
        )}
      </div>

      {/* Courses */}
      {courses.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            title="No courses found"
            description="Create your first course to get started."
          />
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.id}`}
              className="group rounded-xl border bg-background p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="rounded-lg bg-primary/10 p-3 text-primary">
                  <BookOpen size={22} />
                </div>

                <span className="rounded-full bg-muted px-2.5 py-1 text-xs">
                  {course.status}
                </span>
              </div>

              <h2 className="mt-5 font-semibold group-hover:text-primary">
                {course.name}
              </h2>

              {course.description && (
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {course.description}
                </p>
              )}

              {course.className && (
                <p className="mt-4 text-xs font-medium">
                  Class: {course.className}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
