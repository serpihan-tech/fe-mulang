"use client"
import React, { useState } from "react";
import { CloseCircle } from "iconsax-react";
import Dropdown from "@/app/component/Dropdown";

export default function DataAbsensiModal() {
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
  const statusKehadiranOptions = [
    { label: "Hadir", value: "hadir" },
    { label: "Sakit", value: "sakit" },
    { label: "Izin", value: "izin" },
    { label: "Alpa", value: "alpa" }
  ];

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };
  
  const [selectedKelas, setSelectedKelas] = useState(kelasOptions[0]);
  
  const [selectedStatusKehadiran, setSelectedStatusKehadiran] = useState(statusKehadiranOptions[0]);

  const [tanggalSelesai, setTanggalSelesai] = useState(formatDate(new Date()));
  
  return (
    <div className="w-[485px] bg-white pb-[44px]">
      <div className="w-full h-[54px] flex px-5 py-4 bg-[#adc0f5]/10 rounded-[7px] items-center">
        <div className="text-black text-lg font-normal">Edit Data</div>
        <CloseCircle size="24" color="currentColor" variant="Bold" className="ml-auto cursor-pointer"/>
      </div>
      <div className="w-full px-5">
        <form action="" className="mt-5 space-y-5">
          <div className="w-full space-y-[5px]">
            <label className="text-black text-sm font-medium">Tanggal</label>
            <input 
              type="date" 
              value={tanggalSelesai}
              onChange={(e) => setTanggalSelesai(e.target.value)}
              placeholder="Pilih Tanggal"
              disabled
              className="w-full border bg-[#aaaaaa] rounded-md py-2 px-[14px] text-sm font-normal"
            />
          </div>
          <div className="space-y-[6px]">
            <label className="text-black text-sm font-medium">NIS</label>
              <input type="number" 
                placeholder="1001"
                disabled
                className="w-full border bg-[#aaaaaa] rounded-md py-2 px-3 text-sm font-normal placeholder-[#2a2a2a]"
              />
          </div>
          <div className="space-y-[6px]">
            <label className="text-black text-sm font-medium">Nama Siswa</label>
              <input type="text" 
                placeholder="Rizal Anas"
                disabled
                className="w-full border bg-[#aaaaaa] rounded-md py-2 px-[14px] text-sm font-normal placeholder-[#2a2a2a]"
              />
          </div>
          <div className="space-y-[6px] w-full">
            <label className="text-black text-sm font-medium">Nama Kelas</label>
            <Dropdown
              options={kelasOptions}
              value={selectedKelas}
              onChange={setSelectedKelas}
              disabled
              isSearchable={false}
              menuIsOpen={false}
              className="w-full h-10 px-[14px] p-2 rounded-md  bg-[#aaaaaa]  dark:bg-black border border-[#cccccc] pointer-events-none"
              dropdownStyle="dark:bg-black dark:text-white"
            />
          </div>
          <div className="space-y-[6px] w-full">
            <label className="text-black text-sm font-medium">Status Kehadiran</label>
            <Dropdown
              options={statusKehadiranOptions}
              value={selectedStatusKehadiran}
              onChange={setSelectedStatusKehadiran}
              className="w-full h-10 px-[14px] p-2 rounded-md bg-white dark:bg-black border border-[#cccccc]"
              dropdownStyle="dark:bg-black dark:text-white"
            />
          </div>
          <div className="space-y-[6px]">
            <label className="text-black text-sm font-medium">Keterangan</label>
              <input type="text" 
                placeholder="Masukkan keterangan"
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