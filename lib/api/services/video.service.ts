import apiClient from "../api-client";

import type { ApiResponse } from "@/types/api";

import type {
  Video,
  CreateVideoInput,
} from "@/types/video";

export const videoService = {
  // Get all videos
  getVideos: async (chapterId?: number) => {
    const response = await apiClient.get<
      ApiResponse<Video[]>
    >(
      "/videos",
      chapterId
        ? {
          params: {
            chapterId,
          },
        }
        : undefined
    );

    return response.data;
  },

  // Get single video
  getVideoById: async (id: number) => {
    return apiClient.get<ApiResponse<Video>>(
      `/videos/${id}`
    );
  },

  // Create video
  createVideo: async (
    data: CreateVideoInput
  ) => {
    return apiClient.post<
      ApiResponse<Video>,
      CreateVideoInput
    >("/videos", data);
  },

  // Update video
  updateVideo: async (
    id: number,
    data: Partial<CreateVideoInput>
  ) => {
    return apiClient.put<
      ApiResponse<Video>,
      Partial<CreateVideoInput>
    >(`/videos/${id}`, data);
  },

  // Delete video
  deleteVideo: async (id: number) => {
    return apiClient.delete<ApiResponse<null>>(
      `/videos/${id}`
    );
  },
};