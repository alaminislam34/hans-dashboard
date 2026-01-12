"use client";

import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext(undefined);

export const StateProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedLogin = localStorage.getItem("login");
    const loginStatus = storedLogin ? JSON.parse(storedLogin) : false;

    setIsLogin(loginStatus);

    if (loginStatus) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [router]);

  const value = {
    isSidebarOpen,
    setIsSidebarOpen,
    isLogin,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useGlobalState = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a StateProvider");
  }
  return context;
};
