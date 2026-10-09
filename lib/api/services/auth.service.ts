import apiClient from "../api-client";

import type {
    AuthTokenResponse,
    AuthResponse,
    LoginInput,
    RegisterInput,
    MeResponse,
    RegisterResponse,
} from "@/types/auth";

export const authService = {
    login: async (data: LoginInput): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>(
            "/api/v1/auth/login",
            data
        );

        return response.data;
    },

    register: async (data: RegisterInput): Promise<RegisterResponse> => {
        const response = await apiClient.post<RegisterResponse>(
            "/api/v1/auth/register",
            data
        );

        return response.data;
    },

    me: async (): Promise<MeResponse> => {
        const response = await apiClient.get<MeResponse>(
            "/api/v1/auth/me"
        );

        return response.data;
    },

    refresh: async (): Promise<AuthTokenResponse> => {
        const response = await apiClient.post<AuthTokenResponse>(
            "/api/v1/auth/refresh",
            {}
        );

        return response.data;
    },

    logout: async () => {
        const response = await apiClient.post<{
            success: boolean;
            message: string;
        }>("/api/v1/auth/logout");

        return response.data;
    },
};
