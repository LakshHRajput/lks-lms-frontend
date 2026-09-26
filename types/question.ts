export type QuestionType =
  | "mcq"
  | "true_false"
  | "short_answer"
  | "long_answer";

export type QuestionStatus = "active" | "inactive";

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  testId: string;

  questionText: string;
  questionType: QuestionType;

  marks: number;

  options?: QuestionOption[];

  correctAnswer?: string;

  explanation?: string;

  status: QuestionStatus;

  order: number;

  createdAt: string;
  updatedAt: string;
}

export interface CreateQuestionInput {
  testId: string;

  questionText: string;
  questionType: QuestionType;

  marks: number;

  options?: QuestionOption[];

  correctAnswer?: string;

  explanation?: string;

  status?: QuestionStatus;

  order?: number;
}

export type UpdateQuestionInput =
  Partial<CreateQuestionInput>;