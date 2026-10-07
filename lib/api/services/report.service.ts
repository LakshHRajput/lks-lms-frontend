import apiClient from "../api-client";
import type { ApiResponse } from "@/types/api";

export interface OverviewReport {
  users: Array<{ role: string; activeCount: number }>;
  attendance: Array<{ status: string; count: number }>;
  fees: { recordsCreated: number; billedAmount: number; paidAmount: number; outstandingAmount: number };
  payments: Array<{ status: string; count: number; amount: number }>;
  learningProgress: { entries: number; completedEntries: number; averagePercent: number };
  attempts: Array<{ status: string; count: number; averageScore: number | null }>;
}

export interface AssessmentReport {
  testId: number;
  title: string;
  totalMarks: number;
  subject: { id: number; name: string; course: { id: number; name: string } };
  attempts: number;
  submittedAttempts: number;
  completionRate: number;
  averageScore: number | null;
  averagePercentage: number | null;
  bestScore: number | null;
}

export interface AssessmentReportResponse {
  success: boolean;
  message: string;
  data: AssessmentReport[];
  summary: { tests: number; attempts: number; submittedAttempts: number; completionRate: number };
}

export interface StudentProgressSummary {
  studentId: number | null;
  totalEntries: number;
  completedChapters: number;
  averageProgress: number;
  entries: Array<{
    id: number;
    progress: number;
    completed: boolean;
    chapter: { title: string; subject: { name: string } };
  }>;
}

export const reportService = {
  async getOverview() {
    const response = await apiClient.get<ApiResponse<OverviewReport>>("/reports/overview");
    return response.data.data;
  },

  async getAssessments() {
    const response = await apiClient.get<AssessmentReportResponse>("/reports/assessments");
    return response.data;
  },

  async getMyProgress() {
    const response = await apiClient.get<ApiResponse<StudentProgressSummary>>("/progress/summary");
    return response.data.data;
  },

  async downloadAssessmentCsv() {
    const response = await apiClient.get<Blob>("/reports/assessments/export.csv", {
      responseType: "blob",
    });
    const url = URL.createObjectURL(response.data);
    const link = document.createElement("a");
    link.href = url;
    link.download = "assessment-report.csv";
    link.click();
    URL.revokeObjectURL(url);
  },
};