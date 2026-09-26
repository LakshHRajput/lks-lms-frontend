"use client";

import { CheckCircle2, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { Question } from "@/types/question";

interface QuestionCardProps {
  question: Question;
  index: number;
  canManage?: boolean;
  onDelete?: (id: string) => void;
}

const typeLabels = {
  mcq: "Multiple Choice",
  true_false: "True / False",
  short_answer: "Short Answer",
  long_answer: "Long Answer",
};

export function QuestionCard({
  question,
  index,
  canManage = false,
  onDelete,
}: QuestionCardProps) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
            {index + 1}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                {typeLabels[question.questionType]}
              </span>

              <span className="rounded-full bg-muted px-2.5 py-1 text-xs">
                {question.marks} {question.marks === 1 ? "mark" : "marks"}
              </span>
            </div>

            <h3 className="mt-3 font-medium">{question.questionText}</h3>
          </div>
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs ${
            question.status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {question.status}
        </span>
      </div>

      {question.options && question.options.length > 0 && (
        <div className="mt-5 space-y-2 pl-11">
          {question.options.map((option) => {
            const isCorrect = option.id === question.correctAnswer;

            return (
              <div
                key={option.id}
                className={`flex items-center gap-2 rounded-lg border p-3 text-sm ${
                  isCorrect ? "border-green-500 bg-green-50" : ""
                }`}
              >
                <span className="font-medium">{option.id.toUpperCase()}.</span>

                <span>{option.text}</span>

                {isCorrect && (
                  <CheckCircle2 className="ml-auto h-4 w-4 text-green-600" />
                )}
              </div>
            );
          })}
        </div>
      )}

      {question.correctAnswer &&
        (!question.options || question.options.length === 0) && (
          <div className="mt-4 ml-11 rounded-lg bg-muted p-3 text-sm">
            <span className="font-medium">Correct Answer:</span>{" "}
            {question.correctAnswer}
          </div>
        )}

      {question.explanation && (
        <div className="mt-4 ml-11 rounded-lg border-l-4 p-3 text-sm">
          <span className="font-medium">Explanation:</span>{" "}
          {question.explanation}
        </div>
      )}

      {canManage && (
        <div className="mt-5 flex gap-2 pl-11">
          <Button variant="outline" size="sm">
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>

          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete?.(question.id)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}
