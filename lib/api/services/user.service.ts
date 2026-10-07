import apiClient from "../api-client";
import type { ApiResponse } from "@/types/api";
import type {
  ManagedUser,
  UpdateUserInput,
} from "@/types/user";

export const userService = {
  async getUsers(): Promise<ApiResponse<ManagedUser[]>> {
    const response =
      await apiClient.get<ApiResponse<ManagedUser[]>>("/users");

    return response.data;
  },

  async getUser(id: string): Promise<ApiResponse<ManagedUser>> {
    const response =
      await apiClient.get<ApiResponse<ManagedUser>>(`/users/${id}`);

    return response.data;
  },

  async updateUser(
    id: string,
    data: UpdateUserInput
  ): Promise<ApiResponse<ManagedUser>> {
    const response =
      await apiClient.patch<ApiResponse<ManagedUser>>(
        `/users/${id}`,
        data
      );

    return response.data;
  },

  async deleteUser(id: string): Promise<ApiResponse<null>> {
    const response =
      await apiClient.delete<ApiResponse<null>>(`/users/${id}`);

    return response.data;
  },
};