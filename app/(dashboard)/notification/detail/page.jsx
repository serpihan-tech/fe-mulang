"use client"
import { ArrowUp, Document } from "iconsax-react";
import Image from "next/image";

export default function DetailNotif () {
  return (
    <div className="w-full bg-neutral-50 dark:bg-dark_net-pri min-h-screen space-y-[18px]">
      <div className="flex items-center space-x-5 md:space-x-8" onClick={() => window.history.back()}>
        <ArrowUp
          size={24}
          color="#7f7f7f"
          className="-rotate-90"
        />
        <div className="hidden lg:block justify-start text-black dark:text-slate-100 text-xl font-semibold">Informasi Pelaksanaan UTS PKN</div>
        <div className="hidden lg:block px-2 py-1 bg-[#cccccc] rounded-[5px]">
          <div className="justify-start text-[#555555] text-sm font-normal">From Teacher</div>
        </div>
        <h1 className="block lg:hidden text-black text-xl font-semibold">Notifikasi</h1>
      </div>
      <div className="w-full flex justify-between">
        <div className="flex items-center space-x-2 md:space-x-4">
          <Image
            src={"/picture/profilePhoto.jpg"}
            alt="teacher"
            width={40}
            height={40}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
          />
          <div className="space-y-1">
            <div className="text-[#2a2a2a] dark:text-slate-100 text-xs md:text-sm font-medium">Brian Harina</div> 
            <div className="text-[#7f7f7f] dark:text-slate-300 text-[10px] md:text-xs font-normal">Brian.hrn@teacher.com</div>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <div className="text-[#7f7f7f] dark:text-slate-300 text-[10px] md:text-sm font-normal">2 Februari 2020, 09.41 </div>
          <div className="text-[#7f7f7f] dark:text-slate-300 text-[10px] md:text-sm font-normal">(Hari ini)</div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-full lg:w-2/3 p-4 md:p-6 lg:p-10 bg-white dark:bg-dark_net-ter rounded-[10px] outline outline-1 outline-offset-[-1px] outline-[#adc0f5]">
          <div className="w-full space-y-3 md:space-y-8">
            <div className="space-y-3">
              <div className="text-center justify-center text-[#0841e2] dark:text-[#5D8BF8] text-sm md:text-base lg:text-lg font-semibold">Informasi Pelaksanaan UTS PKN</div>
              <hr className="border-t border-2 border-[#0841e2] dark:border-[#5D8BF8] w-full" />
              <div className="self-stretch text-justify justify-center">
                <div class="text-black dark:text-slate-100 text-xs md:text-sm lg:text-lg font-normal">
                  Diberitahukan bahwa Ulangan Tengah Semester (UTS) pada mata pelajaran Pendidikan Kewarganegaraan (PKN) akan dilaksanakan dalam bentuk ulangan lisan. Ulangan ini akan dilakukan secara bergantian, di mana setiap siswa akan dipanggil satu per satu untuk mengikuti ulangan. 
                  Diharapkan seluruh siswa mempersiapkan diri sebaik mungkin. Berikut saya lampirkan kisi-kisi soal yang berkemungkinan keluar saat UTS

                  Salam,
                  Brian Harina
                </div>
              </div>
            </div>
            d
          </div>
        </div>
      </div>
    </div>
  )
}