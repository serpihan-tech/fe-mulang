"use client"
import React, { useState } from "react";
import { CloseCircle } from "iconsax-react";
import Dropdown from "@/app/component/Dropdown";

export default function PresensiPegawaiModal() {
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const statusKehadiranOptions = [
    { label: "Hadir", value: "hadir" },
    { label: "Sakit", value: "sakit" },
    { label: "Izin", value: "izin" },
    { label: "Alpa", value: "alpa" }
  ];
  
  const [selectedStatusKehadiran, setSelectedStatusKehadiran] = useState(statusKehadiranOptions[0]);

  const [tanggal, setTanggal] = useState(formatDate(new Date()));

  const [jamMasuk, setJamMasuk] = useState('');
  
  const [jamPulang, setJamPulang] = useState('');
  
  return (
    <div className="w-[485px] bg-white pb-[44px]">
      <div className="w-full h-[54px] flex px-5 py-4 bg-[#adc0f5]/10 rounded-[7px] items-center">
        <div className="text-black text-lg font-normal">Edit Data</div>
        <CloseCircle size="24" color="currentColor" variant="Bold" className="ml-auto cursor-pointer"/>
      </div>
      <div className="w-full px-5">
        <form action="" className="mt-5 space-y-5">
          <div className="space-y-[6px]">
            <label className="text-black text-sm font-medium">Nama Pegawai</label>
              <input type="text" 
                placeholder="John Doe S.Kom, M.Kom"
                disabled
                className="w-full border bg-[#aaaaaa] rounded-md py-2 px-3 text-sm font-normal placeholder-[#2a2a2a]"
              />
          </div>
          <div className="space-y-[6px]">
            <label className="text-black text-sm font-medium">Email Pegawai</label>
              <input type="email" 
                placeholder="johndoe@gmail.com"
                disabled
                className="w-full border bg-[#aaaaaa] rounded-md py-2 px-3 text-sm font-normal placeholder-[#2a2a2a]"
              />
          </div>
          <div className="w-full space-y-[5px]">
            <label className="text-black text-sm font-medium">Tanggal Presensi</label>
            <input 
              type="date" 
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              placeholder="Pilih Tanggal"
              className="w-full border rounded-md py-2 px-[14px] text-sm font-normal"
            />
          </div>
          <div className="w-full flex space-x-11">
            <div className="w-1/2 space-y-[5px]">
              <label className="text-black text-sm font-medium">Jam Masuk</label>
              <input 
                type="time" 
                value={jamMasuk}
                onChange={(e) => setJamMasuk(e.target.value)}
                placeholder="Pilih waktu"
                className="w-full border border-gray-400 rounded-md py-2 px-[14px] text-sm font-normal"
              />
            </div>
            <div className="w-1/2 space-y-[5px]">
              <label className="text-black text-sm font-medium">Jam Pulang</label>
              <input 
                type="date" 
                value={jamPulang}
                onChange={(e) => setJamPulang(e.target.value)}
                placeholder="Pilih waktu"
                className="w-full border border-gray-400 rounded-md py-2 px-[14px] text-sm font-normal"
              />
            </div>
            
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