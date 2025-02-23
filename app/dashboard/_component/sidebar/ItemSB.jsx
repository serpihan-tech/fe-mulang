"use client"
import { useState } from "react";
import SidebarDropdown from "./SubItemSB";
import { ArrowRight2, ArrowDown2 } from "iconsax-react";

export const Logoutbtn = ({ title, icon: Icon, colorIcon }) => {
  return (
    <div>
      <button
        className="w-full flex items-center p-2  text-err-main hover:bg-err-main rounded-xl hover:text-netral-0 transition"
        
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

export default function SidebarItem({ title, icon: Icon, dropdownItems, colorIcon }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        className="w-full flex items-center p-2 text-black dark:text-white hover:bg-pri-main rounded-xl hover:text-netral-0 transition"
        onClick={() => setOpen(!open)}
      >
        {/* Bagian Kiri: Ikon dan Teks */}
        <div className="flex items-center">
          <Icon size="25" className="mr-2" variant="Bold" color={colorIcon} />
          <span>{title}</span>
        </div>

        {/* Bagian Kanan: Ikon Panah */}
        {dropdownItems && (
          <span className="ml-auto">
            {open ? (
              <ArrowDown2 size="20" color="currentColor" variant="Bold" />
            ) : (
              <ArrowRight2 size="20" color="currentColor" variant="Bold"/>
            )}
          </span>
        )}
      </button>
      
      {dropdownItems && open && <SidebarDropdown items={dropdownItems} />}
    </div>
  );
}
