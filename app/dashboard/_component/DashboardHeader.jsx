import { Notification } from "iconsax-react";
import Image from "next/image";

export default function DashboardHeader() {
  return (
    <div className="p-5 flex justify-end gap-3 items-center shadow-lg">
      <Notification
        className="bg-slate-200 p-2 rounded-full"
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
      <h1 className="font-semibold text-xl">Admin</h1>
    </div>
  );
}