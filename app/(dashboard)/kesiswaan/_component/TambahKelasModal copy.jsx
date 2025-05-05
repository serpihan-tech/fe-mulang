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
          Edit Data
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
          {/* ID Jadwal */}
          <div className={`${formData.id === "" ? "hidden" : ""}`}>
            <Input label="ID" value={formData.id} disabled />
          </div>

          {/* Hari */}
          <div>
            <label className="text-sm font-medium">Hari</label>
            <Dropdown
              placeholder="Pilih hari"
              value={
                hariOptions.find((opt) => opt.value === formData.days) || null
              }
              onChange={(val) => setFormData({ ...formData, days: val.value })}
              className={
                "w-full h-10 p-2 rounded-md bg-white dark:bg-dark_net-ter border border-[#cccccc] "
              }
              options={hariOptions}
            />
          </div>

          {/* Jam Masuk & Jam Pulang */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="text-sm font-medium">Jam Masuk</label>
              <CustomTimePicker
                value={formData.start_time}
                onChange={(val) =>
                  setFormData({ ...formData, start_time: val })
                }
              />
            </div>
            <div className="w-1/2">
              <label className="text-sm font-medium">Jam Selesai</label>
              <CustomTimePicker
                value={formData.end_time}
                onChange={(val) => setFormData({ ...formData, end_time: val })}
              />
            </div>
          </div>

          {/* Kelas */}
          <div>
            <label className="text-sm font-medium">Kelas</label>
            <Dropdown
              placeholder="Pilih kelas"
              value={
                kelasOptions.find((opt) => opt.value === formData.class_id) ||
                null
              }
              onChange={(val) =>
                setFormData({ ...formData, class_id: val.value })
              }
              className={
                "w-full h-10 p-2 rounded-md bg-white dark:bg-dark_net-ter border border-[#cccccc] "
              }
              options={kelasOptions || []}
            />
          </div>

          {/* Mata pelajaran */}
          <div>
            <label className="text-sm font-medium">Mata pelajaran</label>
            <Dropdown
              placeholder="Pilih mapel"
              value={
                mapelOptions.find((opt) => opt.value === formData.module_id) ||
                null
              }
              onChange={(val) =>
                setFormData({ ...formData, module_id: val.value })
              }
              className={
                "w-full h-10 p-2 rounded-md bg-white dark:bg-dark_net-ter border border-[#cccccc] "
              }
              options={mapelOptions || []}
            />
          </div>

          {/* Ruangan */}
          <div>
            <label className="text-sm font-medium">Ruangan</label>
            <Dropdown
              placeholder="Pilih ruangan"
              value={
                ruanganOptions.find((opt) => opt.value === formData.room_id) ||
                null
              }
              onChange={(val) =>
                setFormData({ ...formData, room_id: val.value })
              }
              className={
                "w-full h-10 p-2 rounded-md bg-white dark:bg-dark_net-ter  border border-[#cccccc] "
              }
              options={ruanganOptions || []}
            />
          </div>
        </div>
        <div className="w-full flex justify-end space-x-4 mt-5">
          <button
            type="button"
            onClick={onCancel}
            className="w-[103px] h-[38px] px-2 py-1.5 text-sm font-medium border rounded-md border-red-600 dark:border-[#ff4022] text-red-600 dark:text-[#ff4022] hover:bg-red-500 dark:hover:bg-[#ff4022] dark:hover:text-slate-100 hover:text-white bg-white dark:bg-dark_net-ter transition-shadow duration-300 hover:scale-105"
          >
            Batal
          </button>
          <button
            disabled={isLoading}
            type="submit"
            className={`w-[103px] h-[38px] px-2 py-1.5 rounded-md text-white text-sm font-medium ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } transition-shadow duration-300 hover:shadow-md hover:scale-105`}
          >
            {isLoading ? "Membuat..." : "Buat"}
          </button>
        </div>
      </div>
    </div>
  );
}
