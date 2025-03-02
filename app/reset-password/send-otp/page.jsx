'use client'
import ThemeSwitcher from "@/app/component/ThemeSwitcher.jsx";
import ResetPassword from "../../component/ResetPassword.jsx";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function ResetPasswordPage() {
  const router = useRouter();
  useEffect(() => {
    const otpNeed = sessionStorage.getItem("otp_need");
    if (otpNeed) {
      toast.error("Masukkan otp terlebih dahulu");
      sessionStorage.removeItem("otp_need");
    }
  }, []);

  useEffect(() => {
    const email = sessionStorage.getItem("user_email");
    if (!email) {
      sessionStorage.setItem("email_need", "message");
      router.push('/reset-password')
    }
  }, [router]);
  
  return (
    
    <div className="relative bg-[#CED9F9]  dark:bg-netral-100 min-h-screen overflow-hidden flex items-center justify-center">
    <ToastContainer/>
      <img 
        src="/svg/ellipse2_top.svg" 
        alt="Background" 
        className="absolute -top-16 -left-40 h-3/4 w-1/2 " 
      />

      <ResetPassword/>
      
      <img 
        src="/svg/ellipse2_bottom.svg" 
        alt="Background" 
        className="absolute -bottom-40 -right-24 h-3/4 w-1/2" 
      />
      <div className="absolute bottom-5 right-5">
      <ThemeSwitcher />
      </div>
    </div>
  );
}