"use client";

import Link from "next/link";
import { Plus, BookOpen } from "lucide-react";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import LoadingState from "@/components/states/loading-state";
import { EmptyState } from "@/components/states/empty-state";
import { ErrorState } from "@/components/states/error-state";

import { useChapters } from "@/lib/hooks/use-chapter";
import { useAuth } from "@/lib/hooks/use-auth";

import type { Chapter } from "@/types/chapter";

export default function ChaptersPage() {
  return (
    <DashboardLayout>
      <ChaptersContent />
    </DashboardLayout>
  );
}

function ChaptersContent() {
  const { user } = useAuth();

  const { data: chaptersData, isLoading, isError, refetch } = useChapters();

  if (isLoading) {
    return <LoadingState message="Loading chapters..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Unable to load chapters"
        description="Something went wrong while loading chapters."
        onRetry={() => refetch()}
      />
    );
  }

  const chapters: Chapter[] = chaptersData?.data ?? [];

  const canManage =
    user?.role === "SUPER_ADMIN" ||
    user?.role === "ADMIN" ||
    user?.role === "TEACHER";

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold">Chapters</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage chapters for your academic subjects.
          </p>
        </div>

        {canManage && (
          <Link
            href="/chapters/new"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            <Plus size={18} />
            Add Chapter
          </Link>
        )}
      </div>

      {chapters.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            title="No chapters found"
            description="Create your first chapter to get started."
          />
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {chapters.map((chapter) => (
            <Link
              key={chapter.id}
              href={`/chapters/${chapter.id}`}
              className="group rounded-xl border bg-background p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-lg bg-primary/10 p-3 text-primary">
                  <BookOpen size={22} />
                </div>

                <span className="rounded-full bg-muted px-2.5 py-1 text-xs">
                  {chapter.status}
                </span>
              </div>

              <h2 className="mt-5 font-semibold group-hover:text-primary">
                {chapter.name}
              </h2>

              {chapter.description && (
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {chapter.description}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
