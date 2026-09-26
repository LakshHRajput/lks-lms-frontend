"use client";

import { useState } from "react";

import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import type {
  CreateQuestionInput,
  QuestionOption,
  QuestionType,
} from "@/types/question";

interface QuestionFormProps {
  testId: string;
  onSubmit: (data: CreateQuestionInput) => void;
  isSubmitting?: boolean;
}

const defaultOptions: QuestionOption[] = [
  { id: "a", text: "" },
  { id: "b", text: "" },
  { id: "c", text: "" },
  { id: "d", text: "" },
];

export function QuestionForm({
  testId,
  onSubmit,
  isSubmitting = false,
}: QuestionFormProps) {
  const [questionText, setQuestionText] = useState("");

  const [questionType, setQuestionType] = useState<QuestionType>("mcq");

  const [marks, setMarks] = useState("1");

  const [options, setOptions] = useState<QuestionOption[]>(defaultOptions);

  const [correctAnswer, setCorrectAnswer] = useState("");

  const [explanation, setExplanation] = useState("");

  const updateOption = (id: string, text: string) => {
    setOptions((current) =>
      current.map((option) =>
        option.id === id ? { ...option, text } : option,
      ),
    );
  };

  const addOption = () => {
    const nextId = String.fromCharCode(97 + options.length);

    setOptions((current) => [
      ...current,
      {
        id: nextId,
        text: "",
      },
    ]);
  };

  const removeOption = (id: string) => {
    setOptions((current) => current.filter((option) => option.id !== id));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data: CreateQuestionInput = {
      testId,
      questionText,
      questionType,
      marks: Number(marks),
      explanation,
      status: "active",
    };

    if (questionType === "mcq") {
      data.options = options;
      data.correctAnswer = correctAnswer;
    }

    if (questionType === "true_false") {
      data.correctAnswer = correctAnswer;
    }

    if (questionType === "short_answer" || questionType === "long_answer") {
      data.correctAnswer = correctAnswer;
    }

    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border bg-card p-6"
    >
      <div className="space-y-2">
        <Label>Question Type</Label>

        <select
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value as QuestionType)}
          className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
        >
          <option value="mcq">Multiple Choice</option>

          <option value="true_false">True / False</option>

          <option value="short_answer">Short Answer</option>

          <option value="long_answer">Long Answer</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="question">Question</Label>

        <Textarea
          id="question"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Enter question"
          rows={5}
          required
        />
      </div>

      <div className="max-w-xs space-y-2">
        <Label htmlFor="marks">Marks</Label>

        <Input
          id="marks"
          type="number"
          min="1"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
          required
        />
      </div>

      {questionType === "mcq" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Options</Label>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addOption}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Option
            </Button>
          </div>

          <div className="space-y-3">
            {options.map((option) => (
              <div key={option.id} className="flex gap-2">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border font-medium">
                  {option.id.toUpperCase()}
                </div>

                <Input
                  value={option.text}
                  onChange={(e) => updateOption(option.id, e.target.value)}
                  placeholder={`Option ${option.id.toUpperCase()}`}
                  required
                />

                {options.length > 2 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeOption(option.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {questionType === "true_false" && (
        <div className="space-y-2">
          <Label>Correct Answer</Label>

          <select
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
            required
          >
            <option value="">Select answer</option>

            <option value="true">True</option>

            <option value="false">False</option>
          </select>
        </div>
      )}

      {questionType === "mcq" && (
        <div className="space-y-2">
          <Label>Correct Answer</Label>

          <select
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
            required
          >
            <option value="">Select correct option</option>

            {options.map((option) => (
              <option key={option.id} value={option.id}>
                Option {option.id.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      )}

      {(questionType === "short_answer" || questionType === "long_answer") && (
        <div className="space-y-2">
          <Label>Expected Answer</Label>

          <Textarea
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            placeholder="Enter expected/correct answer"
            rows={questionType === "long_answer" ? 5 : 3}
            required
          />
        </div>
      )}

      <div className="space-y-2">
        <Label>Explanation</Label>

        <Textarea
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          placeholder="Optional explanation for the answer"
          rows={4}
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Question"}
      </Button>
    </form>
  );
}
