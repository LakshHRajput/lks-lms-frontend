"use client";

import Link from "next/link";
import { BookOpen, Edit, Plus, Search } from "lucide-react";
import { useState } from "react";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";
import  LoadingState  from "@/components/states/loading-state";
import { ErrorState } from "@/components/states/error-state";

import { useSubjects } from "@/lib/hooks/use.subjects";
import { useAuth } from "@/lib/hooks/use-auth";

import type { Subject } from "@/types/subject";

export default function SubjectsPage() {
  const { user } = useAuth();

  const { data: subjectsData, isLoading, isError, refetch } = useSubjects();

  const [search, setSearch] = useState("");

  const canManage =
    user?.role === "SUPER_ADMIN" ||
    user?.role === "ADMIN" ||
    user?.role === "TEACHER";

  const subjects: Subject[] = subjectsData?.data?.data ?? [];

  const filteredSubjects = subjects.filter((subject) => {
    const query = search.toLowerCase();

    return (
      subject.name.toLowerCase().includes(query) ||
      subject.description?.toLowerCase().includes(query)
    );
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <LoadingState />
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout>
        <ErrorState
          title="Unable to load subjects"
          description="Something went wrong while loading subjects."
          onRetry={() => refetch()}
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen size={28} className="text-primary" />

              <h1 className="text-2xl font-bold tracking-tight">Subjects</h1>
            </div>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage subjects available in your LMS.
            </p>
          </div>

          {canManage && (
            <Button>
              <Link href="/subjects/new">
                <Plus size={16} />
                Add Subject
              </Link>
            </Button>
          )}
        </div>

        {/* Search */}
        <div className="rounded-xl border bg-background p-4">
          <div className="relative max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search subjects..."
              className="w-full rounded-lg border bg-background py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Subject List */}
        <div className="rounded-xl border bg-background">
          <div className="border-b px-5 py-4">
            <h2 className="font-semibold">All Subjects</h2>

            <p className="text-sm text-muted-foreground">
              {filteredSubjects.length} subject
              {filteredSubjects.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {filteredSubjects.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
              <div className="mb-4 rounded-full bg-muted p-4">
                <BookOpen size={28} className="text-muted-foreground" />
              </div>

              <h3 className="font-semibold">No subjects found</h3>

              <p className="mt-1 max-w-md text-sm text-muted-foreground">
                No subjects are available yet. Add a subject to start organizing
                your course content.
              </p>

              {canManage && (
                <Button variant="outline" className="mt-4">
                  <Link href="/subjects/new">
                    <Plus size={16} />
                    Add Subject
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSubjects.map((subject) => (
                <div
                  key={subject.id}
                  className="rounded-xl border p-5 transition hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <BookOpen size={20} className="text-primary" />
                    </div>

                    {canManage && (
                      <Button variant="ghost" size="sm">
                        <Link href={`/subjects/${subject.id}`}>
                          <Edit size={15} />
                          Edit
                        </Link>
                      </Button>
                    )}
                  </div>

                  <h3 className="mt-4 font-semibold">{subject.name}</h3>

                  {subject.description && (
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {subject.description}
                    </p>
                  )}

                  <div className="mt-4 border-t pt-3">
                    <Link
                      href={`/chapters?subjectId=${subject.id}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      View Chapters →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
