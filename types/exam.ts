export type ExamStatus =
  | "not_started"
  | "in_progress"
  | "submitted";

export interface ExamAnswer {
  questionId: string;
  answer: string;
}

export interface ExamQuestion {
  id: string;
  questionText: string;
  questionType:
    | "mcq"
    | "true_false"
    | "short_answer"
    | "long_answer";

  marks: number;

  options?: {
    id: string;
    text: string;
  }[];

  order: number;
}

export interface Exam {
  id: string;
  testId: string;
  studentId: string;

  title: string;
  description?: string;

  durationMinutes: number;
  totalMarks: number;

  questions: ExamQuestion[];

  answers: ExamAnswer[];

  startedAt?: string;
  submittedAt?: string;

  status: ExamStatus;

  score?: number;
  percentage?: number;
}

export interface StartExamResponse {
  exam: Exam;
}

export interface SubmitExamInput {
  answers: ExamAnswer[];
}

export interface SubmitExamResponse {
  exam: Exam;
  score: number;
  percentage: number;
}