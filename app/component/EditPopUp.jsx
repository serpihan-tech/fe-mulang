"use client"
import { CloseCircle } from "iconsax-react";
import Image from "next/image";

export default function EditPopUp({onCancel, onConfirm ,isLoading}) {
  return (
    <div className="w-[516.27px] bg-white rounded-2xl p-[32.4px] text-black">
      <CloseCircle 
        size="24" 
        color="currentColor" 
        variant="Bold" 
        className="ml-auto cursor-pointer top-[16.20px]"
        onClick={onCancel}
        />
      <div className="w-full flex justify-center">
        <Image
          src="/svg/edit.svg"
          alt="edit"
          width={304}
          height={211}
        />
      </div>
      <div className="w-full flex flex-col items-center justify-center mt-[24.3px] space-y-[24.3px]">
        <p className="text-xl font-medium">Apakah anda ingin mengubah data?</p>
        <p className="text-lg font-normal">Data lama tidak akan disimpan lagi</p>
      </div>
      <div className="w-full flex justify-center space-x-4 mt-[30.37px]">
        <button
          onClick={onCancel} 
          className="w-[103px] h-[38px] px-2 py-1.5 text-sm font-medium border rounded-md border-blue-600 text-blue-600 hover:bg-blue-500 hover:text-white bg-white transition-shadow duration-300 hover:shadow-md hover:shadow-gray-400">
          Batal
        </button>
        <button 
          onClick={onConfirm}
          className="w-[103px] h-[38px] px-2 py-1.5 rounded-md text-white text-sm font-medium bg-blue-600 hover:bg-blue-700 transition-shadow duration-300 hover:shadow-md hover:shadow-gray-400">
          Ubah
        </button>
      </div>
    </div>
  )
}