'use client'
import { useEffect, useState } from "react";
import InputEmail from "../component/InputEmail";
import ThemeSwitcher from "../component/ThemeSwitcher";
import { toast, ToastContainer } from "react-toastify";

export default function InputEmailPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Mencegah hydration error dengan memastikan client sudah ready

    if (typeof window !== "undefined") {
      const emailNeed = sessionStorage.getItem("email_need");
      if (emailNeed) {
        toast.error("Masukkan email terlebih dahulu");
        sessionStorage.removeItem("email_need");
      } else {
        sessionStorage.removeItem("user_email");
      }
    }
  }, []);

  if (!mounted) return null; 
  return (
    <div className="relative bg-white dark:bg-dark_net-pri min-h-screen overflow-hidden flex items-center justify-center">
      <ToastContainer />
      <img 
        src="svg/ellipse_top.svg" 
        alt="Background" 
        className="absolute -top-16 -left-10 h-3/4 w-1/2" 
      />
      
      <InputEmail/>

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