import apiClient from "../api-client";

import type { ApiResponse } from "@/types/api";

import type {
  Parent,
  CreateParentInput,
} from "@/types/parent";

export const parentService = {
  async getParents(): Promise<ApiResponse<Parent[]>> {
    const response = await apiClient.get<ApiResponse<Parent[]>>(
      "/parents"
    );

    return response.data;
  },

  async getParent(
    id: string
  ): Promise<ApiResponse<Parent>> {
    const response = await apiClient.get<ApiResponse<Parent>>(
      `/parents/${id}`
    );

    return response.data;
  },

  async createParent(
    data: CreateParentInput
  ): Promise<ApiResponse<Parent>> {
    const response = await apiClient.post<ApiResponse<Parent>>(
      "/parents",
      data
    );

    return response.data;
  },

  async updateParent(
    id: string,
    data: Partial<CreateParentInput>
  ): Promise<ApiResponse<Parent>> {
    const response = await apiClient.put<ApiResponse<Parent>>(
      `/parents/${id}`,
      data
    );

    return response.data;
  },

  async deleteParent(
    id: string
  ): Promise<ApiResponse<null>> {
    const response = await apiClient.delete<ApiResponse<null>>(
      `/parents/${id}`
    );

    return response.data;
  },

  async mapStudents(
    id: string,
    studentIds: string[]
  ): Promise<ApiResponse<Parent>> {
    const response = await apiClient.put<ApiResponse<Parent>>(
      `/parents/${id}/students`,
      {
        studentIds,
      }
    );

    return response.data;
  },
};