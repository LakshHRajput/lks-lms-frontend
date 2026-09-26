
import apiClient from "../api-client";

import type { ApiResponse } from "@/types/api";

import type {
    Student,
    CreateStudentInput,
} from "@/types/student";

export const studentService = {
    async getStudents(): Promise<ApiResponse<Student[]>> {
        const response = await apiClient.get<ApiResponse<Student[]>>(
            "/students"
        );

        return response.data;
    },

    async getStudent(
        id: string
    ): Promise<ApiResponse<Student>> {
        const response = await apiClient.get<ApiResponse<Student>>(
            `/students/${id}`
        );

        return response.data;
    },

    async createStudent(
        data: CreateStudentInput
    ): Promise<ApiResponse<Student>> {
        const response = await apiClient.post<ApiResponse<Student>>(
            "/students",
            data
        );

        return response.data;
    },

    async updateStudent(
        id: string,
        data: Partial<CreateStudentInput>
    ): Promise<ApiResponse<Student>> {
        const response = await apiClient.put<ApiResponse<Student>>(
            `/students/${id}`,
            data
        );

        return response.data;
    },

    async deleteStudent(
        id: string
    ): Promise<ApiResponse<null>> {
        const response = await apiClient.delete<ApiResponse<null>>(
            `/students/${id}`
        );

        return response.data;
    },
};
