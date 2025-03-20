"use client"
import Image from "next/image";
import  SidebarItem,{ Logoutbtn } from "./ItemSB";
import { ArrowLeft2, Home, LogoutCurve } from "iconsax-react";
import { useEffect, useState } from "react";
import AdminSB from "./pages/AdminSB";
import StudentSB from "./pages/Student";
import TeacherSB from "./pages/TeacherSB";

export default function SideBar() {
  const [role, setRole] = useState(null);
  const [open, setOpen] = useState(true);
  useEffect(() => {
    const userRole = sessionStorage.getItem("role");
    setRole(userRole);
  }, []);  
  return (
    <div className={`${open ? "w-55" : "w-20 "} duration-300 bg-white dark:bg-dark_net-pri p-5 shadow-lg relative`}>
      <div className={`justify-center p-2 items-center absolute cursor-pointer rounded-full top-8 bg-blue-700 ${open ? "-right-5" : "-right-6"}`}>
        <ArrowLeft2 color="white" size={22} onClick={() => setOpen(!open)} className={`${!open && "rotate-180"}`}/>
      </div>
      <div className="flex gap-4 items-center justify-center">
        <Image
          src="/svg/logo.svg"
          alt="Mulang logo"
          width={50}
          height={50}
          priority
        />
        <h1 className={`font-extrabold text-xl text-pri-main dark:text-pri-border tracking-widest ${!open && "hidden"}`}>Mulang</h1>
      </div>
      
      <div className="flex flex-col py-5 mb-5">
        <SidebarItem 
          title="Dashboard" 
          icon={Home} 
          colorIcon="currentColor" 
          url='/dashboard' 
          open={open}
        />
        {role === "student" && <StudentSB open={open} />}
        {role === "teacher" && <TeacherSB open={open} />}
        {role === "admin" && <AdminSB open={open} />}
      </div>

      <Logoutbtn 
        title={open ? "Logout" : ""} 
        icon={LogoutCurve} 
        colorIcon="currentColor"
      />
    </div>
  );
}