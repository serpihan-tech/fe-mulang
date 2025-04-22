"use client"
import React, { useState } from "react";
import { CloseCircle } from "iconsax-react";
import Dropdown from "@/app/component/Dropdown";

export default function Alasan() {
  return (
    <div className="w-[485px] bg-white pb-[47px] rounded-[15px]">
      <div className="w-full h-[54px] flex px-5 py-4 bg-[#adc0f5]/10 rounded-[7px] items-center">
        <div className="text-black text-xl font-semibold">Alasan</div>
        <CloseCircle size="24" color="currentColor" variant="Bold" className="ml-auto cursor-pointer"/>
      </div>
      <div className="w-full px-5">
        <input type="text" 
          placeholder="Masukkan alasan"
          className="w-full border [#cccccc] rounded-md py-2 px-3 text-sm font-normal"
        />
      </div>
      <div className="w-full flex justify-end space-x-4 mt-5">
        <button className="w-[103px] px-2 py-1.5 rounded-md text-white text-sm font-medium bg-blue-600 hover:bg-blue-700 transition-shadow duration-300 hover:shadow-md hover:shadow-gray-400">
          Simpan
        </button>
      </div>
    </div>
  )
}