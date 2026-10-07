import apiClient from "../api-client";

import type { ApiResponse } from "@/types/api";

import type {
  Question,
  CreateQuestionInput,
  UpdateQuestionInput,
} from "@/types/question";

export const questionService = {
  async getQuestions(
    testId: string
  ): Promise<ApiResponse<Question[]>> {
    const response =
      await apiClient.get<ApiResponse<Question[]>>(
        `/tests/${testId}/questions`
      );

    return response.data;
  },

  async getQuestion(
    id: string
  ): Promise<ApiResponse<Question>> {
    const response =
      await apiClient.get<ApiResponse<Question>>(
        `/questions/${id}`
      );

    return response.data;
  },

  async createQuestion(
    data: CreateQuestionInput
  ): Promise<ApiResponse<Question>> {
    const response =
      await apiClient.post<ApiResponse<Question>>(
        `/tests/${data.testId}/questions`,
        data
      );

    return response.data;
  },

  async updateQuestion(
    id: string,
    data: UpdateQuestionInput
  ): Promise<ApiResponse<Question>> {
    const response =
      await apiClient.patch<ApiResponse<Question>>(
        `/questions/${id}`,
        data
      );

    return response.data;
  },

  async deleteQuestion(
    id: string
  ): Promise<ApiResponse<null>> {
    const response =
      await apiClient.delete<ApiResponse<null>>(
        `/questions/${id}`
      );

    return response.data;
  },
};