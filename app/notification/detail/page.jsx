import { ArrowUp, Document } from "iconsax-react";
import Image from "next/image";

export default function DetailNotif () {
  return (
    <div className="w-full bg-neutral-50 min-h-screen space-y-[18px]">
      <div className="flex space-x-8">
        <ArrowUp
          size={24}
          color="#7f7f7f"
        />
        <div className="justify-start text-black text-xl font-semibold">Informasi Pelaksanaan UTS PKN</div>
        <div className="px-2 py-1 bg-[#cccccc] rounded-[5px]">
          <div className="justify-start text-[#555555] text-sm font-normal">From Teacher</div>
        </div>
      </div>
      <div className="w-full flex justify-between">
        <div className="flex space-x-4">
          <Image
            src={"/svg/teacher.svg"}
            alt="teacher"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <div className="space-y-1">
            <div className="text-[#2a2a2a] text-sm font-medium">Brian Harina</div> 
            <div className="text-[#7f7f7f] text-xs font-normal">Brian.hrn@teacher.com</div>
          </div>
        </div>
        <div className="flex">
          <div className="text-[#7f7f7f] text-sm font-normal">2 Februari 2020, 09.41</div>
          <div className="text-[#7f7f7f] text-sm font-normal">(Hari ini)</div>
        </div>
      </div>
      <div className="w-2/3 p-10 bg-white rounded-[10px] outline outline-1 outline-offset-[-1px] outline-[#adc0f5]">
        <div className="w-full space-y-8">
          <div className="space-y-3">
            <div className="text-center justify-center text-[#0841e2] text-lg font-semibold">Informasi Pelaksanaan UTS PKN</div>
            <hr className="border-t border-2 border-[#0841e2] w-full" />
            <div className="self-stretch text-justify justify-center">
              <div class="text-black text-lg font-normal">
                Diberitahukan bahwa Ulangan Tengah Semester (UTS) pada mata pelajaran Pendidikan Kewarganegaraan (PKN) akan dilaksanakan dalam bentuk ulangan lisan. Ulangan ini akan dilakukan secara bergantian, di mana setiap siswa akan dipanggil satu per satu untuk mengikuti ulangan. 
                Diharapkan seluruh siswa mempersiapkan diri sebaik mungkin. Berikut saya lampirkan kisi-kisi soal yang berkemungkinan keluar saat UTS

                Salam,
                Brian Harina
              </div>
            </div>
          </div>
          <div className="px-4 py-2.5 bg-[#f3f3f3] rounded-[10px] justify-between">
            <div className="flex space-y-[22px] items-center">
              <Document size={76} color="#dc1010"/>
              <div className="space-y-3">
                <div className="text-[#555555] text-sm font-bold ">Kisi - Kisi UTS.pdf</div>
                <div className="text-[#555555] text-xs font-medium">124 kB</div>
              </div>
            </div>
            <div className="items-center justify-center">
              <button className="px-8 py-3 bg-[#0841e2] rounded-[10px] items-center">
                <div className="text-center text-white text-sm font-semibold">Unduh</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}