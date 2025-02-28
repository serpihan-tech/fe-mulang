'use client'
import LoginForm from "../component/LoginForm";
import Image from "next/image";
import ThemeSwitcher from "../component/ThemeSwitcher";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";

export default function LoginPage() {
  useEffect(() => {
    const logout = sessionStorage.getItem("log_out");
      if (logout) {
        toast.success("Logout berhasil");
        sessionStorage.clear();
      }
  }, []);
  return (
    
    <div className="bg-white dark:bg-black relative overflow-hidden min-h-screen flex items-center justify-center">
      <ToastContainer />
      <img 
        src="svg/ellipse_top.svg" 
        alt="Background" 
        className="absolute -top-16 -left-10 h-3/4 w-1/2" 
      />
      
      <div className="flex flex-col gap-4 items-center w-full">
        <Image 
          src="/svg/logo.svg" 
          alt="Login" 
          width={50} 
          height={50} 
          className="object-contain md:hidden" />
                

        <LoginForm/>
      </div>
      

      <img 
        src="svg/ellipse_bottom.svg" 
        alt="Background" 
        className="absolute -bottom-80 -right-24 h-3/4 w-1/2" 
      />
      <div className="absolute bottom-5 right-5">
      <ThemeSwitcher />
      </div>
    
    </div>
  );
}