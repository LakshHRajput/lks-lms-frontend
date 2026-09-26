import apiClient from "../api-client";

import type {
  Exam,
  StartExamResponse,
  SubmitExamInput,
  SubmitExamResponse,
} from "@/types/exam";

export const examService = {
  getExam: async (id: string) => {
    const response = await apiClient.get<{
      success: boolean;
      message: string;
      data: Exam;
    }>(`/exams/${id}`);

    return response.data;
  },

  startExam: async (id: string) => {
    const response = await apiClient.post<{
      success: boolean;
      message: string;
      data: StartExamResponse;
    }>(`/exams/${id}/start`);

    return response.data;
  },

  saveAnswers: async (
    id: string,
    answers: SubmitExamInput["answers"],
  ) => {
    const response = await apiClient.put<{
      success: boolean;
      message: string;
      data: Exam;
    }>(`/exams/${id}/answers`, {
      answers,
    });

    return response.data;
  },

  submitExam: async (
    id: string,
    data: SubmitExamInput,
  ) => {
    const response = await apiClient.post<{
      success: boolean;
      message: string;
      data: SubmitExamResponse;
    }>(`/exams/${id}/submit`, data);

    return response.data;
  },
};