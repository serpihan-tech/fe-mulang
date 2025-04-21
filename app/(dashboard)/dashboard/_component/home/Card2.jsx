"use client";
import React from "react";

export default function Card2({ icon: Icon, value, label, bgColor, colorBehind }) {
  return (
    <div className={`w-full flex px-2.5 py-2 md:px-3 md:py-3 lg:px-4 lg:py-6 rounded-[15px] lg:rounded-[20px] ${bgColor} dark:bg-netral-0/10 dark:backdrop-blur-md dark:border-2 dark:border-pri-border items-center`}>
        {/* Icon */}
        <div className={`w-8 h-8 lg:w-11 lg:h-11 p-1.5 lg:p-2.5 rounded-md lg:rounded-xl ${colorBehind} flex items-center justify-center`} >
            <Icon size={24} color="white" variant="Bold" />
        </div>
        <div className="ms-5 lg:ms-7 space-y-1 lg:space-y-3">
        {/* Nominal Data */}
          <p className="text-sm md:text-base lg:text-lg font-semibold text-gray-900 dark:text-white">{label}</p>

          {/* Keterangan */}
          <p className="text-sm md:text-base lg:text-lg font-semibold text-gray-900 dark:text-gray-300">{value}</p>
        </div>
    </div>
  );
}
