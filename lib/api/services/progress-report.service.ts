import apiClient from "../api-client";

import type {
  GenerateProgressReportInput,
  ProgressReport,
  ProgressReportSummary,
  UpdateProgressReportInput,
} from "@/types/progress-report";

import type { ApiResponse } from "@/types/api";

export const progressReportService = {
  async getReports(): Promise<
    ApiResponse<ProgressReport[]>
  > {
    const response = await apiClient.get<
      ApiResponse<ProgressReport[]>
    >("/progress-reports");

    return response.data;
  },

  async getReport(
    id: string,
  ): Promise<ApiResponse<ProgressReport>> {
    const response = await apiClient.get<
      ApiResponse<ProgressReport>
    >(`/progress-reports/${id}`);

    return response.data;
  },

  async getStudentReport(
    studentId: string,
  ): Promise<ApiResponse<ProgressReport[]>> {
    const response = await apiClient.get<
      ApiResponse<ProgressReport[]>
    >(`/students/${studentId}/progress-reports`);

    return response.data;
  },

  async getStudentSummary(
    studentId: string,
  ): Promise<
    ApiResponse<ProgressReportSummary>
  > {
    const response = await apiClient.get<
      ApiResponse<ProgressReportSummary>
    >(
      `/students/${studentId}/progress-reports/summary`,
    );

    return response.data;
  },

  async generateReport(
    data: GenerateProgressReportInput,
  ): Promise<ApiResponse<ProgressReport>> {
    const response = await apiClient.post<
      ApiResponse<ProgressReport>
    >("/progress-reports/generate", data);

    return response.data;
  },

  async updateReport(
    id: string,
    data: UpdateProgressReportInput,
  ): Promise<ApiResponse<ProgressReport>> {
    const response = await apiClient.put<
      ApiResponse<ProgressReport>
    >(`/progress-reports/${id}`, data);

    return response.data;
  },

  async deleteReport(
    id: string,
  ): Promise<ApiResponse<null>> {
    const response = await apiClient.delete<
      ApiResponse<null>
    >(`/progress-reports/${id}`);

    return response.data;
  },
};