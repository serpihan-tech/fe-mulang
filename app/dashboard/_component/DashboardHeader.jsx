import { Bell } from "lucide-react";
import Image from "next/image";

export default function DashboardHeader() {
  return (
    <div className="p-5 border-b-2 border-gray-100 flex justify-end gap-3 items-center">
      <Bell 
        className="bg-slate-200 p-2 rounded-full"
        width={40}
        height={40}
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