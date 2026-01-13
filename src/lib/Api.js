import axios from "axios";
import { getToken, setToken, clearAuth } from "@/utils/tokenService";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((p) => {
    error ? p.reject(error) : p.resolve(token);
  });
  failedQueue = [];
};

/* ---------------- REQUEST ---------------- */
api.interceptors.request.use((config) => {
  const token = getToken();

  if (token?.accessToken) {
    config.headers.Authorization = `Bearer ${token.accessToken}`;
  }

  return config;
});

/* ---------------- RESPONSE ---------------- */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      isRefreshing = true;

      try {
        const token = getToken();

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/accounts/token/refresh/`,
          { refresh: token.refreshToken }
        );

        const newToken = {
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
        };

        setToken(newToken);
        processQueue(null, newToken.accessToken);

        originalRequest.headers.Authorization = `Bearer ${newToken.accessToken}`;

        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        clearAuth();
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
