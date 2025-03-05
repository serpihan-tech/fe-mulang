"use client";
import React from "react";

export default function Card2({ icon: Icon, value, label, bgColor, colorBehind }) {
  return (
    <div className={`w-[300px] flex px-4 py-6 rounded-[20px] ${bgColor} dark:bg-netral-0/10 dark:backdrop-blur-md dark:border-2 dark:border-pri-border items-center`}>
        {/* Icon */}
        <div className={`w-11 h-11 p-2.5 rounded-xl ${colorBehind} flex items-center justify-center`} >
            <Icon className="w-11" color="white" variant="Bold" />
        </div>
        <div className="ms-7 space-y-3">
        {/* Nominal Data */}
          <p className="text-xl font-semibold text-gray-900 dark:text-white">{label}</p>

          {/* Keterangan */}
          <p className="text-xl font-semibold text-gray-900 dark:text-gray-300">{value}</p>
        </div>
    </div>
  );
}
