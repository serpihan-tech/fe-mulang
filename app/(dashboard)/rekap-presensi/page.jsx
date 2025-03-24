'use client'

import { ArrowRight2 } from "iconsax-react";
import CalendarComponent from "../dashboard/_component/home/CalendarComponent";
import { useState } from "react";
import Dropdown from "@/app/component/Dropdown";

export default function RekapPresensi() {
  const tahunAjarOptions = [
    { label: "2024-2025", value: "2024_2025" },
    { label: "2023-2024", value: "2023_2024" },
  ];

  const semesterOptions = [
    { label: "Genap", value: "genap" },
    { label: "Ganjil", value: "ganjil" },
  ];

  const [selectedTahunAjar, setSelectedTahunAjar] = useState(null);

  const [selectedSemester, setSelectedSemester] = useState(null);
  
  return (
    <div className="bg-white dark:bg-dark_net-pri p-5 text-black transition lg:flex space-x-[36px]">
      <div className="lg:w-2/3">
        <CalendarComponent icon={ArrowRight2} iconVariant="Outline" gapDays="gap-y-3" dayNamesMargin="mb-3"/>
      </div>
      <div className="lg:w-1/3">
        <div className="w-full flex space-x-6">
          <div className="w-1/2">
            <Dropdown
              options={tahunAjarOptions}
              value={selectedTahunAjar}
              onChange={setSelectedTahunAjar}
              placeholder="Tahun Ajar"
              className="h-10 p-2 rounded-md bg-white dark:bg-black border border-gray-200 placeholder-gray-300"
              dropdownStyle="dark:bg-black dark:text-white"
            />
          </div>
          <div className="w-1/2">
            <Dropdown
              options={semesterOptions}
              value={selectedSemester}
              onChange={setSelectedSemester}
              placeholder="Semester"
              className="h-10 p-2 rounded-md bg-white dark:bg-black border border-gray-200 placeholder-gray-300"
              dropdownStyle="dark:bg-black dark:text-white"
            />
          </div>
        </div>
        <div className="w-full flex mt-[51px] space-x-4">
          <div className="w-1/2 px-4 py-3 bg-white rounded-[10px] outline outline-1 outline-offset-[-1px] outline-[#adc0f5] justify-start items-center gap-3">
            <div className="text-center justify-center text-black text-lg font-bold">9 Hari</div>
              <div className="flex justify-center items-center gap-2">
                <div className="w-2 h-2 bg-[#0841e2] rounded-full" />
                <div className="text-center justify-center text-black text-base font-medium">Hadir</div>
            </div>
          </div>
          <div className="w-1/2 px-4 py-3 bg-white rounded-[10px] outline outline-1 outline-offset-[-1px] outline-[#adc0f5] justify-start items-center gap-3">
            <div className="text-center justify-center text-black text-lg font-bold">2 Hari</div>
              <div className="flex justify-center items-center gap-2">
                <div className="w-2 h-2 bg-[#dc1010] rounded-full" />
                <div className="text-center justify-center text-black text-base font-medium">Tidak Hadir</div>
            </div>
          </div>
        </div>
        <div className="mt-7 w-full inline-flex flex-col justify-start items-start gap-4">
          <div className="self-stretch justify-center text-black text-base font-bold">Keterangan</div>
            <div className="self-stretch inline-flex justify-start items-center gap-3">
              <div className="inline-flex flex-col justify-start items-center gap-1">
                  <div className="text-center justify-center text-black text-sm font-normal">Rab</div>
                  <div className="self-stretch text-center justify-center text-black text-lg font-bold">4</div>
              </div>
              <div className="flex-1 px-3 py-2 bg-[#dc1010] rounded-[5px] flex justify-start items-center gap-2.5">
                  <div className="text-center justify-center text-white text-sm font-medium">Sakit demam</div>
              </div>
          </div>
          <div className="self-stretch inline-flex justify-start items-center gap-3">
            <div className="inline-flex flex-col justify-start items-center gap-1">
              <div className="text-center justify-center text-black text-sm font-normal">Sen</div>
              <div className="text-center justify-center text-black text-lg font-bold">17</div>
            </div>
            <div className="flex-1 px-3 py-2 bg-[#dc1010] rounded-[5px] flex justify-start items-center gap-2.5">
              <div className="text-center justify-center text-white text-sm font-medium">Acara keluarga</div>
            </div>
          </div>
          </div>
      </div>
    </div>
  );
}
