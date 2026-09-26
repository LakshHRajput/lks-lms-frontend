import  apiClient  from "../api-client";

import type { ApiResponse } from "@/types/api";

import type {
  Test,
  CreateTestInput,
  UpdateTestInput,
} from "@/types/test";

export const testService = {
  async getTests(): Promise<ApiResponse<Test[]>> {
    const response =
      await apiClient.get<ApiResponse<Test[]>>("/tests");

    return response.data;
  },

  async getTest(
    id: string
  ): Promise<ApiResponse<Test>> {
    const response =
      await apiClient.get<ApiResponse<Test>>(
        `/tests/${id}`
      );

    return response.data;
  },

  async createTest(
    data: CreateTestInput
  ): Promise<ApiResponse<Test>> {
    const response =
      await apiClient.post<ApiResponse<Test>>(
        "/tests",
        data
      );

    return response.data;
  },

  async updateTest(
    id: string,
    data: UpdateTestInput
  ): Promise<ApiResponse<Test>> {
    const response =
      await apiClient.put<ApiResponse<Test>>(
        `/tests/${id}`,
        data
      );

    return response.data;
  },

  async deleteTest(
    id: string
  ): Promise<ApiResponse<null>> {
    const response =
      await apiClient.delete<ApiResponse<null>>(
        `/tests/${id}`
      );

    return response.data;
  },
};