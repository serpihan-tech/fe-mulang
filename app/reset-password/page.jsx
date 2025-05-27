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
        src="svg/ellipse2_top.svg" 
        alt="Background" 
        className="absolute md:-top-14 -top-52 -left-16 md:-left-28 h-3/4 w-1/2 scale-90" 
      />
      
      <InputEmail/>

      <img 
        src="svg/ellipse2_bottom.svg" 
        alt="Background" 
        className="absolute -bottom-80 -right-24 h-3/4 w-1/2 scale-90" 
      />
      <div className="absolute bottom-5 right-5">
        {/* <ThemeSwitcher /> */}
      </div>
    </div>
  );
}