"use client";

import { useRouter, usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext(undefined);

export const StateProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState(null);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const admin = localStorage.getItem("admin");

      if (!token || !admin) {
        setIsLogin(false);
        setUser(null);

        if (pathname !== "/login") {
          router.replace("/login");
        }
        return;
      }

      const parsedToken = JSON.parse(token);

      if (!parsedToken?.accessToken) {
        localStorage.clear();
        setIsLogin(false);
        router.replace("/login");
        return;
      }

      setIsLogin(true);
      setUser(JSON.parse(admin));

      if (pathname === "/login") {
        router.replace("/dashboard");
      }
    } catch (err) {
      console.error("Auth error:", err);
      localStorage.clear();
      router.replace("/login");
    } finally {
      setAuthLoading(false);
    }
  }, [pathname, router]);

  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        isLogin,
        setIsLogin,
        authLoading,
        user,
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
