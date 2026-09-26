export type StudentStatus = "active" | "inactive";

export interface Student {
  id: string;
  userId?: string;

  admissionNumber: string;

  firstName: string;
  lastName: string;

  email?: string;
  phone?: string;

  dateOfBirth?: string;
  gender?: "male" | "female" | "other";

  className: string;
  section?: string;

  courseId?: string;

  parentId?: string;

  address?: string;

  status: StudentStatus;

  createdAt: string;
  updatedAt: string;
}

export interface CreateStudentInput {
  admissionNumber: string;

  firstName: string;
  lastName: string;

  email?: string;
  phone?: string;

  dateOfBirth?: string;
  gender?: "male" | "female" | "other";

  className: string;
  section?: string;

  courseId?: string;

  parentId?: string;

  address?: string;

  status?: StudentStatus;
}