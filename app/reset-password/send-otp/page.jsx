import ThemeSwitcher from "@/app/component/ThemeSwitcher.jsx";
import ResetPassword from "../../component/ResetPassword.jsx";

export default function ResetPasswordPage() {
  return (
    <div className="relative bg-[#CED9F9]  dark:bg-netral-100 min-h-screen overflow-hidden flex items-center justify-center">
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