"use client";

import Link from "next/link";
import React, { useRef, useState } from "react";

const VerifyOTP = () => {
  // Array to hold the 6-digit OTP values
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  // Handle input change and auto-focus next field
  const handleChange = (value, index) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move to next field if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace to focus previous field
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      {/* Main Card Container */}
      <div className="w-full max-w-138 bg-white rounded-2xl shadow-sm border border-blue-100 p-8 md:p-12">
        {/* Header/Logo Section */}
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

          <h1 className="text-3xl font-bold text-dark mb-2">Verify OTP</h1>
          <p className="text-gray text-sm text-center">
            We've sent 6 digit OTP into your email address.
          </p>
        </div>

        {/* OTP Input Section */}
        <div className="mb-10">
          <label className="block text-[16px] font-semibold text-dark mb-4">
            Email
          </label>
          <div className="flex justify-between gap-2 md:gap-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`w-full h-14 md:h-16 text-center text-xl font-bold rounded-xl border-none outline-none transition-all
                  ${
                    digit
                      ? "bg-white ring-2 ring-blue-100 shadow-[0_0_15px_rgba(37,99,235,0.1)]"
                      : "bg-[#F3F4F6]"
                  }
                  focus:ring-2 focus:ring-primary focus:bg-white`}
              />
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <button className="text-primary text-sm font-bold hover:underline">
              Send again
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button className="w-full py-4 bg-primary hover:bg-blue-700 text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-lg shadow-blue-100">
            Submit
          </button>

          <Link
            href={"/login/forget-pass"}
            className="w-full py-4 flex items-center justify-center bg-white border-2 border-primary text-primary font-bold text-lg rounded-xl hover:bg-blue-50 transition-all duration-200"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
