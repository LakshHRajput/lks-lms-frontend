export type CourseStatus =
  | "active"
  | "inactive";

export interface Course {
  id: number;
  name: string;
  slug: string;
  description: string;
  className?: string;
  category?: string;
  thumbnail?: string;
  status: CourseStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCourseInput {
  name: string;
  description: string;
  className?: string;
  category?: string;
  thumbnail?: string;
  status?: CourseStatus;
}

export type UpdateCourseInput = CreateCourseInput;