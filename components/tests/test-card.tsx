"use client";

import Link from "next/link";

import { Clock, FileQuestion, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { Test } from "@/types/test";

interface TestCardProps {
  test: Test;
  canManage?: boolean;
  onDelete?: (id: string) => void;
}

export function TestCard({ test, canManage = false, onDelete }: TestCardProps) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{test.title}</h3>

          {test.description && (
            <p className="mt-1 text-sm text-muted-foreground">
              {test.description}
            </p>
          )}
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            test.status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {test.status}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
        <div className="rounded-lg bg-muted p-3">
          <p className="text-muted-foreground">Duration</p>

          <div className="mt-1 flex items-center gap-1 font-medium">
            <Clock className="h-4 w-4" />
            {test.durationMinutes} min
          </div>
        </div>

        <div className="rounded-lg bg-muted p-3">
          <p className="text-muted-foreground">Total Marks</p>

          <p className="mt-1 font-medium">{test.totalMarks}</p>
        </div>

        <div className="rounded-lg bg-muted p-3">
          <p className="text-muted-foreground">Passing</p>

          <p className="mt-1 font-medium">{test.passingMarks}</p>
        </div>

        <div className="rounded-lg bg-muted p-3">
          <p className="text-muted-foreground">Questions</p>

          <div className="mt-1 flex items-center gap-1 font-medium">
            <FileQuestion className="h-4 w-4" />

            {test.questionCount ?? 0}
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Button size="sm">
          <Link href={`/tests/${test.id}`}>View Test</Link>
        </Button>

        {canManage && (
          <>
            <Button variant="outline" size="sm">
              <Link href={`/tests/${test.id}?edit=true`}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete?.(test.id)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
