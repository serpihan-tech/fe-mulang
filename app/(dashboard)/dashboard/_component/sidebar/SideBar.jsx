"use client"
import Image from "next/image";
import  SidebarItem,{ Logoutbtn } from "./ItemSB";
import { ArrowLeft2, Home, LogoutCurve } from "iconsax-react";
import { useEffect, useState } from "react";
import AdminSB from "./pages/AdminSB";
import StudentSB from "./pages/Student";
import TeacherSB from "./pages/TeacherSB";

export default function SideBar({isOpen,toggleSidebar}) {
  const [role, setRole] = useState(null);
  useEffect(() => {
    const userRole = sessionStorage.getItem("role");
    setRole(userRole);
  }, []);  
  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } fixed bg-white dark:bg-dark_net-pri p-5 shadow-lg min-h-screen transition-all duration-300 ease-in-out z-20`}
    >
      <div
        className={`absolute top-8 ${
          isOpen ? "-right-5" : "-right-6 rotate-180"
        } p-2 rounded-full bg-pri-main cursor-pointer transition-transform duration-300 ease-in-out`}
        onClick={toggleSidebar}
      >
        <ArrowLeft2 color="white" size={22} />
      </div>

      <div className="flex gap-4 items-center justify-center">
        <Image src="/svg/logo.svg" alt="Mulang logo" width={50} height={50} priority />
        <h1
          className={`font-extrabold text-xl text-pri-main dark:text-pri-border tracking-widest transition-all duration-300 ease-in-out ${
            !isOpen && "hidden"
          }`}
        >
          Mulang
        </h1>
      </div>

      <div className="flex flex-col py-5 mb-5">
        <SidebarItem title="Dashboard" icon={Home} colorIcon="currentColor" url="/dashboard" open={isOpen} />
        {role === "student" && <StudentSB open={isOpen} />}
        {role === "teacher" && <TeacherSB open={isOpen} />}
        {role === "admin" && <AdminSB open={isOpen} />}
      </div>

      <Logoutbtn title={isOpen ? "Logout" : ""} icon={LogoutCurve} colorIcon="currentColor" />
    </div>
  );
}