"use client"
import { useEffect, useState, useRef } from "react";
import SidebarDropdown from "./SubItemSB";
import { ArrowRight2, ArrowDown2 } from "iconsax-react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "react-toastify";
import { logout } from "@/app/api/ApiAuth";
import { useLoading } from "@/context/LoadingContext";
import Image from "next/image";
import { useTheme } from "@/provider/ThemeProvider";

// Komponen HoverDropdown
const HoverDropdown = ({ items }) => {
  const router = useRouter();

  const handleClick = (url) => {
    router.push(url);
  };

  return (
    <div className="absolute left-full ml-2 top-0 min-w-[200px] bg-white dark:bg-dark_net-pri text-black dark:text-white shadow-lg rounded-xl py-2 z-50">
      {items.map((item, index) => (
        <button 
          key={index} 
          className="w-full text-left px-4 py-2 hover:bg-pri-main hover:text-white dark:hover:bg-pri-main/80 transition-colors duration-200 cursor-pointer"
          onClick={() => handleClick(item.url)}
        >
          {item.label}
        </button>
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
  imageActive,
  imageIdle,
  dropdownItems, 
  colorIcon, 
  url, 
  open = false
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showHoverDropdown, setShowHoverDropdown] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { setIsLoading } = useLoading();
  const { theme } = useTheme();
  const isActive = url && pathname === url;
  const isDropdownActive = dropdownItems?.some(item => pathname.startsWith(item.url));
  const [shouldRenderText, setShouldRenderText] = useState(open);
  
  const itemRef = useRef(null);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (isDropdownActive) {
      setIsOpen(true);
    }
  }, [isDropdownActive]);

  useEffect(() => {
    if (open) {
      setTimeout(() => setShouldRenderText(true), 300);
    } else {
      setShouldRenderText(false);
    }
  }, [open]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (!open && dropdownItems) {
      setShowHoverDropdown(true);
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowHoverDropdown(false);
    }, 100);
  };

  const handleClick = async () => {
    if (dropdownItems) {
      if (open) {
        setIsOpen(!isOpen);
      }
    } else if (url) {
      setIsLoading(true);
      try {
        await router.push(url);
      } catch (error) {
        console.error('Navigation error:', error);
        toast.error('Failed to navigate to the page');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={itemRef}
        className={`w-full flex items-center p-2 rounded-md transition-all duration-200 relative
          ${isActive || isDropdownActive 
            ? 'bg-pri-main text-white dark:bg-pri-main/90 dark:text-white' 
            : 'text-gray-700 dark:text-gray-200 hover:bg-pri-main/10 dark:hover:bg-pri-main/20'
          }`}
        onClick={handleClick}
      >
        <div className="flex items-center">
          {Icon && <Icon 
            size="25" 
            className="mr-2" 
            variant="Bold" 
            color={isActive || isDropdownActive ? "white" : colorIcon}
          />}
          {imageActive && imageIdle && (
            <Image
              alt="icon"
              src={isActive || isDropdownActive || theme === "dark" ? imageActive : imageIdle}
              width={25}
              height={25}
              className="mr-2 rounded-full"
            />
          )}
          {shouldRenderText && (
            <span className={`transition-opacity ${isActive || isDropdownActive ? 'font-medium' : ''}`}>
              {title}
            </span>
          )}
        </div>

        {dropdownItems && open && (
          <span className="ml-auto">
            {isOpen ? (
              <ArrowDown2 size="20" color={isActive || isDropdownActive ? "white" : "currentColor"} variant="Bold"/>
            ) : (
              <ArrowRight2 size="20" color={isActive || isDropdownActive ? "white" : "currentColor"} variant="Bold"/>
            )}
          </span>
        )}
      </button>
      
      {/* Regular dropdown for expanded sidebar */}
      {dropdownItems && isOpen && open && (
        <SidebarDropdown items={dropdownItems} open={open}/>
      )}

      {/* Hover dropdown for minimized sidebar */}
      {dropdownItems && !open && showHoverDropdown && (
        <div 
          ref={dropdownRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <HoverDropdown items={dropdownItems} />
        </div>
      )}
    </div>
  );
}