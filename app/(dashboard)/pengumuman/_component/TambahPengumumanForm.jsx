"use client";
import React, { useState } from "react";
import Dropdown from "@/app/component/Dropdown";
import { AttachCircle } from "iconsax-react";
import { useRouter } from "next/navigation";
import { useLoading } from "@/context/LoadingContext";

export default function TambahPengumumanForm() {
  const router = useRouter();

  const kategoriOptions = [
    { label: "Akademik", value: "akademik" },
    { label: "Administrasi", value: "administrasi" },
    { label: "Kegiatan Sekolah", value: "kegiatansekolah" },
    { label: "Fasilitas", value: "fasilitas" },
    { label: "Prestasi", value: "prestasi" },
    { label: "Informasi Umum", value: "informasiumum" },
  ];

  const penerimaInformasiOptions = [
    { label: "Semua", value: "semua" },
    { label: "Guru", value: "guru" },
    { label: "Siswa", value: "siswa" },
  ];

  const [selectedKategori, setSelectedKategori] = useState(null);

  const [selectedPenerimaInformasi, setSelectedPenerimaInformasi] =
    useState(null);

  const [tanggal, setTanggal] = useState("");

  return (
    <div className="w-full bg-white dark:bg-dark_net-ter py-8 px-6 ">
      <div className="text-black dark:text-slate-100 text-xl font-semibold">
        Pengumuman
      </div>
      <div className="flex space-x-16">
        <div className="w-1/2">
          <form action="" className="mt-6 space-y-5">
            <div className="space-y-[5px]">
              <label className="text-black dark:text-slate-100 text-sm font-medium">
                Judul Pengumuman
              </label>
              <input
                type="text"
                placeholder="Masukkan judul pengumuman"
                className="w-full border border-gray-400 dark:bg-dark_net-ter rounded-md py-2 px-4 text-sm font-normal"
              />
            </div>
            <div className="space-y-[5px]">
              <label className="text-black dark:text-slate-100 text-sm font-medium">
                Deskripsi Pengumuman
              </label>
              <input
                type="text"
                placeholder="Masukkan deskripsi pengumuman"
                className="h-[206px] w-full border border-gray-400 dark:bg-dark_net-ter rounded-md py-2 px-4 text-sm font-normal"
              />
            </div>
            <div className="space-y-[5px]">
              <label className="text-black dark:text-slate-100 text-sm font-medium">
                File/gambar (opsional)
              </label>
              <div className="relative">
                <input
                  type="file"
                  className="w-full border border-gray-400 dark:bg-dark_net-ter rounded-md py-2 px-4 text-sm font-normal opacity-0 absolute z-50 cursor-pointer"
                />
                <div className="w-full border border-gray-400 rounded-md py-2 px-4 text-sm font-normal flex items-center justify-between">
                  <span className="text-gray-400">Tambahkan file/gambar</span>
                  <AttachCircle
                    className="w-6 h-6"
                    variant="Bold"
                    color="#AAAAAA"
                  />
                </div>
              </div>
            </div>
            <div className="w-full space-y-[5px]">
              <label className="text-black dark:text-slate-100 text-sm font-medium">
                Kategori
              </label>
              <Dropdown
                options={kategoriOptions}
                value={selectedKategori}
                onChange={setSelectedKategori}
                placeholder="Pilih kategori"
                className="w-full h-10 p-2 rounded-md bg-white dark:bg-dark_net-ter border border-gray-200"
                dropdownStyle="dark:bg-dark_net-ter dark:text-white"
              />
            </div>
          </form>
        </div>
        <div className="w-1/2">
          <form action="" className="mt-6 space-y-5">
            <div className="space-y-[5px]">
              <label className="text-black dark:text-slate-100 text-sm font-medium">
                Tanggal Terbit
              </label>
              <input
                type="date"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                placeholder="Pilih tanggal terbit"
                className="w-full border border-gray-400 dark:bg-dark_net-ter placeholder-[#aaaaaa] dark:placeholder-slate-100 dark:text-slate-100 rounded-md py-2 px-[14px] text-sm font-normal"
              />
            </div>
            <div className="w-full space-y-[5px]">
              <label className="text-black dark:text-slate-100 text-sm font-medium">
                Penerima Informasi
              </label>
              <Dropdown
                options={penerimaInformasiOptions}
                value={selectedPenerimaInformasi}
                onChange={setSelectedPenerimaInformasi}
                placeholder="Pilih penerima informasi"
                className="w-full h-10 p-2 rounded-md bg-white dark:bg-dark_net-ter border border-gray-200"
                dropdownStyle="dark:bg-dark_net-ter dark:text-white"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="w-full flex justify-end space-x-4">
        <button
          className="w-1/2 md:w-[103px] h-[38px] px-2 py-1.5 text-sm font-medium border rounded-md border-red-600 dark:border-[#ff4022] text-red-600 dark:text-[#ff4022] hover:bg-red-500 dark:hover:bg-[#ff4022] dark:hover:text-slate-100 hover:text-white bg-white dark:bg-dark_net-quar transition-shadow duration-300 hover:shadow-md hover:scale-105 dark:hover:shadow-none"
          onClick={() => router.back()}
        >
          Batal
        </button>
        <button className="w-1/2 md:w-[103px] h-[38px] px-2 py-1.5 rounded-md text-white text-sm font-medium bg-blue-600 hover:bg-blue-700 transition-shadow duration-500 hover:shadow-md hover:scale-105">
          Simpan
        </button>
      </div>
    </div>
  );
}
