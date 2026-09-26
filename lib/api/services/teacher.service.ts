import apiClient from "../api-client";

import type { ApiResponse } from "@/types/api";

import type {
  Teacher,
  CreateTeacherInput,
} from "@/types/teacher";

export const teacherService = {
  async getTeachers(): Promise<ApiResponse<Teacher[]>> {
    const response = await apiClient.get<ApiResponse<Teacher[]>>(
      "/teachers"
    );

    return response.data;
  },

  async getTeacher(
    id: string
  ): Promise<ApiResponse<Teacher>> {
    const response = await apiClient.get<ApiResponse<Teacher>>(
      `/teachers/${id}`
    );

    return response.data;
  },

  async createTeacher(
    data: CreateTeacherInput
  ): Promise<ApiResponse<Teacher>> {
    const response = await apiClient.post<ApiResponse<Teacher>>(
      "/teachers",
      data
    );

    return response.data;
  },

  async updateTeacher(
    id: string,
    data: Partial<CreateTeacherInput>
  ): Promise<ApiResponse<Teacher>> {
    const response = await apiClient.put<ApiResponse<Teacher>>(
      `/teachers/${id}`,
      data
    );

    return response.data;
  },

  async deleteTeacher(
    id: string
  ): Promise<ApiResponse<null>> {
    const response = await apiClient.delete<ApiResponse<null>>(
      `/teachers/${id}`
    );

    return response.data;
  },
};