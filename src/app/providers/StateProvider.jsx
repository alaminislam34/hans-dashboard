"use client";

import { useRouter, usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const AppContext = createContext(undefined);

export const StateProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState(null);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const tokenStr = localStorage.getItem("token");
        const adminStr = localStorage.getItem("admin");

        // Not logged in
        if (!tokenStr || !adminStr) {
          setIsLogin(false);
          setUser(null);

          if (pathname !== "/login") {
            router.replace("/login");
            toast.error("Session expired");
          }
          return;
        }

        const token = JSON.parse(tokenStr);
        const admin = JSON.parse(adminStr);

        if (!token?.accessToken) {
          localStorage.removeItem("token");
          localStorage.removeItem("admin");

          setIsLogin(false);
          setUser(null);

          router.replace("/login");
          toast.error("Session expired");
          return;
        }

        // Logged in
        setIsLogin(true);
        setUser(admin);

        if (pathname === "/login") {
          router.replace("/dashboard");
        }
      } catch (err) {
        console.error("Auth check failed:", err);

        localStorage.removeItem("token");
        localStorage.removeItem("admin");

        setIsLogin(false);
        setUser(null);
        router.replace("/login");
      } finally {
        setAuthLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  const value = {
    isSidebarOpen,
    setIsSidebarOpen,
    isLogin,
    setIsLogin,
    authLoading,
    user,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useGlobalState = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useGlobalState must be used within StateProvider");
  }
  return context;
};
