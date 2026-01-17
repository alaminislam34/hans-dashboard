import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "http://10.10.7.51:8000";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get("refreshToken");

        const res = await axios.post(
          `${API_BASE_URL}/api/accounts/token/refresh/`,
          {
            refresh: refreshToken,
          },
        );

        if (res.status === 200) {
          const newAccessToken = res.data.access;

          Cookies.set("accessToken", newAccessToken, { expires: 7, path: "/" });

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
