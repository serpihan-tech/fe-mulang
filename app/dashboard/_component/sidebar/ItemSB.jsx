"use client"
import { useState } from "react";
import SidebarDropdown from "./SubItemSB";

export default function SidebarItem({ title, icon: Icon, dropdownItems }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        className="w-full flex items-center p-2 hover:bg-gray-700 rounded-md"
        onClick={() => setOpen(!open)}
      >
        <Icon size="25" className="mr-2" variant="Bold" color="black" />
        <span >{title}</span>
      </button>
      {dropdownItems && open && <SidebarDropdown items={dropdownItems} />}
    </div>
  );
}
