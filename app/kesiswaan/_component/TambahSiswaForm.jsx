"use client"
import React, { useState } from "react";
import Dropdown from "@/app/component/Dropdown";

export default function TambahSiswaForm() {
  const classOptions = [
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

  const tahunAjarOptions = [
    { label: "Genap 2024-2025", value: "genap_2024_2025" },
    { label: "Ganjil 2024-2025", value: "ganjil_2024_2025" },
    { label: "Genap 2023-2024", value: "genap_2023_2024" },
    { label: "Ganjil 2023-2024", value: "ganjil_2023_2024" },
  ];

  const [selectedClass, setSelectedClass] = useState(null);

  const [selectedTahunAjar, setSelectedTahunAjar] = useState(null);

  return (
    <div className="w-full bg-white py-8 px-6 ">
      <div className="flex space-x-16">
        <div className="w-1/2">
          <div className="text-black text-xl font-semibold">Data Siswa</div>
          <form action="" className="mt-6 space-y-5">
            <div className="w-full flex space-x-11">
              <div className="w-1/2 space-y-[5px]">
                <label className="text-black text-sm font-medium">NIS</label>
                <input type="number" 
                  placeholder="Masukkan NIS"
                  className="w-full border border-gray-400 rounded-md py-2 px-4 text-sm font-normal"
                />
              </div>
              <div className="w-1/2 space-y-[5px]">
                <label className="text-black text-sm font-medium">NISN</label>
                <input type="number" 
                  placeholder="Masukkan NISN"
                  className="w-full border border-gray-400 rounded-md py-2 px-4 text-sm font-normal"
                />
              </div>
            </div>
            <div className="space-y-[5px]">
              <label className="text-black text-sm font-medium">Nama Lengkap</label>
                <input type="text" 
                  placeholder="Masukkan nama lengkap"
                  className="w-full border border-gray-400 rounded-md py-2 px-4 text-sm font-normal"
                />
            </div>
            <div className="space-y-[5px]">
              <label className="text-black text-sm font-medium">Email Siswa</label>
                <input type="email" 
                  placeholder="Masukkan email siswa"
                  className="w-full border border-gray-400 rounded-md py-2 px-4 text-sm font-normal"
                />
            </div>
            <div className="space-y-[5px]">
              <label className="text-black text-sm font-medium">Nomor Telepon Siswa</label>
                <input type="number" 
                  placeholder="Masukkan nomor telepon siswa"
                  className="w-full border border-gray-400 rounded-md py-2 px-4 text-sm font-normal"
                />
            </div>
            <div className="w-full flex space-x-11">
              <div className="w-full space-y-[5px]">
                <label className="text-black text-sm font-medium">Kelas</label>
                <Dropdown
                  options={classOptions}
                  value={selectedClass}
                  onChange={setSelectedClass}
                  placeholder="Pilih kelas"
                  className="w-full h-10 p-2 rounded-md bg-white dark:bg-black border border-gray-200"
                  dropdownStyle="dark:bg-black dark:text-white"
                />
              </div>
              <div className="w-full space-y-[5px]">
                <label className="text-black text-sm font-medium">Tahun Ajar  </label>
                <Dropdown
                  options={tahunAjarOptions}
                  value={selectedTahunAjar}
                  onChange={setSelectedTahunAjar}
                  placeholder="Pilih tahun ajar"
                  className="w-full h-10 p-2 rounded-md bg-white dark:bg-black border border-gray-200"
                  dropdownStyle="dark:bg-black dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="text-black text-sm font-medium">Jenis Kelamin</label>
              <div className="flex py-4 space-x-8">
                <div className="flex items-center space-x-[18px]">
                  <input id="laki-laki" type="radio" value="" name="laki-laki" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label htmlFor="laki-laki" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Laki-Laki</label>
                </div>
                <div className="flex items-center me-4">
                    <input id="perempuan" type="radio" value="" name="perempuan" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor="perempuan" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Perempuan</label>
                </div>
              </div>
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
        <div className="w-1/2">
          <div className="text-black text-xl font-semibold">Data Keluarga</div>
          <form action="" className="mt-6 space-y-5">
            <div className="space-y-[5px]">
              <label className="text-black text-sm font-medium">Nama Orang Tua / Wali</label>
                <input type="text" 
                  placeholder="Masukkan nama orang tua / wali"
                  className="w-full border border-gray-400 rounded-md py-2 px-4 text-sm font-normal"
                />
            </div>
            <div className="space-y-[5px]">
              <label className="text-black text-sm font-medium">Nomor Telepon Orang Tua / Wali</label>
                <input type="number" 
                  placeholder="Masukkan nomor telepon orang tua / wali"
                  className="w-full border border-gray-400 rounded-md py-2 px-4 text-sm font-normal"
                />
            </div>
            <div className="space-y-[5px]">
              <label className="text-black text-sm font-medium">Pekerjaan Orang Tua / Wali</label>
                <input type="text" 
                  placeholder="Masukkan pekerjaan orang tua / wali"
                  className="w-full border border-gray-400 rounded-md py-2 px-4 text-sm font-normal"
                />
            </div>
            <div className="space-y-[5px]">
              <label className="text-black text-sm font-medium">Alamat Orang Tua / Wali</label>
                <input type="text" 
                  placeholder="Masukkan alamat orang tua / wali"
                  className="w-full border border-gray-400 rounded-md py-2 px-4 text-sm font-normal"
                />
            </div>
          </form>
        </div>
      </div>
      <div className="w-full flex justify-end space-x-4">
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