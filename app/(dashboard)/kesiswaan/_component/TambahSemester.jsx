"use client"
import React, { useEffect, useState } from "react";
import { CloseCircle } from "iconsax-react";
import CustomDatePicker from "@/app/component/Datepicker";
import Dropdown from "@/app/component/Dropdown";
import { format } from "date-fns";

const academicOptions = [
  { label: "Genap", value: "genap" },
  { label: "Ganjil", value: "ganjil" },
];

export default function TambahSemesterModal({ onCancel, onConfirm, isLoading, semesterData }) {
  const [formData, setFormData] = useState({
    tahunAjar: '',
    semester: '',
    date_start: null,
    date_end: null,
    status: '',
  });

  useEffect(() => {
    if (semesterData) {
      setFormData({
        id: semesterData.id ?? '',
        tahunAjar: semesterData.name ?? '',
        semester: academicOptions.find(opt => opt.value === semesterData.semester?.toLowerCase())?.value ?? '',
        date_start: semesterData.dateStart ? new Date(semesterData.dateStart) : null,
        date_end: semesterData.dateEnd ? new Date(semesterData.dateEnd) : null,
        status: semesterData.status !== undefined ? String(semesterData.status) : '',
      });
    }
  }, [semesterData]);

  const handleDateChange = (field) => (date) => {
    setFormData(prev => ({ ...prev, [field]: date }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(formData);
  };
  console.log("formData", formData) 

  return (
    <div className="w-[485px] bg-white dark:bg-dark_net-sec pb-8 rounded-lg">
      {/* Header */}
      <div className="w-full h-[54px] flex px-5 py-4 bg-[#adc0f5]/10 dark:bg-dark_net-pri items-center rounded-t-lg">
        <div className="text-black dark:text-slate-100 text-xl font-semibold">Tambah Data</div>
        <CloseCircle
          size="24"
          color="currentColor"
          variant="Bulk"
          className="ml-auto cursor-pointer dark:text-slate-300"
          onClick={onCancel}
        />
      </div>

      {/* Form */}
      <div className="w-full px-5">
        <form onSubmit={handleSubmit} className="mt-5 space-y-5">
        {/* ID */}
        <div className={`space-y-1 w-full font-medium ${formData.id ? "" : "hidden"}`}>
            <label className="text-black dark:text-slate-100 text-sm font-medium">ID Semester</label>
            <input
              disabled
              type="text"
              value={formData.id ?? ""}
              //onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              className={`w-full h-10 p-2 text-sm text-black dark:text-slate-100 font-medium rounded-md bg-netral-20 border border-netral-2`}
            />
          </div>

          {/* Tahun Ajar */}
          <div className="space-y-1 w-full font-medium">
            <label className="text-black dark:text-slate-100 text-sm font-medium">Tahun Ajar</label>
            <input
              required
              type="text"
              placeholder="Masukkan tahun ajar"
              value={formData.tahunAjar ?? ""}
              onChange={(e) => setFormData({ ...formData, tahunAjar: e.target.value })}
              className={`w-full h-10 p-2 text-sm font-medium rounded-md bg-white dark:bg-dark_net-ter border border-netral-20 focus:outline-pri-main ${
                    formData.tahunAjar ? "text-black dark:text-slate-100" : "text-netral-20"
                }`}
            />
          </div>

          {/* Tanggal Mulai & Selesai */}
          <div className="flex gap-4">
            <div className="flex-1 space-y-1 font-medium">
              <label className="text-black dark:text-slate-100 text-sm font-medium">Tanggal Mulai</label>
              <CustomDatePicker
                required
                value={formData.date_start?? null}
                onChange={handleDateChange('date_start')}
                customFilterdateStyle={`flex items-center justify-between border border-netral-20 focus:outline-pri-main rounded-lg px-4 py-2 cursor-pointer min-w-[180px] ${
                    formData.date_start ? "text-black dark:text-slate-100" : "text-netral-20"
                }`}
                />
            </div>
            <div className="flex-1 space-y-1 font-medium">
              <label className="text-black dark:text-slate-100 text-sm font-medium ">Tanggal Selesai</label>
              <CustomDatePicker
                required
                value={formData.date_end??null}
                onChange={handleDateChange("date_end")}
                customFilterdateStyle={`flex items-center  justify-between border border-netral-20 rounded-lg px-4 py-2 cursor-pointer min-w-[180px] ${
                    formData.date_end ? "text-black dark:text-slate-100" : "text-netral-20"
                }`}
                />
            </div>
          </div>

          {/* Semester Dropdown */}
          <div className="space-y-1">
            <label className="text-black dark:text-slate-100 text-sm font-medium">Semester</label>
            <Dropdown
              required
              options={academicOptions}
              value={academicOptions.find(opt => opt.value === formData.semester) || null}
              onChange={(val) => setFormData({ ...formData, semester: val.value })}
              className="w-full h-10 p-2 rounded-md bg-white dark:bg-dark_net-ter border border-netral-20"
              placeholder="Pilih Semester"
            />
          </div>

          {/* Status Radio */}
          <div className="space-y-1">
            <label className="text-black dark:text-slate-100 text-sm font-medium">Pilih Status</label>
            <div className="flex gap-6 mt-1">
              <label className="flex items-center gap-2 text-black dark:text-slate-100 text-sm font-medium">
                <input
                   
                    type="radio"
                    name="status"
                    value="1"
                    checked={formData.status === "1"}
                    onChange={() => setFormData({ ...formData, status: "1" })}
                    className="w-5 h-5 accent-pri-main"
                />
                Aktif
              </label>
              <label className="flex items-center gap-2 text-black dark:text-slate-100 text-sm font-medium">
                <input
                    type="radio"
                    name="status"
                    value="0"
                    checked={formData.status === "0"}
                    onChange={() => setFormData({ ...formData, status: "0" })}
                    className="w-5 h-5 accent-pri-main"
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
              className="w-[103px] h-[38px] px-2 py-1.5 text-sm font-medium border rounded-md border-red-600 dark:border-[#ff4022] text-red-600 dark:text-[#ff4022] hover:bg-red-500 dark:hover:bg-[#ff4022] dark:hover:text-slate-100 hover:text-white bg-white dark:bg-dark_net-quar transition-shadow duration-300 hover:scale-105"
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
              } transition-shadow duration-300 hover:shadow-md hover:scale-105`}
            >
              {isLoading ? "Membuat..." : "Tambah"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
