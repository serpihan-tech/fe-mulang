import ThemeSwitcher from "@/app/component/ThemeSwitcher";
import { Fatrows, Notification } from "iconsax-react";
import Image from "next/image";

export default function DashboardHeader({ toggleSidebar }) {
  const full_name = sessionStorage.getItem("full_name");
  const role =   sessionStorage.getItem("role");
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white p-5 flex justify-between items-center shadow-lg transition">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar}>
          <Fatrows size="32" color="currentColor" variant="Bold" />
        </button>
        
        <div className="flex-col justify-start items-start gap-2">
          <div className="text-[#0a181f] text-base font-bold leading-tight">Halo, {full_name}!</div>
          <div className="text-[#666c6f] text-sm font-normal leading-[16.80px]">Selamat datang di dashboard admin Mulang.</div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <ThemeSwitcher />
        <Notification className="bg-netral-20 p-2 rounded-full" size="40" variant="Outline" color="black" />
        <Image src={"/svg/logo.svg"} alt="user photo" width={40} height={40} priority />
        <h1 className="font-semibold text-xl text-black dark:text-white transition">{role}</h1>
      </div>
    </div>
  );
}