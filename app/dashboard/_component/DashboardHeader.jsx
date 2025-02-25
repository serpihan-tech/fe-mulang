import ThemeSwitcher from "@/app/component/ThemeSwitcher";
import { Fatrows, Notification } from "iconsax-react";
import Image from "next/image";

export default function DashboardHeader({ toggleSidebar }) {
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white p-5 flex justify-between items-center shadow-lg transition">
      {/* Tombol Toggle Sidebar */}
      <button onClick={toggleSidebar} className=" block">
        <Fatrows size="32" color="currentColor" variant="Bold"/>
      </button>

      <div className="flex items-center gap-3">
        <ThemeSwitcher />
        <Notification className="bg-netral-20 p-2 rounded-full" size="40" variant="Outline" color="black" />
        <Image src={"/svg/logo.svg"} alt="user photo" width={40} height={40} priority />
        <h1 className="font-semibold text-xl text-black dark:text-white transition">Admin</h1>
      </div>
    </div>
  );
}
