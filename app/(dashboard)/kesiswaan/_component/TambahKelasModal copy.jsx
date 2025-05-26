"use client";
import React, { useState, useEffect } from "react";
import { CloseCircle } from "iconsax-react";
import Dropdown from "@/app/component/Dropdown";
import {
  detail_data_kelas,
  dropdown_data_guru,
  edit_kelas,
} from "@/app/api/ApiKesiswaan";
import { toast } from "react-toastify";

export default function TambahKelasModal({ onCancel, onConfirm, isLoading }) {
  const [idKelas, setIdKelas] = useState("");
  const [namaKelas, setNamaKelas] = useState("");
  const [waliKelasOptions, setWaliKelasOptions] = useState([]);
  const [selectedWaliKelas, setSelectedWaliKelas] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jumlahSiswa, setJumlahSiswa] = useState("");

  const fetchDataGuru = async () => {
    try {
      const data = await dropdown_data_guru();
      const formattedOptions = data?.map((guru) => ({
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
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm({
      id: idKelas,
      nama: namaKelas,
      waliKelas: selectedWaliKelas ? selectedWaliKelas.value : null,
    });
  };

  return (
    <div className="w-[485px] bg-white dark:bg-dark_net-ter pb-[38px] rounded-lg">
      <div className="w-full h-[54px] flex px-5 py-4 rounded-t-lg bg-[#adc0f5]/10 dark:bg-dark_net-pri items-center">
        <div className="text-black dark:text-slate-100 text-xl font-semibold">
          Tambah Data
        </div>
        <CloseCircle
          size="24"
          color="currentColor"
          variant="Bulk"
          className="ml-auto cursor-pointer dark:text-slate-100"
          onClick={onCancel}
        />
      </div>
      <div className="w-full px-5">
      <div className="space-y-4">
          <div className="w-full">
            <label className="text-black dark:text-slate-100 text-sm font-medium">Jadwal</label>
            <Dropdown
              options={jadwalOptions}
              value={selectedJadwal}
              onChange={setSelectedJadwal}
              className="w-full h-10 p-2 rounded-md bg-white border border-[#cccccc] "
              placeholder="Pilih Jadwal"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Tanggal</label>
            <CustomDatePicker
              value={selectedDate}
              onChange={dateSelection}
              //disabled={true}
              customFilterdateStyle="flex justify-between items-center px-3 py-2 text-black px-3 py-2 border border-gray-300 rounded-md bg-white"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6 space-x-3">
            <button
                onClick={onCancel}
                className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50"
            >
              Batal
            </button>
            <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`px-4 py-2 rounded-md text-white ${
                    isLoading
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                >
                {isLoading ? "Menyimpan..." : "Simpan"}
            </button>
        </div>
      </div>
    </div>
  );
}
