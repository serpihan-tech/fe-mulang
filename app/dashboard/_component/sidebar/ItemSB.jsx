"use client"
import { useState } from "react";
import SidebarDropdown from "./SubItemSB";

export default function SidebarItem({ title, icon: Icon, dropdownItems, colorIcon }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        className="w-full flex items-center p-2 hover:bg-pri-main rounded-xl hover:text-netral-0"
        onClick={() => setOpen(!open)}
      >
        <Icon size="25" className="mr-2" variant="Bold" color={colorIcon} />
        <span className="">{title}</span>
      </button>
      {dropdownItems && open && <SidebarDropdown items={dropdownItems} />}
    </div>
  );
}
