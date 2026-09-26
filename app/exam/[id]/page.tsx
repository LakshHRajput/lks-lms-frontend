"use client";

import Link from "next/link";
import { use, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, CheckCircle2, Clock3, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ExamQuestion } from "@/components/tests/exam-question";

import {
  useExam,
  useSaveExamAnswers,
  useStartExam,
  useSubmitExam,
} from "@/lib/hooks/use-exam";

import type { ExamAnswer } from "@/types/exam";

interface ExamPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ExamPage({ params }: ExamPageProps) {
  /*
   * Get exam ID from route params.
   */
  const { id: examId } = use(params);

  /*
   * Current question index.
   */
  const [currentQuestion, setCurrentQuestion] = useState(0);

  /*
   * Answers selected locally by the student.
   */
  const [localAnswers, setLocalAnswers] = useState<Record<string, string>>({});

  /*
   * Current timestamp used for timer calculation.
   */
  const [now, setNow] = useState(() => Date.now());

  /*
   * Track whether exam has been submitted locally.
   */
  const [submitted, setSubmitted] = useState(false);

  /*
   * Prevent duplicate automatic submissions.
   */
  const autoSubmitRef = useRef(false);

  /*
   * Keep latest answers available to timer callback.
   */
  const answersRef = useRef<Record<string, string>>({});

  /*
   * Get exam.
   */
  const { data: response, isLoading, isError } = useExam(examId);

  /*
   * Exam mutations.
   */
  const startExam = useStartExam();
  const saveAnswers = useSaveExamAnswers();

  const { mutateAsync: submitExamAsync, isPending: isSubmitPending } =
    useSubmitExam();

  /*
   * Actual exam data.
   */
  const exam = response?.data;

  /*
   * Merge server answers with local answers.
   *
   * Local answers have priority.
   */
  const answers = useMemo(() => {
    const serverAnswers: Record<string, string> = {};

    exam?.answers?.forEach((item) => {
      serverAnswers[item.questionId] = item.answer;
    });

    return {
      ...serverAnswers,
      ...localAnswers,
    };
  }, [exam, localAnswers]);

  /*
   * Keep answersRef updated with latest answers.
   *
   * This is a ref update, not a React state update.
   */
  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  /*
   * Calculate start time directly.
   *
   * No useMemo is needed here.
   */
  const startTime = exam?.startedAt ? new Date(exam.startedAt).getTime() : null;

  /*
   * Calculate remaining seconds.
   */
  const remainingSeconds = useMemo(() => {
    if (
      !exam ||
      exam.status !== "in_progress" ||
      startTime === null ||
      Number.isNaN(startTime)
    ) {
      return null;
    }

    const durationSeconds = exam.durationMinutes * 60;

    const elapsedSeconds = Math.floor((now - startTime) / 1000);

    return Math.max(durationSeconds - elapsedSeconds, 0);
  }, [exam, startTime, now]);

