"use client";

import { useState, useEffect } from "react";
import SendOtp from "./SendOtp/SendOtp";
import VerifyOtp from "./VerifyCode/VerifyOtp";
import ResetPass from "./ResetPass/ResetPass";

export default function ForgotPassword({ setIsForgotPass }) {
  const [step, setStep] = useState("send-otp");
  const [emailForReset, setEmailForReset] = useState("");
  
  const storageKey = "forgot_step";

  useEffect(() => {
    const savedStep = localStorage.getItem(storageKey);
    const savedEmail = localStorage.getItem("reset_email");

    if (savedStep) {
      setStep(savedStep);
    }
    if (savedEmail) {
      setEmailForReset(savedEmail);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, step);
  }, [step]);
  
  useEffect(() => {
    localStorage.setItem("reset_email", emailForReset);
  }, [emailForReset]);

  const handleOtpSent = (email) => {
    setEmailForReset(email);
    setStep("verify-otp");
  };
  
  const handleOtpVerified = () => setStep("reset-pass");
  
  const handleResetDone = () => {
    setStep("send-otp");
    setEmailForReset("");
    localStorage.removeItem(storageKey);
    localStorage.removeItem("reset_email");
    setIsForgotPass(false);
  };
  
  const handleBackToLogin = () => {
    setStep("send-otp");
    setIsForgotPass(false);
  }

  return (
    <>
      {step === "send-otp" && (
        <SendOtp
          onOtpSent={handleOtpSent} 
          setIsForgotPass={handleBackToLogin}
        />
      )}

      {step === "verify-otp" && (
        <VerifyOtp
          email={emailForReset}
          onOtpVerified={handleOtpVerified} 
          onBackToLogin={handleBackToLogin}
        />
      )}

      {step === "reset-pass" && (
        <ResetPass 
            email={emailForReset}
            onResetComplete={handleResetDone} 
        />
      )}
    </>
  );
}