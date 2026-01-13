"use client";

import React, { useState } from "react";
import { Mail, Lock, EyeOff, Eye } from "lucide-react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { LOGIN_API } from "@/api/ApiEndPoint";

const LoginPage = () => {
  const [email, setEmail] = useState("shohagmony781@gmail.com");
  const [password, setPassword] = useState("123");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (!email || !password) {
        toast.error("Email or Password are required");
        return;
      }

      const res = await axios.post(LOGIN_API, { email, password });

      if (res.status === 200) {
        toast.success("Logged in Successfully");

        localStorage.setItem(
          "token",
          JSON.stringify({
            accessToken: res.data.tokens.access,
            refreshToken: res.data.tokens.refresh,
          })
        );
        localStorage.setItem(
          "admin",
          JSON.stringify({
            name: "Super Admin",
            email: res.data.user.email,
            image: res.data.user.profile_picture,
          })
        );

        setEmail("");
        setPassword("");

        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        toast.error("Wrong credentials");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      {/* Main Card Container */}
      <div className="w-full max-w-138 bg-white rounded-2xl shadow-sm border border-blue-100 p-8 md:p-12">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-6">
            <div className="bg-primary p-4 rounded-2xl rotate-45 flex items-center justify-center w-16 h-16">
              <div className="-rotate-45">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" />
                </svg>
              </div>
            </div>
            {/* Small check badge */}
            <div className="absolute -top-1 -right-1 bg-secondary border-2 border-white rounded-full p-0.5">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-dark mb-2">Log in</h1>
          <p className="text-gray text-sm text-center">
            For access your account you have to provide correct information.
          </p>
        </div>

        {/* Form Section */}
        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="space-y-2">
            <label className="block text-[16px] font-semibold text-dark">
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray">
                <Mail size={20} strokeWidth={1.5} />
              </span>
              <input
                required
                type="email"
                value={email}
                onChange={(v) => setEmail(v.target.value)}
                placeholder="Enter your email..."
                className="w-full pl-12 pr-4 py-4 bg-[#F3F4F6] border-none rounded-xl focus:ring-2 focus:ring-primary outline-none text-dark placeholder-gray"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="block text-[16px] font-semibold text-dark">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray">
                <Lock size={20} strokeWidth={1.5} />
              </span>
              <input
                value={password}
                onChange={(v) => setPassword(v.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="*******"
                className="w-full pl-12 pr-12 py-4 bg-[#F3F4F6] border-none rounded-xl focus:ring-2 focus:ring-primary outline-none text-dark placeholder-gray"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-4 flex items-center text-primary"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>

          {/* Helper Links */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2 cursor-pointer text-gray">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span>Remember me</span>
            </label>
            <Link
              href="/login/forget-pass"
              className="text-primary font-semibold hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-primary hover:bg-blue-700 text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-lg shadow-blue-200"
          >
            Log in
          </button>
        </form>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default LoginPage;
