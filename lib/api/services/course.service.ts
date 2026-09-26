import  apiClient  from "../api-client";

import type { ApiResponse } from "@/types/api";

import type {
  Course,
  CreateCourseInput,
  UpdateCourseInput,
} from "@/types/course";

export const courseService = {
  getCourses: async () => {
    return apiClient.get<ApiResponse<Course[]>>(
      "/courses"
    );
  },

  getCourseById: async (
    id: number
  ) => {
    return apiClient.get<ApiResponse<Course>>(
      `/courses/${id}`
    );
  },

  createCourse: async (
    data: CreateCourseInput
  ) => {
    return apiClient.post<
      ApiResponse<Course>,
      CreateCourseInput
    >("/courses", data);
  },

  updateCourse: async (
    id: number,
    data: UpdateCourseInput
  ) => {
    return apiClient.put<
      ApiResponse<Course>,
      UpdateCourseInput
    >(`/courses/${id}`, data);
  },

  deleteCourse: async (
    id: number
  ) => {
    return apiClient.delete<
      ApiResponse<null>
    >(`/courses/${id}`);
  },
};