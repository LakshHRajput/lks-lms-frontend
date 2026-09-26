import apiClient from "../api-client";

import type { ApiResponse } from "@/types/api";

import type {
  Subject,
  CreateSubjectInput,
} from "@/types/subject";

export const subjectService = {
  getSubjects: async (courseId?: number) => {
    return apiClient.get<ApiResponse<Subject[]>>(
      "/subjects",
      courseId
        ? {
            params: {
              courseId,
            },
          }
        : undefined
    );
  },

  getSubjectById: async (id: number) => {
    return apiClient.get<ApiResponse<Subject>>(
      `/subjects/${id}`
    );
  },

  createSubject: async (data: CreateSubjectInput) => {
    return apiClient.post<
      ApiResponse<Subject>,
      CreateSubjectInput
    >("/subjects", data);
  },

  updateSubject: async (
    id: number,
    data: Partial<CreateSubjectInput>
  ) => {
    return apiClient.put<
      ApiResponse<Subject>,
      Partial<CreateSubjectInput>
    >(`/subjects/${id}`, data);
  },

  deleteSubject: async (id: number) => {
    return apiClient.delete<ApiResponse<null>>(
      `/subjects/${id}`
    );
  },
};