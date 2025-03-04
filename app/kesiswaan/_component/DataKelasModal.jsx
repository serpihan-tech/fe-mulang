"use client"
import React, { useState } from "react";
import { CloseCircle } from "iconsax-react";
import Dropdown from "@/app/component/Dropdown";

export default function DataKelasModal() {
  const kelasOptions = [
    { label: "X MIPA 1", value: "xmipa1" },
    { label: "X MIPA 2", value: "xmipa2" },
    { label: "X IPS 1", value: "xips1" },
    { label: "X IPS 2", value: "xips2" },
    { label: "XI MIPA 1", value: "ximipa1" },
    { label: "XI MIPA 2", value: "ximipa2" },
    { label: "XI IPS 1", value: "xiips1" },
    { label: "XI IPS 2", value: "xiips2" },
    { label: "XII MIPA 1", value: "xiimipa1" },
    { label: "XII MIPA 2", value: "xiimipa2" },
    { label: "XII IPS 1", value: "xiiips1" },
    { label: "XII IPS 2", value: "xiiips2" },
  ];
  const waliKelasOptions = [
    { label: "Rizal Anas S.Pd., M.Kom", value: "rizalanas" },
    { label: "Anto Pratama S.Pd., M.Kom", value: "antopratama" },
    { label: "Dwi Sriyati S.Pd., M.Pdi", value: "dwisriyati" }
  ];
  
  const [selectedKelas, setSelectedKelas] = useState(kelasOptions[0]);
  
  const [selectedWaliKelas, setSelectedWaliKelas] = useState(waliKelasOptions[0]);

  const [jumlahSiswa, setJumlahSiswa] = useState(50);
  
  return (
    <div className="w-[485px] bg-white pb-[66px]">
      <div className="w-full h-[54px] flex px-5 py-4 bg-[#adc0f5]/10 rounded-[7px] items-center">
        <div className="text-black text-xl font-semibold">Edit Data</div>
        <CloseCircle size="24" color="currentColor" variant="Bold" className="ml-auto cursor-pointer"/>
      </div>
      <div className="w-full px-5">
        <form action="" className="mt-5 space-y-5">
          <div className="space-y-[6px]">
            <label className="text-black text-sm font-medium">ID Kelas</label>
              <input type="number" 
                placeholder="1001"
                disabled
                className="w-full border bg-[#aaaaaa] rounded-md py-2 px-3 text-sm font-normal placeholder-[#2a2a2a]"
              />
          </div>
          <div className="space-y-[6px] w-full">
            <label className="text-black text-sm font-medium">Nama Kelas</label>
            <Dropdown
              options={kelasOptions}
              value={selectedKelas}
              onChange={setSelectedKelas}
              className="w-full h-10 p-2 rounded-md bg-white dark:bg-black border border-[#cccccc]"
              dropdownStyle="dark:bg-black dark:text-white"
            />
          </div>
          <div className="space-y-[6px] w-full">
            <label className="text-black text-sm font-medium">Wali Kelas</label>
            <Dropdown
              options={waliKelasOptions}
              value={selectedWaliKelas}
              onChange={setSelectedWaliKelas}
              className="w-full h-10 p-2 rounded-md bg-white dark:bg-black border border-[#cccccc]"
              dropdownStyle="dark:bg-black dark:text-white"
            />
          </div>
          <div className="space-y-[6px]">
            <label className="text-black text-sm font-medium">Jumlah Siswa </label>
              <input type="number" 
                placeholder="Masukkan jumlah siswa"
                value={jumlahSiswa}
                onChange={(e) => setJumlahSiswa(e.target.value)}
                className="w-full border [#cccccc] rounded-md py-2 px-3 text-sm font-normal"
              />
          </div>
        </form>
      </div>
      <div className="w-full flex justify-end space-x-4 mt-5">
        <button className="w-[103px] h-[38px] px-2 py-1.5 text-sm font-medium border rounded-md border-red-600 text-red-600 hover:bg-red-500 hover:text-white bg-white transition-shadow duration-300 hover:shadow-md hover:shadow-gray-400">
          Batal
        </button>
        <button className="w-[103px] h-[38px] px-2 py-1.5 rounded-md text-white text-sm font-medium bg-blue-600 hover:bg-blue-700 transition-shadow duration-300 hover:shadow-md hover:shadow-gray-400">
          Ubah
        </button>
      </div>
    </div>
  )
}