"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import type { ExamQuestion as ExamQuestionType } from "@/types/exam";

interface ExamQuestionProps {
  question: ExamQuestionType;
  questionNumber: number;
  answer?: string;
  onAnswerChange: (answer: string) => void;
}

export function ExamQuestion({
  question,
  questionNumber,
  answer,
  onAnswerChange,
}: ExamQuestionProps) {
  return (
    <div className="space-y-6 rounded-xl border bg-card p-6">
      {/* Question Header */}
      <div>
        <div className="mb-2 text-sm font-medium text-muted-foreground">
          Question {questionNumber}
        </div>

        <h2 className="text-lg font-semibold leading-relaxed">
          {question.questionText}
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Marks: {question.marks}
        </p>
      </div>

      {/* MCQ */}
      {question.questionType === "mcq" &&
        question.options &&
        question.options.length > 0 && (
          <div className="space-y-3">
            {question.options.map((option) => {
              const optionId = `question-${question.id}-option-${option.id}`;

              return (
                <div
                  key={option.id}
                  className="flex items-center gap-3 rounded-lg border p-4 transition hover:bg-muted/50"
                >
                  <input
                    type="radio"
                    id={optionId}
                    name={`question-${question.id}`}
                    value={option.id}
                    checked={answer === option.id}
                    onChange={(event) =>
                      onAnswerChange(event.target.value)
                    }
                    className="h-4 w-4"
                  />

                  <Label
                    htmlFor={optionId}
                    className="flex-1 cursor-pointer"
                  >
                    {option.text}
                  </Label>
                </div>
              );
            })}
          </div>
        )}

      {/* True / False */}
      {question.questionType === "true_false" && (
        <div className="space-y-3">
          {["true", "false"].map((value) => {
            const optionId = `question-${question.id}-${value}`;

            return (
              <div
                key={value}
                className="flex items-center gap-3 rounded-lg border p-4"
              >
                <input
                  type="radio"
                  id={optionId}
                  name={`question-${question.id}`}
                  value={value}
                  checked={answer === value}
                  onChange={(event) =>
                    onAnswerChange(event.target.value)
                  }
                  className="h-4 w-4"
                />

                <Label
                  htmlFor={optionId}
                  className="cursor-pointer capitalize"
                >
                  {value}
                </Label>
              </div>
            );
          })}
        </div>
      )}

      {/* Short / Long Answer */}
      {(question.questionType === "short_answer" ||
        question.questionType === "long_answer") && (
        <div className="space-y-2">
          <Label htmlFor={`answer-${question.id}`}>
            Your Answer
          </Label>

          <Textarea
            id={`answer-${question.id}`}
            value={answer ?? ""}
            onChange={(event) =>
              onAnswerChange(event.target.value)
            }
            placeholder="Enter your answer..."
            rows={
              question.questionType === "long_answer"
                ? 8
                : 4
            }
          />
        </div>
      )}
    </div>
  );
}