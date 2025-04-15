import ThemeSwitcher from "@/app/component/ThemeSwitcher";
import { useProfile } from "@/provider/ProfileProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import NotificationDropdown from "./NotificationDropdown";

export default function DashboardHeader() {
  const router = useRouter();
  const full_name = sessionStorage.getItem("full_name");
  const first_name = full_name.split(" ")[0];
  const [profileImgs, setProfileImgs] = useState([]);
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
            let images = baseUrl+"/image/"+image
            console.log("images link:" ,images)
            // Jika hanya satu string, ubah menjadi array
            if (typeof images === "string") {
              images = [images];
            }

            setProfileImgs(images);

          } else if(role === "teacher") {
            const user = JSON.parse(data);
            let image = user.data.profile.profilePicture || [];
            let images = baseUrl+"/image/"+image
            // Jika hanya satu string, ubah menjadi array
            if (typeof images === "string") {
              images = [images];
            }

            setProfileImgs(images);
          }
          
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
    }
  }, []);

  // console.log("data:",data)
  return (
    <div className="relative bg-white dark:bg-black text-black dark:text-white px-10 py-6 flex justify-between items-center border-b border-gray-200 transition z-50">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <div className="flex-col justify-start items-start space-y-2">
          <div className="text-[#0a181f] text-base font-bold leading-tight">Halo, {full_name}!</div>
          <div className="text-[#666c6f] text-sm font-normal leading-[16.80px]">
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
        <NotificationDropdown/>
        
        {role === "admin" ?
          <div className="flex gap-3 items-center">
            <Image src={"/svg/logo.svg"} alt="user photo" width={40} height={40} priority />
            <h1 className="font-semibold text-xl text-black dark:text-white transition">{role}</h1>
          </div>
              : 
          <button 
            className="flex gap-3 items-center cursor-pointer hover:opacity-80 transition"
            onClick={() => router.push("/profile")}
          >
            <Image 
              src={ profileImg || profileImgs[0] || "/svg/logo.svg"} 
              className="rounded-full" 
              alt="photo" 
              width={40} 
              height={40} 
              priority 
            />
            <h1 className="font-semibold text-xl text-black dark:text-white transition">{first_name}</h1>
          </button>
        }
      </div>
    </div>
  );
}