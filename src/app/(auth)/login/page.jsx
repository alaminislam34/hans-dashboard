"use client";

import { Shadow } from "@/app/components/common_class/Tailwind_common_className";
import { EyeOff } from "lucide-react";
import { Eye } from "lucide-react";
import { Lock } from "lucide-react";
import { Mail } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false);
  return (
    <section className="min-h-screen max-w-360 mx-auto w-11/12 flex items-center justify-center ">
      <div
        className={`max-w-160 w-full mx-auto my-8 p-8 rounded-2xl ${Shadow} space-y-6 md:space-y-8`}
      >
        <div className="flex items-center justify-center">
          <Image
            src={"/logos/logo.jpg"}
            height={100}
            width={200}
            alt="Website Logo"
            className="w-42.5 h-auto bg-cover object-cover"
          />
        </div>

        <div className="space-y-3 text-center">
          <h3
            className={`text-xl md:text-2xl lg:text-3xl text-center text-primary font-bold`}
          >
            Log in
          </h3>
          <p className="text-subTypo text-xs sm:text-sm">
            For access your account you have to provide correct information.
          </p>
        </div>

        <form className="space-y-4">
          {/* email */}
          <div className="space-y-2">
            <label className="font-semibold inline-block text-typo">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email.."
                className="py-2 md:py-3 shadow-sm shadow-white focus:shadow-primary focus:outline-none lg:py-4 w-full pl-12 pr-6 rounded-lg bg-Gray text-subTypo"
              />
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-subTypo"
              />
            </div>
          </div>

          {/* password */}
          <div className="space-y-3">
            <label className="font-semibold inline-block text-typo">
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter your email.."
                className="py-2 md:py-3 shadow-sm shadow-white focus:shadow-primary focus:outline-none lg:py-4 w-full px-12 rounded-lg bg-Gray text-subTypo"
              />
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-subTypo"
              />

              <span
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-primary"
              >
                {showPass ? <Eye size={18} /> : <EyeOff size={18} />}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-subTypo flex items-center flex-row gap-1.5 text-xs md:text-sm">
                <input type="checkbox" className="accent-primary" />
                <p>Remember me</p>
              </label>
              <button
                type="button"
                className="text-primary underline text-xs md:text-sm font-bold cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
          </div>

          <br />
          <button
            type="submit"
            className={`py-2 md:py-3 lg:py-4 w-full rounded-lg shadow-custom bg-linear-to-r from-primary/70 hover:from-primary/90 to-primary/90 hover:to-primary text-white text-lg md:text-xl font-bold cursor-pointer active:scale-98 transition-all ease-in-out duration-300`}
          >
            Log in
          </button>
        </form>
      </div>
    </section>
  );
}
