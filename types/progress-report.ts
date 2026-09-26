export type Grade =
    | "A+"
    | "A"
    | "B+"
    | "B"
    | "C"
    | "D"
    | "F";

export type ResultStatus =
    | "pass"
    | "fail";

export interface SubjectPerformance {
    subjectId: string;
    subjectName: string;
    totalMarks: number;
    obtainedMarks: number;
    percentage: number;
    grade: Grade;
    status: ResultStatus;
}

export interface ExamPerformance {
    examId: string;
    examTitle: string;
    totalMarks: number;
    obtainedMarks: number;
    percentage: number;
    grade: Grade;
    status: ResultStatus;
    examDate?: string;
}

export interface ProgressReport {
    id: string;
    studentId: string;
    studentName?: string;
    admissionNumber?: string;
    className?: string;
    section?: string;

    academicYear: string;

    totalMarks: number;
    obtainedMarks: number;
    percentage: number;

    grade: Grade;
    status: ResultStatus;

    subjects: SubjectPerformance[];
    exams: ExamPerformance[];

    rank?: number;
    attendancePercentage?: number;

    teacherRemarks?: string;
    principalRemarks?: string;

    createdAt: string;
    updatedAt: string;
}

export interface GenerateProgressReportInput {
    studentId: string;
    academicYear: string;
}

export interface UpdateProgressReportInput {
    teacherRemarks?: string;
    principalRemarks?: string;
}

export interface ProgressReportSummary {
    totalMarks: number;
    obtainedMarks: number;
    percentage: number;
    grade: Grade;
    status: ResultStatus;
    rank?: number;
    attendancePercentage?: number;
}