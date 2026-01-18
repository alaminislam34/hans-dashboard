import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // লাইব্রেরিটি ইম্পোর্ট করুন

const API_BASE_URL = "http://10.10.7.51:8000";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// টোকেন এক্সপায়ারড কি না তা চেক করার ফাংশন
const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // সেকেন্ডে রূপান্তর
    return decoded.exp < currentTime;
  } catch (error) {
    return true; // ডিকোড করতে না পারলে এক্সপায়ারড ধরে নেওয়া হবে
  }
};

axiosInstance.interceptors.request.use(
  async (config) => {
    let token = Cookies.get("accessToken");

    // যদি টোকেন থাকে এবং সেটি এক্সপায়ারড হয়ে যায়
    if (token && isTokenExpired(token)) {
      const refreshToken = Cookies.get("refreshToken");

      if (refreshToken && !isTokenExpired(refreshToken)) {
        try {
          // রিকোয়েস্ট যাওয়ার আগেই টোকেন রিফ্রেশ করার চেষ্টা
          const res = await axios.post(
            `${API_BASE_URL}/api/accounts/token/refresh/`,
            {
              refresh: refreshToken,
            },
          );

          if (res.status === 200) {
            token = res.data.access;
            Cookies.set("accessToken", token, { expires: 7, path: "/" });
          }
        } catch (error) {
          // রিফ্রেশ টোকেন কাজ না করলে লগআউট
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          window.location.href = "/login";
          return Promise.reject(error);
        }
      } else {
        // রিফ্রেশ টোকেনও এক্সপায়ারড হলে
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        window.location.href = "/login";
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

//

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // যদি কোনো কারণে প্রি-চেক মিস হয় এবং ৪০১ আসে
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
