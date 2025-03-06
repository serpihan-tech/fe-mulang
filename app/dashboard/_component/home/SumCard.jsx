"use client";
import React from "react";

export default function SumCard({ icon: Icon, value, label, iconSize = "w-5" }) {
  return (
    <div className="p-7 rounded-md bg-white dark:bg-netral-100 dark:backdrop-blur-md dark:border-2 dark:border-pri-border w-44">
        {/* Icon */}
        <div className={`w-9 h-9 p-1.5 rounded-md bg-pri-main flex items-center justify-center`} >
            <Icon className={`${iconSize}`} color="white" />
        </div>

        {/* Nominal Data */}
        <p className="text-lg font-bold py-4 text-gray-900 dark:text-white">{value}</p>

        {/* Keterangan */}
        <p className="text-sm font-medium text-gray-500 dark:text-gray-300">{label}</p>
    </div>
  );
}
