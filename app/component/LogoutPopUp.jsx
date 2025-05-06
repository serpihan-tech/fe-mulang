"use client";
import { CloseCircle } from "iconsax-react";
import Image from "next/image";

export default function LogOutPopUp({ onCancel, onConfirm, isLoading }) {
  return (
    <div 
      className="w-[516px] bg-white text-black rounded-2xl p-8 shadow-lg flex flex-col items-center"
      role="dialog" 
      aria-modal="true"
    >
      {/* Tombol Close */}
      <button onClick={onCancel} className="ml-auto -mt-2 -mr-2">
        <CloseCircle 
          size="24" 
          color="currentColor" 
          variant="Bold" 
          className="cursor-pointer hover:text-gray-600"
        />
      </button>
      
      {/* Gambar Icon */}
      <div className="w-full flex justify-center">
        <Image src="/svg/exit.svg" alt="exit" width={304} height={211} />
      </div>
      
      {/* Pesan Konfirmasi */}
      <div className="text-center mt-6 space-y-2">
        <p className="text-xl font-semibold">Apakah Anda Ingin Keluar?</p>
        <p className="text-lg text-err-main">Seluruh sesi akan dihapus!</p>
      </div>
      
      {/* Tombol Aksi */}
      <div className="w-full flex justify-center space-x-4 mt-8">
        <button 
          onClick={onCancel} 
          className="w-[103px] h-[38px] border border-blue-600 text-blue-600 rounded-md 
                     hover:bg-blue-500 hover:text-white transition active:scale-95"
        >
          Batal
        </button>
        <button 
          onClick={onConfirm} 
          disabled={isLoading} 
          className={`w-[103px] h-[38px] text-white rounded-md transition active:scale-95 
                     ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
        >
          {isLoading ? "Tunggu..." : "Logout"}
        </button>
      </div>
    </div>
  );
}