"use client";

import React from "react";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ForgetPassword = () => {
  const route = useRouter();

  const SendCodeHandler = (e) => {
    e.preventDefault();

    toast.success("Check your email.");
    route.push("/login/verify-otp");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      {/* FIX 2: Changed max-w-138 to max-w-[550px] for standard Tailwind support */}
      <div className="w-full max-w-137.5 bg-white rounded-2xl shadow-sm border border-blue-100 p-8 md:p-12">
        <div className="flex flex-col items-center mb-10">
          <div className="relative mb-8">
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

          <h1 className="text-3xl font-bold text-dark mb-2">Forgot password</h1>
          <p className="text-gray text-sm text-center">
            You have to provide your email for get OTP code.
          </p>
        </div>

        <form className="space-y-8" onSubmit={SendCodeHandler}>
          <div className="space-y-2">
            <label className="block text-[16px] font-semibold text-dark">
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray">
                <Mail size={20} strokeWidth={1.5} />
              </span>
              <input
                type="email"
                required
                placeholder="Enter your email..."
                className="w-full pl-12 pr-4 py-4 bg-[#F3F4F6] border-none rounded-xl focus:ring-2 focus:ring-primary outline-none text-dark placeholder-gray"
              />
            </div>
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              className="w-full py-4 bg-primary hover:bg-blue-700 text-white font-bold text-lg rounded-xl transition-all duration-200"
            >
              Send Code
            </button>

            <Link
              href={"/login"}
              className="w-full py-4 bg-white border-2 border-primary text-primary font-bold text-lg rounded-xl hover:bg-blue-50 transition-all duration-200 flex items-center justify-center gap-2"
            >
              Back to sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
