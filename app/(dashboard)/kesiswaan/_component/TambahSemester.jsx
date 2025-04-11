"use client"
import React, { useState } from "react";
import { CloseCircle } from "iconsax-react";
import CustomDatePicker from "@/app/component/Datepicker";
import Dropdown from "@/app/component/Dropdown";

const academicOptions = [
  { label: "Genap", value: "genap" },
  { label: "Ganjil", value: "ganjil" },
];

export default function TambahSemesterModal({ onCancel, onConfirm, isLoading }) {
  const [formData, setFormData] = useState({
    tahunAjar: '',
    semester: '',
    date_start: new Date(),
    date_end: new Date(),
    status: '',
  });

  const handleDateChange = (field) => (date) => {
    setFormData(prev => ({ ...prev, [field]: date }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(formData);
  };

  return (
    <div className="w-[485px] bg-white pb-8 rounded-lg">
      {/* Header */}
      <div className="w-full h-[54px] flex px-5 py-4 bg-[#adc0f5]/10 items-center rounded-t-lg">
        <div className="text-black text-xl font-semibold">Tambah Data</div>
        <CloseCircle
          size="24"
          color="currentColor"
          variant="Bold"
          className="ml-auto cursor-pointer"
          onClick={onCancel}
        />
      </div>

      {/* Form */}
      <div className="w-full px-5">
        <form onSubmit={handleSubmit} className="mt-5 space-y-5">
          {/* Tahun Ajar */}
          <div className="space-y-1 w-full">
            <label className="text-black text-sm font-medium">Tahun Ajar</label>
            <input
              type="text"
              placeholder="Masukkan tahun ajar"
              value={formData.tahunAjar}
              onChange={(e) => setFormData({ ...formData, tahunAjar: e.target.value })}
              className="w-full h-10 p-2 rounded-md bg-white border text-black border-[#cccccc]"
            />
          </div>

          {/* Tanggal Mulai & Selesai */}
          <div className="flex gap-4">
            <div className="flex-1 space-y-1">
              <label className="text-black text-sm font-medium">Tanggal Mulai</label>
              <CustomDatePicker
                value={formData.date_start}
                onChange={handleDateChange('date_start')}
                customFilterdateStyle="text-black flex items-center justify-between border border-blue-500 rounded-lg px-4 py-2 cursor-pointer min-w-[180px]"
              />
            </div>
            <div className="flex-1 space-y-1">
              <label className="text-black text-sm font-medium">Tanggal Selesai</label>
              <CustomDatePicker
                value={formData.date_end}
                onChange={handleDateChange('date_end')}
                customFilterdateStyle="flex text-black  items-center justify-between border border-blue-500 rounded-lg px-4 py-2 cursor-pointer min-w-[180px]"
              />
            </div>
          </div>

          {/* Semester Dropdown */}
          <div className="space-y-1">
            <label className="text-black text-sm font-medium">Semester</label>
            <Dropdown
              options={academicOptions}
              value={formData.semester}
              onChange={(val) => setFormData({ ...formData, semester: val })}
              className="w-full h-10 p-2 rounded-md bg-white border border-[#cccccc]"
              placeholder="Pilih Semester"
            />
          </div>

          {/* Status Radio */}
          <div className="space-y-1">
            <label className="text-black text-sm font-medium">Pilih Status</label>
            <div className="flex gap-6 mt-1">
              <label className="flex items-center gap-2 text-black text-sm font-normal">
                <input
                  type="radio"
                  name="status"
                  value="1"
                  checked={formData.status === "1"}
                  onChange={() => setFormData({ ...formData, status: "1" })}
                />
                Aktif
              </label>
              <label className="flex items-center gap-2 text-black text-sm font-normal">
                <input
                  type="radio"
                  name="status"
                  value="0"
                  checked={formData.status === "0"}
                  onChange={() => setFormData({ ...formData, status: "0" })}
                />
                Tidak Aktif
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="w-full flex justify-end space-x-4 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="w-[103px] h-[38px] px-2 py-1.5 text-sm font-medium border rounded-md border-red-600 text-red-600 hover:bg-red-500 hover:text-white bg-white transition-shadow duration-300 hover:shadow-md"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-[103px] h-[38px] px-2 py-1.5 rounded-md text-white text-sm font-medium ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } transition-shadow duration-300 hover:shadow-md`}
            >
              {isLoading ? "Membuat..." : "Tambah"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
