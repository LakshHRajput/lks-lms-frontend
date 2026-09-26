"use client";

import Link from "next/link";
import { Plus, FileText } from "lucide-react";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import LoadingState from "@/components/states/loading-state";
import { EmptyState } from "@/components/states/empty-state";
import { ErrorState } from "@/components/states/error-state";

import { useNotes } from "@/lib/hooks/use-note";
import { useAuth } from "@/lib/hooks/use-auth";

import type { Note } from "@/types/note";

export default function NotesPage() {
  return (
    <DashboardLayout>
      <NotesContent />
    </DashboardLayout>
  );
}

function NotesContent() {
  const { user } = useAuth();

  const {
    data: notesData,
    isLoading,
    isError,
    refetch,
  } = useNotes();

  if (isLoading) {
    return <LoadingState message="Loading notes..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Unable to load notes"
        description="Something went wrong while loading notes."
        onRetry={() => refetch()}
      />
    );
  }

  const notes: Note[] =
    notesData?.data ?? [];

  const canManage =
    user?.role === "SUPER_ADMIN" ||
    user?.role === "ADMIN" ||
    user?.role === "TEACHER";

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold">
            Notes
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage study notes and learning material.
          </p>
        </div>

        {canManage && (
          <Link
            href="/notes/new"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            <Plus size={18} />
            Add Note
          </Link>
        )}
      </div>

      {notes.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            title="No notes found"
            description="Create your first study note."
          />
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <Link
              key={note.id}
              href={`/notes/${note.id}`}
              className="group rounded-xl border bg-background p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="rounded-lg bg-primary/10 p-3 text-primary w-fit">
                <FileText size={22} />
              </div>

              <h2 className="mt-5 font-semibold group-hover:text-primary">
                {note.title}
              </h2>

              {note.description && (
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                  {note.description}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}