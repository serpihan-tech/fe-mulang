"use client"
import Image from "next/image";
import  SidebarItem,{ Logoutbtn } from "./ItemSB";
import { ArrowLeft2, Home, LogoutCurve } from "iconsax-react";
import { useEffect, useState } from "react";
import AdminSB from "./pages/AdminSB";
import StudentSB from "./pages/Student";
import TeacherSB from "./pages/TeacherSB";
import { logout } from "@/app/api/ApiAuth";
import { useRouter } from "next/navigation";
import LogOutPopUp from "@/app/component/LogoutPopUp";
import { toast } from "react-toastify";
import ThemeSwitcher from "@/app/component/ThemeSwitcher";
import { useLogOut } from "@/provider/LogOutProvider";
import { useLoading } from "@/context/LoadingContext";

export default function SideBar({isOpen,toggleSidebar}) {
  const [role, setRole] = useState(null);
  const router = useRouter()
  const [isLoading, setLoading] = useState(false)
  const { setIsLoading } = useLoading();

  const { setIsLogOut } = useLogOut();

  const [isLogoutOpen, setLogoutOpen] = useState(false)
  useEffect(() => {
    const userRole = sessionStorage.getItem("role");
    setRole(userRole);
  }, []);
  const handleLogout = () => {
    setLogoutOpen(true);
  };
  
  const confirmLogOut = async () => {
    setLoading(true)
    setIsLoading(true)
    try {
      const response = await logout(); 
      if(response){
        sessionStorage.setItem("log_out", response.message)
        setIsLogOut(true)
        router.push("/login")
      }
    } catch (error) {
      toast.error("Gagal logout, silakan coba lagi.")
    } finally {
      setLoading(false)
      setIsLoading(false)
      setLogoutOpen(false)
    }
  };
  return (
    <>
      {/* Pop-up Konfirmasi Delete */}
        {isLogoutOpen && (
            <div className="z-30 fixed inset-0 bg-black/50 flex justify-center items-center">
              <LogOutPopUp
                onCancel={() => setLogoutOpen(false)}
                onConfirm={confirmLogOut}
                isLoading={isLoading}
              />
            </div>
          )}
      <div
        className={`${
          isOpen ? "w-52 lg:w-64" : "w-5 md:w-16 lg:w-20"
        } fixed bg-white dark:bg-dark_net-ter p-3 lg:p-5 shadow-lg min-h-screen transition-all duration-300 ease-in-out z-20`}
      >
        <div
          className={`absolute top-8 ${
            isOpen ? "-right-5" : "-right-6 rotate-180"
          } p-2 rounded-full bg-pri-main cursor-pointer transition-transform duration-300 ease-in-out`}
          onClick={toggleSidebar}
        >
          <ArrowLeft2 color="white" className="w-[18px] md:w-[18px] lg:w-[22px]" />
        </div>

        <div className={`${
            isOpen ? "flex" : "hidden md:flex"
          } gap-4 items-center justify-center`}>
          <Image src="/svg/logo.svg" alt="Mulang logo" width={50} height={50} priority />
          <h1
            className={`font-extrabold text-xl text-pri-main dark:text-pri-border tracking-widest transition-all duration-300 ease-in-out ${
              !isOpen && "hidden"
            }`}
          >
            Mulang
          </h1>
        </div>

        <div className={`${
            isOpen ? "flex" : "hidden md:flex"
          }  flex-col pt-5 pb-3`}>
          <SidebarItem title="Dashboard" icon={Home} colorIcon="currentColor" url="/dashboard" open={isOpen} />
          {role === "student" && <StudentSB open={isOpen} />}
          {role === "teacher" && <TeacherSB open={isOpen} />}
          {role === "admin" && <AdminSB open={isOpen} />}
          
        </div>
        
        <div className={`${
            isOpen ? "flex" : "hidden md:flex"
          }  mb-7`}>
          <ThemeSwitcher open={isOpen}/>
        </div>
        
        <Logoutbtn title='Log out' open={isOpen} icon={LogoutCurve} colorIcon="currentColor"  onConfirm={handleLogout}/>
      </div>
    </>
  );
}