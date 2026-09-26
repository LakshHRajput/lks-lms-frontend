export type TeacherStatus = "active" | "inactive";

export interface Teacher {
  id: string;
  userId?: string;

  employeeId: string;

  firstName: string;
  lastName: string;

  email: string;
  phone?: string;

  qualification?: string;
  experience?: number;

  specialization?: string;

  assignedCourses?: string[];
  assignedSubjects?: string[];

  status: TeacherStatus;

  createdAt: string;
  updatedAt: string;
}

export interface CreateTeacherInput {
  employeeId: string;

  firstName: string;
  lastName: string;

  email: string;
  phone?: string;

  qualification?: string;
  experience?: number;

  specialization?: string;

  assignedCourses?: string[];
  assignedSubjects?: string[];

  status?: TeacherStatus;
}