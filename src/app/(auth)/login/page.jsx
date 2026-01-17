"use client";

import React, { useState } from "react";
import { Mail, Lock, EyeOff, Eye, Loader2 } from "lucide-react";
import Link from "next/link";
import { useGlobalState } from "@/app/providers/StateProvider";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("shohagmony781@gmail.com");
  const [password, setPassword] = useState("123");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useGlobalState();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await login(email, password);
    console.log(res);
    if (res.success) {
      setTimeout(() => {
        router.push("/login/verify-otp");
      }, 100);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-138 bg-white rounded-2xl shadow-sm border border-blue-100 p-8 md:p-12">
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-6">
            <div className="bg-primary p-4 rounded-2xl rotate-45 flex items-center justify-center w-16 h-16">
              <div className="-rotate-45">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                  <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" />
                </svg>
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-dark mb-2">Log in</h1>
          <p className="text-gray text-sm text-center">
            For access your account you have to provide correct information.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
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
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email..."
                className="w-full pl-12 pr-4 py-4 bg-[#F3F4F6] border-none rounded-xl focus:ring-2 focus:ring-primary outline-none text-dark"
              />
            </div>
          </div>

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
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="*******"
                className="w-full pl-12 pr-12 py-4 bg-[#F3F4F6] border-none rounded-xl focus:ring-2 focus:ring-primary outline-none text-dark"
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

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2 cursor-pointer text-gray">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-primary"
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

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-primary hover:bg-blue-700 text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-lg flex items-center justify-center disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin mr-2" /> : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
