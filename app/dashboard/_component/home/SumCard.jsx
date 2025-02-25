"use client";
import React from "react";
import Card from "./Card";

export default function SumCard({ icon: Icon, value, label }) {
  return (
    <Card>
        {/* Icon */}
        <div className={`w-9 h-9 p-1.5 rounded-md bg-pri-main`} >
            <Icon size="25" color="white" />
        </div>

        {/* Nominal Data */}
        <p className="text-lg font-bold py-4 text-gray-900 dark:text-white">{value}</p>

        {/* Keterangan */}
        <p className="text-sm font-medium text-gray-500 dark:text-gray-300">{label}</p>
    </Card>
  );
}
