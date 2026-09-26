"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";

import { chapterService } from "@/lib/api/services/chapter.service";

export default function NewChapterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [chapterNumber, setChapterNumber] = useState("");
  const [description, setDescription] = useState("");
  const [subjectId, setSubjectId] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Chapter name is required.");
      return;
    }

    if (!chapterNumber) {
      setError("Chapter number is required.");
      return;
    }

    if (!subjectId) {
      setError("Subject ID is required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await chapterService.createChapter({
        name,
        chapterNumber: Number(chapterNumber),
        description,
        subjectId: Number(subjectId),
      });

      router.push("/chapters");
      router.refresh();
    } catch {
      setError("Failed to create chapter.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl">
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="rounded-xl border bg-background p-6">
          <h1 className="text-2xl font-bold">Add Chapter</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Create a new chapter.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label className="text-sm font-medium">Subject ID</label>

              <input
                type="number"
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                placeholder="Enter subject ID"
                className="mt-2 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Chapter Number</label>

              <input
                type="number"
                min="1"
                value={chapterNumber}
                onChange={(e) => setChapterNumber(e.target.value)}
                placeholder="Example: 1"
                className="mt-2 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Chapter Name</label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter chapter name"
                className="mt-2 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Description</label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Chapter description"
                className="mt-2 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Chapter"}
            </Button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
