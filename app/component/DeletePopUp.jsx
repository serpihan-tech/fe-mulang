"use client"
import { CloseCircle } from "iconsax-react";
import Image from "next/image";

export default function DeletePopUp() {
  return (
    <div className="w-[516.27px] bg-white rounded-2xl p-[32.4px]">
      <CloseCircle size="24" color="currentColor" variant="Bold" className="ml-auto cursor-pointer top-[16.20px]"/>
      <div className="w-full flex justify-center">
        <Image
          src="/svg/delete.svg"
          alt="delete"
          width={304}
          height={211}
        />
      </div>
      <div className="w-full flex flex-col items-center justify-center mt-[24.3px] space-y-[10.12px]">
        <p className="text-xl font-medium">Apakah anda yakin?</p>
        <p className="text-lg font-normal text-red-600">Anda tidak dapat mengembalikannya!</p>
      </div>
      <div className="w-full flex justify-center space-x-4 mt-[30.37px]">
        <button className="w-[103px] h-[38px] px-2 py-1.5 text-sm font-medium border rounded-md border-blue-600 text-blue-600 hover:bg-blue-500 hover:text-white bg-white transition-shadow duration-300 hover:shadow-md hover:shadow-gray-400">
          Batal
        </button>
        <button className="w-[103px] h-[38px] px-2 py-1.5 rounded-md text-white text-sm font-medium bg-red-600 hover:bg-red-700 transition-shadow duration-300 hover:shadow-md hover:shadow-gray-400">
          Hapus
        </button>
      </div>
    </div>
  )
}