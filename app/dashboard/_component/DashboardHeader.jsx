import ThemeSwitcher from "@/app/component/ThemeSwitcher";
import { Notification } from "iconsax-react";
import Image from "next/image";

export default function DashboardHeader() {
  return (
    <div className="bg-white dark:bg-black p-5 flex justify-end gap-3 items-center shadow-lg transition">
      <ThemeSwitcher />
      <Notification
        className="bg-netral-20 p-2 rounded-full"
        size="40" variant="Outline" color="black"
      />
      <Image
        className=""
        src={"/svg/logo.svg"}
        alt="user photo"
        width={40}
        height={40}
        priority
      />
      <h1 className="font-semibold text-xl text-black dark:text-white transition">Admin</h1>
    </div>
  );
}