"use client";
import React, { useState } from "react";
import { CloseCircle } from "iconsax-react";

export default function DataTahunAjarModal() {
  const [tanggalMulai, setTanggalMulai] = useState("");

  const [tanggalSelesai, setTanggalSelesai] = useState("");

  return (
    <div className="w-[485px] bg-white pb-[38px]">
      <div className="w-full h-[54px] flex px-5 py-4 bg-[#adc0f5]/10 rounded-[7px] items-center">
        <div className="text-black text-lg font-normal">Tambah Data</div>
        <CloseCircle
          size="24"
          color="currentColor"
          variant="Bold"
          className="ml-auto cursor-pointer"
        />
      </div>
      <div className="w-full px-5">
        <form action="" className="mt-5 space-y-5">
          <div className="space-y-[6px]">
            <label className="text-black text-sm font-medium">
              ID Tahun Ajar
            </label>
            <input
              type="text"
              placeholder="TA2024"
              disabled
              className="w-full border bg-[#aaaaaa] rounded-md py-[14px] px-[10px] text-sm font-normal placeholder-[#2a2a2a]"
            />
          </div>
          <div className="space-y-[5px]">
            <label className="text-black text-sm font-medium">Tahun Ajar</label>
            <input
              type="text"
              placeholder="Masukkan tahun ajar"
              className="w-full border border-gray-400 rounded-md py-2 px-4 text-sm font-normal"
            />
          </div>
          <div className="w-full flex space-x-11">
            <div className="w-1/2 space-y-[5px]">
              <label className="text-black text-sm font-medium">
                Tanggal Mulai
              </label>
              <input
                type="date"
                value={tanggalMulai}
                onChange={(e) => setTanggalMulai(e.target.value)}
                placeholder="Pilih Tanggal"
                className="w-full border border-gray-400 rounded-md py-2 px-[14px] text-sm font-normal"
              />
            </div>
            <div className="w-1/2 space-y-[5px]">
              <label className="text-black text-sm font-medium">
                Tanggal Selesai
              </label>
              <input
                type="date"
                value={tanggalSelesai}
                onChange={(e) => setTanggalSelesai(e.target.value)}
                placeholder="Pilih Tanggal"
                className="w-full border border-gray-400 rounded-md py-2 px-[14px] text-sm font-normal"
              />
            </div>
          </div>

          <div>
            <label className="text-black text-sm font-medium">
              Pilih Status
            </label>
            <div className="flex py-4 space-x-8">
              <div className="flex items-center space-x-[18px]">
                <input
                  id="aktif"
                  type="radio"
                  value=""
                  name="aktif"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="aktif"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Aktif
                </label>
              </div>
              <div className="flex items-center me-4">
                <input
                  id="tidak-aktif"
                  type="radio"
                  value=""
                  name="tidak-aktif"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="tidak-aktif"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Tidak Aktif
                </label>
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
          Ubah
        </button>
      </div>
    </div>
  );
}
