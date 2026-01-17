"use client";

import { useRouter, usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import {
  LOGIN_API,
  OTP_VERIFY_API,
  PASSWORD_FORGET_API,
  PASSWORD_SET_API, // এটি নিশ্চিত করুন ইমপোর্ট করা আছে
} from "@/api/ApiEndPoint";
import axiosInstance from "@/api/axiosInstance";

const AppContext = createContext(undefined);

export const StateProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);

  const [tempEmail, setTempEmail] = useState("");
  const [authFlow, setAuthFlow] = useState("");

  const router = useRouter();

  const login = async (email, password) => {
    try {
      const res = await axiosInstance.post(LOGIN_API, { email, password });

      if (res.status === 200) {
        Cookies.set("accessToken", res.data.tokens.access, {
          expires: 7,
          path: "/",
        });
        Cookies.set("refreshToken", res.data.tokens.refresh, {
          expires: 7,
          path: "/",
        });

        const userData = {
          name: "Super Admin",
          email: res.data.user.email,
          image: res.data.user.profile_picture,
        };

        Cookies.set("admin", JSON.stringify(userData), {
          expires: 7,
          path: "/",
        });

        setIsLogin(true);
        setUser(userData);
        toast.success("Login Successful!");
        router.push("/dashboard");
        return { success: true };
      }
    } catch (error) {
      const errorMsg = error?.response?.data?.message || "Invalid credentials!";
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  const requestPasswordReset = async (email) => {
    try {
      const res = await axiosInstance.post(PASSWORD_FORGET_API, { email });

      if (res.status === 200 || res.status === 201) {
        setTempEmail(email);
        setAuthFlow("forget");
        toast.success("Reset code sent to your email!");
        router.push("/login/verify-otp");
        return { success: true };
      }
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message || "Something went wrong!";
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  const verifyOtp = async (otp) => {
    try {
      const res = await axiosInstance.post(OTP_VERIFY_API, {
        email: tempEmail,
        otp: otp,
      });

      if (res.status === 200) {
        toast.success("OTP Verified! Please set a new password.");
        router.push("/login/change-pass");
        return { success: true };
      }
    } catch (error) {
      const errorMsg = error?.response?.data?.message || "Invalid OTP!";
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  const resetPassword = async (newPassword, confirmPassword) => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return { success: false };
    }

    try {
      const res = await axiosInstance.post(PASSWORD_SET_API, {
        email: tempEmail,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });

      if (res.status === 200 || res.status === 201) {
        toast.success("Password changed successfully! Please login.");
        setTempEmail("");
        setAuthFlow("");
        router.push("/login");
        return { success: true };
      }
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message || "Failed to reset password!";
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  const resendOtp = async () => {
    if (!tempEmail) {
      toast.error("Email not found.");
      return;
    }
    try {
      await axiosInstance.post(PASSWORD_FORGET_API, { email: tempEmail });
      toast.success("OTP has been resent!");
    } catch (error) {
      toast.error("Failed to resend OTP.");
    }
  };

  const logout = () => {
    Cookies.remove("accessToken", { path: "/" });
    Cookies.remove("refreshToken", { path: "/" });
    Cookies.remove("admin", { path: "/" });
    setIsLogin(false);
    setUser(null);
    router.push("/login");
  };

  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        isLogin,
        setIsLogin,
        user,
        tempEmail,
        authFlow,
        login,
        verifyOtp,
        logout,
        requestPasswordReset,
        resetPassword,
        resendOtp,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useGlobalState must be used inside StateProvider");
  }
  return context;
};
