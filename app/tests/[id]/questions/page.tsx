"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { ArrowLeft, Plus } from "lucide-react";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

import { Button } from "@/components/ui/button";

import LoadingState from "@/components/states/loading-state";
import { EmptyState } from "@/components/states/empty-state";
import { ErrorState } from "@/components/states/error-state";

import { QuestionCard } from "@/components/tests/question-card";

import { useDeleteQuestion, useQuestions } from "@/lib/hooks/use-question";

import { useAuth } from "@/lib/hooks/use-auth";

export default function QuestionsPage() {
  const params = useParams();

  const testId = params.id as string;

  const { user } = useAuth();

  const { data: questions, isLoading, isError, refetch } = useQuestions(testId);

  const deleteQuestion = useDeleteQuestion();

  const canManage =
    user?.role === "SUPER_ADMIN" ||
    user?.role === "ADMIN" ||
    user?.role === "TEACHER";

  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this question?",
    );

    if (!confirmed) return;

    deleteQuestion.mutate(id);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <Button variant="ghost" className="mb-3">
              <Link href={`/tests/${testId}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Test
              </Link>
            </Button>

            <h1 className="text-2xl font-bold">Questions</h1>

            <p className="text-muted-foreground">
              Manage questions for this test.
            </p>
          </div>

          {canManage && (
            <Button>
              <Link href={`/tests/${testId}/questions/new`}>
                <Plus className="mr-2 h-4 w-4" />
                Add Question
              </Link>
            </Button>
          )}
        </div>

        {isLoading && <LoadingState />}

        {isError && (
          <ErrorState
            title="Failed to load questions"
            description="Something went wrong while loading questions."
            onRetry={() => refetch()}
          />
        )}

        {!isLoading && !isError && (!questions || questions.length === 0) && (
          <EmptyState
            title="No questions found"
            description="Add your first question to this test."
          />
        )}

        {!isLoading && !isError && questions && questions.length > 0 && (
          <div className="space-y-4">
            {questions.map((question, index) => (
              <QuestionCard
                key={question.id}
                question={question}
                index={index}
                canManage={canManage}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
