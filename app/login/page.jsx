"use client";
import LoginForm from "../component/LoginForm";
import Image from "next/image";
import ThemeSwitcher from "../component/ThemeSwitcher";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Hindari inkonsistensi SSR & CSR
    if (typeof window !== "undefined") {
      const logout = sessionStorage.getItem("log_out");
      const newpass = sessionStorage.getItem("new_password");

      if (logout) {
        toast.success("Logout berhasil");
        sessionStorage.clear();
      }

      if (newpass) {
        toast.success(newpass);
        sessionStorage.removeItem("new_password");
      }
    }
  }, []);

  if (!mounted) return null; // Hindari hydration error
  return (
    <div className="bg-white dark:bg-dark_net-pri relative overflow-hidden min-h-screen flex items-center justify-center">
      <ToastContainer />
      <img
        src="svg/ellipse_top.svg"
        alt="Background"
        className="hidden md:block absolute md:-top-32 lg:-top-16 -left-10 h-3/4 md:w-3/4 lg:w-1/2"
      />
      <img
        src="svg/topMobile1.svg"
        alt="Background"
        className="w-full -top-10 absolute md:hidden"
      />
      <img
        src="svg/topMobile2.svg"
        alt="Background"
        className="w-full top-0 absolute md:hidden"
      />
      <div className="absolute w-20 h-20 top-16 object-contain md:hidden bg-white rounded-3xl p-3.5 items-center">
        <Image
          src="/svg/logo.svg"
          alt="Login"
          width={57}
          height={57}
          className="object-contain md:hidden"
        />
      </div>

      <div className="flex flex-col gap-4 items-center w-full">
        <LoginForm />
      </div>

      <img
        src="svg/ellipse_bottom.svg"
        alt="Background"
        className="absolute -bottom-80 -right-24 h-3/4 w-1/2"
      />
      <div className="absolute bottom-5 right-5">
        {/* <ThemeSwitcher /> */}
      </div>
    </div>
  );
}
