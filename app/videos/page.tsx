"use client";

import Link from "next/link";
import { Plus, PlayCircle } from "lucide-react";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import LoadingState from "@/components/states/loading-state";
import { EmptyState } from "@/components/states/empty-state";
import { ErrorState } from "@/components/states/error-state";

import { useVideos } from "@/lib/hooks/use-video";
import { useAuth } from "@/lib/hooks/use-auth";

import type { Video } from "@/types/video";

export default function VideosPage() {
  return (
    <DashboardLayout>
      <VideosContent />
    </DashboardLayout>
  );
}

function VideosContent() {
  const { user } = useAuth();

  const { data: videosData, isLoading, isError, refetch } = useVideos();

  if (isLoading) {
    return <LoadingState message="Loading videos..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Unable to load videos"
        description="Something went wrong while loading videos."
        onRetry={() => refetch()}
      />
    );
  }

  const videos: Video[] = videosData?.data ?? [];

  const canManage =
    user?.role === "SUPER_ADMIN" ||
    user?.role === "ADMIN" ||
    user?.role === "TEACHER";

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold">Videos</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage course and chapter videos.
          </p>
        </div>

        {canManage && (
          <Link
            href="/videos/new"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            <Plus size={18} />
            Add Video
          </Link>
        )}
      </div>

      {videos.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            title="No videos found"
            description="Add your first educational video."
          />
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <Link
              key={video.id}
              href={`/videos/${video.id}`}
              className="group overflow-hidden rounded-xl border bg-background shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex h-40 items-center justify-center bg-muted">
                <PlayCircle size={48} className="text-primary" />
              </div>

              <div className="p-5">
                <h2 className="font-semibold group-hover:text-primary">
                  {video.title}
                </h2>

                {video.description && (
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                    {video.description}
                  </p>
                )}

                <span className="mt-4 inline-block rounded-full bg-muted px-2.5 py-1 text-xs">
                  {video.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