  /*
   * Timer + automatic submission.
   */
  useEffect(() => {
    if (
      !exam ||
      exam.status !== "in_progress" ||
      !exam.startedAt ||
      submitted
    ) {
      return;
    }

    const parsedStartTime = new Date(exam.startedAt).getTime();

    if (Number.isNaN(parsedStartTime)) {
      return;
    }

    const durationSeconds = exam.durationMinutes * 60;

    /*
     * Reset auto-submit protection when
     * a new in-progress exam is loaded.
     */
    autoSubmitRef.current = false;

    const updateTimer = () => {
      const currentTime = Date.now();

      /*
       * Update current timestamp.
       */
      setNow(currentTime);

      /*
       * Calculate remaining time.
       */
      const elapsedSeconds = Math.floor((currentTime - parsedStartTime) / 1000);

      const remaining = Math.max(durationSeconds - elapsedSeconds, 0);

      /*
       * Automatically submit when timer reaches zero.
       */
      if (remaining <= 0 && !autoSubmitRef.current) {
        autoSubmitRef.current = true;

        const latestAnswers: ExamAnswer[] = Object.entries(
          answersRef.current,
        ).map(([questionId, answer]) => ({
          questionId,
          answer,
        }));

        void submitExamAsync({
          id: exam.id,
          data: {
            answers: latestAnswers,
          },
        })
          .then((result) => {
            if (result.success) {
              setSubmitted(true);
            }
          })
          .catch((error) => {
            /*
             * If automatic submission fails,
             * allow another attempt.
             */
            autoSubmitRef.current = false;

            console.error("Auto submit failed:", error);
          });
      }
    };

    /*
     * Start interval.
     *
     * We intentionally do not call updateTimer()
     * synchronously inside the effect.
     */
    const timer = window.setInterval(updateTimer, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [exam, submitted, submitExamAsync]);

  /*
   * Format timer.
   */
  const formattedTime = useMemo(() => {
    if (remainingSeconds === null) {
      return "--:--";
    }

    const minutes = Math.floor(remainingSeconds / 60);

    const seconds = remainingSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0",
    )}`;
  }, [remainingSeconds]);

  /*
   * Convert answers object into API format.
   */
  const answerList: ExamAnswer[] = Object.entries(answers).map(
    ([questionId, answer]) => ({
      questionId,
      answer,
    }),
  );

  /*
   * Start exam.
   */
  const handleStartExam = async () => {
    if (!examId) return;

    try {
      await startExam.mutateAsync(examId);

      /*
       * Reload page so latest status and startedAt
       * are loaded from backend.
       */
      window.location.reload();
    } catch (error) {
      console.error("Failed to start exam:", error);
    }
  };

  /*
   * Handle answer change.
   */
  const handleAnswerChange = (questionId: string, answer: string) => {
    setLocalAnswers((previous) => ({
      ...previous,
      [questionId]: answer,
    }));
  };

  /*
   * Save answers.
   */
  const handleSaveAnswers = async () => {
    if (!examId) return;

    try {
      await saveAnswers.mutateAsync({
        id: examId,
        answers: answerList,
      });
    } catch (error) {
      console.error("Failed to save answers:", error);
    }
  };

  /*
   * Manual submit exam.
   */
  const handleSubmitExam = async () => {
    if (!examId || submitted || isSubmitPending) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to submit the exam?",
    );

    if (!confirmed) {
      return;
    }

    try {
      const result = await submitExamAsync({
        id: examId,
        data: {
          answers: answerList,
        },
      });

      if (result.success) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Failed to submit exam:", error);
    }
  };

  /*
   * Loading state.
   */
  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-muted-foreground">Loading exam...</div>
      </div>
    );
  }

  /*
   * Error state.
   */
  if (isError || !exam) {
    return (
      <div className="space-y-6 p-6">
        <Button variant="ghost">
          <Link href="/tests" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>

        <div className="rounded-xl border p-8 text-center">
          <h2 className="text-lg font-semibold">Exam not found</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Unable to load this exam.
          </p>
        </div>
      </div>
    );
  }

  /*
   * Submitted state.
   */
  if (submitted || exam.status === "submitted") {
    return (
      <div className="mx-auto max-w-2xl space-y-6 p-6">
        <div className="rounded-2xl border bg-card p-8 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12" />

          <h1 className="mt-4 text-2xl font-bold">Exam Submitted</h1>

          <p className="mt-2 text-muted-foreground">
            Your exam has been submitted successfully.
          </p>

          {exam.score !== undefined && (
            <div className="mt-6">
              <p className="text-sm text-muted-foreground">Score</p>

              <p className="text-3xl font-bold">
                {exam.score} / {exam.totalMarks}
              </p>
            </div>
          )}

          {exam.percentage !== undefined && (
            <p className="mt-2 text-lg">{exam.percentage}%</p>
          )}

          <div className="mt-6">
            <Button>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  /*
   * Exam not started.
   */
  if (exam.status === "not_started") {
    return (
      <div className="mx-auto max-w-3xl space-y-6 p-6">
        <Button variant="ghost">
          <Link href="/tests" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tests
          </Link>
        </Button>

        <div className="rounded-2xl border bg-card p-8">
          <h1 className="text-2xl font-bold">{exam.title}</h1>

          {exam.description && (
            <p className="mt-3 text-muted-foreground">{exam.description}</p>
          )}

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Duration</p>

              <p className="mt-1 font-semibold">
                {exam.durationMinutes} minutes
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Questions</p>

              <p className="mt-1 font-semibold">{exam.questions.length}</p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Total Marks</p>

              <p className="mt-1 font-semibold">{exam.totalMarks}</p>
            </div>
          </div>

          <div className="mt-8">
            <Button onClick={handleStartExam} disabled={startExam.isPending}>
              {startExam.isPending ? "Starting..." : "Start Exam"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  /*
   * In-progress exam.
   */
  const question = exam.questions[currentQuestion];

  const answeredCount = Object.keys(answers).length;

  const isLastQuestion = currentQuestion === exam.questions.length - 1;

  /*
   * Next question.
   */
  const handleNext = async () => {
    await handleSaveAnswers();

    if (!isLastQuestion) {
      setCurrentQuestion((previous) => previous + 1);
    }
  };

  /*
   * Previous question.
   */
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((previous) => previous - 1);
    }
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="mx-auto max-w-6xl space-y-6 p-4 md:p-6">
        {/* Header */}
        <div className="sticky top-0 z-10 rounded-xl border bg-background p-4 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-xl font-bold">{exam.title}</h1>

              <p className="text-sm text-muted-foreground">
                {answeredCount} of {exam.questions.length} answered
              </p>
            </div>

            {/* Timer */}
            <div
              className={`flex items-center gap-3 rounded-lg border px-4 py-2 ${
                remainingSeconds !== null && remainingSeconds <= 60
                  ? "border-destructive text-destructive"
                  : ""
              }`}
            >
              <Clock3 className="h-5 w-5" />

              <span className="font-mono text-lg font-bold">
                {formattedTime}
              </span>
            </div>
          </div>
        </div>

        {/* Main */}
        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          {/* Question Area */}
          <div className="space-y-6">
            {question && (
              <ExamQuestion
                question={question}
                questionNumber={currentQuestion + 1}
                answer={answers[question.id]}
                onAnswerChange={(answer) =>
                  handleAnswerChange(question.id, answer)
                }
              />
            )}

            {/* Navigation */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>

              {!isLastQuestion ? (
                <Button onClick={handleNext} disabled={saveAnswers.isPending}>
                  {saveAnswers.isPending ? "Saving..." : "Save & Next"}
                </Button>
              ) : (
                <Button onClick={handleSubmitExam} disabled={isSubmitPending}>
                  <Send className="mr-2 h-4 w-4" />

                  {isSubmitPending ? "Submitting..." : "Submit Exam"}
                </Button>
              )}
            </div>
          </div>

          {/* Question Navigation */}
          <div className="h-fit rounded-xl border bg-background p-4 lg:sticky lg:top-24">
            <h2 className="font-semibold">Questions</h2>

            <div className="mt-4 grid grid-cols-5 gap-2">
              {exam.questions.map((item, index) => {
                const answered = Boolean(answers[item.id]);

                return (
                  <Button
                    key={item.id}
                    variant={
                      index === currentQuestion
                        ? "default"
                        : answered
                          ? "secondary"
                          : "outline"
                    }
                    className="h-10 w-10 p-0"
                    onClick={() => setCurrentQuestion(index)}
                  >
                    {index + 1}
                  </Button>
                );
              })}
            </div>

            {/* Statistics */}
            <div className="mt-6 space-y-2 text-sm">
              <div>Total Questions: {exam.questions.length}</div>

              <div>Answered: {answeredCount}</div>

              <div>Remaining: {exam.questions.length - answeredCount}</div>
            </div>

            {/* Save Answers */}
            <Button
              className="mt-6 w-full"
              variant="outline"
              onClick={handleSaveAnswers}
              disabled={saveAnswers.isPending}
            >
              {saveAnswers.isPending ? "Saving..." : "Save Answers"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
