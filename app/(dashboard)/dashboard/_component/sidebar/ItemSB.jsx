"use client"
import { useEffect, useState } from "react";
import SidebarDropdown from "./SubItemSB";
import { ArrowRight2, ArrowDown2 } from "iconsax-react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "react-toastify";
import { logout } from "@/app/api/ApiAuth";

// Komponen HoverDropdown
const HoverDropdown = ({ items, position = 'right' }) => {
  return (
    <div 
      className={`absolute z-50 bg-white dark:bg-dark_net-pri shadow-lg rounded-xl 
      ${position === 'right' ? 'left-full ml-2' : 'right-full mr-2'} 
      top-0 min-w-[200px] py-2`}
    >
      {items.map((item, index) => (
        <div 
          key={index} 
          className="px-4 py-2 hover:bg-pri-main hover:text-white cursor-pointer"
          onClick={() => window.location.href = item.url}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export const Logoutbtn = ({ title, icon: Icon, colorIcon, open = true, onConfirm }) => {
  const [shouldRenderText, setShouldRenderText] = useState(open)
  const [loading, setLoading] = useState(false)
  const [logoutOpen, setLogoutOpen] = useState(false)

  useEffect(() => {
    if (open) {
      setTimeout(() => setShouldRenderText(true), 300); 
    } else {
      setShouldRenderText(false); 
    }
  }, [open])

  console

  return (
    <button
      className={`${
        open ? "flex" : "hidden md:flex"
      } w-full items-center p-2  text-err-main dark:text-[#ff4022] hover:bg-err-main rounded-xl hover:text-netral-0 dark:hover:text-slate-100 transition`}
      onClick={onConfirm}
    >
      {/* Bagian Kiri: Ikon dan Teks */}
      <div className="flex items-center">
        <Icon size="25" className="mr-2" variant="Bold" color={colorIcon} />
        {loading ? "Proses logout...." : shouldRenderText && <span className="transition-opacity">{title}</span>}
      </div>
    </button>
  );
};

export default function SidebarItem({ 
  title, 
  icon: Icon, 
  dropdownItems, 
  colorIcon, 
  url, 
  open = true 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isActive = url && pathname === url;
  const isDropdownActive = dropdownItems?.some(item => pathname.startsWith(item.url));
  const [shouldRenderText, setShouldRenderText] = useState(open);

  useEffect(() => {
    if (isDropdownActive) {
      setIsOpen(true);
    }
  }, [isDropdownActive]);

  const handleClick = () => {
    if (dropdownItems) {
      if (open) {
        setIsOpen(!isOpen);
      } else {
        setIsHovered(!isHovered);
      }
    } else if (url) {
      router.push(url);
    }
  };

  useEffect(() => {
    // Kendalikan delay rendering teks saat transisi sidebar selesai
    if (open) {
      setTimeout(() => setShouldRenderText(true), 300); // Render teks setelah transisi 300ms
    } else {
      setShouldRenderText(false); // Hapus teks sebelum sidebar tertutup
    }
  }, [open]);

  return (
    <div 
      className="relative"
      onMouseEnter={() => !open && dropdownItems && setIsHovered(true)}
      onMouseLeave={() => !open && dropdownItems && setIsHovered(false)}
    >
      <button
        className={`w-full flex items-center p-2 rounded-xl transition relative ${
          isActive || isDropdownActive 
            ? 'bg-pri-main text-netral-0' 
            : 'text-black dark:text-white hover:bg-pri-main hover:text-netral-0'
        }`}
        onClick={handleClick}
      >
        {/* Bagian Kiri: Ikon dan Teks */}
        <div className="flex items-center ">
          <Icon 
            size="25" 
            className="mr-2" 
            variant="Bold" 
            color={colorIcon}
          />
          {shouldRenderText && <span className="transition-opacity">{title}</span>}
        </div>

        {/* Bagian Kanan: Ikon Panah */}
        {dropdownItems && open && (
          <span className="ml-auto">
            {isOpen ? (
              <ArrowDown2 size="20" color="currentColor" variant="Bold"/>
            ) : (
              <ArrowRight2 size="20" color="currentColor" variant="Bold"/>
            )}
          </span>
        )}
      </button>
      
      {/* Dropdown untuk sidebar terbuka */}
      {dropdownItems && isOpen && open && (
        <SidebarDropdown items={dropdownItems} open={open}/>
      )}

      {/* Hover dropdown untuk sidebar tertutup */}
      {dropdownItems && !open && isHovered && (
        <HoverDropdown 
          items={dropdownItems} 
          position="right"
        />
      )}
    </div>
  );
}