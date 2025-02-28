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

  const jenisKelaminOptions = [
    { label: "Laki-laki", value: "laki-laki" },
    { label: "Perempuan", value: "perempuan" },
  ];

  const statusOptions = [
    { label: "Aktif", value: "aktif" },
    { label: "Pindah", value: "pindah" },
  ];

  const [selectedClass, setSelectedClass] = useState(null);

  const [selectedTahunAjar, setSelectedTahunAjar] = useState(null);
  
  const [selectedJenisKelamin, setSelectedJenisKelamin] = useState(null);
  
  const [selectedStatus, setSelectedStatus] = useState(null);

  return (
    <div className="w-full bg-gray-200 my-8 mx-6 ">
      <div className="flex space-x-16">
        <div>
          <div className="text-black text-xl font-semibold">Data Siswa</div>
          <form action="" className="mt-6 space-y-5">
            <div className="flex space-x-11">
              <div>
                <label className="text-black text-sm font-medium mb-1">NIS</label>
                <input type="number" 
                  placeholder="Masukkan NIS"
                  className="w-full border border-gray-400 rounded-md py-2 px-4 text-sm font-normal"
                />
              </div>
              <div>
                <label className="text-black text-sm font-medium mb-1">NISN</label>
                <input type="number" 
                  placeholder="Masukkan NISN"
                  className="w-full border border-gray-400 rounded-md py-2 px-4 text-sm font-normal"
                />
              </div>
            </div>
            <div>
              <label className="text-black text-sm font-medium mb-1">Nama Lengkap</label>
                <input type="text" 
                  placeholder="Masukkan nama lengkap"
                  className="w-full border border-gray-400 rounded-md py-2 px-4 text-sm font-normal"
                />
            </div>
            <div>
              <label className="text-black text-sm font-medium mb-1">Email Siswa</label>
                <input type="email" 
                  placeholder="Masukkan email siswa"
                  className="w-full border border-gray-400 rounded-md py-2 px-4 text-sm font-normal"
                />
            </div>
            <div>
              <label className="text-black text-sm font-medium mb-1">Nomor Telepon Siswa</label>
                <input type="number" 
                  placeholder="Masukkan nomor telepon siswa"
                  className="w-full border border-gray-400 rounded-md py-2 px-4 text-sm font-normal"
                />
            </div>
            <div className="w-full flex space-x-11">
              <div className="w-full">
                <label className="text-black text-sm font-medium mb-1">Kelas</label>
                <Dropdown
                  options={classOptions}
                  value={selectedClass}
                  onChange={setSelectedClass}
                  placeholder="Pilih kelas"
                  className="w-full h-10 p-2 rounded-md bg-white dark:bg-black border border-gray-200"
                  dropdownStyle="dark:bg-black dark:text-white"
                />
              </div>
              <div className="w-full">
                <label className="text-black text-sm font-medium mb-1">Kelas</label>
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
            <div className="w-full">
              <label className="text-black text-sm font-medium mb-1">Jenis Kelamin</label>
              <Dropdown
                options={jenisKelaminOptions}
                value={selectedJenisKelamin}
                onChange={setSelectedJenisKelamin}
                placeholder="Pilih jenis kelamin"
                className="w-full h-10 p-2 rounded-md bg-white dark:bg-black border border-gray-200"
                dropdownStyle="dark:bg-black dark:text-white"
              />
            </div>
            <div className="w-full">
              <label className="text-black text-sm font-medium mb-1">Status Siswa</label>
              <Dropdown
                options={statusOptions}
                value={selectedStatus}
                onChange={setSelectedStatus}
                placeholder="Pilih status"
                className="w-full h-10 p-2 rounded-md bg-white dark:bg-black border border-gray-200"
                dropdownStyle="dark:bg-black dark:text-white"
              />
            </div>
          </form>
        </div>
        <div>
          <div className="text-black text-xl font-semibold">Data Keluarga</div>
          <form action="" className="mt-6 space-y-5">
            <div>
              <label className="text-black text-sm font-medium mb-1">Nama Orang Tua / Wali</label>
                <input type="text" 
                  placeholder="Masukkan nama orang tua / wali"
                  className="w-full border border-gray-400 rounded-md py-2 px-4 text-sm font-normal"
                />
            </div>
            <div>
              <label className="text-black text-sm font-medium mb-1">Nomor Telepon Orang Tua / Wali</label>
                <input type="number" 
                  placeholder="Masukkan nomor telepon orang tua / wali"
                  className="w-full border border-gray-400 rounded-md py-2 px-4 text-sm font-normal"
                />
            </div>
            <div>
              <label className="text-black text-sm font-medium mb-1">Pekerjaan Orang Tua / Wali</label>
                <input type="text" 
                  placeholder="Masukkan pekerjaan orang tua / wali"
                  className="w-full border border-gray-400 rounded-md py-2 px-4 text-sm font-normal"
                />
            </div>
            <div>
              <label className="text-black text-sm font-medium mb-1">Alamat Orang Tua / Wali</label>
                <input type="text" 
                  placeholder="Masukkan alamat orang tua / wali"
                  className="w-full border border-gray-400 rounded-md py-2 px-4 text-sm font-normal"
                />
            </div>
          </form>
        </div>
      </div>
      <button className="border rounded-md justify-end border-red-600 text-red-600 text-sm font-semibold py-2 px-4 bg-white">
        Batal
      </button>
    </div>
  )
}