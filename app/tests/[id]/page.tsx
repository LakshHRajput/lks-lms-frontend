"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { ArrowLeft, Clock, FileQuestion } from "lucide-react";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

import { Button } from "@/components/ui/button";

import LoadingState from "@/components/states/loading-state";
import { ErrorState } from "@/components/states/error-state";

import { useTest } from "@/lib/hooks/use-tests";

export default function TestDetailsPage() {
  const params = useParams();

  const id = params.id as string;

  const { data: test, isLoading, isError, refetch } = useTest(id);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Back Button */}
        <Button variant="ghost">
          <Link href="/tests">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tests
          </Link>
        </Button>

        {/* Loading */}
        {isLoading && <LoadingState />}

        {/* Error */}
        {isError && (
          <ErrorState
            title="Failed to load test"
            description="Unable to load test details."
            onRetry={() => refetch()}
          />
        )}

        {/* Test Details */}
        {!isLoading && !isError && test && (
          <>
            <div className="rounded-xl border bg-card p-6">
              {/* Header */}
              <div className="flex flex-col justify-between gap-4 sm:flex-row">
                <div>
                  <h1 className="text-2xl font-bold">{test.title}</h1>

                  {test.description && (
                    <p className="mt-2 text-muted-foreground">
                      {test.description}
                    </p>
                  )}
                </div>

                <span
                  className={`h-fit rounded-full px-3 py-1 text-xs font-medium ${
                    test.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {test.status}
                </span>
              </div>

              {/* Test Stats */}
              <div className="mt-6 grid gap-4 sm:grid-cols-4">
                {/* Duration */}
                <div className="rounded-lg bg-muted p-4">
                  <Clock className="h-5 w-5" />

                  <p className="mt-2 text-sm text-muted-foreground">Duration</p>

                  <p className="font-semibold">
                    {test.durationMinutes} minutes
                  </p>
                </div>

                {/* Total Marks */}
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm text-muted-foreground">Total Marks</p>

                  <p className="font-semibold">{test.totalMarks}</p>
                </div>

                {/* Passing Marks */}
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm text-muted-foreground">Passing Marks</p>

                  <p className="font-semibold">{test.passingMarks}</p>
                </div>

                {/* Questions */}
                <div className="rounded-lg bg-muted p-4">
                  <FileQuestion className="h-5 w-5" />

                  <p className="mt-2 text-sm text-muted-foreground">
                    Questions
                  </p>

                  <p className="font-semibold">{test.questionCount ?? 0}</p>
                </div>
              </div>
            </div>

            {/* Question Actions */}
            <div className="flex flex-wrap gap-3">
              {/* Manage Questions */}
              <Button>
                <Link href={`/tests/${test.id}/questions`}>
                  <FileQuestion className="mr-2 h-4 w-4" />
                  Manage Questions
                </Link>
              </Button>

              {/* Add Question */}
              <Button variant="outline">
                <Link href={`/tests/${test.id}/questions/new`}>
                  Add Question
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
