export interface Subject {
  id: number;
  courseId: number;
  name: string;
  slug: string;
  description?: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

export interface CreateSubjectInput {
  courseId: number;
  name: string;
  description?: string;
  status?: "active" | "inactive";
}