
import apiClient from "../api-client";

import type {
    AuthResponse,
    LoginInput,
    RegisterInput,
    MeResponse,
} from "@/types/auth";

export const authService = {
    login: async (
        data: LoginInput
    ): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>(
            "/auth/login",
            data
        );

        return response.data;
    },

    register: async (
        data: RegisterInput
    ): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>(
            "/auth/register",
            data
        );

        return response.data;
    },

    me: async (): Promise<MeResponse> => {
        const response = await apiClient.get<MeResponse>(
            "/auth/me"
        );

        return response.data;
    },

    refresh: async (): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>(
            "/auth/refresh"
        );

        return response.data;
    },

    logout: async () => {
        const response = await apiClient.post<{
            success: boolean;
            message: string;
        }>("/auth/logout");

        return response.data;
    },
};

