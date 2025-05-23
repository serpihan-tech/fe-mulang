import ThemeSwitcher from "@/app/component/ThemeSwitcher";
import { useProfile } from "@/provider/ProfileProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import NotificationDropdown from "./NotificationDropdown";

export default function DashboardHeader() {
  const router = useRouter();
  const [full_name, setFull_name] = useState(sessionStorage.getItem("full_name"))
  const first_name = full_name.split(" ")[0];
  const [profileImgs, setProfileImgs] = useState(null);
  const { profileImg } = useProfile();
  const role = typeof window !== "undefined" ? sessionStorage.getItem("role") : null;
  const data = typeof window !== "undefined" ? sessionStorage.getItem("profile_data") : null;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    if (typeof window !== "undefined") {
      
      if (data) {
        try {
          if (role === "student"){
            const user = JSON.parse(data);
            let image = user?.data.profile.details.profilePicture || [];
            let images = baseUrl+"/file/"+image
            console.log("images link:" ,images)
            
            console.log("user: ", user)

            setProfileImgs(images);

          } else if(role === "teacher" || role == "admin") {
            const user = JSON.parse(data);
            console.log("user: ", user)
            const profilePicture = user?.data?.profile?.profilePicture;
            let images = "/svg/logo.svg"; // Default to logo
            
            if (profilePicture && profilePicture !== "") {
              images = baseUrl + "/file/" + profilePicture;
            }

            setProfileImgs(images);
          }
          
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
    }
  }, []);  

  useEffect(() => {
    setFull_name(sessionStorage.getItem("full_name"))
  }, [sessionStorage.getItem("full_name")])
  

  //console.log("data:",data)
  return (
    <div className="relative bg-white dark:bg-dark_net-pri text-black dark:text-white px-5 py-3 md:px-9 md:py-4 lg:px-10 lg:py-6 flex justify-between items-center border-b border-gray-200 dark:border-none transition z-50">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <div className="flex-col justify-start items-start space-y-1 lg:space-y-2 hidden md:flex">
          <div className="text-[#0a181f] dark:text-slate-100 text-sm lg:text-base font-bold leading-tight">Halo, {full_name}!</div>
          <div className="text-[#666c6f] dark:text-slate-300 text-xs lg:text-sm font-normal leading-[16.80px]">
            {role === "admin"
              ? "Selamat datang di dashboard admin Mulang."
              : "Selamat datang di dashboard Mulang!"}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* <ThemeSwitcher /> */}
        
        {/* Notification Dropdown */}
        {
          role !== "admin" && (
            <NotificationDropdown/>
          )
        }
        
        <button 
          className="flex gap-3 items-center cursor-pointer hover:opacity-80 transition"
          onClick={() => router.push("/profile")}
        >
          <Image 
            src={profileImg || profileImgs || "/svg/logo.svg"} 
            className="rounded-full w-8 h-8 md:w-9 md:h-9 lg:w-10 m lg:h-10" 
            alt="photo" 
            width={40} 
            height={40} 
          />
          <h1 className="hidden md:flex font-semibold text-lg lg:text-xl text-black dark:text-white transition">{role === "admin" ? "Admin" : first_name }</h1>
        </button>
      </div>
    </div>
  );
}