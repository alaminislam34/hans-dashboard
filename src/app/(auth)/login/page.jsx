"use client";

import { useState } from "react";
import ForgotPassword from "./components/Forgot_password/ForgotPassword";
import Login from "./components/Forgot_password/Login";

export default function LoginPage() {
  const [isForgotPass, setIsForgotPass] = useState(false);

  return (
    <section className="min-h-screen max-w-360 mx-auto w-11/12 flex items-center justify-center">
      {isForgotPass ? (
        <ForgotPassword setIsForgotPass={setIsForgotPass} />
      ) : (
        <Login setIsForgotPass={setIsForgotPass} />
      )}
    </section>
  );
}
