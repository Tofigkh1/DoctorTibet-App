import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";

// Axios instance oluştur
export const instanceAxios: AxiosInstance = axios.create({
  baseURL: "/api/",  // API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: Access token'ı isteklere otomatik ekle
instanceAxios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (err: AxiosError) => {
    return Promise.reject(err);
  }
);

// Response interceptor: 401 Unauthorized hatasında token yenile
instanceAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // 401 Unauthorized hatası kontrolü
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        try {
          // Yeni access token almak için refresh token ile istek yap
          const { data } = await axios.post("/api/auth/refresh", {
            token: refreshToken,
          });

          // Yeni token'ı localStorage'a kaydet
          localStorage.setItem("access_token", data.access_token);

          // Orijinal isteği yeniden yap, yeni token ile
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
          }

          return instanceAxios(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);
