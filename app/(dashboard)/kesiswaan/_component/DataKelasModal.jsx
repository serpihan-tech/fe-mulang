"use client"
import React, { useState, useEffect } from "react";
import { CloseCircle } from "iconsax-react";
import Dropdown from "@/app/component/Dropdown";
import { detail_data_kelas, dropdown_data_guru, edit_kelas } from "@/app/api/ApiKesiswaan";
import { toast } from "react-toastify";

export default function DataKelasModal({ onCancel, onConfirm, kelasData, isLoading }) {
  const [idKelas, setIdKelas] = useState("");
  const [namaKelas, setNamaKelas] = useState("");
  const [waliKelasOptions, setWaliKelasOptions] = useState([]);
  const [selectedWaliKelas, setSelectedWaliKelas] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jumlahSiswa, setJumlahSiswa] = useState("");

  const fetchDataGuru = async () => {
    try {
        const data = await dropdown_data_guru();
        const formattedOptions = data.map((guru) => ({
          label: guru.name,
          value: guru.id,
        }));
        setWaliKelasOptions(formattedOptions);
    } catch (error) {
        toast.error("Gagal memuat data guru.");
    } finally {
        // setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataGuru();
    if (kelasData) {
      setIdKelas(kelasData.id);
      setNamaKelas(kelasData.name);
      if (kelasData.teacher) {
        setSelectedWaliKelas({
          label: kelasData.teacher.name,
          value: kelasData.teacher.id,
        });
      }
      //setJumlahSiswa(kelasData.jumlahSiswa);
    }
  }, [kelasData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm({
      id: idKelas,
      nama: namaKelas,
      waliKelas: selectedWaliKelas ? selectedWaliKelas.value : null,
    });
  };
  

  return (
    <div className="w-[485px] bg-white pb-[66px] rounded-lg">
      <div className="w-full h-[54px] flex px-5 py-4 bg-[#adc0f5]/10 rounded-[7px] items-center">
        <div className="text-black text-xl font-semibold">Edit Data</div>
        <CloseCircle size="24" color="currentColor" variant="Bold" className="ml-auto cursor-pointer" onClick={onCancel} />
      </div>
      <div className="w-full px-5">
        <form onSubmit={handleSubmit} className="mt-5 space-y-5">
          <div className="space-y-[6px]">
            <label className="text-black text-sm font-medium">ID Kelas</label>
            <input
              type="number"
              value={idKelas}
              disabled
              className="w-full border bg-[#aaaaaa] rounded-md py-2 px-3 text-sm font-normal"
            />
          </div>
          <div className="space-y-[6px] w-full">
            <label className="text-black text-sm font-medium">Nama Kelas</label>
            <input
              type="text"
              value={namaKelas}
              onChange={(e) => setNamaKelas(e.target.value)}
              className="w-full h-10 p-2 rounded-md bg-white border text-black border-[#cccccc]"
            />
          </div>
          <div className="space-y-[6px] w-full">
            <label className="text-black text-sm font-medium">Wali Kelas</label>
            <Dropdown
              options={waliKelasOptions}
              value={selectedWaliKelas}
              onChange={setSelectedWaliKelas}
              className="w-full h-10 p-2 rounded-md bg-white border border-[#cccccc] "
              placeholder="Pilih Wali Kelas"
            />
          </div>
          {/* <div className="space-y-[6px]">
            <label className="text-black text-sm font-medium">Jumlah Siswa</label>
            <input
              type="number"
              placeholder="Masukkan jumlah siswa"
              value={jumlahSiswa}
              disabled
              className="w-full border border-[#cccccc] rounded-md py-2 px-3 text-sm font-normal"
            />
          </div> */}
          <div className="w-full flex justify-end space-x-4 mt-5">
            <button type="button" onClick={onCancel} className="w-[103px] h-[38px] px-2 py-1.5 text-sm font-medium border rounded-md border-red-600 text-red-600 hover:bg-red-500 hover:text-white bg-white transition-shadow duration-300 hover:shadow-md hover:shadow-gray-400">
              Batal
            </button>
            <button
              disabled={isLoading} 
              type="submit" 
              className={`w-[103px] h-[38px] px-2 py-1.5 rounded-md text-white text-sm font-medium ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} transition-shadow duration-300 hover:shadow-md hover:shadow-gray-400`}
              >
              {isLoading ? "Mengubah..." : "Ubah"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
