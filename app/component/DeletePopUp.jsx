"use client";
import { CloseCircle } from "iconsax-react";
import Image from "next/image";

export default function DeletePopUp({ onCancel, onConfirm, isLoading }) {
  return (
    <div 
      className="w-[516px] bg-white dark:bg-dark_net-sec text-black dark:text-slate-100 rounded-2xl p-8 shadow-lg flex flex-col items-center"
      role="dialog" 
      aria-modal="true"
    >
      {/* Tombol Close */}
      <button onClick={onCancel} className="ml-auto -mt-2 -mr-2">
        <CloseCircle 
          size="24" 
          color="currentColor" 
          variant="Bold" 
          className="cursor-pointer hover:text-gray-600 dark:hover:text-gray-400"
        />
      </button>
      
      {/* Gambar Icon */}
      <div className="w-full flex justify-center">
        <Image src="/svg/delete.svg" alt="delete" width={304} height={211} />
      </div>
      
      {/* Pesan Konfirmasi */}
      <div className="text-center mt-6 space-y-2">
        <p className="text-xl font-semibold">Apakah Anda yakin?</p>
        <p className="text-lg text-red-600 dark:text-[#ff4022] font-medium">Data yang dihapus tidak dapat dikembalikan!</p>
      </div>
      
      {/* Tombol Aksi */}
      <div className="w-full flex justify-center space-x-4 mt-8">
        <button 
          onClick={onCancel} 
          className="w-[103px] h-[38px] border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-500 rounded-md 
                     hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 transition active:scale-95"
        >
          Batal
        </button>
        <button 
          onClick={onConfirm} 
          disabled={isLoading} 
          className={`w-[103px] h-[38px] text-white rounded-md transition active:scale-95 
                     ${isLoading ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed' : 'bg-red-600 dark:bg-[#ff4022] hover:bg-red-700 dark:hover:bg-[#ff4022]/90'}`}
        >
          {isLoading ? "Menghapus..." : "Hapus"}
        </button>
      </div>
    </div>
  );
}