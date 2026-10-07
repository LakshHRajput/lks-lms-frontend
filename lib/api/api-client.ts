import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

import { tokenManager } from "@/lib/auth/token-manager";
import type { AuthTokenResponse } from "@/types/auth";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
  withCredentials: true,
});

let refreshRequest: Promise<string> | null = null;

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = tokenManager.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const request = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;
    const requestUrl = request?.url ?? "";

    if (
      error.response?.status !== 401 ||
      !request ||
      request._retry ||
      requestUrl.includes("/auth/login") ||
      requestUrl.includes("/auth/register") ||
      requestUrl.includes("/auth/refresh")
    ) {
      return Promise.reject(error);
    }

    request._retry = true;

    if (!refreshRequest) {
      refreshRequest = axios
        .post<AuthTokenResponse>(`${API_BASE_URL}/auth/refresh`, {}, { withCredentials: true })
        .then((response) => {
          const token = response.data.data.accessToken;
          tokenManager.setToken(token);
          return token;
        })
        .catch((refreshError: unknown) => {
          tokenManager.clearToken();
          if (typeof window !== "undefined") {
            window.dispatchEvent(new Event("lks:session-expired"));
          }
          throw refreshError;
        })
        .finally(() => {
          refreshRequest = null;
        });
    }

    try {
      const token = await refreshRequest;
      request.headers.Authorization = `Bearer ${token}`;
      return apiClient(request);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  }
);

export default apiClient;