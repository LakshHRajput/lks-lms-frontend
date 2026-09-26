import apiClient from "../api-client";

import type { ApiResponse } from "@/types/api";

import type {
  Chapter,
  CreateChapterInput,
} from "@/types/chapter";

export const chapterService = {
  // Get all chapters
  getChapters: async (subjectId?: number) => {
    const response = await apiClient.get<
      ApiResponse<Chapter[]>
    >(
      "/chapters",
      subjectId
        ? {
          params: {
            subjectId,
          },
        }
        : undefined
    );

    return response.data;
  },

  // Get single chapter
  getChapterById: async (id: number) => {
    return apiClient.get<ApiResponse<Chapter>>(
      `/chapters/${id}`
    );
  },

  // Create chapter
  createChapter: async (
    data: CreateChapterInput
  ) => {
    return apiClient.post<
      ApiResponse<Chapter>,
      CreateChapterInput
    >("/chapters", data);
  },

  // Update chapter
  updateChapter: async (
    id: number,
    data: Partial<CreateChapterInput>
  ) => {
    return apiClient.put<
      ApiResponse<Chapter>,
      Partial<CreateChapterInput>
    >(`/chapters/${id}`, data);
  },

  // Delete chapter
  deleteChapter: async (id: number) => {
    return apiClient.delete<ApiResponse<null>>(
      `/chapters/${id}`
    );
  },
};