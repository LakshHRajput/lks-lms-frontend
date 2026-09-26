import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

import { tokenManager } from "@/lib/auth/token-manager";
import { useRouter } from "next/navigation";



const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:4000/api";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,

  // Required for HttpOnly refresh cookie
  withCredentials: true,
});

let isRefreshing = false;

let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (
  error: unknown,
  token: string | null = null
) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenManager.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as
      | InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

    if (
      error.response?.status !== 401 ||
      originalRequest?._retry
    ) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization =
                `Bearer ${token}`;
            }

            resolve(axiosInstance(originalRequest));
          },

          reject,
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const response = await axios.post(
        `${API_URL}/auth/refresh`,
        {},
        {
          withCredentials: true,
        }
      );

      const newAccessToken =
        response.data?.data?.accessToken;

      if (!newAccessToken) {
        throw new Error("Access token missing");
      }

      tokenManager.setToken(newAccessToken);

      processQueue(null, newAccessToken);

      if (originalRequest.headers) {
        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;
      }

      return axiosInstance(originalRequest);
    } catch (refreshError) {
      tokenManager.clearToken();

      processQueue(refreshError, null);

      if (typeof window !== "undefined") {
        const router = useRouter();

        router.push("/dashboard");
      }

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default axiosInstance;