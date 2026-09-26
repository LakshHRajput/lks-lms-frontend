export type TestStatus = "active" | "inactive";

export interface Test {
  id: string;
  title: string;
  description?: string;

  courseId?: string;
  subjectId?: string;
  chapterId?: string;

  durationMinutes: number;
  totalMarks: number;
  passingMarks: number;

  questionCount?: number;

  status: TestStatus;

  createdAt: string;
  updatedAt: string;
}

export interface CreateTestInput {
  title: string;
  description?: string;

  courseId?: string;
  subjectId?: string;
  chapterId?: string;

  durationMinutes: number;
  totalMarks: number;
  passingMarks: number;

  status?: TestStatus;
}

export type UpdateTestInput = Partial<CreateTestInput>;