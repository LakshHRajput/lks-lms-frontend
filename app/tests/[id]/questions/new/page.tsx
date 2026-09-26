"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

import { Button } from "@/components/ui/button";

import { QuestionForm } from "@/components/tests/question-form";

import { useCreateQuestion } from "@/lib/hooks/use-question";

import type { CreateQuestionInput } from "@/types/question";

export default function NewQuestionPage() {
  const params = useParams();

  const router = useRouter();

  const testId = params.id as string;

  const createQuestion = useCreateQuestion();

  const handleSubmit = (data: CreateQuestionInput) => {
    createQuestion.mutate(data, {
      onSuccess: () => {
        router.push(`/tests/${testId}/questions`);
      },
    });
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <Button variant="ghost">
            <Link href={`/tests/${testId}/questions`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Questions
            </Link>
          </Button>

          <h1 className="mt-4 text-2xl font-bold">Add Question</h1>

          <p className="text-muted-foreground">
            Add a new question to this test.
          </p>
        </div>

        <QuestionForm
          testId={testId}
          onSubmit={handleSubmit}
          isSubmitting={createQuestion.isPending}
        />
      </div>
    </DashboardLayout>
  );
}
