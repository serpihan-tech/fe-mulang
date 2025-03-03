"use client"
import React, { useState } from "react";
import { CloseCircle } from "iconsax-react";
import Dropdown from "@/app/component/Dropdown";

export default function TambahKelasModal() {
  const jabatanOptions = [
    { label: "Guru", value: "guru" },
  ];
  
  const [selectedJabatan, setSelectedJabatan] = useState(null);
  
  return (
    <div className="w-[485px] bg-white pb-[66px]">
      <div className="w-full h-[54px] flex px-5 py-4 bg-[#adc0f5]/10 rounded-[7px] items-center">
        <div className="text-black text-xl font-semibold">Tambah Data</div>
        <CloseCircle size="24" color="currentColor" variant="Bold" className="ml-auto cursor-pointer"/>
      </div>
      <div className="w-full px-5">
        <form action="" className="mt-5 space-y-5">
          <div className="space-y-[6px]">
            <label className="text-black text-sm font-medium">NIP</label>
              <input type="number" 
                placeholder="1001"
                className="w-full border [#cccccc] rounded-md py-2 px-3 text-sm font-normal"
              />
          </div>
          <div className="space-y-[6px]">
            <label className="text-black text-sm font-medium">Nama Pegawai</label>
              <input type="text" 
                placeholder="Masukkan nama lengkap"
                className="w-full border [#cccccc] rounded-md py-2 px-3 text-sm font-normal"
              />
          </div>
          <div className="space-y-[6px] w-full">
            <label className="text-black text-sm font-medium">Jabatan</label>
            <Dropdown
              options={jabatanOptions}
              value={selectedJabatan}
              onChange={setSelectedJabatan}
              placeholder="Pilih jabatan"
              className="w-full h-10 p-2 rounded-md bg-white dark:bg-black border border-[#cccccc]"
              dropdownStyle="dark:bg-black dark:text-white"
            />
          </div>
          <div className="space-y-[6px]">
            <label className="text-black text-sm font-medium">Nomor Telepon </label>
              <input type="number" 
                placeholder="Masukkan nomor telepon"
                className="w-full border [#cccccc] rounded-md py-2 px-3 text-sm font-normal"
              />
          </div>
          <div className="space-y-[6px]">
            <label className="text-black text-sm font-medium">Email Pegawai</label>
              <input type="email" 
                placeholder="Masukkan email pegawai"
                className="w-full border [#cccccc] rounded-md py-2 px-3 text-sm font-normal"
              />
          </div>
          <div>
            <label className="text-black text-sm font-medium">Pilih Status</label>
            <div className="flex py-4 space-x-8">
              <div className="flex items-center space-x-[18px]">
                <input id="aktif" type="radio" value="" name="aktif" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label htmlFor="aktif" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Aktif</label>
              </div>
              <div className="flex items-center me-4">
                  <input id="tidak-aktif" type="radio" value="" name="tidak-aktif" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label htmlFor="tidak-aktif" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tidak Aktif</label>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="w-full flex justify-end space-x-4 mt-5">
        <button className="w-[103px] h-[38px] px-2 py-1.5 text-sm font-medium border rounded-md border-red-600 text-red-600 hover:bg-red-500 hover:text-white bg-white transition-shadow duration-300 hover:shadow-md hover:shadow-gray-400">
          Batal
        </button>
        <button className="w-[103px] h-[38px] px-2 py-1.5 rounded-md text-white text-sm font-medium bg-blue-600 hover:bg-blue-700 transition-shadow duration-300 hover:shadow-md hover:shadow-gray-400">
          Simpan
        </button>
      </div>
    </div>
  )
}