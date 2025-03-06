"use client"
import Image from "next/image";
import  SidebarItem,{ Logoutbtn } from "./ItemSB";
import { Home, LogoutCurve } from "iconsax-react";
import { useEffect, useState } from "react";
import AdminSB from "./pages/AdminSB";
import StudentSB from "./pages/Student";
import TeacherSB from "./pages/TeacherSB";

export default function SideBar() {
  const [role, setRole] = useState(null);
  useEffect(() => {
    const userRole = sessionStorage.getItem("role");
    setRole(userRole);
  }, []);  
  return (
    <div className="bg-white dark:bg-dark_net-pri h-screen p-5 shadow-lg transition">
      <div className="flex gap-4 items-center justify-center">
        <Image
          className=""
          src="/svg/logo.svg"
          alt="Mulang logo"
          width={50}
          height={50}
          priority
        />
        <h1 className="font-extrabold text-xl text-pri-main dark:text-pri-border tracking-widest ">Mulang</h1>
      </div>
      
      <div className="flex flex-col  py-5 mb-5">
        <SidebarItem title="Dashboard" icon={Home} colorIcon="currentColor" url='/dashboard'/>
        {role === "student" && <StudentSB />}
        {role === "teacher" && <TeacherSB />}
        {role === "admin" && <AdminSB />}
        
      </div>

      <Logoutbtn title="Logout" icon={LogoutCurve} colorIcon="currentColor"/>

      
    </div>
  );
}