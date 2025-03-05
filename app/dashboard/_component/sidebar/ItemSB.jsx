"use client"
import { useEffect, useState } from "react";
import SidebarDropdown from "./SubItemSB";
import { ArrowRight2, ArrowDown2 } from "iconsax-react";
import { useRouter,usePathname } from "next/navigation";
import { toast } from "react-toastify";
import { logout } from "@/app/api/ApiAuth";

export const Logoutbtn = ({ title, icon: Icon, colorIcon }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout(); 
      
      sessionStorage.setItem("log_out", "logout");
      
      router.push("/login"); // Redirect ke halaman login
    } catch (error) {
      toast.error("Gagal logout, silakan coba lagi.");
    }
  };
  return (
    <div>
      <button
        className="w-full flex items-center p-2  text-err-main hover:bg-err-main rounded-xl hover:text-netral-0 transition"
        onClick={handleLogout}
      >
        {/* Bagian Kiri: Ikon dan Teks */}
        <div className="flex items-center">
          <Icon size="25" className="mr-2" variant="Bold" color={colorIcon} />
          <span>{title}</span>
        </div>
      </button>
    </div>
  );
};

export default function SidebarItem({ title, icon: Icon, dropdownItems, colorIcon,  url }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isActive = url && pathname === url;
  const isDropdownActive = dropdownItems?.some(item => pathname === item.url);
  useEffect(() => {
    if (isDropdownActive) {
      setOpen(true);
    }
  }, [isDropdownActive]);

  const handleClick = () => {
    if (dropdownItems) {
      setOpen(!open);
    } else if (url) {
      router.push(url);
    }
  };
  return (
    <div>
      <button
        className={`w-full flex items-center p-2 rounded-xl transition ${isActive || isDropdownActive ? 'bg-pri-main text-netral-0' : 'text-black dark:text-white hover:bg-pri-main hover:text-netral-0'}`}
        onClick={handleClick}
      >
        {/* Bagian Kiri: Ikon dan Teks */}
        <div className="flex items-center">
          <Icon size="25" className="mr-2" variant="Bold" color={colorIcon}/>
          <span>{title}</span>
        </div>

        {/* Bagian Kanan: Ikon Panah */}
        {dropdownItems && (
          <span className="ml-auto">
            {open ? (
              <ArrowDown2 size="20" color="currentColor" variant="Bold"/>
            ) : (
              <ArrowRight2 size="20" color="currentColor" variant="Bold"/>
            )}
          </span>
        )}
      </button>
      
      {dropdownItems && open && <SidebarDropdown items={dropdownItems}/>}
    </div>
  );
}
