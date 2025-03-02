'use client'
import ThemeSwitcher from "@/app/component/ThemeSwitcher";
import InputNewPassword from "../../component/InputNewPassword";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function InputNewPasswordPage() {
  const router = useRouter()
  useEffect(() => {
      const email = sessionStorage.getItem("user_email");
      const otp = sessionStorage.getItem("otp_code");

      if (!email) {
        sessionStorage.setItem("email_need", "message");
        router.push('/reset-password')
      }

      if (!otp) {
        sessionStorage.setItem("otp_need", "message");
        router.push('/reset-password/send-otp')
      }
    }, [router]);
  return (
    <div className="relative bg-white dark:bg-black min-h-screen overflow-hidden flex items-center justify-center">
      <img 
        src="../svg/ellipse_top.svg" 
        alt="Background" 
        className="absolute -top-16 -left-10 h-3/4 w-1/2" 
      />
      
      <InputNewPassword/>

      <img 
        src="../svg/ellipse_bottom.svg" 
        alt="Background" 
        className="absolute -bottom-80 -right-24 h-3/4 w-1/2" 
      />

      <div className="absolute bottom-5 right-5">
      <ThemeSwitcher />
      </div>
    </div>
  );
}