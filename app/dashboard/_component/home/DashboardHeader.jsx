import ThemeSwitcher from "@/app/component/ThemeSwitcher";
import { Fatrows, Notification } from "iconsax-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardHeader({ toggleSidebar }) {
  const router = useRouter();
  const full_name = sessionStorage.getItem("full_name");
  const first_name = full_name.split(" ")[0];
  const [profileImgs, setProfileImgs] = useState([]);
  
  const role =   sessionStorage.getItem("role");
  const data = sessionStorage.getItem("profile_data");

  useEffect(() => {
    if (typeof window !== "undefined") {
      
      if (data) {
        try {
          if (role === "student"){
            const user = JSON.parse(data);
            let images = user.data.profile.details.profilePicture || [];
            console.log("images link:" ,images)
            // Jika hanya satu string, ubah menjadi array
            if (typeof images === "string") {
              images = [images];
            }

            setProfileImgs(images);

          } else if(role === "teacher") {
            const user = JSON.parse(data);
            let images = user.data.profile.profilePicture || [];

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

  console.log("data:",data)
  return (
    <div className=" bg-white dark:bg-black text-black dark:text-white px-10 py-6 flex justify-between items-center shadow-lg transition ">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar}>
          <Fatrows size="32" color="currentColor" variant="Bold" />
        </button>
        
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
        <ThemeSwitcher />
        <Notification className="bg-netral-20 p-2 rounded-full" size="40" variant="Outline" color="black" />
        {role === "admin" ?
          <div className="flex gap-3 items-center">
            <Image src={"/svg/logo.svg"} alt="user photo" width={40} height={40} priority />
            <h1 className="font-semibold text-xl text-black dark:text-white transition">{role}</h1>
          </div>
              : 
          <button 
            className="flex gap-3 items-center cursor-pointer hover:opacity-80 transition"
            onClick={() => router.push("/profile")}// 
          >
            <Image 
              src={profileImgs[0] || "/svg/logo.svg"} 
              className="rounded-full" 
              alt="user photo" 
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