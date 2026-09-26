import axios from "axios";

const apiClient = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:4000/api/v1",

  headers: {
    "Content-Type": "application/json",
  },

  timeout: 15000,

  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    if (error.response?.status === 401) {
      // Authentication/session handling
      // will be implemented in Phase 4.
    }

    return Promise.reject(error);
  }
);

export default apiClient;