"use client"
import Image from "next/image";

export default function SuccessUploadPopUp() {
  return (
    <div className="w-[516.27px] bg-white rounded-2xl p-[32.4px]">
      <div className="w-full flex justify-center">
        <Image
          src="/svg/upload.svg"
          alt="upload"
          width={304}
          height={211}
        />
      </div>
      <div className="w-full flex flex-col items-center justify-center mt-[24.3px] space-y-[10.12px]">
        <p className="text-xl font-medium">File berhasil diunggah</p>
        <p className="text-lg font-normal">File yang anda unggah telah tersimpan</p>
      </div>
    </div>
  )
}